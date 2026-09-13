"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";

const items: { icon: typeof Mail; label: string; value: string; tone: Tint }[] = [
  { icon: Mail, label: "Email", value: "hello@connecthub.example", tone: "teal" },
  { icon: Phone, label: "Phone", value: "+91 22 4000 1234", tone: "amber" },
  { icon: MapPin, label: "Office", value: "Bengaluru, India", tone: "slate" },
  { icon: Clock, label: "Response time", value: "Within 1 business day", tone: "teal" },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const tint = tintStyles[item.tone];
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tint.icon}`}>
              <item.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
