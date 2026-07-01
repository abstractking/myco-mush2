import { SectionLabel } from "./SectionLabel";

const items = [
  { k: "Focus", v: "The Signal in the Static.Precision without the crash. In the experimental landscape, this is the cognitive tool that allows you to observe the 'otherworldly' architectures of your mind with clarity, turning chaotic noise into navigable insight" },
  { k: "Calm", v: "The Deep Rest. Balance for the nervous system. As you traverse the magical and whimsical terrains of the psyche, this acts as your anchor—lowering cortisol to ensure the journey remains a healing exploration, not a turbulent storm." },
  { k: "Immunity", v: "The Sacred Armor. Rich blends that train the body's intelligence. When you open the doors of perception, this fortification ensures the physical self is resilient, allowing the 'proven cognitive help' of LSD to be integrated safely into a robust, healing system." },
  { k: "Energy", v: " The Celestial Fuel. A sustained, gentle current of power that mimics the boundless energy of the Canadian wilderness. No jitters, no comedown—just a magical, sustained presence for the duration of your healing arc." },
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