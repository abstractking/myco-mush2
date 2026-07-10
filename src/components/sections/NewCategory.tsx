import IMG_7977 from "@/assets/product-cards/IMG_7977.jpeg";
import { SectionLabel } from "./SectionLabel";

export function NewCategory() {
  return (
    <section id="new-category" className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel index="05" label="New category" />
          <h2 className="font-display mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Ancient remedies, <span className="text-accent text-glow-cyan">for the next ritual.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            This new category extends the Myco Wonderland line with the same spirit of craft, intention, and botanical depth. Each blend is designed to feel grounded, elevated, and unmistakably alive.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
            <Stat k="01" v="Fresh category drop" />
            <Stat k="100%" v="Craft-led formula" />
            <Stat k="0" v="Compromise" />
          </dl>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
            style={{ background: "var(--gradient-aura)" }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 shadow-glow-cyan">
            <img
              src={IMG_7977}
              alt="Abstract cyan grid art — neon architectural illusion"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
            <div className="font-mono-ui absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase text-accent/80">
              <span>{"// art-cyan-grid_02"}</span>
              <span>CARE</span>
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
