"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModuleFormDialog } from "@/components/admin/module-form-dialog";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { tintStyles } from "@/components/shared/tint";
import type { ModuleRecord } from "@/services/modules_ops";

export function ModulesTable({ modules }: { modules: ModuleRecord[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ModuleRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ModuleRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(module: ModuleRecord) {
    setEditing(module);
    setFormOpen(true);
  }

  function handleSaved() {
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/modules/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteTarget(null);
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
        <p className="text-sm text-muted-foreground">
          {modules.length} {modules.length === 1 ? "module" : "modules"}
        </p>
        <Button size="sm" onClick={openCreate}>
          <Plus className="size-4" />
          New module
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto px-4 pb-6 sm:px-6">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground uppercase">
              <th className="border-b border-border px-3 py-2.5 font-medium">Name</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Tag</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Color</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Features</th>
              <th className="border-b border-border px-3 py-2.5 font-medium">Status</th>
              <th className="border-b border-border px-3 py-2.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.length === 0 ? (
              <tr>
                <td colSpan={6} className="border-b border-border px-3 py-10 text-center text-muted-foreground">
                  No modules yet — create your first one.
                </td>
              </tr>
            ) : (
              modules.map((m) => (
                <tr key={m.id} className="group">
                  <td className="border-b border-border px-3 py-3">
                    <p className="font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">/{m.slug}</p>
                  </td>
                  <td className="border-b border-border px-3 py-3 text-muted-foreground">{m.tag}</td>
                  <td className="border-b border-border px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tintStyles[m.color].tag}`}>
                      {m.color}
                    </span>
                  </td>
                  <td className="border-b border-border px-3 py-3 text-muted-foreground">
                    {m.features.length}
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        m.isActive ? tintStyles.teal.tag : tintStyles.slate.tag
                      }`}
                    >
                      {m.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${m.name}`}
                        onClick={() => openEdit(m)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${m.name}`}
                        onClick={() => setDeleteTarget(m)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModuleFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editing={editing}
        onSaved={handleSaved}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name ?? ""}
        submitting={deleting}
      />
    </>
  );
}
