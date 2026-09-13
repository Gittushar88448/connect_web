import { CaseStudyCard } from "@/components/services/case-study-card";
import { caseStudies } from "@/constants/case-studies";

export function CaseStudiesSection() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            Real-world impact
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
            What these modules actually do for clients
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Three deployments, in the clients&apos; own numbers.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
