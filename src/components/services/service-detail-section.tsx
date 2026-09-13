"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Check,
  Code2,
  Headset,
  Link2,
  Radio,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { tintStyles } from "@/components/shared/tint";
import type { ServiceDomain } from "@/types/service";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Radio,
  Headset,
  Blocks,
  Sparkles,
  Wrench,
  Link2,
};

const panelTint = {
  teal: "bg-primary/5",
  amber: "bg-brand-amber/5",
  slate: "bg-secondary/60",
} as const;

export function ServiceDetailSection({
  service,
  index,
}: {
  service: ServiceDomain;
  index: number;
}) {
  const Icon = iconMap[service.icon] ?? Code2;
  const tint = tintStyles[service.color];
  const ctaHref = service.href ?? "/custom-solutions#request-form";
  const ctaLabel = service.href ? "Explore" : "Request a quote";
  const reversed = index % 2 === 1;

  return (
    <motion.section
      id={service.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center"
    >
      <div className={reversed ? "lg:order-2" : undefined}>
        <span className="font-[family-name:var(--font-data)] text-3xl font-semibold text-muted-foreground/20">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="mt-2 flex items-center gap-3">
          <span className={`flex size-12 items-center justify-center rounded-xl ${tint.icon}`}>
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tint.tag}`}>
            {service.tag}
          </span>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground sm:text-2xl">
          {service.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.description}
        </p>
        <Link
          href={ctaHref}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div
        className={`${reversed ? "lg:order-1 " : ""}rounded-2xl border border-border/60 ${panelTint[service.color]} p-6`}
      >
        <ul className="flex flex-col gap-3.5">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${tint.icon}`}>
                <Check className="size-3" aria-hidden="true" />
              </span>
              {cap}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
