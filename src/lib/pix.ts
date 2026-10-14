export type PixKeyType = "document" | "phone" | "email" | "random";

export type PixInput = {
  keyType: PixKeyType;
  key: string;
  name: string;
  city: string;
  amount?: number | null;
  txid?: string;
  description?: string;
};

export const MAX_NAME_LENGTH = 25;
export const MAX_CITY_LENGTH = 15;
export const MAX_TXID_LENGTH = 25;
const MAX_ACCOUNT_INFO_LENGTH = 99;
const PIX_GUI = "br.gov.bcb.pix";

export function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function field(id: string, value: string) {
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

export function toPixText(value: string, maxLength: number) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 $%*+\-./:]/g, "")
    .trim()
    .toUpperCase()
    .slice(0, maxLength);
}

export function normalizePixKey(keyType: PixKeyType, key: string) {
  const trimmed = key.trim();
  switch (keyType) {
    case "document":
      return trimmed.replace(/\D/g, "");
    case "phone": {
      const digits = trimmed.replace(/\D/g, "");
      return digits.startsWith("55") && digits.length >= 12 ? `+${digits}` : `+55${digits}`;
    }
    case "email":
      return trimmed.toLowerCase();
    case "random":
      return trimmed.toLowerCase();
  }
}

export function pixKeyError(keyType: PixKeyType, key: string) {
  const normalized = normalizePixKey(keyType, key);
  if (!key.trim()) return "Informe a chave Pix.";
  switch (keyType) {
    case "document":
      return [11, 14].includes(normalized.length) ? null : "CPF deve ter 11 dígitos e CNPJ 14.";
    case "phone":
      return /^\+55\d{10,11}$/.test(normalized) ? null : "Informe o telefone com DDD.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? null : "E-mail inválido.";
    case "random":
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(normalized)
        ? null
        : "A chave aleatória tem 32 caracteres no formato 00000000-0000-0000-0000-000000000000.";
  }
}

function merchantAccountInfo(key: string, description: string) {
  const base = field("00", PIX_GUI) + field("01", key);
  const room = MAX_ACCOUNT_INFO_LENGTH - base.length - 4;
  const trimmedDescription = description.slice(0, Math.max(0, room));
  return trimmedDescription ? base + field("02", trimmedDescription) : base;
}

export function buildPixPayload({ keyType, key, name, city, amount, txid, description }: PixInput) {
  const reference = toPixText(txid ?? "", MAX_TXID_LENGTH).replace(/[^A-Z0-9]/g, "") || "***";
  const payload = [
    field("00", "01"),
    field("26", merchantAccountInfo(normalizePixKey(keyType, key), toPixText(description ?? "", MAX_ACCOUNT_INFO_LENGTH))),
    field("52", "0000"),
    field("53", "986"),
    amount && amount > 0 ? field("54", amount.toFixed(2)) : "",
    field("58", "BR"),
    field("59", toPixText(name, MAX_NAME_LENGTH)),
    field("60", toPixText(city, MAX_CITY_LENGTH)),
    field("62", field("05", reference)),
    "6304",
  ].join("");
  return payload + crc16(payload);
}
