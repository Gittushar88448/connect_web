import type { Metadata } from "next";

import { ModulesHeader } from "@/components/services/modules-header";
import { ModuleDetailCard } from "@/components/services/module-detail-card";
import { CaseStudiesSection } from "@/components/services/case-studies-section";
import { CustomSolutionsCta } from "@/components/store/custom-solutions-cta";
import { listModules } from "@/services/modules_ops";

export const metadata: Metadata = {
  title: "Prebuilt Modules",
  description:
    "Prebuilt CRM, HR, notification, inventory, billing, analytics, workflow, and AI integration modules from KapsInfos, ready to deploy against your existing stack.",
};

export default async function ModulesPage() {
  const modules = await listModules({ activeOnly: true });

  return (
    <div className="bg-background">
      <ModulesHeader modules={modules} />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {modules.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            No modules published yet — check back soon
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {modules.map((module, i) => (
              <ModuleDetailCard key={module.id} module={module} index={i} />
            ))}
          </div>
        )}
      </div>

      <CaseStudiesSection />
      <CustomSolutionsCta />
    </div>
  );
}
