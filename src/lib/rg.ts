// RG IFP RJ generator
// 8 random digits + 1 check digit

export function generateRG(formatted = true): string {
  const digits: number[] = [];
  for (let i = 0; i < 8; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // Check digit: weighted sum with weights 2,7,6,5,4,3,2 for positions 0-7
  const weights = [2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += digits[i] * weights[i];
  }
  sum += digits[7] * 1; // last base digit * 1
  // Actually IFP RJ: multiply each of the 8 digits by weights [2,7,6,5,4,3,2,1] then mod 11
  const remainder = sum % 11;
  const check = remainder < 2 ? 0 : 11 - remainder;
  // If check is 10, use 'X' — but for simplicity we'll use 0
  const checkStr = check === 10 ? "X" : String(check);

  const raw = digits.join("") + checkStr;

  if (!formatted) return raw;

  // Format: 00.000.000-0
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}-${raw.slice(8)}`;
}
