import { HeroSection } from "@/components/landing/HeroSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { StoriesSection } from "@/components/landing/StoriesSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { SDGSection } from "@/components/landing/SDGSection";
import { PartnersSection } from "@/components/landing/PartnersSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ImpactSection />
      <ProgramsSection />
      <StoriesSection />
      <SDGSection />
      <PartnersSection />
      <CallToAction />
    </div>
  );
}