import { secureRandomInt, secureShuffle } from "@/lib/random";

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
};

export type PasswordStrength = "veryWeak" | "weak" | "medium" | "strong" | "veryStrong";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%&*()-_=+[]{};:,.?/",
} as const;

const AMBIGUOUS = /[O0Il1|]/g;

function activeCharsets(options: PasswordOptions) {
  return (Object.keys(CHARSETS) as (keyof typeof CHARSETS)[])
    .filter((key) => options[key])
    .map((key) => (options.excludeAmbiguous ? CHARSETS[key].replace(AMBIGUOUS, "") : CHARSETS[key]));
}

function pick(charset: string) {
  return charset[secureRandomInt(charset.length)];
}

export function generatePassword(options: PasswordOptions) {
  const charsets = activeCharsets(options);
  if (charsets.length === 0) return "";
  const pool = charsets.join("");
  const required = charsets.map(pick);
  const rest = Array.from({ length: Math.max(0, options.length - required.length) }, () => pick(pool));
  return secureShuffle([...required, ...rest]).slice(0, options.length).join("");
}

export function passwordEntropyBits(options: PasswordOptions) {
  const poolSize = activeCharsets(options).join("").length;
  return poolSize > 0 ? options.length * Math.log2(poolSize) : 0;
}

export function passwordStrength(bits: number): PasswordStrength {
  if (bits < 28) return "veryWeak";
  if (bits < 36) return "weak";
  if (bits < 60) return "medium";
  if (bits < 100) return "strong";
  return "veryStrong";
}
