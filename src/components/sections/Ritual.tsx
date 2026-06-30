import { SectionLabel } from "./SectionLabel";

const steps = [
  {
    n: "01",
    h: "Choose your Calduron",
    p: "Pick with intention.",
  },
  {
    n: "02",
    h: "Brew the ritual",
    p: "Load Up Your Bag!",
  },
  {
    n: "03",
    h: "Send your signal",
    p: "Await, your order & compound!",
  },
];

export function Ritual() {
  return (
    <section id="ritual" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="03" label="How to use" />
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          A three-step <span className="text-primary text-glow">ReUp ritual.</span>
        </h2>
        <ol className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="font-display flex items-baseline gap-3 text-7xl font-extrabold leading-none">
                <span className="text-accent">{">"}</span>
                <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                  {s.n}
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-bold">{s.h}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.p}</p>
              {i < steps.length - 1 && (
                <span className="font-mono-ui pointer-events-none absolute right-0 top-8 hidden text-xs uppercase text-muted-foreground/40 md:block">
                  next →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}