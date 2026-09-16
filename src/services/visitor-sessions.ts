import "server-only";

import dbConnect from "@/lib/dbConnect";
import { VisitorSessionModel } from "@/model/VisitorSession";

export interface VisitorSessionRecord {
  id: string;
  sessionId: string;
  userId: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
  totalActiveMs: number;
  pageViews: number;
  lastPath: string;
  userAgent: string;
}

function serialize(doc: Record<string, unknown>): VisitorSessionRecord {
  return {
    id: String(doc._id),
    sessionId: doc.sessionId as string,
    userId: doc.userId ? String(doc.userId) : null,
    firstSeenAt: new Date(doc.firstSeenAt as string).toISOString(),
    lastSeenAt: new Date(doc.lastSeenAt as string).toISOString(),
    totalActiveMs: doc.totalActiveMs as number,
    pageViews: doc.pageViews as number,
    lastPath: (doc.lastPath as string) ?? "/",
    userAgent: (doc.userAgent as string) ?? "",
  };
}

/**
 * Upserts a heartbeat ping from the client-side tracker. `deltaMs` is the
 * additional active time (tab visible, page open) since the last ping —
 * accumulated client-side and capped here so a suspended/resumed tab can't
 * report an inflated duration.
 */
export async function recordHeartbeat(input: {
  sessionId: string;
  deltaMs: number;
  path: string;
  userAgent: string;
  isNewPageView: boolean;
}) {
  await dbConnect();
  const safeDelta = Math.max(0, Math.min(input.deltaMs, 60_000));

  await VisitorSessionModel.findOneAndUpdate(
    { sessionId: input.sessionId },
    {
      $inc: {
        totalActiveMs: safeDelta,
        pageViews: input.isNewPageView ? 1 : 0,
      },
      $set: {
        lastSeenAt: new Date(),
        lastPath: input.path,
        userAgent: input.userAgent,
      },
      $setOnInsert: {
        firstSeenAt: new Date(),
      },
    },
    { upsert: true, setDefaultsOnInsert: true }
  );
}

export async function linkSessionToNewUser(sessionId: string, userId: string) {
  await dbConnect();
  await VisitorSessionModel.findOneAndUpdate({ sessionId }, { userId });
}

export async function listVisitorSessions(limit = 50): Promise<VisitorSessionRecord[]> {
  try {
    await dbConnect();
    const docs = await VisitorSessionModel.find({})
      .sort({ lastSeenAt: -1 })
      .limit(limit)
      .lean();
    return docs.map((d) => serialize(d as Record<string, unknown>));
  } catch (err) {
    console.warn("[services/visitor-sessions] listVisitorSessions failed:", (err as Error).message);
    return [];
  }
}

export async function visitorSessionStats() {
  try {
    await dbConnect();
    const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000);
    const [totalSessions, activeNow, agg] = await Promise.all([
      VisitorSessionModel.countDocuments({}),
      VisitorSessionModel.countDocuments({ lastSeenAt: { $gte: twoMinAgo } }),
      VisitorSessionModel.aggregate([
        { $group: { _id: null, avgMs: { $avg: "$totalActiveMs" } } },
      ]),
    ]);
    const avgActiveMs = agg[0]?.avgMs ?? 0;
    return { totalSessions, activeNow, avgActiveMs };
  } catch (err) {
    console.warn("[services/visitor-sessions] visitorSessionStats failed:", (err as Error).message);
    return { totalSessions: 0, activeNow: 0, avgActiveMs: 0 };
  }
}
