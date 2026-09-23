"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignalMesh } from "@/components/shared/signal-mesh";

const rotatingWords = ["reliable.", "consistent.", "robust."];

function RotatingWord() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <span className="text-brand-signal-bright">{rotatingWords[0]}</span>;
  }

  return (
    <span className="relative inline-block h-[1.1em] min-w-[8.0ch] align-bottom overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 text-brand-signal-bright"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-graphite text-white">
      <div className="bg-signal-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            <Sparkles className="size-3.5 text-brand-signal-bright" aria-hidden="true" />
            4+ enterprise clients supported
          </span>

          <h1 className="mt-6 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl lg:text-6xl">
            Software services, engineered to be <RotatingWord />
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Custom software, IoT services, help desk support, and prebuilt
            automation modules — CRM, HR, notifications, and AI — deployed
            and supported by an engineering team that stays on.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-6 text-sm"
              nativeButton={false}
              render={<Link href="/services" />}
            >
              Explore services
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-11 border-white/20 bg-transparent px-6 text-sm text-white hover:bg-white/10 hover:text-white"
              render={<Link href="/custom-solutions" />}
            >
              Get a free consultation
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6 font-[family-name:var(--font-data)]">
            <div>
              <dt className="text-xs text-white/40">SLA uptime</dt>
              <dd className="mt-1 text-lg font-medium text-white">99.95%</dd>
            </div>
            <div>
              <dt className="text-xs text-white/40">Modules deployed</dt>
              <dd className="mt-1 text-lg font-medium text-white">10+</dd>
            </div>
            <div>
              <dt className="text-xs text-white/40">Avg. response</dt>
              <dd className="mt-1 text-lg font-medium text-white">&lt; 15 min</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto aspect-[480/420] w-full max-w-lg"
        >
          <SignalMesh />
        </motion.div>
      </div>
    </section>
  );
}
