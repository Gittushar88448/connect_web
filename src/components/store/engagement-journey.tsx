"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Code2, Rocket, Search, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover & Consult",
    detail: "We scope the problem with your team before writing a line of code.",
    tone: "teal" as const,
  },
  {
    icon: Code2,
    title: "Design & Build",
    detail: "Architecture, UI, and backend built against your actual requirements.",
    tone: "amber" as const,
  },
  {
    icon: Rocket,
    title: "Integrate & Deploy",
    detail: "Ships into your existing systems, not a walled-off silo.",
    tone: "teal" as const,
  },
  {
    icon: TrendingUp,
    title: "Support & Scale",
    detail: "We stay on as your engineering partner as usage grows.",
    tone: "amber" as const,
  },
];

const toneClass = {
  teal: "bg-primary text-primary-foreground",
  amber: "bg-brand-amber text-white",
};

export function EngagementJourney() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
            How we work with you
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From first conversation to production, one team the whole way.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center sm:contents">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.12 }}
                className="flex w-40 flex-col items-center gap-3 text-center"
              >
                <span
                  className={`flex size-16 items-center justify-center rounded-full ${toneClass[step.tone]}`}
                >
                  <step.icon className="size-7" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-foreground">{step.title}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {step.detail}
                </span>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
                  className="my-2 text-muted-foreground/40 sm:mt-8 sm:mb-0 sm:self-center"
                >
                  <ArrowDown className="size-5 sm:hidden" aria-hidden="true" />
                  <ArrowRight className="hidden size-5 sm:block" aria-hidden="true" />
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
