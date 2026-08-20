// ACL routes to prevent access control for Protected Routes!!!

import { Account } from "@/model/User";
import {
  Permission,
} from "./permissions";

const ACL: Record<
  Account,
  Permission[]
> = {
  customer: [
    "product:read",
    "order:read",
    "order:create",
    "order:cancel",
  ],

  admin: [
    "product:read",
    "product:create",
    "product:update",
    "product:delete",

    "order:read",
    "order:update",
  ],

  superadmin: [
    "product:read",
    "product:create",
    "product:update",
    "product:delete",

    "order:read",
    "order:update",

    "coupon:create",
    "coupon:update",
    "coupon:delete",

    "user:read",
    "user:update",

    "report:read",

    "admin:manage",
  ],
};

export function hasPermission(
  account: Account,
  permission: Permission
): boolean {
  return ACL[account]?.includes(permission) ?? false;
}