import WelcomeHero from "@/components/Welcome/WelcomeHero";
import WelcomeFeatures from "@/components/Welcome/WelcomeFeatures";
import WelcomeERPSolutions from "@/components/Welcome/WelcomeERPSolutions";
import WhyChooseUs from "@/components/Welcome/WhyChooseUs";
import AboutSection from "@/components/Welcome/AboutSection";
import ScreenshotsSection from "@/components/Welcome/ScreenshotsSection";
import CallToAction from "@/components/Welcome/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bienvenue chez Paloma - Solution ERP & PDV Cloud-Optionnelle",
  description: "Optimisez votre entreprise avec notre solution ERP et PDV cloud-optionnelle complète",
  alternates: {
    languages: {
      'en-US': '/en/welcome',
      'fr-FR': '/welcome',
    },
  },
};

export default function WelcomePage() {
  return (
    <>
      <ScrollUp />
      <WelcomeHero />
      <WelcomeFeatures />
      <AboutSection />
      <WelcomeERPSolutions />
      <ScreenshotsSection />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}