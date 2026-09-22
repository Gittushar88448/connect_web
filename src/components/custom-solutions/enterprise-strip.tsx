"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function EnterpriseStrip() {
  return (
    <section id="enterprise" className="border-y border-white/10 bg-brand-graphite-soft">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left lg:px-8"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-signal-bright/15 text-brand-signal-bright">
            <Building2 className="size-5" aria-hidden="true" />
          </span>
          <p className="text-sm text-white/70">
            Enterprise programs get a dedicated engineer, volume pricing, and
            SLA-backed support.
          </p>
        </div>
        {/* add support mail */}
        <a
          href="mailto:enterprise@kapsinfos.com"
          className="shrink-0 text-sm font-medium text-brand-signal-bright hover:underline"
        >
          Talk to our enterprise team
        </a>
      </motion.div>
    </section>
  );
}
