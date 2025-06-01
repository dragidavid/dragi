export async function fetcher<T = unknown>(url: RequestInfo): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const error: { info?: unknown; status?: number } & Error = new Error(
      "Request failed",
    );

    error.status = res.status;

    try {
      error.info = await res.json();
    } catch {
      error.info = { message: res.statusText };
    }

    throw error;
  }

  try {
    return await res.json();
  } catch {
    return null as T;
  }
}
