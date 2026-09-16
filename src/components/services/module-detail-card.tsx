"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BrainCircuit,
  Contact,
  Package,
  Receipt,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { tintStyles } from "@/components/shared/tint";
import type { ModuleRecord } from "@/services/modules_ops";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Contact,
  BellRing,
  BrainCircuit,
  Package,
  Receipt,
  BarChart3,
  Workflow,
};

export function ModuleDetailCard({ module, index }: { module: ModuleRecord; index: number }) {
  const Icon = iconMap[module.icon] ?? Users;
  const tint = tintStyles[module.color];

  return (
    <motion.div
      id={module.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: (index % 2) * 0.1 }}
      className="scroll-mt-24 flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex size-12 items-center justify-center rounded-xl ${tint.icon}`}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tint.tag}`}>
          {module.tag}
        </span>
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground">{module.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{module.tagline}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{module.description}</p>
      <ul className="flex flex-col gap-2.5">
        {module.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/custom-solutions#request-form"
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Request a demo
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
