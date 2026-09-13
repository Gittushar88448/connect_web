"use client";

import { motion } from "framer-motion";
import { Code2, Headset, Rocket, Search } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";
import { processSteps } from "@/constants/services";

const stepIcons = [Search, Code2, Rocket, Headset];
const tones: Tint[] = ["teal", "amber", "teal", "amber"];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          How custom development works
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          From first conversation to full deployment, four stages.
        </p>

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            const tint = tintStyles[tones[i % tones.length]];
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex size-11 items-center justify-center rounded-full ${tint.icon}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-[family-name:var(--font-data)] text-xl font-semibold text-muted-foreground/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
