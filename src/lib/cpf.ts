const stateDigitMap: Record<string, number[]> = {
  "RS": [0],
  "DF": [1], "GO": [1], "MS": [1], "MT": [1], "TO": [1],
  "PA": [2], "AM": [2], "AC": [2], "AP": [2], "RO": [2], "RR": [2],
  "CE": [3], "MA": [3], "PI": [3],
  "PE": [4], "RN": [4], "PB": [4], "AL": [4],
  "BA": [5], "SE": [5],
  "MG": [6],
  "RJ": [7], "ES": [7],
  "SP": [8],
  "PR": [9], "SC": [9],
};

export const CPF_STATES = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
] as const;

export type CpfState = (typeof CPF_STATES)[number];

function randomDigit(): number {
  return Math.floor(Math.random() * 10);
}

function calcCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCPF(state: string = ""): string {
  const digits: number[] = [];

  for (let i = 0; i < 8; i++) {
    digits.push(randomDigit());
  }

  if (state && stateDigitMap[state]) {
    const possibleDigits = stateDigitMap[state];
    digits.push(possibleDigits[Math.floor(Math.random() * possibleDigits.length)]);
  } else {
    digits.push(randomDigit());
  }

  const d1 = calcCheckDigit(digits, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  digits.push(d1);

  const d2 = calcCheckDigit(digits, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  digits.push(d2);

  return digits.join("");
}

export function formatCPF(cpf: string, punctuated: boolean): string {
  if (!punctuated) return cpf;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}
