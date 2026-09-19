"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Account } from "@/types/user-enums";
import { tintStyles } from "@/components/shared/tint";

const roleLabels: Record<Account, string> = {
  [Account.SUPERADMIN]: "Super Admin",
  [Account.ADMIN]: "Admin",
  [Account.CUSTOMER]: "Customer",
};

// Superadmin is the most sensitive role, so it gets the "loudest" tint;
// admin next; customer stays neutral.
const roleTint: Record<Account, keyof typeof tintStyles> = {
  [Account.SUPERADMIN]: "amber",
  [Account.ADMIN]: "teal",
  [Account.CUSTOMER]: "slate",
};

export function RoleSelect({ userId, currentAccount }: { userId: string; currentAccount: Account }) {
  const router = useRouter();
  const [value, setValue] = useState(currentAccount);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: Account) {
    const previous = value;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: next }),
      });
      if (!res.ok) {
        setValue(previous);
      } else {
        router.refresh();
      }
    } catch {
      setValue(previous);
    } finally {
      setSaving(false);
    }
  }

  const tint = tintStyles[roleTint[value]];

  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        disabled={saving}
        onChange={(e) => handleChange(e.target.value as Account)}
        className={`appearance-none rounded-full border-0 py-1 pr-7 pl-2.5 text-[11px] font-medium outline-none disabled:opacity-60 ${tint.tag}`}
      >
        {Object.values(Account).map((role) => (
          <option key={role} value={role}>
            {roleLabels[role]}
          </option>
        ))}
      </select>
      {saving && (
        <Loader2 className="pointer-events-none absolute right-2 size-3 animate-spin" aria-hidden="true" />
      )}
    </div>
  );
}
