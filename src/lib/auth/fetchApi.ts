type ApiFetchOptions = RequestInit & {
  retry?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

export async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(
        "/api/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        return false;
      }


      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new Event("auth:token-refreshed")
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Token refresh failed:",
        error
      );

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
  const {
    retry = true,
    ...fetchOptions
  } = options;

  const response = await fetch(input, {
    ...fetchOptions,
    credentials: "include",
  });


  if (response.status !== 401) {
    return response;
  }

  if (!retry) {
    return response;
  }

  const refreshed =
    await refreshAccessToken();

  if (!refreshed) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new Event("auth:session-expired")
      );
    }

    return response;
  }

  return fetch(input, {
    ...fetchOptions,
    credentials: "include",
  });
}