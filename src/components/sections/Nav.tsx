import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#shop", label: "Shop" },
  { href: "#blends", label: "Blends" },
  { href: "#benefits", label: "Benefits" },
  { href: "#ritual", label: "Ritual" },
  { href: "#story", label: "Story" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block size-2 rounded-full bg-accent shadow-glow-cyan" />
          <span>myco<span className="text-primary">.</span>wonderland</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono-ui text-xs uppercase text-muted-foreground transition hover:text-accent hover:text-glow-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Link
          to="/cart"
          className="font-mono-ui rounded-md border border-accent px-3 py-1.5 text-xs uppercase text-accent transition hover:bg-accent hover:text-accent-foreground hover:shadow-glow-cyan"
        >
          Cart →
        </Link>
      </div>
    </header>
  );
}