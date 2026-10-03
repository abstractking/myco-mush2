import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent, PointerEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { getProduct, PRODUCTS } from "@/lib/products";

const BTC_PAYMENT_ADDRESS = "bc1q7jf82z4wqt50gwmueqjalfygkfa3tqxz6elq6r";
const OWNER_EMAIL = "mycowondarland@gmail.com";
const CASHAPP_INSTRUCTIONS =
  "Owner will reply with their $Cashtag. Do not send payment until owner provides the $Cashtag.";
const APPLEPAY_INSTRUCTIONS =
  "Owner will reply with their Apple Pay recipient info. Do not send payment until owner provides it.";
const HOLD_DURATION = 1500;
const DEFAULT_PRODUCT = PRODUCTS.find((product) => product.code === "MW-011") ?? PRODUCTS[0];

type Weight = "oz" | "quarter" | "half" | "pound";
type PaymentMethod = "btc" | "cashapp" | "applepay";
type ShippingSpeed = "standard" | "overnight";
type Carrier = "fedex" | "usps" | "ups";

type TrailGlyph = {
  id: number;
  x: number;
  y: number;
  glyph: string;
  pink: boolean;
  broken: boolean;
};

const searchSchema = z.object({
  item: z.string().optional(),
  weight: z.enum(["oz", "quarter", "half", "pound"]).optional(),
});

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

const SHIPPING_OPTIONS: {
  id: ShippingSpeed;
  title: string;
  timing: string;
  fee: number;
  description: string;
}[] = [
  {
    id: "standard",
    title: "Standard",
    timing: "2–3 days",
    fee: 15,
    description: "Quietly on its way.",
  },
  {
    id: "overnight",
    title: "Overnight",
    timing: "24 hours",
    fee: 25,
    description: "The fast transmission.",
  },
];

const CARRIERS: { id: Carrier; label: string }[] = [
  { id: "fedex", label: "FedEx" },
  { id: "usps", label: "USPS" },
  { id: "ups", label: "UPS" },
];

