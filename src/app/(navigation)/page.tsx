import { Hero } from "@/components/store/hero";
import { StatusBar } from "@/components/store/status-bar";
import { ServicesRail } from "@/components/store/services-rail";
import { EngagementJourney } from "@/components/store/engagement-journey";
import { ModulesShowcase } from "@/components/store/modules-showcase";
import { WhyConnectHub } from "@/components/store/why-connect-hub";
import { CustomSolutionsCta } from "@/components/store/custom-solutions-cta";
import { Testimonials } from "@/components/store/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatusBar />
      <ServicesRail />
      <EngagementJourney />
      <ModulesShowcase />
      <WhyConnectHub />
      <CustomSolutionsCta />
      <Testimonials />
    </>
  );
}
