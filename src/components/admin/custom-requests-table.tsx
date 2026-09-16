"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RequestDetailModal } from "@/components/admin/request-detail-modal";
import { AppointmentDialog } from "@/components/admin/appointment-dialog";
import type { CustomRequestRecord } from "@/services/custom-requests";
import { apiFetch } from "@/lib/auth/fetchApi";

const statusStyles: Record<CustomRequestRecord["status"], string> = {
  pending: "bg-secondary text-muted-foreground",
  accepted: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
  appointment_booked: "bg-brand-amber/15 text-brand-amber",
};

const statusLabels: Record<CustomRequestRecord["status"], string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  appointment_booked: "Appointment booked",
};

export function CustomRequestsTable({ requests }: { requests: CustomRequestRecord[] }) {
  const router = useRouter();
  const [viewing, setViewing] = useState<CustomRequestRecord | null>(null);
  const [bookingFor, setBookingFor] = useState<CustomRequestRecord | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function patchStatus(
    id: string,
    body: { status: CustomRequestRecord["status"]; appointmentAt?: string | null }
  ) {
    setPendingId(id);
    try {
      const res = await apiFetch(`/api/admin/custom-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function handleBookAppointment(isoDate: string) {
    if (!bookingFor) return;
    await patchStatus(bookingFor.id, { status: "appointment_booked", appointmentAt: isoDate });
    setBookingFor(null);
  }

  return (
    <>
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-[860px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground uppercase">
              <th className="border-b border-border px-3 py-2.5 font-medium">Project</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Contact</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Industry</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Budget</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Status</th>
              <th className="border-b border-border px-3 py-2.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="border-b border-border px-3 py-10 text-center text-muted-foreground">
                  No requests submitted yet.
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id}>
                  <td className="border-b border-border px-3 py-3">
                    <button
                      type="button"
                      onClick={() => setViewing(r)}
                      className="text-left font-medium text-foreground hover:text-primary hover:underline"
                    >
                      {r.projectTitle}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                    {r.status === "appointment_booked" && r.appointmentAt && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-brand-amber">
                        <CalendarClock className="size-3" aria-hidden="true" />
                        {new Date(r.appointmentAt).toLocaleString()}
                      </p>
                    )}
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    <p className="text-foreground">{r.contactName}</p>
                    <p className="text-xs text-muted-foreground">{r.contactEmail}</p>
                  </td>
                  <td className="border-b border-border px-3 py-3 text-muted-foreground">{r.industry}</td>
                  <td className="border-b border-border px-3 py-3 text-muted-foreground">{r.budgetRange}</td>
                  <td className="border-b border-border px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[r.status]}`}>
                      {statusLabels[r.status]}
                    </span>
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Accept ${r.projectTitle}`}
                        title="Accept"
                        disabled={pendingId === r.id}
                        onClick={() => patchStatus(r.id, { status: "accepted" })}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Check className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Reject ${r.projectTitle}`}
                        title="Reject"
                        disabled={pendingId === r.id}
                        onClick={() => patchStatus(r.id, { status: "rejected" })}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Book an appointment for ${r.projectTitle}`}
                        title="Book an appointment"
                        disabled={pendingId === r.id}
                        onClick={() => setBookingFor(r)}
                        className="text-brand-amber hover:bg-brand-amber/10"
                      >
                        <CalendarClock className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <RequestDetailModal request={viewing} onClose={() => setViewing(null)} />

      <AppointmentDialog
        open={Boolean(bookingFor)}
        onClose={() => setBookingFor(null)}
        onConfirm={handleBookAppointment}
        submitting={pendingId === bookingFor?.id}
        projectTitle={bookingFor?.projectTitle ?? ""}
      />
    </>
  );
}
