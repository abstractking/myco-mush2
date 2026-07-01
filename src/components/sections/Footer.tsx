export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">
            myco<span className="text-primary">.</span>wonderland
          </p>
          <p className="font-mono-ui mt-1 text-[10px] uppercase text-muted-foreground">
            {"// all-natural · all-seeing"}
          </p>
        </div>
        <p className="font-mono-ui text-[10px] uppercase text-muted-foreground">
          © {new Date().getFullYear()} myco wonderland · crafted with{" "}
          <a href="#" className="text-accent hover:text-glow-cyan">
            Care
          </a>
        </p>
      </div>
    </footer>
  );
}