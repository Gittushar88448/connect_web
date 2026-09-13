"use client";

import { motion } from "framer-motion";
import { Eye, Handshake, Sparkles, Zap } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";

const values: { icon: typeof Zap; label: string; detail: string; tone: Tint }[] = [
  {
    icon: Zap,
    label: "Reliability first",
    detail: "Uptime is a feature we design for, not a metric we report after.",
    tone: "teal",
  },
  {
    icon: Eye,
    label: "Transparency",
    detail: "Clear scopes, honest timelines, no surprise change requests.",
    tone: "amber",
  },
  {
    icon: Sparkles,
    label: "Engineering excellence",
    detail: "Every module is production-tested before it ships, not just demoed.",
    tone: "slate",
  },
  {
    icon: Handshake,
    label: "Partnership",
    detail: "Custom projects get a named engineer, not a rotating support queue.",
    tone: "teal",
  },
];

export function Values() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          What we hold ourselves to
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const tint = tintStyles[value.tone];
            return (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className={`flex size-11 items-center justify-center rounded-full ${tint.icon}`}>
                  <value.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">{value.label}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {value.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
