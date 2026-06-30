import { lazy, Suspense } from "react";
import sunEye from "@/assets/sun-eye-hero.png";

const HeroScene = lazy(() => import("../HeroScene"));

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-aura)" }}
      />
      <Suspense
        fallback={
          <img
            src={sunEye}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-[28%] -z-0 size-[min(80vw,520px)] -translate-x-1/2 opacity-80"
          />
        }
      >
        <HeroScene />
      </Suspense>
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-end px-6 pb-20 pt-32 text-center md:pb-28">
        <p className="font-mono-ui mb-6 text-xs uppercase text-accent text-glow-cyan">
          {}
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight">
          <span className="block text-foreground"></span>
          <span className="block bg-gradient-to-r from-amber via-primary to-secondary bg-clip-text text-transparent text-glow">
            Otherworldly potent.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          Abstract illusion-inspired blends of functional mushrooms and adaptogenic
          herbs. Lab-tested rituals for focus, calm, immunity, and energy —
          rendered in neon, brewed with care.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#blends"
            className="font-mono-ui rounded-md bg-accent px-6 py-3 text-xs uppercase tracking-wider text-accent-foreground shadow-glow-cyan transition hover:brightness-110"
          >
            Shop the blends
          </a>
          <a
            href="#story"
            className="font-mono-ui rounded-md border border-primary px-6 py-3 text-xs uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-glow"
          >
            Our story
          </a>
        </div>
        <p className="font-mono-ui mt-10 text-[10px] uppercase tracking-widest text-muted-foreground/70">
          scroll · enter the wonderland · ↓
        </p>
      </div>
    </section>
  );
}