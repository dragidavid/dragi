export async function fetcher(url: RequestInfo, init?: RequestInit) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  const body = await res.json();

  if (!res.ok) {
    const { code } = body;

    if (!code) {
      throw new Error("UNKNOWN_ERROR");
    }

    throw new Error(code);
  }

  return body;
}
