export default async function fetcher<T>(
  url: string,
  data: {} | null
): Promise<T> {
  const res = await fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
