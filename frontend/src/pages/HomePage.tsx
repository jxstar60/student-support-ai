import { AnnouncementsSection } from "../components/landing/AnnouncementsSection";
import { FaqSection } from "../components/landing/FaqSection";
import { FeatureGrid } from "../components/landing/FeatureGrid";
import { HeroSection } from "../components/landing/HeroSection";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <HeroSection />
        <FeatureGrid />
        <AnnouncementsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
