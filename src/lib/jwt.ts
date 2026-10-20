import { decodeBase64 } from "@/lib/base64";

export type JwtError = "segments" | "header" | "payload";

export type DecodedJwt = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
};

export type JwtResult = { ok: true; jwt: DecodedJwt } | { ok: false; error: JwtError };

function decodeSegment(segment: string) {
  const json = decodeBase64(segment);
  if (json === null) return null;
  try {
    const value: unknown = JSON.parse(json);
    return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function decodeJwt(token: string): JwtResult {
  const parts = token.trim().replace(/^Bearer\s+/i, "").split(".");
  if (parts.length !== 3 || !parts[0] || !parts[1]) return { ok: false, error: "segments" };
  const header = decodeSegment(parts[0]);
  if (!header) return { ok: false, error: "header" };
  const payload = decodeSegment(parts[1]);
  if (!payload) return { ok: false, error: "payload" };
  return { ok: true, jwt: { header, payload, signature: parts[2] } };
}

export const JWT_TIME_CLAIMS = ["iat", "nbf", "exp"] as const;

export type JwtTimeClaim = (typeof JWT_TIME_CLAIMS)[number];

export function jwtTimeClaims(payload: Record<string, unknown>) {
  return JWT_TIME_CLAIMS.flatMap((claim) => {
    const value = payload[claim];
    return typeof value === "number" ? [{ claim, date: new Date(value * 1000) }] : [];
  });
}
