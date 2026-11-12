import { FeatureHighlights } from "./FeatureHighlights";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden overflow-y-auto">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-content md:w-[calc(100%-4rem)] overflow-auto">
        <Header />
        <HeroSection />
        <FeatureHighlights />
        {/* <TrustedTools /> */}
      </div>
    </main>
  );
}
