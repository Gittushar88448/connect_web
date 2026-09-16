import Link from "next/link";
import { Blocks, CheckCircle2, Clock, EyeOff } from "lucide-react";

import { AdminTopbar } from "@/components/admin/topbar";
import { KpiCard } from "@/components/admin/kpi-card";
import { tintStyles } from "@/components/shared/tint";
import { countModules, listModules } from "@/services/modules_ops";
import { timeAgo } from "@/lib/utils/duration";

export default async function AdminDashboardPage() {
  const [{ total, active }, recent] = await Promise.all([
    countModules(),
    listModules(),
  ]);

  const inactive = total - active;
  const mostRecent = recent[0];
  const recentFive = [...recent]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <>
      <AdminTopbar title="Dashboard" />

      <div className="flex-1 p-4 sm:p-6">
        {total === 0 && (
          <div className="mb-6 rounded-xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
            No modules yet. Either{" "}
            <Link href="/admin/modules" className="font-medium text-primary hover:underline">
              create one
            </Link>{" "}
            here, or run <code className="rounded bg-secondary px-1.5 py-0.5">npm run seed:modules</code>{" "}
            after setting <code className="rounded bg-secondary px-1.5 py-0.5">MONGODB_URI</code> in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5">.env.local</code> to load starter data.
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard icon={Blocks} label="Total modules" value={total} tone="teal" />
          <KpiCard icon={CheckCircle2} label="Active modules" value={active} tone="teal" />
          <KpiCard icon={EyeOff} label="Inactive modules" value={inactive} tone="slate" />
          <KpiCard
            icon={Clock}
            label="Last updated"
            value={mostRecent ? timeAgo(mostRecent.updatedAt) : "—"}
            tone="amber"
            hint={mostRecent?.name}
          />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Recently updated</h2>
            <Link href="/admin/modules" className="text-sm font-medium text-primary hover:underline">
              Manage modules
            </Link>
          </div>
          {recentFive.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">Nothing to show yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentFive.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo(m.updatedAt)}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      m.isActive ? tintStyles.teal.tag : tintStyles.slate.tag
                    }`}
                  >
                    {m.isActive ? "Active" : "Inactive"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
