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
  title: "Welcome to Paloma - Cloud-Optional ERP & POS Solution",
  description: "Empower your business with our comprehensive cloud-optional ERP and POS solution",
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