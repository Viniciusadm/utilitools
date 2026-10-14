export function generateCNH(): string {
  const digits: number[] = [];
  for (let i = 0; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += digits[i] * (9 - i);
  }
  let dv1 = sum1 % 11;
  if (dv1 >= 10) dv1 = 0;

  let sum2 = 0;
  for (let i = 0; i < 9; i++) {
    sum2 += digits[i] * (1 + i);
  }
  let dv2 = sum2 % 11;
  if (dv2 >= 10) dv2 = 0;

  return [...digits, dv1, dv2].join("");
}
