"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
});

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }

    setError(null);
    setSubmitting(true);
    // TODO: replace with POST /api/auth/forgot-password once the reset-link
    // email service and Mongoose User model are wired up.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Forgot your password?"
      description="Enter the email on your account and we'll send a reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-brand-signal-bright hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex items-center gap-2 rounded-lg border border-brand-signal-bright/25 bg-brand-signal-bright/10 px-3 py-2.5 text-sm text-brand-signal-bright">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          If that email exists, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-white/80">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(error)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
            />
            {error && <p className="text-xs text-red-300">{error}</p>}
          </div>

          <Button type="submit" size="lg" disabled={submitting}  className="mt-2 h-11 text-sm">
            {submitting && <Loader2 className="animate-spin" />}
            {submitting ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
