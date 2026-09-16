import type { LucideIcon } from "lucide-react";

import { tintStyles, type Tint } from "@/components/shared/tint";

export function KpiCard({
  icon: Icon,
  label,
  value,
  tone = "teal",
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: Tint;
  hint?: string;
}) {
  const tint = tintStyles[tone];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
      <span className={`flex size-10 items-center justify-center rounded-lg ${tint.icon}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-1 font-[family-name:var(--font-data)] text-2xl font-semibold text-foreground">
          {value}
        </p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}
