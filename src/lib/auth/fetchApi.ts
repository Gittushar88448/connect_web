type ApiFetchOptions = RequestInit & {
  retry?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
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

      /*
       * Only the actual refresh operation
       * dispatches this event.
       */
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

  const requestOptions: RequestInit = {
    ...fetchOptions,
    credentials: "include",
  };

  let response = await fetch(
    input,
    requestOptions
  );

  /*
   * Normal response.
   */
  if (response.status !== 401 || !retry) {
    return response;
  }

  /*
   * Access token expired.
   */
  const refreshed =
    await refreshAccessToken();

  if (!refreshed) {
    return response;
  }

  /*
   * Retry original request with the new
   * access-token cookie.
   */
  response = await fetch(
    input,
    requestOptions
  );

  return response;
}