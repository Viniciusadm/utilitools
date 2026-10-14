import { onlyDigits, randomDigits, weightedSum } from "@/lib/check-digit";

export const VOTER_ID_STATES = [
  { code: "01", uf: "SP", name: "São Paulo" },
  { code: "02", uf: "MG", name: "Minas Gerais" },
  { code: "03", uf: "RJ", name: "Rio de Janeiro" },
  { code: "04", uf: "RS", name: "Rio Grande do Sul" },
  { code: "05", uf: "BA", name: "Bahia" },
  { code: "06", uf: "PR", name: "Paraná" },
  { code: "07", uf: "CE", name: "Ceará" },
  { code: "08", uf: "PE", name: "Pernambuco" },
  { code: "09", uf: "SC", name: "Santa Catarina" },
  { code: "10", uf: "GO", name: "Goiás" },
  { code: "11", uf: "MA", name: "Maranhão" },
  { code: "12", uf: "PB", name: "Paraíba" },
  { code: "13", uf: "PA", name: "Pará" },
  { code: "14", uf: "ES", name: "Espírito Santo" },
  { code: "15", uf: "PI", name: "Piauí" },
  { code: "16", uf: "RN", name: "Rio Grande do Norte" },
  { code: "17", uf: "AL", name: "Alagoas" },
  { code: "18", uf: "MT", name: "Mato Grosso" },
  { code: "19", uf: "MS", name: "Mato Grosso do Sul" },
  { code: "20", uf: "DF", name: "Distrito Federal" },
  { code: "21", uf: "SE", name: "Sergipe" },
  { code: "22", uf: "AM", name: "Amazonas" },
  { code: "23", uf: "RO", name: "Rondônia" },
  { code: "24", uf: "AC", name: "Acre" },
  { code: "25", uf: "AP", name: "Amapá" },
  { code: "26", uf: "RR", name: "Roraima" },
  { code: "27", uf: "TO", name: "Tocantins" },
  { code: "28", uf: "ZZ", name: "Exterior" },
] as const;

const SEQUENCE_WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9];
const SECOND_DIGIT_WEIGHTS = [7, 8, 9];
const ZERO_REMAINDER_IS_ONE = new Set(["01", "02"]);

function checkDigit(remainder: number, stateCode: string) {
  if (remainder === 10) return 0;
  if (remainder === 0 && ZERO_REMAINDER_IS_ONE.has(stateCode)) return 1;
  return remainder;
}

function voterIdCheckDigits(sequence: readonly number[], stateCode: string) {
  const first = checkDigit(weightedSum(sequence, SEQUENCE_WEIGHTS) % 11, stateCode);
  const stateDigits = stateCode.split("").map(Number);
  const second = checkDigit(weightedSum([...stateDigits, first], SECOND_DIGIT_WEIGHTS) % 11, stateCode);
  return `${first}${second}`;
}

export function formatVoterId(value: string) {
  const voterId = onlyDigits(value);
  return `${voterId.slice(0, 4)} ${voterId.slice(4, 8)} ${voterId.slice(8)}`;
}

export function generateVoterId(stateCode: string, formatted = true) {
  const code = stateCode || VOTER_ID_STATES[Math.floor(Math.random() * 27)].code;
  const sequence = randomDigits(8);
  const raw = `${sequence.join("")}${code}${voterIdCheckDigits(sequence, code)}`;
  return formatted ? formatVoterId(raw) : raw;
}

export function voterIdState(value: string) {
  const voterId = onlyDigits(value).padStart(12, "0");
  if (voterId.length !== 12) return null;
  const code = voterId.slice(8, 10);
  const state = VOTER_ID_STATES.find((s) => s.code === code);
  if (!state) return null;
  const sequence = voterId.slice(0, 8).split("").map(Number);
  return voterIdCheckDigits(sequence, code) === voterId.slice(10) ? state : null;
}

export function isValidVoterId(value: string) {
  return voterIdState(value) !== null;
}
