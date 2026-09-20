// This project pivoted away from e-commerce (no products, orders, or
// coupons exist anymore — see /admin/modules, /admin/custom-requests,
// /admin/account instead). Permissions below reflect what's actually in
// the app today.

export type Permission =
  | "module:read"
  | "module:create"
  | "module:update"
  | "module:delete"
  | "customRequest:read"
  | "customRequest:update"
  | "user:read"
  | "user:create"
  | "user:update"
  | "user:manageRole"
  | "analytics:read"
  | "admin:manage";
