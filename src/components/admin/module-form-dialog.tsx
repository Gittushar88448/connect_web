"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import {
  moduleColorOptions,
  moduleIconOptions,
  moduleSchema,
  type ModuleFormValues,
} from "@/lib/validations/moduleValidations";
import type { ModuleRecord } from "@/services/modules_ops";
import { apiFetch } from "@/lib/auth/fetchApi";

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyValues: ModuleFormValues = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  icon: "Users",
  tag: "",
  color: "teal",
  features: [""],
  isActive: true,
  order: 0,
};

export function ModuleFormDialog({
  open,
  onClose,
  editing,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editing: ModuleRecord | null;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<ModuleFormValues>(emptyValues);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ModuleFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setValues({
        name: editing.name,
        slug: editing.slug,
        tagline: editing.tagline,
        description: editing.description,
        icon: editing.icon,
        tag: editing.tag,
        color: editing.color,
        features: editing.features,
        isActive: editing.isActive,
        order: editing.order,
      });
      setSlugTouched(true);
    } else {
      setValues(emptyValues);
      setSlugTouched(false);
    }
    setErrors({});
    setFormError(null);
  }, [open, editing]);

  function update<K extends keyof ModuleFormValues>(key: K, value: ModuleFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!slugTouched) {
      update("slug", slugify(name));
    }
  }

  function updateFeature(index: number, value: string) {
    const next = [...values.features];
    next[index] = value;
    update("features", next);
  }

  function addFeature() {
    if (values.features.length >= 8) return;
    update("features", [...values.features, ""]);
  }

  function removeFeature(index: number) {
    update(
      "features",
      values.features.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const cleaned = { ...values, features: values.features.map((f) => f.trim()).filter(Boolean) };
    const parsed = moduleSchema.safeParse(cleaned);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ModuleFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ModuleFormValues;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await apiFetch(
        editing ? `/api/admin/modules/${editing.id}` : "/api/admin/modules",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      onSaved();
      onClose();
    } catch {
      setFormError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? `Edit ${editing.name}` : "New module"}
      description={editing ? "Update this module's details." : "Add a new prebuilt module to the catalog."}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => handleNameChange(e.target.value)}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update("slug", e.target.value);
              }}
              aria-invalid={Boolean(errors.slug)}
            />
            {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={values.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            aria-invalid={Boolean(errors.tagline)}
          />
          {errors.tagline && <p className="text-xs text-destructive">{errors.tagline}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={3}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            aria-invalid={Boolean(errors.description)}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              value={values.icon}
              onChange={(e) => update("icon", e.target.value as ModuleFormValues["icon"])}
              className="h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {moduleIconOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="color">Color</Label>
            <select
              id="color"
              value={values.color}
              onChange={(e) => update("color", e.target.value as ModuleFormValues["color"])}
              className="h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {moduleColorOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tag">Tag pill text</Label>
            <Input
              id="tag"
              placeholder="e.g. Live in days"
              value={values.tag}
              onChange={(e) => update("tag", e.target.value)}
              aria-invalid={Boolean(errors.tag)}
            />
            {errors.tag && <p className="text-xs text-destructive">{errors.tag}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Features</Label>
          {values.features.map((feature, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(i, e.target.value)}
                placeholder={`Feature ${i + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove feature ${i + 1}`}
                onClick={() => removeFeature(i)}
                disabled={values.features.length <= 1}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          {errors.features && <p className="text-xs text-destructive">{errors.features}</p>}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            disabled={values.features.length >= 8}
            className="mt-1 self-start"
          >
            <Plus className="size-4" />
            Add feature
          </Button>
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
            className="accent-primary"
          />
          Visible on the public site
        </label>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="animate-spin" />}
            {submitting ? "Saving…" : editing ? "Save changes" : "Create module"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
