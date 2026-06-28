export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="font-mono-ui flex items-center gap-3 text-xs uppercase text-muted-foreground">
      <span className="text-accent">{">"}</span>
      <span className="text-primary">{index}</span>
      <span className="h-px w-12 bg-border" />
      {label}
    </p>
  );
}