"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2019",
    title: "Founded",
    detail: "Started as a two-person software shop building internal tools for local businesses.",
  },
  {
    year: "2021",
    title: "First CRM module shipped",
    detail: "Launched our first prebuilt CRM module, now in its fourth major revision.",
  },
  {
    year: "2023",
    title: "Help desk & custom solutions team",
    detail: "Formalized managed help desk services and the engineering team behind custom builds.",
  },
  {
    year: "2025",
    title: "80+ enterprise clients",
    detail: "Crossed 4 enterprise clients and 10+ module deployments across industries.",
  },
];

export function Timeline() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          Our story
        </h2>

        <ol className="mt-8 flex flex-col gap-6 border-l border-border pl-6">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute top-1 -left-[29px] size-3 rounded-full border-2 border-background bg-primary" />
              <span className="font-[family-name:var(--font-data)] text-xs text-primary">
                {m.year}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {m.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
