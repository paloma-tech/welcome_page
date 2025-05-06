import Contact from "@/components/Contact";
import ScrollUp from "@/components/Common/ScrollUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez Paloma - Solution ERP & PDV Cloud-Optionnelle",
  description: "Prenez contact avec notre équipe et découvrez comment notre solution ERP peut aider à transformer votre entreprise",
  alternates: {
    languages: {
      'en-US': '/en/contact',
      'fr-FR': '/contact',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <ScrollUp />
      <Contact />
    </>
  );
}
