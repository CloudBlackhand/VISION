import type { ShowcaseModel } from "@/lib/showcase";
import { HeroCanvasClient } from "./HeroCanvasClient";
import { HeroScrollHint } from "./HeroScrollHint";

type HeroSectionProps = {
  model: ShowcaseModel;
};

export function HeroSection({ model }: HeroSectionProps) {
  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      <HeroCanvasClient model={model} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[20%] bg-gradient-to-t from-black via-black/60 to-transparent"
        aria-hidden
      />
      <HeroScrollHint />
    </section>
  );
}
