import { CalendarClock, Check, Clock, X } from "lucide-react";

import { AdminTopbar } from "@/components/admin/topbar";
import { KpiCard } from "@/components/admin/kpi-card";
import { CustomRequestsTable } from "@/components/admin/custom-requests-table";
import { countCustomRequestsByStatus, listCustomRequests } from "@/services/custom-requests";

export default async function AdminCustomRequestsPage() {
  const [counts, requests] = await Promise.all([
    countCustomRequestsByStatus(),
    listCustomRequests(),
  ]);

  return (
    <>
      <AdminTopbar title="Custom Solution Requests" />

      <div className="flex-1 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard icon={Clock} label="Pending" value={counts.pending} tone="slate" />
          <KpiCard icon={Check} label="Accepted" value={counts.accepted} tone="teal" />
          <KpiCard icon={X} label="Rejected" value={counts.rejected} tone="slate" />
          <KpiCard
            icon={CalendarClock}
            label="Appointments booked"
            value={counts.appointment_booked}
            tone="amber"
          />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card">
          <CustomRequestsTable requests={requests} />
        </div>
      </div>
    </>
  );
}
