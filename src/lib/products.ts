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

export type PriceBreakdown = {
  oz: number;
  quarter: number;
  half: number;
  pound: number;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  tag: string;
  price: number;
  prices?: PriceBreakdown;
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

export const PRODUCTS: Product[] = [
  {
    id: "MW-010",
    code: "MW-010",
    name: "Shrmmz",
    tag: "focus",
    price: 42.5,
    prices: { oz: 150, quarter: 350, half: 500, pound: 870 },
    image: IMG_7962,
  },
  {
    id: "MW-011",
    code: "MW-011",
    name: "DreamMayTrust",
    tag: "clarity",
    price: 48.0,
    image: IMG_7964,
  },
  {
    id: "MW-012",
    code: "MW-012",
    name: "Astral Tonic",
    tag: "energy",
    price: 39.75,
    image: IMG_7968,
  },
  {
    id: "MW-013",
    code: "MW-013",
    name: "Void Dust",
    tag: "calm",
    price: 44.9,
    image: IMG_7969,
  },
  {
    id: "MW-014",
    code: "MW-014",
    name: "Lucid Crown",
    tag: "sleep",
    price: 52.0,
    image: IMG_7967,
  },
  {
    id: "MW-015",
    code: "MW-015",
    name: "Solar Resin",
    tag: "immunity",
    price: 46.25,
    image: IMG_7967_1,
  },
  {
    id: "MW-016",
    code: "MW-016",
    name: "Ember Spire",
    tag: "focus",
    price: 41.5,
    image: IMG_7968,
  },
  {
    id: "MW-017",
    code: "MW-017",
    name: "Glyph Mist",
    tag: "clarity",
    price: 38.99,
    image: IMG_7969,
  },
  {
    id: "MW-018",
    code: "MW-018",
    name: "Mycel Shroud",
    tag: "calm",
    price: 54.0,
    image: IMG_7972,
  },
  {
    id: "MW-019",
    code: "MW-019",
    name: "Wraith Husk",
    tag: "sleep",
    price: 47.75,
    image: IMG_7973,
  },
  {
    id: "MW-020",
    code: "MW-020",
    name: "Echo Brew",
    tag: "energy",
    price: 49.5,
    image: IMG_7970_1,
  },
  {
    id: "MW-021",
    code: "MW-021",
    name: "Hollow Cap",
    tag: "immunity",
    price: 43.25,
    image: IMG_7971,
  },
  {
    id: "MW-022",
    code: "MW-022",
    name: "Prism Mist",
    tag: "clarity",
    price: 45.0,
    image: IMG_7971_1,
  },
  {
    id: "MW-023",
    code: "MW-023",
    name: "Static Bloom",
    tag: "focus",
    price: 40.75,
    image: IMG_7972,
  },
  {
    id: "MW-024",
    code: "MW-024",
    name: "Drift Veil",
    tag: "calm",
    price: 55.0,
    image: IMG_7976,
  },
  {
    id: "MW-025",
    code: "MW-025",
    name: "Vapor Tonic",
    tag: "sleep",
    price: 44.2,
    image: IMG_7977,
  },
  {
    id: "MW-026",
    code: "MW-026",
    name: "Halo Dust",
    tag: "energy",
    price: 51.0,
    image: IMG_7975,
  },
  {
    id: "MW-027",
    code: "MW-027",
    name: "Ritual Crown",
    tag: "immunity",
    price: 47.9,
    image: IMG_7976,
  },
  {
    id: "MW-028",
    code: "MW-028",
    name: "Oracle Resin",
    tag: "clarity",
    price: 42.8,
    image: IMG_7977,
  },
  {
    id: "MW-029",
    code: "MW-029",
    name: "Cosmic Shroud",
    tag: "focus",
    price: 53.6,
    image: IMG_7978,
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
