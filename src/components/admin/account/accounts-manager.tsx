"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RoleSelect } from "@/components/admin/account/role-select";
import { StatusToggle } from "@/components/admin/account/status-toggle";
import { UserFormDialog } from "@/components/admin/account/user-form-dialog";
import { Account, UserStatus } from "@/types/user-enums";
import type { UserRecord } from "@/services/users";

const statusStyles: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "bg-primary/10 text-primary",
  [UserStatus.PENDING]: "bg-brand-amber/15 text-brand-amber",
  [UserStatus.INACTIVE]: "bg-secondary text-muted-foreground",
  [UserStatus.SUSPENDED]: "bg-destructive/10 text-destructive",
};

function AccountSection({
  title,
  users,
  onEdit,
}: {
  title: string;
  users: UserRecord[];
  onEdit: (user: UserRecord) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">
          {title} <span className="text-muted-foreground">({users.length})</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground uppercase">
              <th className="border-b border-border px-5 py-2.5 font-medium">Name</th>
              <th className="border-b border-border px-5 py-2.5 font-medium">Contact</th>
              <th className="border-b border-border px-5 py-2.5 font-medium">Role</th>
              <th className="border-b border-border px-5 py-2.5 font-medium">Status</th>
              <th className="border-b border-border px-5 py-2.5 font-medium">Joined</th>
              <th className="border-b border-border px-5 py-2.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="border-b border-border px-5 py-8 text-center text-muted-foreground">
                  None yet.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="border-b border-border px-5 py-3 font-medium text-foreground">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="border-b border-border px-5 py-3 text-muted-foreground">
                    <p>{u.email}</p>
                    {u.phone_no && <p className="text-xs">{u.phone_no}</p>}
                  </td>
                  <td className="border-b border-border px-5 py-3">
                    <RoleSelect userId={u.id} currentAccount={u.account} />
                  </td>
                  <td className="border-b border-border px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[u.userStatus]}`}>
                      {u.userStatus}
                    </span>
                  </td>
                  <td className="border-b border-border px-5 py-3 text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-b border-border px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${u.firstName}`}
                        nativeButton={false}
                        onClick={() => onEdit(u)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <StatusToggle userId={u.id} currentStatus={u.userStatus} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AccountsManager({ users }: { users: UserRecord[] }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<UserRecord | null>(null);

  const customers = users.filter((u) => u.account === Account.CUSTOMER);
  const admins = users.filter((u) => u.account === Account.ADMIN);
  const superadmins = users.filter((u) => u.account === Account.SUPERADMIN);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(user: UserRecord) {
    setEditing(user);
    setFormOpen(true);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <Button onClick={openCreate} nativeButton={false}>
          <Plus className="size-4" />
          Create user
        </Button>
      </div>

      <AccountSection title="Customers" users={customers} onEdit={openEdit} />
      <AccountSection title="Admins" users={admins} onEdit={openEdit} />
      <AccountSection title="Super Admins" users={superadmins} onEdit={openEdit} />

      <UserFormDialog open={formOpen} onClose={() => setFormOpen(false)} editing={editing} />
    </div>
  );
}
