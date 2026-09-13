"use client";

import { motion } from "framer-motion";

const leaders = [
  { name: "Ananya Rao", role: "Co-founder & CEO" },
  { name: "Marcus Webb", role: "Co-founder & Head of Engineering" },
  { name: "Sofia Chen", role: "VP, Custom Solutions" },
  { name: "Rahul Nair", role: "Head of Platform Security" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function Leadership() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          Leadership
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 font-[family-name:var(--font-display)] text-lg font-semibold text-primary">
                {initials(leader.name)}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{leader.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{leader.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
