import { Activity, Clock, Users as UsersIcon, UserCheck } from "lucide-react";

import { AdminTopbar } from "@/components/admin/topbar";
import { KpiCard } from "@/components/admin/kpi-card";
import { listUsers, countUsers } from "@/services/users";
import { listVisitorSessions, visitorSessionStats } from "@/services/visitor-sessions";
import { formatDuration, timeAgo } from "@/lib/utils/duration";

export default async function AdminUsersPage() {
  const [totalUsers, users, sessionStats, sessions] = await Promise.all([
    countUsers(),
    listUsers(),
    visitorSessionStats(),
    listVisitorSessions(50),
  ]);

  const userIdSet = new Set(users.map((u) => u.id));

  return (
    <>
      <AdminTopbar title="Users & Visitors" />

      <div className="flex-1 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard icon={UserCheck} label="Registered users" value={totalUsers} tone="teal" />
          <KpiCard
            icon={UsersIcon}
            label="Visitor sessions"
            value={sessionStats.totalSessions}
            tone="slate"
            hint="Anonymous + registered, all time"
          />
          <KpiCard
            icon={Activity}
            label="Active now"
            value={sessionStats.activeNow}
            tone="amber"
            hint="Heartbeat in the last 2 min"
          />
          <KpiCard
            icon={Clock}
            label="Avg. time on site"
            value={formatDuration(sessionStats.avgActiveMs)}
            tone="teal"
          />
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">How to read this:</strong> "Registered users" are
          real accounts created via signup. "Visitor sessions" track anonymous
          browsing time via a cookie, matched to a user only at the moment
          they sign up in that same browser — there is no live login-session
          system yet, so this can&apos;t show who is <em>currently</em> logged
          in, only which sessions ever converted to an account.
        </div>

        {/* Registered users */}
        <div className="mt-8 rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Registered users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase">
                  <th className="border-b border-border px-5 py-2.5 font-medium">Name</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Email</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Joined</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Verified</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="border-b border-border px-5 py-8 text-center text-muted-foreground">
                      No registered users yet.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td className="border-b border-border px-5 py-3 font-medium text-foreground">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="border-b border-border px-5 py-3 text-muted-foreground">{u.email}</td>
                      <td className="border-b border-border px-5 py-3 text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border-b border-border px-5 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            u.is_verified
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {u.is_verified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visitor sessions */}
        <div className="mt-8 rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Visitor sessions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase">
                  <th className="border-b border-border px-5 py-2.5 font-medium">Session</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">First seen</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Last seen</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Time on site</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Pages</th>
                  <th className="border-b border-border px-5 py-2.5 font-medium">Account</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border-b border-border px-5 py-8 text-center text-muted-foreground">
                      No visitor sessions recorded yet.
                    </td>
                  </tr>
                ) : (
                  sessions.map((s) => (
                    <tr key={s.id}>
                      <td className="border-b border-border px-5 py-3 font-[family-name:var(--font-data)] text-xs text-foreground">
                        {s.sessionId.slice(0, 8)}…
                      </td>
                      <td className="border-b border-border px-5 py-3 text-muted-foreground">
                        {timeAgo(s.firstSeenAt)}
                      </td>
                      <td className="border-b border-border px-5 py-3 text-muted-foreground">
                        {timeAgo(s.lastSeenAt)}
                      </td>
                      <td className="border-b border-border px-5 py-3 text-foreground">
                        {formatDuration(s.totalActiveMs)}
                      </td>
                      <td className="border-b border-border px-5 py-3 text-muted-foreground">
                        {s.pageViews}
                      </td>
                      <td className="border-b border-border px-5 py-3">
                        {s.userId && userIdSet.has(s.userId) ? (
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                            Registered
                          </span>
                        ) : (
                          <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                            Anonymous
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
