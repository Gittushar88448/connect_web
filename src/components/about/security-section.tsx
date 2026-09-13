"use client";

import { motion } from "framer-motion";
import { KeyRound, Lock, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: Lock,
    title: "Encrypted by default",
    detail: "Data is encrypted in transit and at rest across every module and custom build.",
  },
  {
    icon: KeyRound,
    title: "Role-based access",
    detail: "Every module ships with granular, role-based permissions — never shared logins.",
  },
  {
    icon: ShieldCheck,
    title: "Audited & reviewed",
    detail: "Code and infrastructure go through regular security review before release.",
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="bg-brand-graphite py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
          Trust & security
        </h2>
        <p className="mt-2 max-w-lg text-sm text-white/60">
          Security isn&apos;t a checkbox — it&apos;s built into every module
          and every line of custom code we ship.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-brand-signal-bright/30"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-signal-bright/15 text-brand-signal-bright">
                <point.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-white">{point.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                {point.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-data)] text-xs text-white/40">
          SOC 2 Type II · ISO 27001 · GDPR-ready data handling
        </p>
      </div>
    </section>
  );
}
