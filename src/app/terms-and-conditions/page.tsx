import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Gavel,
  LockKeyhole,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kapsinfos",
  description:
    "Read the terms and conditions governing the use of Kapsinfos products, software modules, and services.",
};

const sections = [
  { id: "acceptance", number: "01", title: "Acceptance of terms" },
  { id: "services", number: "02", title: "Our services" },
  { id: "accounts", number: "03", title: "Accounts & access" },
  { id: "acceptable-use", number: "04", title: "Acceptable use" },
  {
    id: "intellectual-property",
    number: "05",
    title: "Intellectual property",
  },
  { id: "customer-content", number: "06", title: "Customer content" },
  { id: "third-party", number: "07", title: "Third-party services" },
  { id: "availability", number: "08", title: "Availability & changes" },
  { id: "fees", number: "09", title: "Fees & payments" },
  { id: "disclaimers", number: "10", title: "Disclaimers" },
  { id: "liability", number: "11", title: "Limitation of liability" },
  { id: "termination", number: "12", title: "Termination" },
  { id: "changes", number: "13", title: "Changes to terms" },
  { id: "contact", number: "14", title: "Contact us" },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-brand-graphite">
        <div
          className="
            pointer-events-none absolute -right-32 -top-32
            size-80 rounded-full bg-primary/10 blur-3xl
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none absolute -bottom-40 left-1/3
            size-96 rounded-full bg-primary/5 blur-3xl
          "
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
              <FileCheck2 className="size-3.5 text-primary" />
              Legal & agreements
            </div>

            <h1
              className="
                font-[family-name:var(--font-display)]
                text-4xl font-semibold tracking-tight text-white
                sm:text-5xl
              "
            >
              Terms & Conditions
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              These terms explain the rules, responsibilities, and conditions
              that apply when using Kapsinfos software products, modules,
              applications, and services.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-xs text-white/40">
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

      {/* Summary cards */}
      <section className="border-b border-border bg-secondary/20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <InfoCard
            icon={<FileCheck2 className="size-5" />}
            title="Use of our services"
            description="Understand the rules that apply when using Kapsinfos."
          />

          <InfoCard
            icon={<Scale className="size-5" />}
            title="Your responsibilities"
            description="Use our products responsibly and protect your account."
          />

          <InfoCard
            icon={<ShieldCheck className="size-5" />}
            title="Our commitment"
            description="We aim to operate our services responsibly and securely."
          />
        </div>
      </section>

      {/* Content */}
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
                        transition-opacity group-hover:opacity-100
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
              {/* Intro */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Gavel className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      A clear framework for using Kapsinfos
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      These Terms & Conditions govern access to and use of
                      Kapsinfos websites, software products, pre-built
                      modules, applications, development services,
                      integrations, and related services.
                    </p>
                  </div>
                </div>
              </div>

              <TermsSection
                id="acceptance"
                number="01"
                title="Acceptance of terms"
              >
                <p>
                  By accessing the Kapsinfos website or using a Kapsinfos
                  service, you agree to these Terms and any additional terms
                  that apply to a particular product or service.
                </p>

                <Callout>
                  If you do not agree with these Terms, you should not use the
                  applicable service.
                </Callout>
              </TermsSection>

              <TermsSection
                id="services"
                number="02"
                title="Our services"
              >
                <p>
                  Kapsinfos provides software technology products and
                  services, which may include:
                </p>

                <BulletList
                  items={[
                    "Pre-built software modules.",
                    "Business applications and software tools.",
                    "Custom software development.",
                    "System integrations.",
                    "Automation solutions.",
                    "Technical consulting and engineering services.",
                    "Support and maintenance services.",
                  ]}
                />

                <p>
                  The exact functionality, scope, pricing, and availability
                  may vary depending on the applicable product or service.
                </p>
              </TermsSection>

              <TermsSection
                id="accounts"
                number="03"
                title="Accounts & access"
                icon={<LockKeyhole className="size-4" />}
              >
                <p>
                  Certain Kapsinfos services may require an account. You are
                  responsible for providing accurate information and keeping
                  your account credentials secure.
                </p>

                <p>
                  You should notify Kapsinfos promptly if you believe your
                  account or credentials have been compromised.
                </p>
              </TermsSection>

              <TermsSection
                id="acceptable-use"
                number="04"
                title="Acceptable use"
              >
                <p>You agree not to use Kapsinfos services to:</p>

                <BulletList
                  items={[
                    "Violate applicable laws, regulations, or third-party rights.",
                    "Gain unauthorized access to systems, accounts, or data.",
                    "Introduce malware, malicious code, or harmful content.",
                    "Interfere with the security or operation of our services.",
                    "Circumvent technical protections.",
                    "Abuse, overload, or disrupt our infrastructure.",
                    "Use our services for fraudulent or deceptive activities.",
                  ]}
                />
              </TermsSection>

              <TermsSection
                id="intellectual-property"
                number="05"
                title="Intellectual property"
              >
                <p>
                  Unless otherwise agreed in writing, Kapsinfos and its
                  licensors retain all rights, title, and interest in the
                  Kapsinfos website, software products, pre-built modules,
                  designs, documentation, branding, interfaces, and
                  underlying technology.
                </p>

                <p>
                  These Terms do not transfer ownership of Kapsinfos
                  intellectual property to you.
                </p>

                <p>
                  Custom development or deliverables may be subject to
                  separate agreements defining ownership and licensing.
                </p>
              </TermsSection>

              <TermsSection
                id="customer-content"
                number="06"
                title="Customer content"
              >
                <p>
                  You retain responsibility for content, information, files,
                  data, and other materials that you submit through Kapsinfos
                  services.
                </p>

                <p>
                  You represent that you have the necessary rights and
                  permissions to provide such content and authorize Kapsinfos
                  to process it for the purpose of providing the applicable
                  service.
                </p>
              </TermsSection>

              <TermsSection
                id="third-party"
                number="07"
                title="Third-party services"
              >
                <p>
                  Kapsinfos services may integrate with third-party
                  applications, APIs, hosting providers, payment providers,
                  communication platforms, or other external services.
                </p>

                <p>
                  Third-party services may have their own terms, policies,
                  availability, and limitations.
                </p>
              </TermsSection>

              <TermsSection
                id="availability"
                number="08"
                title="Availability & changes"
              >
                <p>
                  We may update, modify, suspend, or discontinue features of
                  our website or services from time to time.
                </p>

                <p>
                  We may perform maintenance, upgrades, security updates, or
                  other operational work that temporarily affects
                  availability.
                </p>
              </TermsSection>

              <TermsSection
                id="fees"
                number="09"
                title="Fees & payments"
              >
                <p>
                  Certain Kapsinfos products and services may require
                  payment. Applicable pricing, billing terms, subscription
                  periods, taxes, renewal terms, and cancellation terms will
                  be communicated through the applicable product or separate
                  agreement.
                </p>

                <p>
                  Where a separate written agreement exists, that agreement
                  may contain additional or different commercial terms.
                </p>
              </TermsSection>

              <TermsSection
                id="disclaimers"
                number="10"
                title="Disclaimers"
              >
                <p>
                  To the extent permitted by applicable law, Kapsinfos
                  services are provided subject to the terms and conditions
                  applicable to the relevant service.
                </p>

                <p>
                  We do not guarantee that every service will be
                  uninterrupted, completely error-free, or available at all
                  times.
                </p>
              </TermsSection>

              <TermsSection
                id="liability"
                number="11"
                title="Limitation of liability"
              >
                <p>
                  To the maximum extent permitted by applicable law, Kapsinfos
                  and its representatives, employees, affiliates, and service
                  providers will not be responsible for indirect, incidental,
                  special, consequential, or punitive damages arising from
                  your use of a service.
                </p>

                <Callout>
                  Nothing in these Terms is intended to exclude or limit
                  liability where such exclusion or limitation is prohibited
                  by applicable law.
                </Callout>
              </TermsSection>

              <TermsSection
                id="termination"
                number="12"
                title="Termination"
              >
                <p>
                  Kapsinfos may suspend or terminate access to a service
                  where reasonably necessary, including in cases of material
                  violation of these Terms, security risks, fraud, abuse, or
                  legal requirements.
                </p>

                <p>
                  You may stop using a service at any time, subject to any
                  applicable contractual or subscription obligations.
                </p>
              </TermsSection>

              <TermsSection
                id="changes"
                number="13"
                title="Changes to terms"
              >
                <p>
                  We may update these Terms from time to time. Updated Terms
                  will be published on this page with a revised "Last
                  updated" date.
                </p>

                <p>
                  Your continued use of applicable services after updated
                  Terms become effective may constitute acceptance of the
                  revised Terms where permitted by applicable law.
                </p>
              </TermsSection>

              {/* Contact */}
              <section
                id="contact"
                className="scroll-mt-24 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-8"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  14 · Contact
                </p>

                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  Questions about these terms?
                </h2>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  If you have questions about these Terms or any Kapsinfos
                  service, please contact our team.
                </p>

                <a
                  href="mailto:legal@kapsinfos.com"
                  className="
                    mt-5 inline-flex items-center gap-2
                    rounded-lg border border-border
                    bg-background px-4 py-2.5
                    text-sm font-medium text-foreground
                    transition-colors hover:bg-muted
                  "
                >
                  legal@kapsinfos.com
                  <ArrowUpRight className="size-4 text-primary" />
                </a>
              </section>

              <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/privacy-policy"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Read Privacy Policy
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

function TermsSection({
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
            font-mono text-[10px] font-semibold text-primary
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