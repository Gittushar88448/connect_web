import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CustomSolutionsCta() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-signal-grid relative overflow-hidden rounded-2xl border border-white/10 bg-brand-graphite px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="font-[family-name:var(--font-data)] text-xs text-brand-signal-bright">
              {"> build_your_solution --start"}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-balance sm:text-4xl">
              Need something the modules don&apos;t cover?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              Our engineering team scopes, builds, and ships custom software
              — from a single integration to a full internal platform,
              tailored to exactly how your team works.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/custom-solutions"
                className="bg-brand-signal inline-flex h-11 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium text-white transition-colors hover:bg-[#0b817a]"
              >
                Start a project
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/custom-solutions#how-it-works"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/20 bg-transparent px-6 text-sm text-white transition-colors hover:bg-white/10 hover:text-white"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
