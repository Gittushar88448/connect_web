export const ACCOUNT = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  CUSTOMER: "customer",
} as const;

export const ACCOUNT_TYPE = {
  SUPERADMIN: 0,
  ADMIN: 1,
  CUSTOMER: 2,
} as const;

export type Account = (typeof ACCOUNT)[keyof typeof ACCOUNT];

export function isAdminAccount(
  account: unknown,
  type: unknown
): boolean {
  return (
    (account === ACCOUNT.SUPERADMIN &&
      type === ACCOUNT_TYPE.SUPERADMIN) ||
    (account === ACCOUNT.ADMIN &&
      type === ACCOUNT_TYPE.ADMIN)
  );
}

export function isSuperAdmin(
  account: unknown,
  type: unknown
): boolean {
  return (
    account === ACCOUNT.SUPERADMIN &&
    type === ACCOUNT_TYPE.SUPERADMIN
  );
}

export function isAdmin(
  account: unknown,
  type: unknown
): boolean {
  return (
    account === ACCOUNT.ADMIN &&
    type === ACCOUNT_TYPE.ADMIN
  );
}