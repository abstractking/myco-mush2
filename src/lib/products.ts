export type Product = {
  id: string;
  code: string;
  name: string;
  tag: string;
  price: number;
  image: string;
};

const PRODUCT_IMAGE_FILES = [
  "IMG_7962.jpeg",
  "IMG_7963.jpeg",
  "IMG_7964.jpeg",
  "IMG_7965.jpeg",
  "IMG_7967.jpeg",
  "IMG_7967_1.jpeg",
  "IMG_7968.jpeg",
  "IMG_7969.jpeg",
  "IMG_7969_1.jpeg",
  "IMG_7970.jpeg",
  "IMG_7970_1.jpeg",
  "IMG_7971.jpeg",
  "IMG_7971_1.jpeg",
  "IMG_7972.jpeg",
  "IMG_7973.jpeg",
  "IMG_7974.jpeg",
  "IMG_7975.jpeg",
  "IMG_7976.jpeg",
  "IMG_7977.jpeg",
  "IMG_7978.jpeg",
];

const PRODUCT_IMAGES = PRODUCT_IMAGE_FILES.map((filename) =>
  new URL(`../assets/product-cards/${filename}`, import.meta.url).href,
);

const prefixes = [
  "Spore", "Neon", "Astral", "Void", "Lucid", "Solar", "Ember", "Glyph",
  "Mycel", "Wraith", "Echo", "Hollow", "Prism", "Static", "Drift", "Vapor",
  "Halo", "Ritual", "Oracle", "Cosmic",
];
const suffixes = [
  "Bloom", "Cap", "Veil", "Tonic", "Elixir", "Brew", "Dust", "Resin",
  "Mist", "Spire", "Lattice", "Husk", "Fang", "Crown", "Ember", "Shroud",
];
const tags = [
  "focus", "calm", "immunity", "energy", "sleep", "clarity", "stamina", "lucid",
];

// Deterministic pseudo-random so SSR + client match.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PRODUCTS: Product[] = (() => {
  const rnd = mulberry32(42);
  const list: Product[] = [];
  for (let i = 0; i < 32; i++) {
    const p = prefixes[Math.floor(rnd() * prefixes.length)];
    const s = suffixes[Math.floor(rnd() * suffixes.length)];
    const t = tags[Math.floor(rnd() * tags.length)];
    const price = Math.round((12 + rnd() * 88) * 100) / 100;
    list.push({
      id: `MW-${String(i + 10).padStart(3, "0")}`,
      code: `MW-${String(i + 10).padStart(3, "0")}`,
      name: `${p} ${s}`,
      tag: t,
      price,
      image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
    });
  }
  return list;
})();

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}