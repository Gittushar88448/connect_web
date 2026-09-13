export function AboutHero() {
  return (
    <section className="bg-signal-grid relative overflow-hidden bg-brand-graphite text-white">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <span className="text-xs font-medium tracking-wide text-brand-signal-bright uppercase">
          About Connect Hub
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-balance sm:text-5xl">
          Software services, engineered to last
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          Connect Hub builds and supports the software behind bigger
          companies — custom development, IoT services, help desk support,
          and prebuilt automation modules — backed by an engineering team
          that stays on after launch.
        </p>
      </div>
    </section>
  );
}
