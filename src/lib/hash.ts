export const HASH_ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];

const MD5_SHIFTS = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];

const MD5_CONSTANTS = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) >>> 0);

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function md5(input: Uint8Array) {
  const paddedLength = (((input.length + 8) >> 6) + 1) << 6;
  const buffer = new Uint8Array(paddedLength);
  buffer.set(input);
  buffer[input.length] = 0x80;
  const view = new DataView(buffer.buffer);
  const bitLength = input.length * 8;
  view.setUint32(paddedLength - 8, bitLength >>> 0, true);
  view.setUint32(paddedLength - 4, Math.floor(bitLength / 2 ** 32), true);

  const state = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  for (let offset = 0; offset < paddedLength; offset += 64) {
    let [a, b, c, d] = state;
    for (let i = 0; i < 64; i++) {
      const round = i >> 4;
      let f: number;
      let g: number;
      if (round === 0) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (round === 1) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (round === 2) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const shift = MD5_SHIFTS[round * 4 + (i % 4)];
      const sum = (a + f + MD5_CONSTANTS[i] + view.getUint32(offset + g * 4, true)) | 0;
      a = d;
      d = c;
      c = b;
      b = (b + ((sum << shift) | (sum >>> (32 - shift)))) | 0;
    }
    state[0] = (state[0] + a) | 0;
    state[1] = (state[1] + b) | 0;
    state[2] = (state[2] + c) | 0;
    state[3] = (state[3] + d) | 0;
  }

  const digest = new DataView(new ArrayBuffer(16));
  state.forEach((word, i) => digest.setUint32(i * 4, word, true));
  return toHex(new Uint8Array(digest.buffer));
}

export async function hashText(text: string, algorithm: HashAlgorithm) {
  const bytes = new TextEncoder().encode(text);
  if (algorithm === "MD5") return md5(bytes);
  return toHex(new Uint8Array(await crypto.subtle.digest(algorithm, bytes)));
}
