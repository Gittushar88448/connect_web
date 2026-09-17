"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { OtpInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";
import { otpSchema } from "@/lib/validations/auth";

const RESEND_SECONDS = 30;

export function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const firstName = searchParams.get("firstName") ?? "";
  const lastName = searchParams.get("lastName") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = otpSchema.safeParse({ code });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter the 6-digit code");
      return;
    }

    setError(null);
    setSubmitting(true);
    
// using use contxt api hook we get the data 

    try {
      const response = await fetch('/api/auth/sign-up', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          otp: parsed.data.code,
          firstName,
          email,
          lastName
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to send OTP");
        return;
      }

    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }

    router.push("/");
  }

  async function handleResend() {
    try{
    setResending(true);
     const response = await fetch('/api/auth/send-otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to send OTP");
        return;
      }

    } catch (error) {
      setError("Something went wrong. Please try again.");
    }finally{
      setResending(false);
    }
    setSecondsLeft(RESEND_SECONDS);
  }

  return (
    <AuthShell
      eyebrow="Verify email"
      title="Enter your verification code"
      description={
        email
          ? `We sent a 6-digit code to ${email}. It expires in 10 minutes.`
          : "We sent a 6-digit code to your email. It expires in 10 minutes."
      }
      footer={
        <>
          Wrong email?{" "}
          <Link href="/signup" className="font-medium text-brand-signal-bright hover:underline">
            Go back
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <OtpInput value={code} onChange={setCode} disabled={submitting} />
        {error && <p className="text-xs text-red-300">{error}</p>}

        <Button type="submit" size="lg" disabled={submitting} className="h-11 text-sm">
          {submitting && <Loader2 className="animate-spin" />}
          {submitting ? "Verifying…" : "Verify & continue"}
        </Button>

        <div className="text-center text-sm text-white/50">
          {secondsLeft > 0 ? (
            <span>
              Resend code in{" "}
              <span className="font-[family-name:var(--font-data)] text-white/70">
                0:{secondsLeft.toString().padStart(2, "0")}
              </span>
            </span>
          ) : (
            <button
              type="button" 
              onClick={handleResend}
              disabled={resending}
              className="font-medium text-brand-signal-bright hover:underline disabled:opacity-50"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          )}
        </div>
      </form>
    </AuthShell>
  );
}
