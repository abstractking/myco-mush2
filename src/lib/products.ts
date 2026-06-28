import IMG_7962 from "@/assets/product-cards/IMG_7962.jpeg";
import IMG_7963 from "@/assets/product-cards/IMG_7963.jpeg";
import IMG_7964 from "@/assets/product-cards/IMG_7964.jpeg";
import IMG_7965 from "@/assets/product-cards/IMG_7965.jpeg";
import IMG_7967 from "@/assets/product-cards/IMG_7967.jpeg";
import IMG_7967_1 from "@/assets/product-cards/IMG_7967_1.jpeg";
import IMG_7968 from "@/assets/product-cards/IMG_7968.jpeg";
import IMG_7969 from "@/assets/product-cards/IMG_7969.jpeg";
import IMG_7969_1 from "@/assets/product-cards/IMG_7969_1.jpeg";
import IMG_7970 from "@/assets/product-cards/IMG_7970.jpeg";
import IMG_7970_1 from "@/assets/product-cards/IMG_7970_1.jpeg";
import IMG_7971 from "@/assets/product-cards/IMG_7971.jpeg";
import IMG_7971_1 from "@/assets/product-cards/IMG_7971_1.jpeg";
import IMG_7972 from "@/assets/product-cards/IMG_7972.jpeg";
import IMG_7973 from "@/assets/product-cards/IMG_7973.jpeg";
import IMG_7974 from "@/assets/product-cards/IMG_7974.jpeg";
import IMG_7975 from "@/assets/product-cards/IMG_7975.jpeg";
import IMG_7976 from "@/assets/product-cards/IMG_7976.jpeg";
import IMG_7977 from "@/assets/product-cards/IMG_7977.jpeg";
import IMG_7978 from "@/assets/product-cards/IMG_7978.jpeg";

export type Product = {
  id: string;
  code: string;
  name: string;
  tag: string;
  price: number;
  image: string;
};

const PRODUCT_IMAGES = [
  IMG_7962,
  IMG_7963,
  IMG_7964,
  IMG_7965,
  IMG_7967,
  IMG_7967_1,
  IMG_7968,
  IMG_7969,
  IMG_7969_1,
  IMG_7970,
  IMG_7970_1,
  IMG_7971,
  IMG_7971_1,
  IMG_7972,
  IMG_7973,
  IMG_7974,
  IMG_7975,
  IMG_7976,
  IMG_7977,
  IMG_7978,
];

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