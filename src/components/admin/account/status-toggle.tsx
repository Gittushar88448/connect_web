"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserStatus } from "@/types/user-enums";

export function StatusToggle({ userId, currentStatus }: { userId: string; currentStatus: UserStatus }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const isDisabled = currentStatus === UserStatus.SUSPENDED;
  const nextStatus = isDisabled ? UserStatus.ACTIVE : UserStatus.SUSPENDED;

  async function handleClick() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userStatus: nextStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={saving}
      className={isDisabled ? "text-primary hover:bg-primary/10" : "text-destructive hover:bg-destructive/10"}
    >
      {saving && <Loader2 className="animate-spin" />}
      {isDisabled ? "Enable" : "Disable"}
    </Button>
  );
}
