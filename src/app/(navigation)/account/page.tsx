import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth/get-current-user";

export const metadata: Metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="size-16 rounded-full object-cover" />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">
            {user.firstName[0]}
          </div>
        )}
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Welcome, {user.firstName}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="text-xs text-muted-foreground uppercase">Account type</dt>
          <dd className="mt-1 text-sm font-medium text-foreground capitalize">{user.account}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="text-xs text-muted-foreground uppercase">Status</dt>
          <dd className="mt-1 text-sm font-medium text-foreground capitalize">{user.userStatus}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="text-xs text-muted-foreground uppercase">Coin balance</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{user.coinBalance}</dd>
        </div>
      </dl>

      <p className="mt-8 rounded-lg border border-dashed border-border bg-card p-4 text-xs text-muted-foreground">
        This is a minimal placeholder confirming the login flow works end
        to end. A full account dashboard (service requests, saved
        addresses, security settings) is a separate build.
      </p>
    </div>
  );
}
