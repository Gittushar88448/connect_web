"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems } from "@/constants/admin-nav";

export function AdminTopbar({ title }: { title: string }) {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
          {title}
        </h1>
      </div>

      {/* Compact tab bar, mobile/tablet only — sidebar covers this on lg+ */}
      <nav className="flex gap-1 overflow-x-auto px-4 pb-3 sm:px-6 lg:hidden">
        {adminNavItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="size-3.5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
