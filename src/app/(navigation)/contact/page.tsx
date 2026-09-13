import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Connect Hub for sales, support, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="border-b border-border bg-brand-graphite">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Questions about a service, a module, or a custom build — reach
            out and a real person on our team will get back to you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
