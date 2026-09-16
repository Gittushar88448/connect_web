"use client";

import { Modal } from "@/components/ui/modal";
import type { CustomRequestRecord } from "@/services/custom-requests";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

export function RequestDetailModal({
  request,
  onClose,
}: {
  request: CustomRequestRecord | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={Boolean(request)}
      onClose={onClose}
      title={request?.projectTitle ?? ""}
      description={request ? `Submitted by ${request.contactName} — ${request.contactEmail}` : undefined}
      maxWidth="max-w-2xl"
    >
      {request && (
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Industry" value={request.industry} />
            <Field label="Budget" value={request.budgetRange} />
            <Field label="Timeline" value={request.timeline} />
          </div>
          <Field label="Expected scale" value={request.expectedScale} />
          <Field label="Problem description" value={request.problemDescription} />
          <Field label="Technical requirements" value={request.technicalRequirements} />
          <Field
            label="Integration requirements"
            value={request.integrationRequirements.join(", ")}
          />
          {request.additionalRequirements && (
            <Field label="Additional notes" value={request.additionalRequirements} />
          )}
          {request.adminNote && <Field label="Internal note" value={request.adminNote} />}
        </div>
      )}
    </Modal>
  );
}
