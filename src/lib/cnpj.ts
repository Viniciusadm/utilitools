export function generateCNPJ(formatted = true): string {
  const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  // filial: 0001
  base.push(0, 0, 0, 1);

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum1 = base.reduce((acc, d, i) => acc + d * weights1[i], 0);
  const r1 = sum1 % 11;
  const d1 = r1 < 2 ? 0 : 11 - r1;
  base.push(d1);

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum2 = base.reduce((acc, d, i) => acc + d * weights2[i], 0);
  const r2 = sum2 % 11;
  const d2 = r2 < 2 ? 0 : 11 - r2;
  base.push(d2);

  const raw = base.join("");
  if (!formatted) return raw;
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12)}`;
}
