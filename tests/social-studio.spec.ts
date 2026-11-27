import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const wideImage = readFileSync(new URL("./fixtures/wide-cover.png", import.meta.url));

test("story export stays locked until image, title, and excerpt are present", async ({ page }) => {
  await page.goto("/social-studio");

  const exportButton = page.getByRole("button", { name: /download 1080 × 1920 png/i });
  const canvas = page.getByRole("img", { name: "Live full-bleed RADAR story preview" });

  await expect(page.getByRole("heading", { name: "Story preview" })).toBeVisible();
  await expect(canvas).toHaveAttribute("width", "1080");
  await expect(canvas).toHaveAttribute("height", "1920");
  await expect(exportButton).toBeDisabled();

  await page.getByLabel("Article title").fill("Lagos in Paris: a story of sound and belonging");
  await page.getByLabel("Article excerpt").fill("A new editorial feature follows the artists, places and ideas connecting Lagos and Paris.");
  await expect(exportButton).toBeDisabled();

  await page.getByLabel("Featured image").setInputFiles({
    name: "wide-cover.png",
    mimeType: "image/png",
    buffer: wideImage,
  });
  await expect(page.getByText("Loaded / wide-cover.png")).toBeVisible();
  await expect(exportButton).toBeEnabled();
});

test("wide featured art is center-cropped without distortion and exports as a 1080x1920 PNG", async ({ page }) => {
  await page.goto("/social-studio");
  await page.getByLabel("Article title").fill("Lagos in Paris");
  await page.getByLabel("Article excerpt").fill("An editorial story about music and culture.");
  await page.getByLabel("Featured image").setInputFiles({
    name: "wide-cover.png",
    mimeType: "image/png",
    buffer: wideImage,
  });

  const canvas = page.getByRole("img", { name: "Live full-bleed RADAR story preview" });
  await expect(page.getByText("Loaded / wide-cover.png")).toBeVisible();
  const cropCheck = await canvas.evaluate((element) => {
    const canvasElement = element as HTMLCanvasElement;
    const context = canvasElement.getContext("2d");
    if (!context) return false;
    return [100, 540, 980].every((x) => {
      const sample = context.getImageData(x, 900, 1, 1).data;
      return sample[1] > sample[0] && sample[1] > sample[2];
    });
  });
  expect(cropCheck).toBe(true);

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /download 1080 × 1920 png/i }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("radar-story-1080x1920.png");
  const downloadedFile = await download.path();
  expect(downloadedFile).toBeTruthy();
  if (downloadedFile) {
    const exportedPng = readFileSync(downloadedFile);
    expect(exportedPng.readUInt32BE(16)).toBe(1080);
    expect(exportedPng.readUInt32BE(20)).toBe(1920);
  }
});

test("unsupported image types are rejected and do not unlock export", async ({ page }) => {
  await page.goto("/social-studio");
  await page.getByLabel("Article title").fill("A valid title");
  await page.getByLabel("Article excerpt").fill("A valid excerpt");
  await page.getByLabel("Featured image").setInputFiles({
    name: "cover.gif",
    mimeType: "image/gif",
    buffer: Buffer.from("GIF89a"),
  });

  await expect(page.getByText("Choose a PNG, JPEG or WebP image.")).toBeVisible();
  await expect(page.getByRole("button", { name: /download 1080 × 1920 png/i })).toBeDisabled();
});
