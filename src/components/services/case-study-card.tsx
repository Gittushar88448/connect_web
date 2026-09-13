"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { CaseStudy } from "@/constants/case-studies";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Users,
  Receipt,
};

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const Icon = iconMap[study.icon] ?? Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="bg-signal-grid relative bg-brand-graphite px-6 py-6 text-white">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]" />
        <span className="relative flex size-9 items-center justify-center rounded-full bg-brand-signal-bright/15 text-brand-signal-bright">
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
        <span className="relative mt-3 block text-[11px] font-semibold tracking-wide text-brand-signal-bright uppercase">
          {study.category}
        </span>
        <h3 className="relative mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
          {study.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-4 bg-card p-6">
        <div>
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Challenge
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{study.challenge}</p>
        </div>
        <div>
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Solution
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{study.solution}</p>
        </div>
        <div>
          <span className="text-[11px] font-semibold tracking-wide text-primary uppercase">
            Results
          </span>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {study.results.map((result) => (
              <li key={result} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
