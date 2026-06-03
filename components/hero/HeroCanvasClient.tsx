"use client";

import dynamic from "next/dynamic";
import type { ShowcaseModel } from "@/lib/showcase";
import { useHeroPointer } from "@/hooks/use-hero-pointer";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useSceneReadySignal } from "@/hooks/use-scene-ready-signal";

const CarHeroCanvas = dynamic(
  () => import("./CarHeroCanvas").then((mod) => mod.CarHeroCanvas),
  { ssr: false },
);

type HeroCanvasClientProps = {
  model: ShowcaseModel;
};

export function HeroCanvasClient({ model }: HeroCanvasClientProps) {
  const isMobile = useIsMobile();
  const onSceneReady = useSceneReadySignal();
  const { pointerRef, onPointerMove, onPointerLeave } = useHeroPointer();

  return (
    <div
      className={`absolute inset-0 ${isMobile ? "touch-pan-y" : "cursor-grab active:cursor-grabbing touch-none"}`}
      onPointerMove={isMobile ? undefined : onPointerMove}
      onPointerLeave={isMobile ? undefined : onPointerLeave}
    >
      <CarHeroCanvas
        model={model}
        pointerRef={pointerRef}
        mouseParallax={!isMobile}
        onSceneReady={onSceneReady}
      />
    </div>
  );
}
