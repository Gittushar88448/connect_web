"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  itemName,
  submitting,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  submitting: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Delete module" maxWidth="max-w-sm">
      <p className="text-sm text-muted-foreground">
        Delete <span className="font-medium text-foreground">{itemName}</span>? This removes
        it from the public site immediately and can&apos;t be undone.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={submitting}
          className="bg-destructive text-white hover:bg-destructive/90"
        >
          {submitting && <Loader2 className="animate-spin" />}
          {submitting ? "Deleting…" : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}
