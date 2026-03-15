import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhatItDoesSection from "@/components/WhatItDoesSection";
import BentoGrid from "@/components/BentoGrid";
import NetworkTopology from "@/components/NetworkTopology";
import KarmaFlowSection from "@/components/KarmaFlowSection";
import DemoSection from "@/components/DemoSection";
import PhasesSection from "@/components/PhasesSection";
import TestimonialSection from "@/components/TestimonialSection";
import MoatSection from "@/components/MoatSection";
import ResearchSection from "@/components/ResearchSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen mosaic-bg">
      <Navigation />
      <HeroSection />
      <DemoSection />
      <WhatItDoesSection />
      <BentoGrid />
      <NetworkTopology />
      <KarmaFlowSection />
      <PhasesSection />
      <TestimonialSection />
      <MoatSection />
      <ResearchSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
