import { Quote } from "lucide-react";

import { testimonials } from "@/constants/company";

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
          Trusted by engineering teams
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
            >
              <Quote className="size-5 text-primary" aria-hidden="true" />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-border pt-4 text-xs">
                <span className="block font-semibold text-foreground">
                  {t.name}
                </span>
                <span className="text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
