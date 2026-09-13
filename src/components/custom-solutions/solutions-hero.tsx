import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SolutionsHero() {
  return (
    <section className="bg-signal-grid relative overflow-hidden bg-brand-graphite text-white">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <span className="font-[family-name:var(--font-data)] text-xs text-brand-signal-bright">
          {"> custom_solutions --consultation"}
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-balance sm:text-5xl">
          Build your custom software solution
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          When a prebuilt module doesn&apos;t cover it, our engineering team
          scopes, builds, and ships custom software — from a single
          integration to a full internal platform.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-11 px-6 text-sm" render={<Link href="#request-form" />}>
            Start a project
            <ArrowRight />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 border-white/20 bg-transparent px-6 text-sm text-white hover:bg-white/10 hover:text-white"
            render={<Link href="#how-it-works" />}
          >
            How it works
          </Button>
        </div>
      </div>
    </section>
  );
}
