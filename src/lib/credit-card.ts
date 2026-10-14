import { onlyDigits } from "@/lib/check-digit";

export type CardBrand = {
  id: string;
  name: string;
  generationPrefixes: readonly string[];
  detectionPattern: RegExp;
  length: number;
  cvvLength: number;
};

export const CARD_BRANDS: readonly CardBrand[] = [
  {
    id: "elo",
    name: "Elo",
    generationPrefixes: ["636368", "438935", "504175", "451416", "636297", "506726", "509066"],
    detectionPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7]\d|9\d{3})|627780|63(6297|6368)|650(0(3[1-3]|[4-9]\d)|4\d\d|5[0-2]\d)|6516(5[2-9]|[6-7]\d)|6550([0-1]\d|2[1-9]|[3-4]\d|5[0-8]))/,
    length: 16,
    cvvLength: 3,
  },
  {
    id: "hipercard",
    name: "Hipercard",
    generationPrefixes: ["606282"],
    detectionPattern: /^606282/,
    length: 16,
    cvvLength: 3,
  },
  {
    id: "amex",
    name: "American Express",
    generationPrefixes: ["34", "37"],
    detectionPattern: /^3[47]/,
    length: 15,
    cvvLength: 4,
  },
  {
    id: "diners",
    name: "Diners Club",
    generationPrefixes: ["36", "38", "300", "305"],
    detectionPattern: /^3(0[0-5]|[68])/,
    length: 14,
    cvvLength: 3,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    generationPrefixes: ["51", "52", "53", "54", "55", "2221", "2720"],
    detectionPattern: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/,
    length: 16,
    cvvLength: 3,
  },
  {
    id: "visa",
    name: "Visa",
    generationPrefixes: ["4"],
    detectionPattern: /^4/,
    length: 16,
    cvvLength: 3,
  },
];

export type GeneratedCard = {
  brand: string;
  number: string;
  expiry: string;
  cvv: string;
};

function randomDigitString(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

function luhnSum(digits: string, doubleFirst: boolean) {
  let sum = 0;
  for (let i = digits.length - 1, double = doubleFirst; i >= 0; i--, double = !double) {
    let digit = Number(digits[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum;
}

function luhnCheckDigit(partial: string) {
  return (10 - (luhnSum(partial, true) % 10)) % 10;
}

export function passesLuhn(value: string) {
  const digits = onlyDigits(value);
  return digits.length > 0 && luhnSum(digits, false) % 10 === 0;
}

export function formatCardNumber(value: string) {
  const digits = onlyDigits(value);
  if (digits.length === 14 || digits.length === 15) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)} ${digits.slice(10)}`;
  }
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function detectCardBrand(value: string) {
  const digits = onlyDigits(value);
  return CARD_BRANDS.find((brand) => brand.detectionPattern.test(digits)) ?? null;
}

export function validateCard(value: string) {
  const digits = onlyDigits(value);
  const brand = detectCardBrand(digits);
  const validLength = brand ? digits.length === brand.length : digits.length >= 12 && digits.length <= 19;
  return { valid: validLength && passesLuhn(digits), brand };
}

export function generateCard(brandId: string, referenceDate: Date): GeneratedCard {
  const brand = CARD_BRANDS.find((b) => b.id === brandId) ?? CARD_BRANDS[CARD_BRANDS.length - 1];
  let number: string;
  do {
    const prefix = brand.generationPrefixes[Math.floor(Math.random() * brand.generationPrefixes.length)];
    const partial = prefix + randomDigitString(brand.length - prefix.length - 1);
    number = `${partial}${luhnCheckDigit(partial)}`;
  } while (detectCardBrand(number)?.id !== brand.id);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const year = String((referenceDate.getFullYear() + 1 + Math.floor(Math.random() * 5)) % 100).padStart(2, "0");
  return {
    brand: brand.name,
    number: formatCardNumber(number),
    expiry: `${month}/${year}`,
    cvv: randomDigitString(brand.cvvLength),
  };
}
