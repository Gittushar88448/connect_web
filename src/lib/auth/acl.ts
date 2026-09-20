// ACL for the /api/admin/* surface — enforced by proxy.ts (wired up as
// middleware.ts) before a request even reaches its route handler.
//
// This list is intentionally kept in sync with what each route's own
// requireAdmin()/requireSuperAdmin() guard already enforces (see those
// files and each app/api/admin/**/route.ts), rather than inventing a
// separate source of truth: modules and custom requests are admin-or-
// superadmin; anything under /api/admin/users/* (account creation, role
// changes, enable/disable) is superadmin-only, since that surface can
// promote any account to superadmin.

import { Account } from "@/types/user-enums";
import type { Permission } from "./permissions";

const ACL: Record<Account, Permission[]> = {
  [Account.CUSTOMER]: [
    // Customers never reach the /api/admin/* surface at all — nothing
    // in the ACL for them isn't a bug, it's the point.
  ],

  [Account.ADMIN]: [
    "module:read",
    "module:create",
    "module:update",
    "module:delete",

    "customRequest:read",
    "customRequest:update",

    "analytics:read",
  ],

  [Account.SUPERADMIN]: [
    "module:read",
    "module:create",
    "module:update",
    "module:delete",

    "customRequest:read",
    "customRequest:update",

    "analytics:read",

    "user:read",
    "user:create",
    "user:update",
    "user:manageRole",

    "admin:manage",
  ],
};

export function hasPermission(account: Account, permission: Permission): boolean {
  return ACL[account]?.includes(permission) ?? false;
}
