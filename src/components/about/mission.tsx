"use client";

import { motion } from "framer-motion";

import { statusMetrics } from "@/constants/company";

export function Mission() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Enterprise software usually means one of two things: a rigid
              off-the-shelf tool that almost fits, or a six-month custom
              build. We build for both ends — prebuilt CRM, HR, notification,
              and AI modules teams can deploy this week, and an engineering
              team for the parts that genuinely need to be custom.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every module and every custom build goes through the same
              review: does it hold up under real production load, is it
              consistent with everything else we've shipped, and can we
              stand behind it with an SLA.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {statusMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg"
              >
                <dt className="text-xs text-muted-foreground uppercase">
                  {metric.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-data)] text-2xl font-semibold text-foreground">
                  {metric.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
