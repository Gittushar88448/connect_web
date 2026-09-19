import { ShieldAlert, UserCog, Users as UsersIcon, Crown } from "lucide-react";

import { AdminTopbar } from "@/components/admin/topbar";
import { KpiCard } from "@/components/admin/kpi-card";
import { AccountsManager } from "@/components/admin/account/accounts-manager";
import { requireSuperAdmin } from "@/lib/auth/require-superadmin";
import { Account } from "@/types/user-enums";
import { listUsers } from "@/services/users";

export default async function AdminAccountPage() {
  // See lib/auth/require-superadmin.ts — this does not yet enforce anything.
  await requireSuperAdmin();

  const users = await listUsers();
  const customers = users.filter((u) => u.account === Account.CUSTOMER).length;
  const admins = users.filter((u) => u.account === Account.ADMIN).length;
  const superadmins = users.filter((u) => u.account === Account.SUPERADMIN).length;

  return (
    <>
      <AdminTopbar title="Accounts" />

      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-6 flex items-start gap-2 rounded-xl border border-dashed border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-brand-amber" aria-hidden="true" />
          <span>
            <strong className="text-foreground">Superadmin-only page.</strong>
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard icon={UsersIcon} label="Customers" value={customers} tone="slate" />
          <KpiCard icon={UserCog} label="Admins" value={admins} tone="teal" />
          <KpiCard icon={Crown} label="Super Admins" value={superadmins} tone="amber" />
        </div>

        <div className="mt-6">
          <AccountsManager users={users} />
        </div>
      </div>
    </>
  );
}
