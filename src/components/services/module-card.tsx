"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BrainCircuit,
  Check,
  Contact,
  Package,
  Receipt,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { tintStyles } from "@/components/shared/tint";
import type { SoftwareModule } from "@/types/service";

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

export function ModuleCard({ module }: { module: SoftwareModule }) {
  const Icon = iconMap[module.icon] ?? Users;
  const tint = tintStyles[module.color];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex size-11 items-center justify-center rounded-full ${tint.icon}`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tint.tag}`}>
          {module.tag}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{module.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {module.tagline}
        </p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {module.features.slice(0, 2).map((feature) => (
          <li key={feature} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/custom-solutions#request-form"
        className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Request a demo
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
