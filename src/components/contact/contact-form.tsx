"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, contactTopics, type ContactInput } from "@/lib/validations/contact";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const initialValues: ContactInput = {
  name: "",
  email: "",
  company: "",
  topic: "",
  message: "",
};

const selectClass =
  "focus-visible:ring-ring/40 h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2";

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // TODO: replace with POST /api/contact once an inbox/CRM integration
    // (or at minimum a transactional email service) is wired up.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmitting(false);
    setSubmitted(true);
    setValues(initialValues);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">Message sent</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out — our team typically replies within one
          business day.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="company">Company (optional)</Label>
        <Input
          id="company"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="topic">Topic</Label>
        <select
          id="topic"
          value={values.topic}
          onChange={(e) => update("topic", e.target.value)}
          aria-invalid={Boolean(errors.topic)}
          className={selectClass}
        >
          <option value="">Select a topic</option>
          {contactTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        {errors.topic && <p className="text-xs text-destructive">{errors.topic}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us a bit about what you need."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="h-11 self-start px-6 text-sm">
        {submitting ? <Loader2 className="animate-spin" /> : <Send />}
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
