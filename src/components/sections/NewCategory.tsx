import PHOTO_5080097222363385511_y from "@/assets/product-cards/photo_5080097222363385511_y.jpg";
import { SectionLabel } from "./SectionLabel";

export function NewCategory() {
  return (
    <section id="new-category" className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel index="05" label="New category" />
          <h2 className="font-display mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Ancient remedies, <span className="text-accent text-glow-cyan">for the next ritual.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Step by step directions for Myco Wonderland All in ones.
1. Sanitize: Put on the gloves and wipe down the injection port with the included 70% alcohol pads found in the sticker bag pack.
2. Inject Spores: Take the spore syringe from the kit and inject it into the port. For best results, do this in a still air box or in front of a laminar flow hood. (If you don’t have one, simply perform the injection in a low-airflow room, moving quickly to minimize contamination risks.)
3. Storage: Place the grow bag in a clean, room-temperature spot (between 69–74 degrees for best results) after spores have been injected.
4. Mycelium Growth: In 1–3 weeks, you will begin to start seeing white mycelium spreading through the grains. No discoloration should appear; this would indicate contamination.
5. Break and Shake: Once the grains are 50% colonized with white mycelium, gently mix the grains with the substrate on top. Be careful not to open or puncture the bag. This break-and-shake method will speed up the colonization process dramatically.
6. Return the bag back to its original spot where you had it before the break and shake, and continue to let the mycelium colonize for a few weeks.
7. After a few weeks have gone by and your mycelium has fully taken over the block, you can slice a hole underneath the filter patch, fan fresh air into the bag, and then cover the hole back up with micropore tape. This helps promote fruiting conditions and allows more fresh air exchange (FAE) for your fungi to grow. Although this step is optional, it is highly recommended. Also, you can place a rubber band around the block to help prevent side pinning (about a half inch below surface level to help maintain even growth on the surface of the block). Use the rubber band that came with your package.
8. Let mushrooms grow. Harvest your yield by cutting the bottom of the stipe’s. When stipe’s begin to soften/veils burst, its time to dehydrate.
9. Go for a 2nd flush. Submerge your all-in-one block in water for 24 hours. Remove the block after 24 hours from the water and place it back into the grow bag or a monotub for a 2nd fruiting. Be patient and allow your mushrooms to grow back again over the next few weeks. Repeat this for a 3rd flush if necessary.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
            <Stat k="01" v="Fresh category drop" />
            <Stat k="100%" v="Craft-led formula" />
            <Stat k="0" v="Compromise" />
          </dl>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
            style={{ background: "var(--gradient-aura)" }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 shadow-glow-cyan">
            <img
              src={PHOTO_5080097222363385511_y}
              alt="Abstract cyan grid art — neon architectural illusion"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
            <div className="font-mono-ui absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase text-accent/80">
              <span>{"// art-cyan-grid_02"}</span>
              <span>CARE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-display text-3xl font-extrabold text-primary text-glow">
        {k}
      </dt>
      <dd className="font-mono-ui mt-1 text-[10px] uppercase text-muted-foreground">
        {v}
      </dd>
    </div>
  );
}
