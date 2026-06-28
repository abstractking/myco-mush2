import { useState } from "react";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  const [msg, setMsg] = useState("");
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel index="06" label="Open a channel" />
        <h2 className="font-display mt-4 text-4xl font-bold leading-tight md:text-6xl">
          Let&apos;s build your <span className="text-primary text-glow">ritual.</span>
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Wholesale, custom formulations, or just a question. We reply within 24
          hours.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            window.location.href = `mailto:hello@mycowonderland.co?subject=${encodeURIComponent("New transmission")}&body=${encodeURIComponent(String(data.get("msg") ?? ""))}`;
          }}
          className="font-mono-ui mt-12 space-y-6 rounded-2xl border border-border/60 bg-card/60 p-8"
        >
          <Field label="> name:" name="name" />
          <Field label="> email:" name="email" type="email" />
          <div>
            <label className="block text-xs uppercase text-muted-foreground">
              {"> msg:"}
            </label>
            <textarea
              name="msg"
              required
              rows={5}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition focus:border-accent"
            />
            <p className="mt-1 text-[10px] uppercase text-muted-foreground/70">
              chars: {msg.length}
            </p>
          </div>
          <button
            type="submit"
            className="rounded-md bg-accent px-6 py-3 text-xs uppercase tracking-wider text-accent-foreground shadow-glow-cyan transition hover:brightness-110"
          >
            Send transmission
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition focus:border-accent"
      />
    </div>
  );
}