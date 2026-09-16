"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Blocks } from "lucide-react";

import { ModuleCard } from "@/components/services/module-card";
import type { ModuleRecord } from "@/services/modules_ops";

export function ModulesShowcase({ modules }: { modules: ModuleRecord[] }) {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary uppercase">
              <Blocks className="size-3.5" aria-hidden="true" />
              Prebuilt & ready
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
              Automation modules you can deploy this week
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              The systems most enterprise teams end up building from scratch
              — already built, tested, and ready to integrate.
            </p>
          </div>
          <Link
            href="/modules"
            className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:block"
          >
            View all modules
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.length === 0 ? (
            <p className="col-span-full rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Modules are managed by the admin --- none published yet.
            </p>
          ) : (
            modules.map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (i % 4) * 0.08 }}
              >
                <ModuleCard module={module} />
              </motion.div>
            ))
          )}
        </div>

        <Link
          href="/modules"
          className="mt-8 block text-center text-sm font-medium text-primary hover:underline sm:hidden"
        >
          View all modules
        </Link>
      </div>
    </section>
  );
}
