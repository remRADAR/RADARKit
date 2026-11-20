export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

export type CropRect = { sx: number; sy: number; sw: number; sh: number };
export type StoryColors = { ink: string; paper: string; flare: string };

/** Return the centered source rectangle needed to fill the output without distorting the image. */
export function getCoverCrop(
  sourceWidth: number,
  sourceHeight: number,
  outputWidth = STORY_WIDTH,
  outputHeight = STORY_HEIGHT,
): CropRect {
  if ([sourceWidth, sourceHeight, outputWidth, outputHeight].some((value) => !Number.isFinite(value) || value <= 0)) {
    throw new RangeError("Image and output dimensions must be positive finite numbers.");
  }

  const sourceRatio = sourceWidth / sourceHeight;
  const outputRatio = outputWidth / outputHeight;

  if (sourceRatio > outputRatio) {
    const sw = sourceHeight * outputRatio;
    return { sx: (sourceWidth - sw) / 2, sy: 0, sw, sh: sourceHeight };
  }

  const sh = sourceWidth / outputRatio;
  return { sx: 0, sy: (sourceHeight - sh) / 2, sw: sourceWidth, sh };
}

function rgbaFromHex(hex: string, alpha: number): string {
  const match = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim());
  if (!match) return `rgba(5, 5, 5, ${alpha})`;
  const [, red, green, blue] = match;
  return `rgba(${Number.parseInt(red, 16)}, ${Number.parseInt(green, 16)}, ${Number.parseInt(blue, 16)}, ${alpha})`;
}

function splitLongWord(context: CanvasRenderingContext2D, word: string, maxWidth: number): string[] {
  const parts: string[] = [];
  let part = "";
  for (const character of word) {
    if (part && context.measureText(part + character).width > maxWidth) {
      parts.push(part);
      part = character;
    } else {
      part += character;
    }
  }
  if (part) parts.push(part);
  return parts;
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const originalWord of words) {
    const segments = context.measureText(originalWord).width > maxWidth
      ? splitLongWord(context, originalWord, maxWidth)
      : [originalWord];

    for (const segment of segments) {
      const candidate = line ? `${line} ${segment}` : segment;
      if (line && context.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = segment;
      } else {
        line = candidate;
      }
    }
  }

  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;

  const visible = lines.slice(0, maxLines);
  let lastLine = visible[maxLines - 1];
  while (lastLine && context.measureText(`${lastLine}…`).width > maxWidth) {
    lastLine = lastLine.slice(0, -1).trimEnd();
  }
  visible[maxLines - 1] = lastLine ? `${lastLine}…` : "…";
  return visible;
}

function imageDimensions(image: HTMLImageElement | ImageBitmap): { width: number; height: number } {
  if (image instanceof HTMLImageElement) {
    return { width: image.naturalWidth, height: image.naturalHeight };
  }
  return { width: image.width, height: image.height };
}

export function drawStoryTemplate(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement | ImageBitmap | null,
  title: string,
  excerpt: string,
  colors: StoryColors,
): void {
  const { canvas } = context;
  const width = canvas.width;
  const height = canvas.height;

  context.clearRect(0, 0, width, height);
  context.fillStyle = colors.ink;
  context.fillRect(0, 0, width, height);

  if (image) {
    const { width: sourceWidth, height: sourceHeight } = imageDimensions(image);
    if (sourceWidth > 0 && sourceHeight > 0) {
      const crop = getCoverCrop(sourceWidth, sourceHeight, width, height);
      context.drawImage(image, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, width, height);
      context.globalAlpha = 0.12;
      context.fillStyle = colors.ink;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;
    }
  }

  const topShade = context.createLinearGradient(0, 0, 0, 420);
  topShade.addColorStop(0, rgbaFromHex(colors.ink, 0.7));
  topShade.addColorStop(1, rgbaFromHex(colors.ink, 0));
  context.fillStyle = topShade;
  context.fillRect(0, 0, width, 420);

  const bottomShade = context.createLinearGradient(0, 900, 0, height);
  bottomShade.addColorStop(0, rgbaFromHex(colors.ink, 0));
  bottomShade.addColorStop(0.48, rgbaFromHex(colors.ink, 0.72));
  bottomShade.addColorStop(1, rgbaFromHex(colors.ink, 0.96));
  context.fillStyle = bottomShade;
  context.fillRect(0, 900, width, height - 900);

  const margin = 88;
  context.textBaseline = "top";
  context.fillStyle = colors.paper;
  context.font = "800 58px Archivo, Arial, sans-serif";
  context.fillText("RADAR", margin, 92);
  context.font = "700 22px 'Space Mono', monospace";
  context.letterSpacing = "4px";
  context.fillText("RADARCHARTS.NET", margin, 164);
  context.letterSpacing = "0px";
  context.fillStyle = colors.flare;
  context.fillRect(margin, 213, 80, 8);

  if (!image) {
    context.strokeStyle = colors.paper;
    context.lineWidth = 3;
    context.strokeRect(margin, 820, width - margin * 2, 210);
    context.fillStyle = colors.paper;
    context.font = "700 26px 'Space Mono', monospace";
    context.letterSpacing = "2px";
    context.fillText("UPLOAD FEATURED IMAGE", margin + 28, 878);
    context.letterSpacing = "0px";
  }

  context.fillStyle = colors.flare;
  context.fillRect(margin, 1214, 54, 7);
  context.fillStyle = colors.paper;
  context.font = "700 23px 'Space Mono', monospace";
  context.letterSpacing = "4px";
  context.fillText("ON THE RADAR", margin, 1252);
  context.letterSpacing = "0px";

  context.fillStyle = colors.paper;
  context.font = "800 82px Archivo, Arial, sans-serif";
  const titleLines = wrapText(context, title || "ARTICLE TITLE", width - margin * 2, 4);
  titleLines.forEach((line, index) => context.fillText(line, margin, 1310 + index * 94));

  const excerptStart = 1310 + Math.max(titleLines.length, 1) * 94 + 20;
  context.globalAlpha = 0.88;
  context.font = "400 26px Archivo, Arial, sans-serif";
  const excerptLines = wrapText(context, excerpt || "Your article excerpt will appear here.", width - margin * 2, 3);
  excerptLines.forEach((line, index) => context.fillText(line, margin, excerptStart + index * 38));
  context.globalAlpha = 1;

  context.fillStyle = colors.paper;
  context.globalAlpha = 0.76;
  context.font = "700 19px 'Space Mono', monospace";
  context.letterSpacing = "3px";
  context.fillText("CULTURE / EDITORIAL", margin, 1850);
  context.letterSpacing = "0px";
  context.globalAlpha = 1;
}
