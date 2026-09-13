"use client";

import { motion } from "framer-motion";
import { Cloud, Cpu, Plug, ShieldCheck } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";

const capabilities: { icon: typeof Plug; label: string; detail: string; tag: string; tone: Tint }[] = [
  {
    icon: Plug,
    label: "Integrations",
    detail: "REST/GraphQL APIs, webhooks, and connectors for your existing CRM or ERP.",
    tag: "API-first",
    tone: "teal",
  },
  {
    icon: Cpu,
    label: "Backend engineering",
    detail: "Node, Python, and Java stacks, built for the load your system actually sees.",
    tag: "Battle-tested stacks",
    tone: "amber",
  },
  {
    icon: Cloud,
    label: "Cloud & apps",
    detail: "Dashboards, mobile apps, and cloud infrastructure on AWS, Azure, or GCP.",
    tag: "Any cloud",
    tone: "slate",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    detail: "Encrypted data in transit and at rest, with role-based access by default.",
    tag: "Secure by default",
    tone: "teal",
  },
];

export function TechCapabilities() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          Engineering capabilities
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const tint = tintStyles[cap.tone];
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex size-11 items-center justify-center rounded-full ${tint.icon}`}>
                    <cap.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tint.tag}`}>
                    {cap.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{cap.label}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {cap.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
