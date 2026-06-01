import { HeroSection } from "@/components/hero/HeroSection";
import { VisionLoadGate } from "@/components/layout/VisionLoadGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { pickRandomShowcase } from "@/lib/showcase";

/** Só o modelo 3D muda a cada refresh — cena e câmera fixas */
export const dynamic = "force-dynamic";

export default function Home() {
  const showcase = pickRandomShowcase();

  return (
    <VisionLoadGate>
      <SiteHeader />
      <main>
        <HeroSection model={showcase} />
        <HighlightsSection />
        <AboutSection />
        <ContactCTA />
      </main>
      <SiteFooter />
    </VisionLoadGate>
  );
}
