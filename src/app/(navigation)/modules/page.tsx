import type { Metadata } from "next";

import { ModulesHeader } from "@/components/services/modules-header";
import { ModuleDetailCard } from "@/components/services/module-detail-card";
import { CaseStudiesSection } from "@/components/services/case-studies-section";
import { CustomSolutionsCta } from "@/components/store/custom-solutions-cta";
import { modules } from "@/constants/services";

export const metadata: Metadata = {
  title: "Prebuilt Modules",
  description:
    "Prebuilt CRM, HR, notification, inventory, billing, analytics, workflow, and AI integration modules from Connect Hub, ready to deploy against your existing stack.",
};

export default function ModulesPage() {
  return (
    <div className="bg-background">
      <ModulesHeader />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {modules.map((module, i) => (
            <ModuleDetailCard key={module.id} module={module} index={i} />
          ))}
        </div>
      </div>

      <CaseStudiesSection />
      <CustomSolutionsCta />
    </div>
  );
}
