import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { Mission } from "@/components/about/mission";
import { Values } from "@/components/about/values";
import { Timeline } from "@/components/about/timeline";
import { Leadership } from "@/components/about/leadership";
import { SecuritySection } from "@/components/about/security-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kapsinfos Technology is a software and technology company focused on helping businesses build, modernize, and scale their digital operations.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <Values />
      <Timeline />
      <Leadership />
      <SecuritySection />
    </>
  );
}
