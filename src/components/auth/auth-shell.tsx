import Link from "next/link";
import { Blocks, Check, Headset, ShieldCheck } from "lucide-react";
import { statusMetrics } from "@/constants/company";

const highlights = [
    { icon: Blocks, text: "Prebuilt CRM, HR, and AI modules, live in days" },
    { icon: ShieldCheck, text: "SOC 2 Type II & ISO 27001-ready security" },
    { icon: Headset, text: "A named engineer on every account" },
];

function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white"
        >
            <span className="flex size-7 items-center justify-center rounded-md bg-brand-signal-bright/15 text-brand-signal-bright">
                <span className="size-2 rounded-full bg-brand-signal-bright" />
            </span>
            Connect Hub
        </Link>
    );
}

export function AuthShell({
    eyebrow,
    title,
    description,
    children,
    footer,
}: {
    eyebrow?: string;
    title: string;
    description: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh bg-brand-graphite text-white ">
            <div className="bg-signal-grid bg-transparent relative hidden w-[47%] shrink-0 overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-10">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-brand-signal-bright/10 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 bottom-0 size-45 rounded-full bg-brand-signal/10 blur-3xl"
                />
                <Logo />
                <div className=" relative flex flex-1 items-start justify-end overflow-hidden px-4 py-12">

                    <div className="mx-auto leading-1.5">
                        <h2 className="mt-12 max-w-sm font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-balance">
                            One platform for every service your team needs.
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                            Custom software, IoT services, help desk support, and prebuilt
                            automation modules — engineered for robustness, consistency,
                            and reliability.
                        </p>

                        <ul className="mt-8 flex flex-col gap-3">
                            {highlights.map((item) => (
                                <li key={item.text} className="flex items-start gap-2.5 text-sm text-white/70">
                                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-signal-bright/15 text-brand-signal-bright">
                                        <Check className="size-3" aria-hidden="true" />
                                    </span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <dl className="relative grid grid-cols-3 gap-4 border-t border-white/10 pt-6 font-[family-name:var(--font-data)]">
                    {statusMetrics.slice(0, 3).map((metric) => (
                        <div key={metric.label}>
                            <dt className="text-[11px] text-white/40">{metric.label}</dt>
                            <dd className="mt-1 text-base font-medium text-white">{metric.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="bg-signal-grid relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-brand-signal/10 blur-3xl lg:hidden"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 bottom-0 size-45 rounded-full bg-brand-signal/10 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brand-signal-bright/10 blur-3xl"
                />

                <div className="relative w-full max-w-md">
                    <div className="mb-8 flex justify-center lg:hidden">
                        <Logo />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
                        {eyebrow && (
                            <span className="text-xs font-medium tracking-wide text-brand-signal-bright uppercase">
                                {eyebrow}
                            </span>
                        )}
                        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>

                        <div className="mt-7">{children}</div>
                        {footer && <p className="mt-6 text-center text-sm text-white/50">{footer}</p>}
                    </div>

                </div>
            </div>
        </div>
    );
}
