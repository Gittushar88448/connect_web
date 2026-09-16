"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";

export function AppointmentDialog({
  open,
  onClose,
  onConfirm,
  submitting,
  projectTitle,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (isoDate: string) => void;
  submitting: boolean;
  projectTitle: string;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleConfirm() {
    if (!value) {
      setError("Pick a date and time");
      return;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      setError("Enter a valid date and time");
      return;
    }
    setError(null);
    onConfirm(date.toISOString());
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Book an appointment"
      description={`Schedule a call for "${projectTitle}".`}
      maxWidth="max-w-sm"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="appointment-datetime">Date & time</Label>
        <Input
          id="appointment-datetime"
          type="datetime-local"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={Boolean(error)}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={submitting}>
          {submitting && <Loader2 className="animate-spin" />}
          {submitting ? "Booking…" : "Confirm booking"}
        </Button>
      </div>
    </Modal>
  );
}
