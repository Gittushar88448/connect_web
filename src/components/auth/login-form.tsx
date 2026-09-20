"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations/auth"
import { useAuth } from "./authProvider";
import { GoogleButton } from "@/components/auth/google-button";

type FieldErrors = Partial<Record<"email" | "password", string>>;

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");
  const justVerified = searchParams.get("verified") === "1";

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.currentTarget);

    const values = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;

        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setFormError(data.message || "Login failed");
        return;
      }
      setUser(data.user)
      router.push("/");

    } catch (error) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to Connect Hub"
      description="Access your service requests, prebuilt modules, and account details."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-brand-signal-bright hover:underline">
            Sign up
          </Link>
        </>
      }
    >

      {justVerified && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-brand-signal-bright/25 bg-brand-signal-bright/10 px-3 py-2.5 text-sm text-brand-signal-bright">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          Email verified. You can log in now.
        </div>
      )}

      {oauthError && (
        <div className="mb-5 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          {oauthError}
        </div>
      )}

      <GoogleButton label="Continue with Google" />

      <div className="my-5 flex items-center gap-3 text-xs text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        or log in with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

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
            aria-invalid={Boolean(errors.email)}
            suppressHydrationWarning={true}
            className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
          />
          {errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white/80">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-brand-signal-bright hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            suppressHydrationWarning={true}
            className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
          />
          {errors.password && <p className="text-xs text-red-300">{errors.password}</p>}
        </div>

        {formError && <p className="text-sm text-red-300">{formError}</p>}

        <Button type="submit" size="lg" disabled={submitting} className="mt-2 h-11 text-sm" suppressHydrationWarning={true}>
          {submitting && <Loader2 className="animate-spin" />}
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </form>
    </AuthShell>
  );
}
