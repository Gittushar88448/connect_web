
type ApiFetchOptions = RequestInit & {
  retry?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

/**
 * Refresh the access token.
 *
 * If multiple API requests receive 401 at the same time,
 * only one refresh request will be sent.
 */
async function refreshAccessToken(): Promise<boolean> {
  // Another request is already refreshing the token.
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      return response.ok;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiFetch(
  input: RequestInfo | URL,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const { retry = true, ...fetchOptions } = options;

  // First request
  const response = await fetch(input, {
    ...fetchOptions,
    credentials: "include",
  });

  // Request succeeded or failed for some reason other than authentication.
  if (response.status !== 401 || !retry) {
    return response;
  }

  // Access token may have expired.
  const refreshed = await refreshAccessToken();

  // Refresh failed.
  if (!refreshed) {
    return response;
  }

  // Retry the original request once.
  return fetch(input, {
    ...fetchOptions,
    credentials: "include",
  });
}
