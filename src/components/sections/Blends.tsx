import cyanGrid from "@/assets/cyan-grid.png.asset.json";
import { SectionLabel } from "./SectionLabel";

const blends = [
  {
    code: "MW-01",
    name: "Psych",
    tag: "TrippyGoodness",
    desc: "Contact For Specs",
    accent: "from-amber to-primary",
  },
  {
    code: "MW-02",
    name: "420MG",
    tag: "Yummy420",
    desc: "Contact For Specs",
    accent: "from-primary to-secondary",
  },
  {
    code: "MW-03",
    name: "Custom Ritual",
    tag: "If it's not listed, we can find it.",
    desc: "Contact For Custom",
    accent: "from-secondary to-accent",
  },
];

export function Blends() {
  return (
    <section id="blends" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="01" label="Featured Blends" />
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Three rituals. <span className="text-primary text-glow">Infinite returns.</span>
        </h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {blends.map((b) => (
            <article
              key={b.code}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-8 transition hover:border-accent/60 hover:shadow-glow-cyan"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-48 opacity-20 transition group-hover:opacity-40"
                style={{
                  backgroundImage: `url(${cyanGrid.url})`,
                  backgroundSize: "cover",
                  filter: "hue-rotate(20deg)",
                  maskImage: "radial-gradient(circle at center, black, transparent 70%)",
                }}
              />
              <p className="font-mono-ui text-xs text-accent">{b.code}.exe</p>
              <h3 className="font-display mt-6 text-3xl font-bold">{b.name}</h3>
              <p
                className={`font-mono-ui mt-1 bg-gradient-to-r ${b.accent} bg-clip-text text-xs uppercase tracking-wider text-transparent`}
              >
                {b.tag}
              </p>
              <p className="mt-6 text-sm text-muted-foreground">{b.desc}</p>
              <a
                href="#contact"
                className="font-mono-ui mt-8 inline-flex items-center gap-2 text-xs uppercase text-foreground transition group-hover:text-accent"
              >
                Add to ritual <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}