export const Route = createFileRoute("/cart")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Checkout — Myco Wonderland" },
      { name: "description", content: "Review your order and choose how to pay." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { item, weight } = Route.useSearch();
  const product = useMemo(() => (item ? getProduct(item) : undefined), [item]);
  const selectedProduct = product ?? DEFAULT_PRODUCT;
  const selectedWeight = selectedProduct.prices ? ((weight ?? "oz") as Weight) : undefined;
  const unitPrice =
    selectedProduct.prices && selectedWeight
      ? selectedProduct.prices[selectedWeight]
      : selectedProduct.price;

  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");
  const [buyerBtc, setBuyerBtc] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCarrier, setShippingCarrier] = useState<Carrier>("fedex");
  const [notes, setNotes] = useState("");
  const [strain, setStrain] = useState(STRAIN_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("btc");
  const [shippingSpeed, setShippingSpeed] = useState<ShippingSpeed>("standard");
  const [displayedTotal, setDisplayedTotal] = useState(0);
  const [isRitualFlickering, setIsRitualFlickering] = useState(false);
  const [trail, setTrail] = useState<TrailGlyph[]>([]);
  const [copyStatus, setCopyStatus] = useState<"copied" | "error" | null>(null);
  const [charge, setCharge] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSealed, setIsSealed] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const displayedTotalRef = useRef(0);
  const holdStartedAt = useRef<number | null>(null);
  const holdComplete = useRef(false);
  const chargeFrame = useRef<number | null>(null);
  const lastTrailAt = useRef(0);
  const copyTimeout = useRef<number | null>(null);

  const hasStrainOptions = Boolean(selectedProduct.prices);
  const shippingOption = SHIPPING_OPTIONS.find((option) => option.id === shippingSpeed)!;
  const total = unitPrice * qty + shippingOption.fee;

  const orderSummary = [
    `Subject: New Order ${selectedProduct.code}`,
    ``,
    `Hello Myco Wonderland,`,
    ``,
    `A new order has been submitted.`,
    ``,
    `Order Number: ${selectedProduct.code}`,
    `Payment Method: ${
      paymentMethod === "btc"
        ? "BTC"
        : paymentMethod === "cashapp"
          ? "Cash App (request)"
          : "Apple Pay (request)"
    }`,
    `Product: ${selectedProduct.name}`,
    `Quantity: ${qty}`,
    `Unit Price: $${unitPrice.toFixed(2)}${selectedWeight ? ` (${selectedWeight})` : ""}`,
    `Shipping: ${shippingOption.title} (${shippingOption.timing}) — $${shippingOption.fee}`,
    `Total: $${total.toFixed(2)}`,
    ...(hasStrainOptions ? [`Strain: ${strain}`] : []),
    `Customer Email: ${email || "Not provided"}`,
    `Customer BTC Address: ${paymentMethod === "btc" ? buyerBtc || "Not provided" : "N/A"}`,
    ...(paymentMethod === "btc"
      ? [`Payment To: ${BTC_PAYMENT_ADDRESS}`]
      : paymentMethod === "cashapp"
        ? [`Payment Requested Via: Cash App`, CASHAPP_INSTRUCTIONS]
        : [`Payment Requested Via: Apple Pay`, APPLEPAY_INSTRUCTIONS]),
    `Shipping Address: ${shippingAddress || "Not provided"}`,
    `Shipping Carrier: ${CARRIERS.find((carrier) => carrier.id === shippingCarrier)!.label}`,
    `Notes: ${notes || "None"}`,
    ``,
    `Submitted from: ${typeof window !== "undefined" ? window.location.href : "https://yourwebsite.com"}`,
    ``,
    `-- Website Order System`,
  ].join("\n");

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) {
      displayedTotalRef.current = total;
      setDisplayedTotal(total);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const from = displayedTotalRef.current;
    const duration = 420;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextTotal = from + (total - from) * eased;
      displayedTotalRef.current = nextTotal;
      setDisplayedTotal(nextTotal);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [total]);

  useEffect(() => {
    let flickerTimer = 0;
    let resetTimer = 0;
    let active = true;

    const scheduleFlicker = () => {
      flickerTimer = window.setTimeout(
        () => {
          if (!active) return;
          setIsRitualFlickering(true);
          resetTimer = window.setTimeout(() => setIsRitualFlickering(false), 110);
          scheduleFlicker();
        },
        5000 + Math.random() * 7000,
      );
    };

    scheduleFlicker();
    return () => {
      active = false;
      window.clearTimeout(flickerTimer);
      window.clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch" || performance.now() - lastTrailAt.current < 55) return;
      lastTrailAt.current = performance.now();

      const glyphs = ["0x4F", "01101", "▒░"];
      const glyph: TrailGlyph = {
        id: Math.random(),
        x: event.clientX,
        y: event.clientY,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        pink: Math.random() < 0.14,
        broken: Math.random() < 0.18,
      };
      setTrail((current) => [...current.slice(-15), glyph]);
      window.setTimeout(
        () => setTrail((current) => current.filter((entry) => entry.id !== glyph.id)),
        850,
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(
    () => () => {
      if (chargeFrame.current !== null) cancelAnimationFrame(chargeFrame.current);
      if (copyTimeout.current !== null) window.clearTimeout(copyTimeout.current);
    },
    [],
  );

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!holdComplete.current) return;

    const subjectPrefix =
      paymentMethod === "cashapp"
        ? "[CASHAPP REQUEST] "
        : paymentMethod === "applepay"
          ? "[APPLE PAY REQUEST] "
          : "";
    const subject = `${subjectPrefix}New order // ${selectedProduct.code} — ${selectedProduct.name}`;

    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setIsSealed(true);
    }, 500);
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(orderSummary)}`;
  };

  const copyText = async (text: string) => {
    if (!navigator.clipboard) {
      setCopyStatus("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    if (copyTimeout.current !== null) window.clearTimeout(copyTimeout.current);
    copyTimeout.current = window.setTimeout(() => setCopyStatus(null), 1800);
  };

  const beginCharge = (
    event?: PointerEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (holdStartedAt.current !== null || holdComplete.current || isSealed) return;
    event?.preventDefault();
    holdStartedAt.current = performance.now();
    setIsCharging(true);

    const updateCharge = (now: number) => {
      const startedAt = holdStartedAt.current;
      if (startedAt === null) return;
      const nextCharge = Math.min(((now - startedAt) / HOLD_DURATION) * 100, 100);
      setCharge(nextCharge);

      if (nextCharge >= 100) {
        finishCharge();
        return;
      }
      chargeFrame.current = requestAnimationFrame(updateCharge);
    };
    chargeFrame.current = requestAnimationFrame(updateCharge);
  };

  const finishCharge = () => {
    if (holdStartedAt.current === null || holdComplete.current) return;
    const completed = (performance.now() - holdStartedAt.current) / HOLD_DURATION >= 1;
    if (chargeFrame.current !== null) cancelAnimationFrame(chargeFrame.current);
    chargeFrame.current = null;
    holdStartedAt.current = null;
    setIsCharging(false);

    if (!completed) {
      setCharge(0);
      return;
    }

    setCharge(100);
    if (!formRef.current?.reportValidity()) {
      setCharge(0);
      return;
    }

    holdComplete.current = true;
    formRef.current.requestSubmit();
  };

  const releaseCharge = () => {
    if (holdStartedAt.current === null) return;
    finishCharge();
  };

  const handleChargePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 && event.pointerType !== "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    beginCharge(event);
  };

  const handleChargeKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) beginCharge(event);
  };

  const handleChargeKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") releaseCharge();
  };

  return (
    <div className="checkout-page min-h-svh bg-background text-foreground">
      <header className="checkout-header">
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

      <main className="checkout-main mx-auto max-w-[560px] px-5 pb-36 pt-10 sm:px-6 sm:pt-14">
        <div className="checkout-heading">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-accent text-glow-cyan">
            {"> checkout // transmission"}
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Seal the{" "}
            <span
              className={`checkout-ritual text-primary text-glow ${isRitualFlickering ? "is-flickering" : ""}`}
            >
              ritual.
            </span>
          </h1>
          <nav aria-label="Checkout progress" className="checkout-steps mt-7">
            {["Items", "Ship", "Details", "Pay"].map((step, index) => (
              <div
                key={step}
                className={`checkout-step ${index === 3 ? "is-current" : "is-complete"}`}
                aria-current={index === 3 ? "step" : undefined}
              >
                <span className="checkout-step-number">0{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </nav>
        </div>

        <form id="checkout-form" ref={formRef} onSubmit={submitOrder} className="mt-8 space-y-5">
          <section className="checkout-panel checkout-item-panel" aria-label="Your item">
            <div className="checkout-item-details">
              <p className="checkout-eyebrow text-accent">{selectedProduct.code}</p>
              <h2 className="mt-2 font-display text-xl font-semibold">{selectedProduct.name}</h2>
              <p className="mt-1 font-mono-ui text-[11px] uppercase tracking-wider text-muted-foreground">
                {selectedProduct.tag}
              </p>
              <p className="mt-4 font-mono-ui text-xs text-muted-foreground">
                ${unitPrice.toFixed(2)}
                {selectedWeight ? (
                  <span className="ml-2 text-accent">/ {selectedWeight}</span>
                ) : null}
              </p>
            </div>
            <div className="checkout-quantity" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQty((quantity) => Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <output aria-live="polite" aria-label={`${qty} items`}>
                {qty.toString().padStart(2, "0")}
              </output>
              <button
                type="button"
                onClick={() => setQty((quantity) => Math.min(99, quantity + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </section>

          <section className="checkout-section">
            <SectionHeading number="01" title="Shipping" />
            <div className="mt-4">
              <p className="checkout-eyebrow mb-2">Choose your carrier</p>
              <div className="flex flex-wrap gap-2">
                {CARRIERS.map((carrier) => (
                  <button
                    key={carrier.id}
                    type="button"
                    onClick={() => setShippingCarrier(carrier.id)}
                    aria-pressed={shippingCarrier === carrier.id}
                    className={`checkout-pill ${shippingCarrier === carrier.id ? "is-selected" : ""}`}
                  >
                    {carrier.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              {SHIPPING_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setShippingSpeed(option.id)}
                  aria-pressed={shippingSpeed === option.id}
                  className={`checkout-speed-card ${shippingSpeed === option.id ? "is-selected" : ""}`}
                >
                  <span className="checkout-speed-radio" aria-hidden="true" />
                  <span className="flex-1 text-left">
                    <span className="block font-display text-sm font-semibold">{option.title}</span>
                    <span className="mt-1 block font-mono-ui text-[10px] text-muted-foreground">
                      {option.timing} <span className="mx-1 text-border">/</span>{" "}
                      {option.description}
                    </span>
                  </span>
                  <span className="font-mono-ui text-xs">${option.fee.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="checkout-section">
            <SectionHeading number="02" title="Your details" />
            <div className="mt-4 space-y-4">
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
                placeholder="you@domain.com"
              />
              {paymentMethod === "btc" ? (
                <Field
                  label="BTC wallet"
                  value={buyerBtc}
                  onChange={setBuyerBtc}
                  required
                  placeholder="bc1q..."
                />
              ) : null}
              {hasStrainOptions ? (
                <div className="checkout-field">
                  <label htmlFor="checkout-strain">Strain</label>
                  <select
                    id="checkout-strain"
                    value={strain}
                    onChange={(event) => setStrain(event.target.value)}
                  >
                    {STRAIN_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              <Field
                label="Shipping address"
                value={shippingAddress}
                onChange={setShippingAddress}
                placeholder="123 Neon Lane, City, State"
              />
              <div className="checkout-field">
                <label htmlFor="checkout-notes">Notes</label>
                <textarea
                  id="checkout-notes"
                  rows={2}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Shipping details, special requests..."
                />
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <SectionHeading number="03" title="Payment" />
            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["btc", "BTC"],
                  ["cashapp", "Cash App"],
                  ["applepay", "Apple Pay"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPaymentMethod(id)}
                  aria-pressed={paymentMethod === id}
                  className={`checkout-pill ${paymentMethod === id ? "is-selected" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="checkout-payment-box mt-4" aria-live="polite">
              {paymentMethod === "btc" ? (
                <>
                  <p className="checkout-eyebrow text-primary">{"> send payment to (btc)"}</p>
                  <p className="mt-3 break-all font-mono-ui text-xs leading-relaxed">
                    {BTC_PAYMENT_ADDRESS}
                  </p>
                  <button
                    type="button"
                    onClick={() => void copyText(BTC_PAYMENT_ADDRESS)}
                    className="checkout-copy-button mt-4"
                  >
                    {copyStatus === "copied" ? "Copied ✓" : "Copy address"}
                  </button>
                </>
              ) : (
                <>
                  <p className="checkout-eyebrow text-primary">
                    {paymentMethod === "cashapp" ? "> cash app request" : "> apple pay request"}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-foreground">
                    {paymentMethod === "cashapp" ? CASHAPP_INSTRUCTIONS : APPLEPAY_INSTRUCTIONS}
                  </p>
                  <p className="mt-2 font-mono-ui text-[10px] text-muted-foreground">
                    Owner will reply to {OWNER_EMAIL}
                  </p>
                  <button
                    type="button"
                    onClick={() => void copyText(OWNER_EMAIL)}
                    className="checkout-copy-button mt-4"
                  >
                    {copyStatus === "copied" ? "Copied ✓" : "Copy owner email"}
                  </button>
                </>
              )}
              {copyStatus === "error" ? (
                <p role="status" className="mt-2 text-[10px] text-primary">
                  Clipboard access unavailable. Select and copy the text above.
                </p>
              ) : null}
            </div>
            <p className="mt-3 font-mono-ui text-[9px] leading-relaxed text-muted-foreground">
              {paymentMethod === "btc"
                ? "Your email app opens with your order. Send BTC only to the address above."
                : "Your email app opens with your order. Wait for the owner to provide payment details."}
            </p>
          </section>

          <details className="checkout-review">
            <summary>
              <span>
                <span className="checkout-eyebrow block">04 / Review order</span>
                <span className="mt-1 block text-xs text-muted-foreground">Email preview</span>
              </span>
              <span className="checkout-review-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <pre className="checkout-order-preview">{orderSummary}</pre>
          </details>
        </form>
      </main>

      <div className={`checkout-sticky-bar ${isSealed ? "is-sealed" : ""}`}>
        <div className="checkout-sticky-inner">
          <div className="checkout-total" aria-live="polite">
            <span className="checkout-eyebrow">Total</span>
            <span className="checkout-total-amount">${displayedTotal.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className={`checkout-send-button ${isCharging ? "is-charging" : ""} ${isTransmitting ? "is-transmitting" : ""}`}
            style={{ "--charge": `${charge}%` } as CSSProperties}
            aria-label={
              isSealed
                ? "Transmission sealed"
                : isTransmitting
                  ? "Transmitting order"
                  : isCharging
                    ? `Charging, ${Math.floor(charge)} percent`
                    : "Hold to send transmission"
            }
            onPointerDown={handleChargePointerDown}
            onPointerUp={releaseCharge}
            onPointerCancel={releaseCharge}
            onLostPointerCapture={releaseCharge}
            onKeyDown={handleChargeKeyDown}
            onKeyUp={handleChargeKeyUp}
            onBlur={releaseCharge}
          >
            <span className="checkout-corner checkout-corner-tl" aria-hidden="true" />
            <span className="checkout-corner checkout-corner-tr" aria-hidden="true" />
            <span className="checkout-corner checkout-corner-bl" aria-hidden="true" />
            <span className="checkout-corner checkout-corner-br" aria-hidden="true" />
            <span className="checkout-send-label">
              {isSealed
                ? "> TRANSMISSION SEALED."
                : isTransmitting
                  ? "> TRANSMITTING..."
                  : isCharging
                    ? `> CHARGING... ${Math.floor(charge)}%`
                    : "> SEND TRANSMISSION_"}
            </span>
          </button>
          <span className="checkout-hold-hint">
            {isSealed ? "Order ready in your email app" : "Hold 1.5 sec to send"}
          </span>
        </div>
      </div>

      {isSealed ? (
        <>
          <div className="checkout-success-flash" aria-hidden="true" />
          <div className="checkout-lock-line" aria-hidden="true" />
          <div className="checkout-ripple" aria-hidden="true" />
        </>
      ) : null}

      <div className="checkout-cursor-trail" aria-hidden="true">
        {trail.map((glyph) => (
          <span
            key={glyph.id}
            className={`checkout-trail-glyph ${glyph.pink ? "is-pink" : ""} ${glyph.broken ? "is-broken" : ""}`}
            style={{ left: glyph.x, top: glyph.y }}
          >
            {glyph.glyph}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="checkout-section-heading">
      <span className="checkout-eyebrow">{number}</span>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
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
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = `checkout-${label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <div className="checkout-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
