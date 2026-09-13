import { statusMetrics } from "@/constants/company";

export function StatusBar() {
  return (
    <div className="border-y border-white/10 bg-brand-graphite-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {statusMetrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-1 py-4 pl-4 first:pl-0 sm:pl-6"
          >
            <span className="text-[11px] tracking-wide text-white/40 uppercase">
              {metric.label}
            </span>
            <span className="font-[family-name:var(--font-data)] text-lg font-medium text-brand-signal-bright">
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
