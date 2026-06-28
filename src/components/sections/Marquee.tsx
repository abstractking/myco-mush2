const items = [
  "Lab-tested",
  "Organic",
  "Vegan",
  "Third-party verified",
  "Wild-harvested",
  "Small batch",
  "No fillers",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section
      aria-label="Quality promises"
      className="border-y border-border/60 bg-card/40 py-5"
    >
      <div className="relative flex overflow-hidden">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1 ? "true" : undefined}
            className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-12 pr-12"
          >
            {row.map((t, i) => (
              <span
                key={i}
                className="font-mono-ui flex items-center gap-3 whitespace-nowrap text-xs uppercase text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-100%) } }`}</style>
    </section>
  );
}