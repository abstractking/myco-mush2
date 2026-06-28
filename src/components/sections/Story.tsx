import cyanGrid from "@/assets/cyan-grid.png.asset.json";
import { SectionLabel } from "./SectionLabel";

export function Story() {
  return (
    <section id="story" className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel index="04" label="Our story" />
          <h2 className="font-display mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Ancient remedies, <span className="text-accent text-glow-cyan">rendered for now.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Myco Wonderland is a small studio of herbalists, artists, and lab
            geeks formulating adaptogenic blends from wild-harvested mushrooms
            and time-honored herbs. Every batch is third-party tested. Every
            label is hand-illustrated. Everything we ship is meant to feel like
            a piece of art — and work like a piece of medicine.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
            <Stat k="07" v="Single-origin fungi" />
            <Stat k="100%" v="Third-party tested" />
            <Stat k="0" v="Fillers, ever" />
          </dl>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
            style={{ background: "var(--gradient-aura)" }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 shadow-glow-cyan">
            <img
              src={cyanGrid.url}
              alt="Abstract cyan grid art — neon architectural illusion"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
            <div className="font-mono-ui absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase text-accent/80">
              <span>{"// art-cyan-grid_01"}</span>
              <span>amstudios.digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-display text-3xl font-extrabold text-primary text-glow">
        {k}
      </dt>
      <dd className="font-mono-ui mt-1 text-[10px] uppercase text-muted-foreground">
        {v}
      </dd>
    </div>
  );
}