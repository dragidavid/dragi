export async function fetcher(url: RequestInfo, init?: RequestInit) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    throw new Error("UNKNOWN_ERROR");
  }

  const body = await res.json();

  return body;
}
