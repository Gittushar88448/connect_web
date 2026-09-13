import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { footerNav } from "@/constants/nav";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-graphite text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              <span className="flex size-7 items-center justify-center rounded-md bg-brand-signal-bright/15 text-brand-signal-bright">
                <span className="size-2 rounded-full bg-brand-signal-bright" />
              </span>
              Connect Hub
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Software services, IoT services, help desk support, and
              prebuilt automation modules — engineered for robustness,
              consistency, and reliability.
            </p>
            <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-data)] text-white/40">
              <ShieldCheck className="size-3.5 text-brand-signal-bright" aria-hidden="true" />
              SOC 2 Type II · ISO 27001
            </div>
          </div>

          {Object.entries(footerNav).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                {section}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-data)]">
            © {new Date().getFullYear()} Connect Hub Technologies Inc.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/70">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white/70">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
