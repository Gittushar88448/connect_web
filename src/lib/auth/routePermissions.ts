import type { Permission } from "./permissions";

interface RouteRule {
  method: string;
  pattern: RegExp;
  permission: Permission;
}

// Order doesn't matter for correctness here — every pattern is fully
// anchored (^...$) and scoped to an exact segment count, so e.g. the
// single-id modules rule can't accidentally match a nested users/[id]/role
// path. Kept grouped by resource for readability.
const rules: RouteRule[] = [
  // /api/admin/modules
  { method: "GET", pattern: /^\/api\/admin\/modules$/, permission: "module:read" },
  { method: "POST", pattern: /^\/api\/admin\/modules$/, permission: "module:create" },
  { method: "PATCH", pattern: /^\/api\/admin\/modules\/[^/]+$/, permission: "module:update" },
  { method: "DELETE", pattern: /^\/api\/admin\/modules\/[^/]+$/, permission: "module:delete" },

  // /api/admin/custom-requests
  {
    method: "GET",
    pattern: /^\/api\/admin\/custom-requests$/,
    permission: "customRequest:read",
  },
  {
    method: "PATCH",
    pattern: /^\/api\/admin\/custom-requests\/[^/]+$/,
    permission: "customRequest:update",
  },

  // /api/admin/users — superadmin-only surface (see lib/auth/acl.ts)
  { method: "GET", pattern: /^\/api\/admin\/users$/, permission: "user:read" },
  { method: "POST", pattern: /^\/api\/admin\/users$/, permission: "user:create" },
  { method: "PATCH", pattern: /^\/api\/admin\/users\/[^/]+$/, permission: "user:update" },
  {
    method: "PATCH",
    pattern: /^\/api\/admin\/users\/[^/]+\/role$/,
    permission: "user:manageRole",
  },
  {
    method: "PATCH",
    pattern: /^\/api\/admin\/users\/[^/]+\/status$/,
    permission: "user:update",
  },
];

/**
 * Returns the permission a request needs, or null if this route isn't
 * governed by the ACL (e.g. anything outside /api/admin/*, which is all
 * the middleware's config.matcher lets through to this function anyway).
 */
export function getRequiredPermission(method: string, pathname: string): Permission | null {
  const rule = rules.find((r) => r.method === method && r.pattern.test(pathname));
  return rule ? rule.permission : null;
}
