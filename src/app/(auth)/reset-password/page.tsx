"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { password as passwordSchema } from "@/lib/validations/auth";

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [errors, setErrors] = useState<Partial<Record<"password" | "confirmPassword", string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    if (!token) {
      setFormError("This reset link is missing its token. Request a new one.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const values = {
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };

    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof errors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: parsed.data.password, confirmNewPassword: parsed.data.confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setFormError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Choose a new password"
      description="Make it at least 8 characters, with an uppercase letter and a number."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-brand-signal-bright hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      {done ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-brand-signal-bright/25 bg-brand-signal-bright/10 px-3 py-2.5 text-sm text-brand-signal-bright">
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
            Password updated. You can log in now.
          </div>
          <Button
            size="lg"
            className="h-11 text-sm"
            onClick={() => router.push("/login")}
          >
            Go to login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-white/80">
              New password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
            />
            {errors.password && <p className="text-xs text-red-300">{errors.password}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword" className="text-white/80">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-300">{errors.confirmPassword}</p>
            )}
          </div>

          {formError && <p className="text-sm text-red-300">{formError}</p>}

          <Button type="submit" size="lg" disabled={submitting} className="mt-2 h-11 text-sm">
            {submitting && <Loader2 className="animate-spin" />}
            {submitting ? "Updating…" : "Update password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
