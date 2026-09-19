"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems } from "@/constants/admin-nav";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-white/10 bg-brand-graphite text-white lg:flex">
      <Link
        href="/"
        className="flex h-16 items-center gap-2 border-b border-white/10 px-6 font-[family-name:var(--font-display)] text-base font-semibold"
      >
        <span className="flex size-7 items-center justify-center rounded-md bg-brand-signal-bright/15 text-brand-signal-bright">
          <span className="size-2 rounded-full bg-brand-signal-bright" />
        </span>
        Connect Hub
      </Link>

      <nav className="flex flex-col gap-1 p-3">
        {adminNavItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-signal-bright/15 text-brand-signal-bright"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="size-4.5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <p className="text-xs leading-relaxed text-white/40">
          Admin dashboard
        </p>
      </div>
    </aside>
  );
}
