"use client";

import { motion } from "framer-motion";
import { Cpu, Headset, Plug, RefreshCw, ShieldCheck, Zap } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";

const items: {
  icon: typeof Cpu;
  label: string;
  detail: string;
  tag: string;
  tone: Tint;
}[] = [
  {
    icon: Cpu,
    label: "Robustness",
    detail: "Systems built to handle real production load, not just the demo.",
    tag: "Stress-tested",
    tone: "teal",
  },
  {
    icon: RefreshCw,
    label: "Consistency",
    detail: "The same engineering standard on every module, every project.",
    tag: "One playbook",
    tone: "amber",
  },
  {
    icon: ShieldCheck,
    label: "Reliability",
    detail: "SLA-backed uptime across every client deployment we support.",
    tag: "99.95% SLA",
    tone: "slate",
  },
  {
    icon: Plug,
    label: "Enterprise integrations",
    detail: "REST/GraphQL APIs and webhooks into your existing CRM or ERP.",
    tag: "API-first",
    tone: "teal",
  },
  {
    icon: Zap,
    label: "Rapid deployment",
    detail: "Prebuilt modules go live in days — custom builds in weeks.",
    tag: "Live fast",
    tone: "amber",
  },
  {
    icon: Headset,
    label: "Dedicated support",
    detail: "A named engineer on every account, not a rotating ticket queue.",
    tag: "Named engineer",
    tone: "slate",
  },
];

export function WhyConnectHub() {
  return (
    <section className="relative overflow-hidden bg-accent/40 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-signal-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium text-primary shadow-sm">
            Why teams choose us
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
            Built for production, not demos
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every module and every custom build ships with the same
            engineering discipline.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const tint = tintStyles[item.tone];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (i % 3) * 0.08 }}
                className={`flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 shadow-sm ring-1 ring-transparent transition-all hover:shadow-lg ${tint.hoverRing}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`flex size-11 items-center justify-center rounded-full ${tint.icon}`}>
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tint.tag}`}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
