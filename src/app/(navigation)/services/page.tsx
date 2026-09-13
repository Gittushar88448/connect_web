import type { Metadata } from "next";

import { ServicesHeader } from "@/components/services/services-header";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { CustomSolutionsCta } from "@/components/store/custom-solutions-cta";
import { serviceDomains } from "@/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Connect Hub's software services: custom development, IoT services, help desk services, blockchain development, prebuilt automation modules, and AI integration.",
};

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <ServicesHeader />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 sm:gap-20">
          {serviceDomains.map((service, i) => (
            <ServiceDetailSection key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      <CustomSolutionsCta />
    </div>
  );
}
