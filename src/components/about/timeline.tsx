"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "ABOUT US",
    title: "Building Technology Around Real Business Needs",
    detail:
      "Kapsinfos Technology is a software and technology company focused on helping businesses build, modernize, and scale their digital operations. We combine pre-built SaaS modules with custom software development, AI, automation, integrations, and technology services to create practical solutions for real business challenges.",
  },
  {
    year: "WHAT WE DO",
    title: "From Business Requirements to Production-Ready Applications",
    detail:
      "We design and develop robust web applications, SaaS platforms, enterprise systems, business management solutions, AI-powered applications, intelligent chatbots, workflow automation, and integrated digital systems. Our solutions are designed around business processes rather than forcing organizations to adapt to generic software.",
  },
  {
    year: "HOW WE DELIVER",
    title: "Engineering for Reliability, Scalability, and Long-Term Growth",
    detail:
      "Our development approach combines thoughtful architecture, clean engineering practices, secure application design, scalable infrastructure, testing, integrations, and continuous improvement. We focus on building reliable applications that can evolve with changing business requirements, increasing users, growing data, and expanding operations.",
  },
  {
    year: "OUR APPROACH",
    title: "Build Progressively. Automate Intelligently. Scale Confidently.",
    detail:
      "We believe businesses should not have to build every piece of technology from the ground up. Our approach combines ready-to-deploy technology modules with customized engineering, allowing organizations to adopt technology progressively, automate repetitive processes, connect their systems, and invest engineering effort where it creates the most value.",
  },
  {
    year: "THE FUTURE",
    title: "Building the Next Generation of Intelligent Business Technology",
    detail:
      "Our vision is to build a connected technology ecosystem where software, AI, automation, data, and business systems work together seamlessly. We are expanding our capabilities across intelligent automation, LLM-powered applications, agentic AI, enterprise software, integrations, and scalable SaaS solutions to help businesses operate more efficiently and build for the future.",
  },
];

export function Timeline() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          Our story
        </h2>

        <ol className="mt-8 flex flex-col gap-6 border-l border-border pl-6">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute top-1 -left-[29px] size-3 rounded-full border-2 border-background bg-primary" />
              <span className="font-[family-name:var(--font-data)] text-xs text-primary">
                {m.year}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {m.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
