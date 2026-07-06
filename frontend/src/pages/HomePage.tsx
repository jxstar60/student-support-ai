import { AnnouncementsSection } from "../components/landing/AnnouncementsSection";
import { FaqSection } from "../components/landing/FaqSection";
import { FeatureGrid } from "../components/landing/FeatureGrid";
import { HeroSection } from "../components/landing/HeroSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <AnnouncementsSection />
      <FaqSection />
    </>
  );
}
