import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paloma - Cloud-Based ERP & POS Solution",
  description: "Empower your business with our comprehensive cloud-based ERP and POS solution",
};

export default function Home() {
  // Redirect to the welcome page
  redirect("/welcome");
  
  // This won't be reached due to the redirect
  return null;
}
