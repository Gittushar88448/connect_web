"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Paperclip, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetOptions,
  industryOptions,
  integrationOptions,
  scaleOptions,
  timelineOptions,
} from "@/constants/services";
import { customSolutionSchema } from "@/lib/validations/custom-solutions";

type Values = {
  contactName: string;
  contactEmail: string;
  projectTitle: string;
  industry: string;
  problemDescription: string;
  technicalRequirements: string;
  integrationRequirements: string[];
  expectedScale: string;
  budgetRange: string;
  timeline: string;
  additionalRequirements: string;
  attachments: object[];
};

const initialValues: Values = {
  contactName: "",
  contactEmail: "",
  projectTitle: "",
  industry: "",
  problemDescription: "",
  technicalRequirements: "",
  integrationRequirements: [],
  expectedScale: "",
  budgetRange: "",
  timeline: "",
  additionalRequirements: "",
  attachments: []
};

type FieldErrors = Partial<Record<keyof Values, string>>;

const selectClass =
  "focus-visible:ring-ring/40 h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2";

export function RequestForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      setFiles((prev) => ({
        ...prev,
        attachments: selectedFiles,
      }));
    }
  };

  // Remove a specific file from selection
  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };


  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleIntegration(option: string) {
    setValues((prev) => ({
      ...prev,
      integrationRequirements: prev.integrationRequirements.includes(option)
        ? prev.integrationRequirements.filter((o) => o !== option)
        : [...prev.integrationRequirements, option],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = customSolutionSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      const firstKey = parsed.error.issues[0]?.path[0];
      if (firstKey) {
        document
          .getElementById(String(firstKey))
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const payload = {
      ...parsed.data,
      files
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    // adding apifetch here
    try {
      const res = await fetch("/api/custom-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || (!data.success) ? data.message : `Something went wrong. Please try again.`);
        return;
      }
      setSubmittedTitle(parsed.data.projectTitle);
      setValues(initialValues);
    } catch {
      setSubmitError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedTitle) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">
          Request submitted
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Thanks — we&apos;ve received &ldquo;{submittedTitle}&rdquo;. A senior
          engineer will follow up by email within 2 business days with next
          steps.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setSubmittedTitle(null)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contactName">Your name</Label>
          <Input
            id="contactName"
            value={values.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            aria-invalid={Boolean(errors.contactName)}
          />
          {errors.contactName && <p className="text-xs text-destructive">{errors.contactName}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contactEmail">Work email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={values.contactEmail}
            onChange={(e) => update("contactEmail", e.target.value)}
            aria-invalid={Boolean(errors.contactEmail)}
          />
          {errors.contactEmail && <p className="text-xs text-destructive">{errors.contactEmail}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="projectTitle">Project title</Label>
        <Input
          id="projectTitle"
          placeholder="e.g. Automated ticket triage for a 40-person support team"
          value={values.projectTitle}
          onChange={(e) => update("projectTitle", e.target.value)}
          aria-invalid={Boolean(errors.projectTitle)}
        />
        {errors.projectTitle && <p className="text-xs text-destructive">{errors.projectTitle}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="industry">Industry</Label>
        <select
          id="industry"
          value={values.industry}
          onChange={(e) => update("industry", e.target.value)}
          aria-invalid={Boolean(errors.industry)}
          className={selectClass}
        >
          <option value="">Select an industry</option>
          {industryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.industry && <p className="text-xs text-destructive">{errors.industry}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="problemDescription">What problem are you solving?</Label>
        <Textarea
          id="problemDescription"
          rows={4}
          placeholder="Describe the workflow, users, and what success looks like."
          value={values.problemDescription}
          onChange={(e) => update("problemDescription", e.target.value)}
          aria-invalid={Boolean(errors.problemDescription)}
        />
        {errors.problemDescription && (
          <p className="text-xs text-destructive">{errors.problemDescription}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="technicalRequirements">Technical requirements</Label>
        <Textarea
          id="technicalRequirements"
          rows={3}
          placeholder="Existing stack, data sources, platforms, or systems this needs to work with."
          value={values.technicalRequirements}
          onChange={(e) => update("technicalRequirements", e.target.value)}
          aria-invalid={Boolean(errors.technicalRequirements)}
        />
        {errors.technicalRequirements && (
          <p className="text-xs text-destructive">{errors.technicalRequirements}</p>
        )}
      </div>

      <fieldset id="integrationRequirements" className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-foreground/90">
          Integration requirements
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {integrationOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm has-checked:border-primary has-checked:bg-accent"
            >
              <input
                type="checkbox"
                checked={values.integrationRequirements.includes(option)}
                onChange={() => toggleIntegration(option)}
                className="accent-primary"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.integrationRequirements && (
          <p className="text-xs text-destructive">{errors.integrationRequirements}</p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="expectedScale">Expected scale</Label>
          <select
            id="expectedScale"
            value={values.expectedScale}
            onChange={(e) => update("expectedScale", e.target.value)}
            aria-invalid={Boolean(errors.expectedScale)}
            className={selectClass}
          >
            <option value="">Select a range</option>
            {scaleOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.expectedScale && (
            <p className="text-xs text-destructive">{errors.expectedScale}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="budgetRange">Budget range</Label>
          <select
            id="budgetRange"
            value={values.budgetRange}
            onChange={(e) => update("budgetRange", e.target.value)}
            aria-invalid={Boolean(errors.budgetRange)}
            className={selectClass}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.budgetRange && <p className="text-xs text-destructive">{errors.budgetRange}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="timeline">Timeline</Label>
          <select
            id="timeline"
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            aria-invalid={Boolean(errors.timeline)}
            className={selectClass}
          >
            <option value="">Select a timeline</option>
            {timelineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.timeline && <p className="text-xs text-destructive">{errors.timeline}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="additionalRequirements">Additional requirements (optional)</Label>
        <Textarea
          id="additionalRequirements"
          rows={3}
          placeholder="Compliance needs, security requirements, or anything else we should know."
          value={values.additionalRequirements}
          onChange={(e) => update("additionalRequirements", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Attachments (optional)</Label>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3.5 py-3 text-sm text-muted-foreground hover:border-primary/40">
          <Paperclip className="size-4" aria-hidden="true" />
          Attach specs, wireframes, or reference documents

          <input
            type="file"
            multiple
            accept=".pdf,.txt,text/plain,application/pdf" // Restricts selections to PDF and Text
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-2 divide-y divide-border rounded-md border border-border bg-muted/20 text-xs">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2">
                <span className="truncate font-medium text-foreground max-w-[80%]">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
                <button
                  type="button"

                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"

                >
                  <X className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        )}

      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" size="lg" disabled={submitting} className="h-11 self-start px-6 text-sm">
        {submitting ? <Loader2 className="animate-spin" /> : <Send />}
        {submitting ? "Submitting…" : "Submit request"}
      </Button>
    </form>
  );
}
