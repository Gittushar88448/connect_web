"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { serviceDomains } from "@/constants/services";

export function ServicesHeader() {
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
            Services
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            One engineering team, every domain
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Software development, IoT services, help desk support,
            blockchain development, and prebuilt automation modules — built
            for robustness, consistency, and reliability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-7 flex flex-wrap gap-2"
        >
          {serviceDomains.map((service) => (
            <Link
              key={service.id}
              href={service.href ?? `#${service.slug}`}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-brand-signal-bright/40 hover:text-white"
            >
              {service.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
