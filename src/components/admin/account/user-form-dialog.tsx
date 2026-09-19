"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Account, Gender } from "@/types/user-enums";
import {
  adminCreateUserSchema,
  adminUpdateUserSchema,
  genderOptions,
} from "@/lib/validations/admin-user";
import type { UserRecord } from "@/services/users";
import { $ZodIssue } from "zod/v4/core";

const roleLabels: Record<Account, string> = {
  [Account.SUPERADMIN]: "Super Admin",
  [Account.ADMIN]: "Admin",
  [Account.CUSTOMER]: "Customer",
};

const genderLabels: Record<Gender, string> = {
  [Gender.MALE]: "Male",
  [Gender.FEMALE]: "Female",
  [Gender.OTHER]: "Other",
  [Gender.PREFER_NOT_TO_SAY]: "Prefer not to say",
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  account: Account;
  phone_no: string;
  gender: Gender | "";
  dob: string;
};

const emptyValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  account: Account.CUSTOMER,
  phone_no: "",
  gender: "",
  dob: "",
};

export function UserFormDialog({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing: UserRecord | null;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setValues({
        firstName: editing.firstName,
        lastName: editing.lastName,
        email: editing.email,
        password: "",
        account: editing.account,
        phone_no: editing.phone_no,
        gender: editing.gender ?? "",
        dob: editing.dob ? editing.dob.slice(0, 10) : "",
      });
    } else {
      setValues(emptyValues);
    }
    setErrors({});
    setFormError(null);
  }, [open, editing]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const genderValue = values.gender || undefined;

    if (editing) {
      const parsed = adminUpdateUserSchema.safeParse({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone_no: values.phone_no,
        gender: genderValue,
        dob: values.dob || undefined,
      });
      if (!parsed.success) {
        applyErrors(parsed.error.issues);
        return;
      }
      await submit(`/api/admin/users/${editing.id}`, "PATCH", parsed.data);
    } else {
      const parsed = adminCreateUserSchema.safeParse({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        account: values.account,
        phone_no: values.phone_no,
        gender: genderValue,
        dob: values.dob || undefined,
      });
      if (!parsed.success) {
        applyErrors(parsed.error.issues);
        return;
      }
      await submit("/api/admin/users", "POST", parsed.data);
    }
  }

function applyErrors(issues: $ZodIssue[]) {
  const nextErrors: Partial<Record<keyof FormValues, string>> = {};

  for (const issue of issues) {
    const key = issue.path[0];

    if (typeof key !== "string") continue;

    const formKey = key as keyof FormValues;

    if (!nextErrors[formKey]) {
      nextErrors[formKey] = issue.message;
    }
  }

  setErrors(nextErrors);
}

  async function submit(url: string, method: "POST" | "PATCH", data: unknown) {
    setSubmitting(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.refresh();
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
      title={editing ? `Edit ${editing.firstName}` : "Create user"}
      description={editing ? "Update this user's profile details." : "Add a new account with a chosen role."}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              value={values.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={values.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={Boolean(editing)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        {!editing && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={values.password}
                onChange={(e) => update("password", e.target.value)}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="account">Role</Label>
              <select
                id="account"
                value={values.account}
                onChange={(e) => update("account", e.target.value as Account)}
                className="h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                {Object.values(Account).map((role) => (
                  <option key={role} value={role}>
                    {roleLabels[role]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone_no">Phone</Label>
            <Input
              id="phone_no"
              value={values.phone_no}
              onChange={(e) => update("phone_no", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={values.gender}
              onChange={(e) => update("gender", e.target.value as Gender)}
              className="h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <option value="">Not specified</option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {genderLabels[g]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" type="date" value={values.dob} onChange={(e) => update("dob", e.target.value)} />
        </div>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="animate-spin" />}
            {submitting ? "Saving…" : editing ? "Save changes" : "Create user"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
