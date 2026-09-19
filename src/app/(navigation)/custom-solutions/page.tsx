import type { Metadata } from "next";

import { SolutionsHero } from "@/components/custom-solutions/solutions-hero";
import { SolutionCategories } from "@/components/custom-solutions/solution-categories";
import { HowItWorks } from "@/components/custom-solutions/how-it-works";
import { EnterpriseStrip } from "@/components/custom-solutions/enterprise-strip";
import { TechCapabilities } from "@/components/custom-solutions/tech-capabilities";
import { RequestForm } from "@/components/custom-solutions/request-form";

export const metadata: Metadata = {
  title: "Custom software Solutions",
  description:
    "Request a custom IoT hardware or software solution from Connect Hub's engineering team.",
};

export default function CustomSolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionCategories />
      <HowItWorks />
      <EnterpriseStrip />
      <TechCapabilities />

      <section id="request-form" className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
              Tell us about your project
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The more detail you share, the faster we can scope it.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
