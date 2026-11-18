"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";

type NavLink = { href: string; name: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstNavLinkRef.current?.focus();
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
        <nav id="mobile-navigation" aria-label="Foundation sections" className="absolute inset-x-0 top-full border-b-2 border-ink bg-paper px-4 py-4 sm:hidden">
          <p className="eyebrow mb-4">Jump to / Foundation sections</p>
          <div className="grid gap-2">
            {links.map(({ href, name }, index) => (
              <a key={href} ref={index === 0 ? firstNavLinkRef : undefined} className="button button-secondary justify-between" href={href} onClick={() => setIsOpen(false)}>{name} <ArrowUpRight size={15} /></a>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
