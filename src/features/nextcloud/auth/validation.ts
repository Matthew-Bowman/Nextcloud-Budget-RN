import type { LoginV2Response } from "./types";

/**
 * Runtime type guard for Nextcloud Login Flow v2 response.
 */
export function isLoginV2Response(obj: unknown): obj is LoginV2Response {
  if (!obj || typeof obj !== "object") return false;

  const o = obj as Record<string, unknown>;

  return (
    typeof o.login === "string" &&
    typeof o.poll === "object" &&
    o.poll !== null &&
    typeof (o.poll as Record<string, unknown>).token === "string" &&
    typeof (o.poll as Record<string, unknown>).endpoint === "string"
  );
}