export class HttpError extends Error {
  constructor(
    public status: number,
    public body?: unknown,
  ) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
  }
}

/**
 * Sends an HTTP request and parses the JSON response.
 *
 * This function wraps `fetch`, automatically parses the response as JSON,
 * and throws an `HttpError` if the response status is not OK.
 *
 * @template T - The expected type of the parsed response body.
 * @param url - The URL to send the request to.
 * @param options - Optional `fetch` options (method, headers, body, etc.).
 * @throws {TypeError} If the network request fails (DNS, TLS, offline, CORS)
 * @throws {HttpError} If the HTTP response status is not OK (non-2xx)
 * @throws {Error} If the response cannot be parsed as JSON
 * @returns The parsed JSON response typed as `T`.
 */
export async function requestJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);

  const text = await res.text();
  let body: unknown = undefined;

  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    throw new Error("Failed to parse JSON response");
  }

  if (!res.ok) {
    throw new HttpError(res.status, body);
  }

  return body as T;
}

/**
 * Sends a POST request with a JSON body and parses JSON response.
 * Optionally validates the response shape with a runtime type guard.
 *
 * @template T - Type of the expected response body
 * @param url - URL to send request to
 * @param body - Object to serialize as JSON
 * @param options - Optional fetch options (headers, credentials, etc.)
 * @param validate - Optional type guard to check response shape at runtime
 * @throws {TypeError} If the network request fails (DNS, TLS, offline, CORS)
 * @throws {HttpError} If the HTTP response status is not OK (non-2xx)
 * @throws {Error} If the response cannot be parsed as JSON
 * @returns The response parsed as type T
 */
export async function postJson<T>(
  url: string,
  body: unknown,
  options?: Omit<RequestInit, "method" | "body">,
  validate?: (data: unknown) => data is T,
): Promise<T> {
  const data = await requestJson<unknown>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify(body),
    ...options,
  });

  // If a validator is provided, check the response
  if (validate && !validate(data)) {
    throw new Error(
      `POST ${url} returned invalid response shape: ${JSON.stringify(data)}`,
    );
  }

  return data as T;
}
