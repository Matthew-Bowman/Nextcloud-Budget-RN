import { postJson } from "@/core/http/client";
import { LoginV2Response } from "./types";
import { isLoginV2Response } from "./validation";



/**
 * Initiates Nextcloud Login Flow v2.
 *
 * Sends a POST request to /index.php/login/v2 and validates
 * the response shape using `isLoginV2Response`.
 *
 * @param baseUrl - Base URL of the Nextcloud server (including https://)
 * @throws {TypeError} If the network request fails (DNS, TLS, CORS, etc.)
 * @throws {HttpError} If the HTTP response status is not OK (non-2xx)
 * @throws {Error} If the response cannot be parsed as JSON
 * @throws {Error} If the response does not match the expected LoginV2Response shape
 * @returns The validated LoginV2Response object
 */
export async function startLoginV2(baseUrl: string): Promise<LoginV2Response> {
  const url = `${baseUrl.replace(/\/$/, "")}/index.php/login/v2`;
  return postJson<LoginV2Response>(url, {}, undefined, isLoginV2Response);
}