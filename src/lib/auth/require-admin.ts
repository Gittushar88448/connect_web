/**
 * !! SECURITY PLACEHOLDER — READ BEFORE DEPLOYING !!
 *
 * There is no authentication/session system wired up in this project yet
 * (login/signup are still mocked — see components/auth/login-form.tsx).
 * Because of that, this function cannot actually verify anything right now
 * and currently allows every request through unconditionally.
 *
 * That means: the /admin pages and every /api/admin/* route are NOT
 * protected. Anyone who finds the URLs can currently create, edit, or
 * delete modules. Do not deploy this publicly until this function is
 * replaced with a real check — e.g. reading the session (NextAuth,
 * Lucia, or your auth provider of choice), confirming a role of "admin"
 * or "superadmin", and throwing/redirecting otherwise.
 *
 * Every /api/admin/* route handler and the /admin layout call this
 * function specifically so that wiring real auth later is a one-file
 * change instead of hunting through every route.
 */
export async function requireAdmin(): Promise<void> {
  // TODO: replace with a real session + role check.
  return;
}
