"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ImagePlus } from "lucide-react";
import { drawStoryTemplate, STORY_HEIGHT, STORY_WIDTH } from "@/lib/story-template";

export function StoryComposer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageError, setImageError] = useState("");
  const [imageStatus, setImageStatus] = useState<"empty" | "loading" | "ready">("empty");

  useEffect(() => {
    if (!imageUrl) return;

    let active = true;
    const loadedImage = new Image();
    loadedImage.onload = () => {
      if (!active) return;
      setImage(loadedImage);
      setImageStatus("ready");
      setImageError("");
    };
    loadedImage.onerror = () => {
      if (!active) return;
      setImage(null);
      setImageStatus("empty");
      setImageError("This image could not be opened. Try a PNG, JPEG or WebP file.");
    };
    loadedImage.src = imageUrl;

    return () => {
      active = false;
      loadedImage.onload = null;
      loadedImage.onerror = null;
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const colors = {
      ink: rootStyles.getPropertyValue("--ink").trim() || "#050505",
      paper: rootStyles.getPropertyValue("--paper").trim() || "#f7f7f2",
      flare: rootStyles.getPropertyValue("--flare").trim() || "#168a3a",
    };
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) drawStoryTemplate(context, image, title, excerpt, colors);
    });

    return () => {
      cancelled = true;
    };
  }, [image, title, excerpt, imageStatus]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setImageUrl(null);
      setImageName("");
      setImage(null);
      setImageStatus("empty");
      setImageError("Choose a PNG, JPEG or WebP image.");
      return;
    }

    setImage(null);
    setImageName(file.name);
    setImageError("");
    setImageStatus("loading");
    setImageUrl(URL.createObjectURL(file));
  };

  const readyToExport = Boolean(image && title.trim() && excerpt.trim());

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !readyToExport) return;

    canvas.toBlob((blob) => {
      if (!blob) {
        setImageError("PNG export failed. Try another image and download again.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "radar-story-1080x1920.png";
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b-2 border-ink px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <Link className="button button-secondary" href="/" aria-label="Back to RADARKit">
            <ArrowLeft size={15} /> Toolkit
          </Link>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted">RADARKit / Social Studio</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="border-b-2 border-ink pb-8">
          <p className="eyebrow"><ImagePlus size={13} /> Story template / 01</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-black uppercase leading-[0.86] tracking-[-0.07em] sm:text-7xl lg:text-8xl">From article<br /><span className="text-flare">to story.</span></h1>
          <p className="mt-6 max-w-2xl font-mono text-xs uppercase leading-[1.8] tracking-[0.08em] text-ink-muted">Add an article image, title and excerpt. Preview a full-bleed 9:16 RADAR asset, then export a ready-to-review PNG.</p>
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(270px,390px)] lg:gap-12 lg:py-12">
          <section aria-labelledby="story-inputs-heading" className="min-w-0">
            <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-3">
              <div>
                <p className="eyebrow">Asset inputs / Local preview</p>
                <h2 id="story-inputs-heading" className="mt-3 font-display text-3xl font-black uppercase tracking-[-0.05em]">Article details</h2>
              </div>
              <span className="hidden font-mono text-[10px] font-bold uppercase tracking-widest text-ink-muted sm:inline">01 / 03</span>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="featured-image" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em]">Featured image</label>
                <input id="featured-image" aria-describedby="image-help" className="block min-h-12 w-full border-2 border-ink bg-paper p-3 font-mono text-xs file:mr-4 file:border-0 file:bg-ink file:px-3 file:py-2 file:font-mono file:text-[10px] file:font-bold file:uppercase file:text-paper" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} />
                <p id="image-help" className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-wide text-ink-muted">PNG, JPEG or WebP. Your image stays in this browser tab; cover crop fills the frame without distortion.</p>
                {imageName && imageStatus === "ready" && <p className="mt-2 truncate font-mono text-[10px] font-bold uppercase tracking-wide" aria-live="polite">Loaded / {imageName}</p>}
                {imageStatus === "loading" && <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-ink-muted" role="status">Loading image…</p>}
                {imageError && <p className="mt-2 font-mono text-[10px] font-bold uppercase leading-relaxed text-red-800" role="alert">{imageError}</p>}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="article-title" className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">Article title</label>
                  <span className="font-mono text-[10px] text-ink-muted">{title.length} / 90</span>
                </div>
                <input id="article-title" className="min-h-12 w-full border-2 border-ink bg-paper px-3 py-3 font-display text-base font-bold" type="text" maxLength={90} value={title} onChange={(event) => setTitle(event.currentTarget.value)} placeholder="Enter the published article title" />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="article-excerpt" className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">Article excerpt</label>
                  <span className="font-mono text-[10px] text-ink-muted">{excerpt.length} / 180</span>
                </div>
                <textarea id="article-excerpt" className="min-h-32 w-full resize-y border-2 border-ink bg-paper px-3 py-3 font-display text-base leading-relaxed" maxLength={180} value={excerpt} onChange={(event) => setExcerpt(event.currentTarget.value)} placeholder="Paste the article excerpt" />
              </div>

              <button className="button button-primary w-full justify-center sm:w-auto" type="button" disabled={!readyToExport} onClick={handleDownload}>
                <Download size={15} /> Download 1080 × 1920 PNG
              </button>
              <p className="max-w-xl border-l-4 border-flare pl-3 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-wide text-ink-muted">Export only / Nothing is uploaded, authenticated or published. Platform connections and approval workflows are not configured.</p>
            </div>
          </section>

          <section aria-labelledby="preview-heading" className="min-w-0 lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-3">
              <div>
                <p className="eyebrow">Live render / 9:16</p>
                <h2 id="preview-heading" className="mt-3 font-display text-3xl font-black uppercase tracking-[-0.05em]">Story preview</h2>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-muted">1080 × 1920</span>
            </div>
            <div className="mt-5 flex justify-center bg-ink p-3 sm:p-5">
              <canvas ref={canvasRef} aria-label="Live full-bleed RADAR story preview" role="img" width={STORY_WIDTH} height={STORY_HEIGHT} className="block h-auto max-h-[72vh] w-full max-w-[350px] object-contain" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-wide text-ink-muted">Image fit / Cover crop. Title and excerpt stay inside the lower safe area.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
