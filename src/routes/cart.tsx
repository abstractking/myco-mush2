import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { getProduct, PRODUCTS } from "@/lib/products";

// TODO: replace with real values when ready.
const BTC_PAYMENT_ADDRESS = "REPLACE_WITH_OWNER_BTC_ADDRESS";
const OWNER_EMAIL = "owner@example.com";

type Weight = "oz" | "quarter" | "half" | "pound";

const searchSchema = z.object({
  item: z.string().optional(),
  weight: z.enum(["oz", "quarter", "half", "pound"]).optional(),
});

// Replace these placeholder names with the 14 MW-010 strains when ready.
const STRAIN_OPTIONS = [
  "Jack Frost",
  "P.E",
  "Hillbilly",
  "Gourmet",
  "A.P.E",
  "Golden Teacher",
  "Blue Meanie",
  "Cubensis",
  "B+",
  "Devil's Cap",
  "Trinity Caps",
  "Mazatepecs",
  "Bluey Vuitton",
  "Yeti",
 ];
export const Route = createFileRoute("/cart")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Cart — Myco Wonderland" },
      { name: "description", content: "Review your order and pay in BTC." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { item, weight } = Route.useSearch();
  const product = useMemo(() => (item ? getProduct(item) : undefined), [item]);
  const selectedProduct = product ?? PRODUCTS[0];
  const selectedWeight = selectedProduct.prices ? ((weight ?? "oz") as Weight) : undefined;
  const unitPrice = selectedProduct.prices && selectedWeight ? selectedProduct.prices[selectedWeight] : selectedProduct.price;

  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");
  const [buyerBtc, setBuyerBtc] = useState("");
  const [notes, setNotes] = useState("");
  const [strain, setStrain] = useState(STRAIN_OPTIONS[0]);
  const hasStrainOptions = Boolean(selectedProduct.prices);

  const total = (unitPrice * qty).toFixed(2);

  const orderSummary = [
    `Order: ${selectedProduct.code} — ${selectedProduct.name}`,
    `Qty: ${qty}`,
    `Unit: $${unitPrice.toFixed(2)}${selectedWeight ? ` (${selectedWeight})` : ""}`,
    `Total: $${total}`,
    ...(hasStrainOptions ? [`Strain: ${strain}`] : []),
    ``,
    `Customer email: ${email}`,
    `Customer BTC (tracking): ${buyerBtc}`,
    ``,
    `Payment to: ${BTC_PAYMENT_ADDRESS}`,
    ``,
    `Notes:`,
    notes,
  ].join("\n");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `New order // ${selectedProduct.code} — ${selectedProduct.name}`;
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(orderSummary)}`;
  };

  const copy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-lg font-bold">
            myco<span className="text-primary">.</span>wonderland
          </Link>
          <Link
            to="/"
            className="font-mono-ui text-xs uppercase text-muted-foreground transition hover:text-accent"
          >
            ← back to vault
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-mono-ui text-xs uppercase text-accent text-glow-cyan">
          {"> checkout // transmission"}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold md:text-6xl">
          Seal the <span className="text-primary text-glow">ritual.</span>
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.1fr]">
          {/* Order summary */}
          <aside className="space-y-6 rounded-2xl border border-border/60 bg-card/60 p-6">
            <div>
              <p className="font-mono-ui text-[10px] uppercase text-accent">{selectedProduct.code}</p>
              <h2 className="font-display mt-2 text-2xl font-bold">{selectedProduct.name}</h2>
              <p className="font-mono-ui mt-1 text-[11px] uppercase text-muted-foreground">
                // {selectedProduct.tag}
              </p>
            </div>

            <div className="flex items-center justify-between border-y border-border/60 py-4">
              <span className="font-mono-ui text-xs uppercase text-muted-foreground">qty</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="font-mono-ui size-8 rounded border border-border hover:border-accent hover:text-accent"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="font-mono-ui w-6 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="font-mono-ui size-8 rounded border border-border hover:border-accent hover:text-accent"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <span className="font-mono-ui text-xs uppercase text-muted-foreground">total</span>
              <span className="font-display text-3xl font-bold text-glow-cyan">${total}</span>
            </div>

            <div className="space-y-2 rounded-lg border border-primary/40 bg-primary/5 p-4">
              <p className="font-mono-ui text-[10px] uppercase text-primary">
                {"> send payment to (btc)"}
              </p>
              <p className="break-all font-mono text-[11px] leading-relaxed text-foreground">
                {BTC_PAYMENT_ADDRESS}
              </p>
              <button
                type="button"
                onClick={() => copy(BTC_PAYMENT_ADDRESS)}
                className="font-mono-ui text-[10px] uppercase text-accent hover:text-glow-cyan"
              >
                copy address ↗
              </button>
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="font-mono-ui space-y-5 rounded-2xl border border-border/60 bg-card/60 p-6"
          >
            <Field
              label="> your email:"
              type="email"
              value={email}
              onChange={setEmail}
              required
              placeholder="you@domain.com"
            />

            <Field
              label="> your btc wallet (for owner to track):"
              value={buyerBtc}
              onChange={setBuyerBtc}
              required
              placeholder="bc1q..."
            />

            {hasStrainOptions ? (
              <div>
                <label className="block text-xs uppercase text-muted-foreground">
                  {"> strain:"}
                </label>
                <select
                  value={strain}
                  onChange={(e) => setStrain(e.target.value)}
                  className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition focus:border-accent"
                >
                  {STRAIN_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <div>
              <label className="block text-xs uppercase text-muted-foreground">
                {"> notes:"}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="shipping, special requests..."
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <p className="text-[10px] uppercase text-muted-foreground">
                {"> order preview (auto-sent to owner):"}
              </p>
              <pre className="mt-2 max-h-48 overflow-auto rounded-md border border-border/60 bg-background/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
{orderSummary}
              </pre>
            </div>

            <button
              type="submit"
              data-text="send transmission"
              className="glitch-btn w-full text-xs"
            >
              send transmission
            </button>

            <p className="text-[10px] uppercase text-muted-foreground/70">
              opens your email client with the order pre-filled. send payment to the btc address shown left.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition focus:border-accent"
      />
    </div>
  );
}