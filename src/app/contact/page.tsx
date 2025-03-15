import Contact from "@/components/Contact";
import ScrollUp from "@/components/Common/ScrollUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Paloma - Cloud-Based ERP & POS Solution",
  description: "Get in touch with our team and learn how our ERP solution can help transform your business",
};

export default function ContactPage() {
  return (
    <>
      <ScrollUp />
      <Contact />
    </>
  );
}
