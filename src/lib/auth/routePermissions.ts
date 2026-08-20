import { Permission } from "./permissions";

interface RoutePermission {
  method: string;
  pattern: RegExp;
  permission: Permission;
}

export const ROUTE_PERMISSIONS: RoutePermission[] = [


  {
    method: "GET",
    pattern: /^\/api\/products$/,
    permission: "product:read",
  },

  {
    method: "POST",
    pattern: /^\/api\/products$/,
    permission: "product:create",
  },

  {
    method: "POST",
    pattern: /^\/api\/products\/[^/]+$/,
    permission: "product:update",
  },

  {
    method: "POST",
    pattern: /^\/api\/products\/[^/]+$/,
    permission: "product:delete",
  },


  // =========================
  // ORDERS
  // =========================

  {
    method: "GET",
    pattern: /^\/api\/orders$/,
    permission: "order:read",
  },

  {
    method: "POST",
    pattern: /^\/api\/orders$/,
    permission: "order:create",
  },

  {
    method: "POST",
    pattern: /^\/api\/orders\/[^/]+$/,
    permission: "order:update",
  },

  {
    method: "POST",
    pattern: /^\/api\/orders\/[^/]+$/,
    permission: "order:cancel",
  },


  // =========================
  // COUPONS
  // =========================

  {
    method: "POST",
    pattern: /^\/api\/coupons$/,
    permission: "coupon:create",
  },

  {
    method: "POST",
    pattern: /^\/api\/coupons\/[^/]+$/,
    permission: "coupon:update",
  },

  {
    method: "POST",
    pattern: /^\/api\/coupons\/[^/]+$/,
    permission: "coupon:delete",
  },


  // =========================
  // USERS
  // =========================

  {
    method: "GET",
    pattern: /^\/api\/users$/,
    permission: "user:read",
  },

  {
    method: "POST",
    pattern: /^\/api\/users\/[^/]+$/,
    permission: "user:update",
  },


  // =========================
  // REPORTS
  // =========================

  {
    method: "GET",
    pattern: /^\/api\/reports$/,
    permission: "report:read",
  },


  // =========================
  // ADMIN
  // =========================

  {
    method: "GET",
    pattern: /^\/api\/admin(?:\/.*)?$/,
    permission: "admin:manage",
  },
];

export function getRequiredPermission(
  method: string,
  pathname: string
): Permission | null {
  const route = ROUTE_PERMISSIONS.find(
    (route) =>
      route.method === method &&
      route.pattern.test(pathname)
  );

  return route?.permission ?? null;
}
