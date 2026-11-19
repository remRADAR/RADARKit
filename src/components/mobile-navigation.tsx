"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";

type DepartmentLink = { id: string; name: string };

export function MobileNavigation({ departments }: { departments: DepartmentLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        className="icon-button sm:hidden"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Menu size={20} />
      </button>
      {isOpen && (
        <nav id="mobile-navigation" aria-label="Foundation sections" className="col-span-full border-b-2 border-ink bg-paper px-4 py-4 sm:hidden">
          <p className="eyebrow mb-4">Jump to / Foundation sections</p>
          <div className="grid gap-2">
            <a ref={firstLinkRef} className="button button-secondary justify-between" href="#top" onClick={() => setIsOpen(false)}>Overview <ArrowUpRight size={15} /></a>
            {departments.map(({ id, name }) => <a key={id} className="button button-secondary justify-between" href={`#department-${id}`} onClick={() => setIsOpen(false)}>{name} <ArrowUpRight size={15} /></a>)}
            <a className="button button-secondary justify-between" href="#status" onClick={() => setIsOpen(false)}>Foundation status <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      )}
    </>
  );
}
