"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema } from "@/lib/validations/auth";

type FieldErrors = Partial<Record<"firstName" | "lastName" | "email" | "password" | "confirmPassword", string>>;

export default function SignupPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const values = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };

    if(values.password != values.confirmPassword){
      setFormError("Password Must be Equal")
      return;
    }

    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values.email
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setFormError(data.message || "Failed to send OTP");
        return;
      }

    } catch (error) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }

    setSubmitting(false);
    router.push(`/verify-otp?email=${encodeURIComponent(parsed.data.email)}`);
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Set up your Connect Hub account"
      description="We'll send a 6-digit code to your email to verify it's you."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-signal-bright hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName" className="text-white/80">
              First name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
            />
            {errors.firstName && (
              <p className="text-xs text-red-300">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName" className="text-white/80">
              Last name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
            />
            {errors.lastName && (
              <p className="text-xs text-red-300">{errors.lastName}</p>
            )}
          </div>
        </div>

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
            className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
          />
          {errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-white/80">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-brand-signal-bright focus-visible:ring-brand-signal-bright/30"
          />
          {errors.password ? (
            <p className="text-xs text-red-300">{errors.password}</p>
          ) : (
            <p className="text-xs text-white/40">
              8+ characters, one uppercase letter, one number.
            </p>
          )}
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
          {submitting ? "Sending code…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
