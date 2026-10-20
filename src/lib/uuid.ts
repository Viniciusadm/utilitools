export type UuidVersion = "v4" | "v7";

export type UuidFormat = {
  uppercase: boolean;
  hyphens: boolean;
};

function toUuidString(bytes: Uint8Array) {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUuid(version: UuidVersion, now = Date.now()) {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  if (version === "v7") {
    for (let i = 0; i < 6; i++) bytes[i] = Math.floor(now / 2 ** (8 * (5 - i))) % 256;
  }
  bytes[6] = (bytes[6] & 0x0f) | (version === "v7" ? 0x70 : 0x40);
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return toUuidString(bytes);
}

export function formatUuid(uuid: string, { uppercase, hyphens }: UuidFormat) {
  const withHyphens = hyphens ? uuid : uuid.replace(/-/g, "");
  return uppercase ? withHyphens.toUpperCase() : withHyphens;
}

export const UUID_PATTERN = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-8][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;
