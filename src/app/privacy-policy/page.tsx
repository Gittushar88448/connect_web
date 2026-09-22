import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Cookie,
  Database,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Kapsinfos",
  description:
    "Learn how Kapsinfos collects, uses, protects, and handles your information.",
};

const sections = [
  {
    id: "information",
    number: "01",
    title: "Information we collect",
  },
  {
    id: "usage",
    number: "02",
    title: "How we use information",
  },
  {
    id: "cookies",
    number: "03",
    title: "Cookies & technologies",
  },
  {
    id: "sharing",
    number: "04",
    title: "Sharing information",
  },
  {
    id: "security",
    number: "05",
    title: "Data security",
  },
  {
    id: "retention",
    number: "06",
    title: "Data retention",
  },
  {
    id: "rights",
    number: "07",
    title: "Your rights",
  },
  {
    id: "third-party",
    number: "08",
    title: "Third-party services",
  },
  {
    id: "changes",
    number: "09",
    title: "Policy changes",
  },
  {
    id: "contact",
    number: "10",
    title: "Contact us",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-brand-graphite">
        {/* Background decoration */}
        <div
          className="
            pointer-events-none absolute -right-32 -top-32
            size-80 rounded-full
            bg-primary/10 blur-3xl
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none absolute -bottom-40 left-1/3
            size-96 rounded-full
            bg-primary/5 blur-3xl
          "
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
              <ShieldCheck className="size-3.5 text-primary" />
              Privacy & security
            </div>

            <h1
              className="
                font-[family-name:var(--font-display)]
                text-4xl font-semibold tracking-tight text-white
                sm:text-5xl
              "
            >
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              We believe privacy should be understandable. This policy
              explains what information Kapsinfos collects, why we use it,
              and the choices available to you.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/40">
              <span className="rounded-full border border-white/10 px-3 py-1.5">
                Last updated: September 22, 2026
              </span>

              <span className="rounded-full border border-white/10 px-3 py-1.5">
                Kapsinfos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro cards */}
      <section className="border-b border-border bg-secondary/20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <InfoCard
            icon={<Database className="size-5" />}
            title="What we collect"
            description="Only information needed to provide and improve our services."
          />

          <InfoCard
            icon={<LockKeyhole className="size-5" />}
            title="How we protect it"
            description="We use reasonable technical and organizational safeguards."
          />

          <InfoCard
            icon={<UserRound className="size-5" />}
            title="Your choices"
            description="You may have rights to access, correct, or delete your information."
          />
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,760px)] lg:gap-20">
          {/* Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Contents
              </p>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="
                      group flex items-center gap-3 rounded-lg px-3 py-2
                      text-xs text-muted-foreground
                      transition-colors hover:bg-muted hover:text-foreground
                    "
                  >
                    <span className="font-mono text-[10px] text-primary/70">
                      {section.number}
                    </span>

                    <span>{section.title}</span>

                    <ChevronRight
                      className="
                        ml-auto size-3 opacity-0
                        transition-opacity
                        group-hover:opacity-100
                      "
                    />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Document */}
          <article className="min-w-0">
            <div className="space-y-12">
              {/* Introduction */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      Your privacy matters
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Kapsinfos respects your privacy and is committed to
                      handling personal information responsibly. This Privacy
                      Policy applies to our website, software products,
                      modules, applications, forms, and related services
                      that link to this policy.
                    </p>
                  </div>
                </div>
              </div>

              <PolicySection
                id="information"
                number="01"
                title="Information we collect"
              >
                <p>
                  Depending on how you interact with Kapsinfos, we may
                  collect information that you voluntarily provide to us.
                </p>

                <BulletList
                  items={[
                    "Name and contact information.",
                    "Email address and communication details.",
                    "Company or organization information.",
                    "Project, software, integration, or service requirements.",
                    "Information submitted through contact or support forms.",
                    "Other information you voluntarily provide when communicating with us.",
                  ]}
                />

                <h3>Information collected automatically</h3>

                <p>
                  When you use our website or services, certain technical
                  information may be collected automatically. This can
                  include browser type, device information, operating system,
                  IP address, pages visited, referring pages, and general
                  usage information.
                </p>
              </PolicySection>

              <PolicySection
                id="usage"
                number="02"
                title="How we use information"
              >
                <p>
                  We use information for purposes necessary to operate our
                  business and provide our services.
                </p>

                <BulletList
                  items={[
                    "Providing and operating our services.",
                    "Responding to inquiries and support requests.",
                    "Evaluating custom software and solution requirements.",
                    "Communicating with you about products, services, or requests.",
                    "Improving our website, products, and services.",
                    "Maintaining security and preventing abuse.",
                    "Diagnosing technical problems and improving performance.",
                    "Complying with applicable legal requirements.",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="cookies"
                number="03"
                title="Cookies & similar technologies"
                icon={<Cookie className="size-4" />}
              >
                <p>
                  Kapsinfos may use cookies and similar technologies to
                  maintain sessions, support authentication, remember
                  preferences, understand website usage, and improve the
                  functionality of our services.
                </p>

                <p>
                  The specific cookies and technologies used may vary
                  depending on the services and features you use.
                </p>
              </PolicySection>

              <PolicySection
                id="sharing"
                number="04"
                title="Sharing information"
              >
                <p>
                  Kapsinfos does not treat your personal information as
                  something to be sold. We may share information when
                  reasonably necessary to operate our business and provide
                  our services.
                </p>

                <BulletList
                  items={[
                    "Service providers supporting hosting, infrastructure, email, analytics, or business operations.",
                    "Professional advisers where reasonably necessary.",
                    "Government authorities or other parties where required by applicable law.",
                    "Relevant parties involved in a merger, acquisition, restructuring, or transfer of business assets.",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="security"
                number="05"
                title="Data security"
              >
                <p>
                  Kapsinfos takes reasonable technical and organizational
                  measures designed to protect information against
                  unauthorized access, alteration, disclosure, or
                  destruction.
                </p>

                <Callout>
                  No internet transmission, electronic storage system, or
                  security measure can be guaranteed to be completely secure.
                </Callout>
              </PolicySection>

              <PolicySection
                id="retention"
                number="06"
                title="Data retention"
              >
                <p>
                  We retain information for as long as reasonably necessary
                  for the purposes described in this policy, including
                  providing services, maintaining business records, resolving
                  disputes, enforcing agreements, and complying with legal
                  obligations.
                </p>

                <p>
                  Actual retention periods may vary depending on the type of
                  information and the reason it was collected.
                </p>
              </PolicySection>

              <PolicySection
                id="rights"
                number="07"
                title="Your rights"
              >
                <p>
                  Depending on your location and applicable law, you may have
                  rights relating to your personal information.
                </p>

                <BulletList
                  items={[
                    "Request access to personal information.",
                    "Request correction of inaccurate information.",
                    "Request deletion where legally applicable.",
                    "Request restriction of certain processing activities.",
                    "Object to certain uses of personal information.",
                    "Request portability where applicable.",
                  ]}
                />

                <p>
                  To make a privacy-related request, contact us using the
                  details below. We may need to verify your request before
                  taking action.
                </p>
              </PolicySection>

              <PolicySection
                id="third-party"
                number="08"
                title="Third-party services"
              >
                <p>
                  Our website or services may integrate with or link to
                  third-party services. These providers may have their own
                  privacy policies and terms.
                </p>

                <p>
                  Kapsinfos is not responsible for privacy practices of
                  third-party websites or services that we do not control.
                </p>
              </PolicySection>

              <PolicySection
                id="changes"
                number="09"
                title="Changes to this policy"
              >
                <p>
                  We may update this Privacy Policy from time to time to
                  reflect changes to our services, business practices, legal
                  requirements, or other circumstances.
                </p>

                <p>
                  When changes are made, the updated policy will be published
                  on this page with a revised "Last updated" date.
                </p>
              </PolicySection>

              <section
                id="contact"
                className="scroll-mt-24 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-8"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  10 · Contact
                </p>

                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  Have a privacy question?
                </h2>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy, our team is available to help.
                </p>

                <a
                  href="mailto:privacy@kapsinfos.com"
                  className="
                    mt-5 inline-flex items-center gap-2
                    rounded-lg border border-border
                    bg-background px-4 py-2.5
                    text-sm font-medium text-foreground
                    transition-colors hover:bg-muted
                  "
                >
                  privacy@kapsinfos.com
                  <ArrowUpRight className="size-4 text-primary" />
                </a>
              </section>

              {/* Bottom navigation */}
              <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/terms-and-conditions"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Read Terms & Conditions
                  <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to Kapsinfos
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function PolicySection({
  id,
  number,
  title,
  icon,
  children,
}: {
  id: string;
  number: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-start gap-4">
        <span
          className="
            mt-1 flex size-8 shrink-0 items-center justify-center
            rounded-lg border border-primary/20
            bg-primary/5
            font-mono text-[10px] font-semibold
            text-primary
          "
        >
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-primary">
                {icon}
              </span>
            )}

            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 px-4 py-3.5 text-xs leading-6 text-muted-foreground">
      <span className="font-medium text-foreground">Important: </span>
      {children}
    </div>
  );
}