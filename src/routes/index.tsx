import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Products } from "@/components/sections/Products";
import { Blends } from "@/components/sections/Blends";
import { Benefits } from "@/components/sections/Benefits";
import { Ritual } from "@/components/sections/Ritual";
import { Story } from "@/components/sections/Story";
import { NewCategory } from "@/components/sections/NewCategory";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import sunEye from "@/assets/sun-eye-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Myco Wonderland — Functional Mushrooms & Herbal Healing" },
      { name: "description", content: "Abstract-illusion blends of functional mushrooms and adaptogenic herbs. Lab-tested rituals for focus, calm, immunity, and energy." },
      { property: "og:title", content: "Myco Wonderland — Functional Mushrooms & Herbal Healing" },
      { property: "og:description", content: "Lab-tested adaptogenic blends — focus, calm, immunity, energy." },
      { property: "og:image", content: sunEye },
      { name: "twitter:image", content: sunEye },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Blends />
        <Benefits />
        <Ritual />
        <Story />
        <NewCategory />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
