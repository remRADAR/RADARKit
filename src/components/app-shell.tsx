import {
  Archive,
  ArrowUpRight,
  FileAudio,
  FolderKanban,
  LibraryBig,
  Search,
  Share2,
  Sparkles,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";

const departments = [
  { id: "media-lab", name: "Media Lab", detail: "Intake, artwork and metadata", icon: Archive, status: "Ready" },
  { id: "playlist-studio", name: "Playlist Studio", detail: "Import, match and sync", icon: LibraryBig, status: "Planned" },
  { id: "social-studio", name: "Social Studio", detail: "9:16 article story templates", icon: Share2, status: "Prototype" },
  { id: "converter-lab", name: "Converter Lab", detail: "Image and audio utilities", icon: FileAudio, status: "Next" },
  { id: "research-desk", name: "Research Desk", detail: "Credits, links and release data", icon: Search, status: "Planned" },
  { id: "asset-desk", name: "Asset Desk", detail: "Campaign files and export history", icon: FolderKanban, status: "Planned" },
];

export function AppShell() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b-2 border-ink px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[1fr_auto]">
          <a href="#top" className="flex items-center gap-3" aria-label="RADARKit home">
            <span className="grid size-9 place-items-center border-2 border-ink bg-flare text-flare-foreground shadow-hard-sm" aria-hidden="true">
              <Waves size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-black uppercase tracking-[-0.06em]">RADAR<span className="text-flare">Kit</span></span>
          </a>
          <div className="hidden items-center gap-5 sm:flex">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">RADARCharts by REM / Foundation preview</span>
          </div>
          <MobileNavigation departments={departments.map(({ id, name }) => ({ id, name, href: id === "social-studio" ? "/social-studio" : `#department-${id}` }))} />
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-[1440px] border-x-2 border-ink lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="border-b-2 border-ink px-5 py-12 sm:px-8 sm:py-16 lg:border-b-0 lg:border-r-2 lg:px-12 lg:py-24">
          <p className="eyebrow"><Sparkles size={13} /> Foundation / Workspace signal</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.7rem,10vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">Make the work<br /><span className="text-flare">move.</span></h1>
          <p className="mt-8 max-w-xl font-mono text-xs uppercase leading-[1.8] tracking-[0.08em] text-ink-muted sm:text-sm">One focused operating layer for music marketing, artist development, research, media preparation and campaign execution.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="button button-primary" href="#departments">Explore departments <ArrowUpRight size={15} /></a>
            <a className="button button-secondary" href="#status">Read foundation status</a>
          </div>
        </div>
        <aside className="grid content-between bg-ink p-5 text-paper sm:p-8 lg:min-h-[34rem] lg:p-10">
          <div>
            <p className="eyebrow text-paper/60">System note / 001</p>
            <p className="mt-8 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em]">Structure before scale.</p>
          </div>
          <div className="mt-16 border-t border-paper/30 pt-5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60"><span>Foundation progress</span><span>01 / 05</span></div>
            <div className="mt-4 h-2 border border-paper/60 p-[2px]"><div className="h-full w-1/5 bg-flare" /></div>
            <p className="mt-4 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-paper/60">Architecture, security, integrations and the visual system are being established before feature delivery.</p>
          </div>
        </aside>
      </section>

      <section id="departments" className="mx-auto max-w-[1440px] border-x-2 border-b-2 border-ink">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-ink px-5 py-6 sm:px-8 lg:px-12">
          <div><p className="eyebrow">Operating map / Six departments</p><h2 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">The toolkit</h2></div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ink-muted">Each department has a clear job, a reusable component boundary and a path to independent development.</p>
        </div>
        <div className="department-grid grid sm:grid-cols-2 lg:grid-cols-3">
          {departments.map(({ id, name, detail, icon: Icon, status }, index) => (
            <article id={`department-${id}`} key={id} className="group border-b-2 border-ink p-5 last:border-b-0 sm:p-7">
              <div className="flex items-start justify-between gap-4"><span className="grid size-11 place-items-center border-2 border-ink bg-paper group-hover:bg-flare"><Icon size={20} /></span><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-muted">0{index + 1}</span></div>
              <h3 className="mt-12 font-display text-3xl font-black uppercase leading-none tracking-[-0.05em]">{name}</h3>
              <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-wide text-ink-muted">{detail}</p>
              <div className="mt-10 flex items-center justify-between border-t-2 border-ink pt-3 font-mono text-[10px] font-bold uppercase tracking-widest"><span>{status}</span><span className="flex items-center gap-2">{id === "social-studio" && <Link className="underline underline-offset-4" href="/social-studio">Open studio</Link>}<ArrowUpRight size={15} /></span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="status" className="mx-auto grid max-w-[1440px] border-x-2 border-b-2 border-ink lg:grid-cols-[1fr_1fr]">
        <div className="border-b-2 border-ink px-5 py-10 sm:px-8 lg:border-b-0 lg:border-r-2 lg:px-12"><p className="eyebrow">Next checkpoint</p><h2 className="mt-4 max-w-xl font-display text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">Converter Lab MVP</h2><p className="mt-6 max-w-lg font-mono text-xs uppercase leading-[1.8] tracking-wide text-ink-muted">Start with browser-safe image and audio utilities, explicit rights boundaries and an asynchronous processing seam for future intensive work.</p></div>
        <div className="bg-flare px-5 py-10 text-flare-foreground sm:px-8 lg:px-12"><p className="eyebrow">Foundation principles</p><ul className="mt-6 space-y-4 font-mono text-xs font-bold uppercase leading-relaxed tracking-wide"><li className="border-t-2 border-flare-foreground/40 pt-3">01 / Owned or authorized content only</li><li className="border-t-2 border-flare-foreground/40 pt-3">02 / Official APIs before brittle workarounds</li><li className="border-t-2 border-flare-foreground/40 pt-3">03 / Mobile-first, touch-ready operations</li><li className="border-t-2 border-flare-foreground/40 pt-3">04 / Public repository, private operations</li></ul></div>
      </section>

      <footer className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 border-x-2 border-ink px-5 py-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:px-8 lg:px-12"><span>RADARKit / Foundation 0.1</span><span>RADARCharts by REM / Build with intention</span></footer>
    </main>
  );
}
