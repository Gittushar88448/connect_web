import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 text-6xl font-bold">
          403
        </div>

        <h1 className="text-2xl font-semibold">
          Access denied
        </h1>

        <p className="mt-3 text-muted-foreground">
          You are authenticated, but you don't have
          permission to access this resource.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Go Home
          </Link>

          <Link
            href="/account"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            My Account
          </Link>
        </div>
      </div>
    </main>
  );
}