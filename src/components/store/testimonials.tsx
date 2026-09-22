import { Quote } from "lucide-react";

import { testimonials } from "@/constants/company";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            What people say
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Trusted by engineering teams
          </h2>
        </div>

        <div className="scroll-fade-x scrollbar-none mt-10 overflow-x-auto pb-5">
          <div className="flex w-max gap-5 px-5 pt-7">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="
                  group relative flex
                  w-[calc(100vw-2rem)] max-w-[350px] shrink-0
                  flex-col
                  rounded-2xl
                  border border-border/60
                  bg-card
                  px-6 pb-6 pt-12
                  shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]
                  sm:w-[calc((100vw-3rem)/2)]
                  lg:w-[calc((min(100vw,1280px)-3rem)/3)]
                "
              >
                {/* Floating quote badge */}
                <div
                  className="
                    absolute -top-7 left-6
                    flex size-14 items-center justify-center
                    rounded-2xl
                    border border-primary/10
                    bg-background
                    shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                    transition-transform duration-300
                    group-hover:-translate-y-1
                  "
                >
                  {/* Soft background circle */}
                  <div
                    className="
                      absolute inset-1.5
                      rounded-xl
                      bg-primary/10
                    "
                  />

                  <Quote
                    className="
                      relative z-10
                      size-6
                      text-primary
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                    aria-hidden="true"
                  />
                </div>

                {/* Decorative background glow */}
                <div
                  className="
                    pointer-events-none absolute right-0 top-0
                    size-32 rounded-full
                    bg-primary/5
                    blur-2xl
                  "
                  aria-hidden="true"
                />

                {/* Quote */}
                <blockquote
                  className="
                    relative flex-1
                    text-[15px]
                    leading-7
                    text-foreground/80
                  "
                >
                  “{t.quote}”
                </blockquote>

                {/* Small divider */}
                <div className="mt-7 mb-5 h-px w-10 bg-primary/50" />

                {/* Author */}
                <figcaption>
                  <div className="flex items-center gap-3">
                    {/* Initials */}
                    <div
                      className="
                        flex size-10 shrink-0 items-center justify-center
                        rounded-full
                        bg-primary/10
                        text-xs font-bold
                        text-primary
                        ring-4 ring-primary/5
                      "
                    >
                      {t.name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {t.name}
                      </span>

                      <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </figcaption>

                {/* Bottom highlight */}
                <div
                  className="
                    pointer-events-none absolute
                    bottom-0 left-8 right-8
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-primary/30
                    to-transparent
                    opacity-0
                    transition-opacity duration-300
                    group-hover:opacity-100
                  "
                  aria-hidden="true"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}