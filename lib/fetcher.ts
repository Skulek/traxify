import { CustomError } from "./error";

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
  if (!res.ok) {
    const error: CustomError = {
      message: "An error occurred while fetching the data.",
      additionalMessage: await res.json(),
      status: res.status,
    };
    throw error;
  }
  return res.json();
}
