import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import cyanGrid from "@/assets/cyan-grid.png.asset.json";
import { PRODUCTS } from "@/lib/products";
import { SectionLabel } from "./SectionLabel";

export function Products() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 800), behavior: "smooth" });
  };

  return (
    <section id="shop" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="02" label="The vault" />
            <h2 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
              Pick a relic. <span className="text-accent text-glow-cyan">Sealed in spore.</span>
            </h2>
          </div>
          <div className="font-mono-ui flex items-center gap-3 text-xs uppercase">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll products left"
              className="rounded-md border border-border px-3 py-2 text-muted-foreground transition hover:border-accent hover:text-accent"
            >
              ← prev
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll products right"
              className="rounded-md border border-border px-3 py-2 text-muted-foreground transition hover:border-accent hover:text-accent"
            >
              next →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))]"
      >
        {PRODUCTS.map((p) => (
          <article
            key={p.id}
            className="group relative w-[78vw] flex-none snap-start overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 transition hover:border-accent/60 sm:w-[300px]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 size-40 opacity-15 transition group-hover:opacity-30"
              style={{
                backgroundImage: `url(${cyanGrid.url})`,
                backgroundSize: "cover",
                maskImage: "radial-gradient(circle at center, black, transparent 70%)",
              }}
            />
            <div className="overflow-hidden rounded-[2rem] bg-slate-950">
              <img
                src={p.image}
                alt={p.name}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative flex flex-col p-6">
              <p className="font-mono-ui text-[10px] uppercase text-accent">{p.code}</p>
              <div className="mt-3 flex-1">
                <h3 className="font-display text-2xl font-bold leading-tight">{p.name}</h3>
                <p className="font-mono-ui mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  // {p.tag}
                </p>
              </div>
              {p.prices ? (
                <div className="mt-6 space-y-3">
                  <p className="font-mono-ui text-[10px] uppercase text-muted-foreground/60">
                    select weight
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {(
                      [
                        ["1 oz", p.prices.oz, "oz"],
                        ["1/4 lb", p.prices.quarter, "quarter"],
                        ["1/2 lb", p.prices.half, "half"],
                        ["1 lb", p.prices.pound, "pound"],
                      ] as const
                    ).map(([label, value, weight]) => (
                      <Link
                        key={weight}
                        to="/cart"
                        search={{ item: p.id, weight }}
                        className="rounded-2xl border border-border px-3 py-2 text-left text-[11px] transition hover:border-accent hover:text-accent"
                        aria-label={`Buy ${p.name} ${label} for $${value.toFixed(2)}`}
                      >
                        <span className="block font-semibold">{label}</span>
                        <span className="font-mono-ui text-xs">${value.toFixed(2)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex items-end justify-between">
                  <p className="font-mono-ui text-[10px] uppercase text-muted-foreground/60">
                    qty · 1
                  </p>
                  <Link
                    to="/cart"
                    search={{ item: p.id }}
                    data-text={`$${p.price.toFixed(2)}`}
                    className="glitch-btn text-xs"
                    aria-label={`Buy ${p.name} for $${p.price.toFixed(2)}`}
                  >
                    ${p.price.toFixed(2)}
                  </Link>
                </div>
              )}
            </div>
          </article>
        ))}
        <div aria-hidden className="w-6 flex-none" />
      </div>
    </section>
  );
}