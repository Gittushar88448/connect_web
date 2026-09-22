"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  contactSchema,
} from "@/lib/validations/contact";

type Values = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type FieldErrors = Partial<
  Record<keyof Values, string>
>;

export function ContactForm() {
  const [values, setValues] =
    useState<Values>(initialValues);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  function update<K extends keyof Values>(
    key: K,
    value: Values[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));

    setSubmitError(null);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSubmitError(null);

    const parsed =
      contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of parsed.error.issues) {
        const key =
          issue.path[0] as keyof Values;

        if (key && !nextErrors[key]) {
          nextErrors[key] =
            issue.message;
        }
      }

      setErrors(nextErrors);

      const firstKey =
        parsed.error.issues[0]?.path[0];

      if (firstKey) {
        document
          .getElementById(String(firstKey))
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }

      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            parsed.data
          ),
        }
      );

      const data =
        await res.json().catch(
          () => ({})
        );

      if (!res.ok) {
        setSubmitError(
          data?.error ||
            data?.message ||
            "Something went wrong. Please try again."
        );

        return;
      }

      setSubmitted(true);
      setValues(initialValues);
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error
      );

      setSubmitError(
        "Network error — check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
          <CheckCircle2 className="size-6" />
        </span>

        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Message sent successfully
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Thank you for reaching out to
            ConnectedHub. We've received your
            message and a member of our team
            will get back to you soon.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => {
            setSubmitted(false);
            setErrors({});
            setSubmitError(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">
            Your name
          </Label>

          <Input
            id="name"
            value={values.name}
            onChange={(e) =>
              update(
                "name",
                e.target.value
              )
            }
            aria-invalid={Boolean(
              errors.name
            )}
            placeholder="John Doe"
          />

          {errors.name && (
            <p className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">
            Email address
          </Label>

          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) =>
              update(
                "email",
                e.target.value
              )
            }
            aria-invalid={Boolean(
              errors.email
            )}
            placeholder="john@example.com"
          />

          {errors.email && (
            <p className="text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">
          Subject
        </Label>

        <Input
          id="subject"
          value={values.subject}
          onChange={(e) =>
            update(
              "subject",
              e.target.value
            )
          }
          aria-invalid={Boolean(
            errors.subject
          )}
          placeholder="How can we help?"
        />

        {errors.subject && (
          <p className="text-xs text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">
          Message
        </Label>

        <Textarea
          id="message"
          rows={7}
          value={values.message}
          onChange={(e) =>
            update(
              "message",
              e.target.value
            )
          }
          aria-invalid={Boolean(
            errors.message
          )}
          placeholder="Tell us how we can help..."
        />

        <div className="flex justify-between gap-4">
          {errors.message ? (
            <p className="text-xs text-destructive">
              {errors.message}
            </p>
          ) : (
            <span />
          )}

          <span className="text-xs text-muted-foreground">
            {values.message.length}/5000
          </span>
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="h-11 self-start cursor-pointer px-6 text-sm"
      >
        {submitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Send />
        )}

        {submitting
          ? "Sending…"
          : "Send message"}
      </Button>
    </form>
  );
}