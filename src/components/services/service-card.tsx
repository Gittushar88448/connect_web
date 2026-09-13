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

export function ServiceCard({ service }: { service: ServiceDomain }) {
  const Icon = iconMap[service.icon] ?? Code2;
  const tint = tintStyles[service.color];
  const href = service.href ?? `/services#${service.slug}`;
  const ctaLabel = service.href ? "Explore" : "Request a quote";

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
          {service.tag}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {service.capabilities.slice(0, 2).map((cap) => (
          <li key={cap} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="leading-relaxed">{cap}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {ctaLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
