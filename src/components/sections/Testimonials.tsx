import { SectionLabel } from "./SectionLabel";

const quotes = [
  {
    q: "The Lion's Mane is the first nootropic that actually feels like a soft handshake with my brain. No jitters, just signal.",
    a: "Iris K.",
    r: "Designer, Brooklyn",
  },
  {
    q: "Reishi before bed has replaced two glasses of wine. Sleep is deeper, mornings are kinder.",
    a: "Marcus T.",
    r: "Producer, LA",
  },
  {
    q: "Cordyceps got me through a half-marathon without coffee. The packaging alone is worth framing.",
    a: "Anya R.",
    r: "Runner, Berlin",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="05" label="Field reports" />
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Signals from the <span className="text-secondary text-glow">wonderland.</span>
        </h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <figure
              key={t.a}
              className="relative rounded-2xl border border-border/60 bg-card/60 p-8 transition hover:border-primary/60"
            >
              <span aria-hidden className="font-display absolute -top-6 left-6 text-7xl text-primary/30">
                &ldquo;
              </span>
              <blockquote className="relative text-sm leading-relaxed text-foreground/90">
                {t.q}
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4">
                <p className="font-display text-sm font-bold">{t.a}</p>
                <p className="font-mono-ui text-[10px] uppercase text-muted-foreground">
                  {t.r}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}