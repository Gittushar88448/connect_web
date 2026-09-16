import { AdminTopbar } from "@/components/admin/topbar";
import { ModulesTable } from "@/components/admin/modules-table";
import { listModules } from "@/services/modules_ops";

export default async function AdminModulesPage() {
  const modules = await listModules();

  return (
    <>
      <AdminTopbar title="Modules" />
      <div className="flex-1 rounded-none border-border bg-card sm:m-6 sm:rounded-xl sm:border">
        <ModulesTable modules={modules} />
      </div>
    </>
  );
}
