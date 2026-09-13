"use client";

import { motion } from "framer-motion";
import { Code2, Headset, Radio, Sparkles, type LucideIcon } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";
import { solutionCategories } from "@/constants/services";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Radio,
  Headset,
  Sparkles,
};

const tones: Tint[] = ["teal", "amber", "slate", "teal"];

export function SolutionCategories() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          What we build
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          A sample of the project types our engineering team takes on.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutionCategories.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Code2;
            const tint = tintStyles[tones[i % tones.length]];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (i % 4) * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className={`flex size-11 items-center justify-center rounded-full ${tint.icon}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
