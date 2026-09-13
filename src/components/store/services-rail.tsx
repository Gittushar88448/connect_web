"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

import { ServiceCard } from "@/components/services/service-card";
import { serviceDomains } from "@/constants/services";

export function ServicesRail() {
  return (
    <section id="services" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary uppercase">
              <LayoutGrid className="size-3.5" aria-hidden="true" />
              Service hub
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
              Everything under one engineering team
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Six service domains, one team behind all of them — pick a
              lane, or combine a few.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:block"
          >
            View all services
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceDomains.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: (i % 3) * 0.08 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-8 block text-center text-sm font-medium text-primary hover:underline sm:hidden"
        >
          View all services
        </Link>
      </div>
    </section>
  );
}
