import { SectionLabel } from "./SectionLabel";

const items = [
  { k: "Focus", v: "Cognitive precision without the crash. Sharper signal, quieter noise." },
  { k: "Calm", v: "Adaptogenic balance for the nervous system. Lower cortisol, deeper rest." },
  { k: "Immunity", v: "Beta-glucan rich blends that train and support immune intelligence." },
  { k: "Energy", v: "Clean cellular fuel from cordyceps and rhodiola. No jitters, no comedown." },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-lines opacity-40"
      />
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="02" label="What it does" />
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Functional, <span className="text-accent text-glow-cyan">felt within days.</span>
        </h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={it.k}
              className="group relative bg-card/70 p-8 transition hover:bg-card"
            >
              <p className="font-mono-ui text-xs text-muted-foreground">
                0{i + 1} / 04
              </p>
              <h3 className="font-display mt-4 text-2xl font-bold">{it.k}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{it.v}</p>
              <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}