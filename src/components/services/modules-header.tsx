"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ModuleRecord } from "@/services/modules_ops";

export function ModulesHeader({ modules }: { modules: ModuleRecord[] }) {
  return (
    <div className="bg-signal-grid relative overflow-hidden border-b border-white/10 bg-brand-graphite">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-xs font-medium tracking-wide text-brand-signal-bright uppercase">
            Prebuilt modules
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            The systems you&apos;d otherwise build from scratch
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Complete, production-ready modules that plug into your existing
            systems — deployed in days, not months, and backed by the same
            engineering team behind our custom work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-7 flex flex-wrap gap-2"
        >
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`#${module.slug}`}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-brand-signal-bright/40 hover:text-white"
            >
              {module.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
