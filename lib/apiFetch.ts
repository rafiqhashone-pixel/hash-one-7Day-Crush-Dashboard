//hash-one-7Day-Crush-Dashboard/lib/apiFetch.ts
export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  return fetch(`https://backend.7daycrush.com/api/v1${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}