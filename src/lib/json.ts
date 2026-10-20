export type JsonIndent = "2" | "4" | "tab" | "minify";

export type JsonResult = { ok: true; output: string } | { ok: false; line: number | null; column: number | null };

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortKeys((value as Record<string, unknown>)[key])]),
    );
  }
  return value;
}

function errorPosition(text: string, message: string) {
  const lineColumn = message.match(/line (\d+) column (\d+)/);
  if (lineColumn) return { line: Number(lineColumn[1]), column: Number(lineColumn[2]) };
  const position = message.match(/position (\d+)/);
  if (!position) return { line: null, column: null };
  const before = text.slice(0, Number(position[1])).split("\n");
  return { line: before.length, column: before[before.length - 1].length + 1 };
}

export function formatJson(text: string, indent: JsonIndent, sorted = false): JsonResult {
  try {
    const parsed: unknown = JSON.parse(text);
    const value = sorted ? sortKeys(parsed) : parsed;
    const space = indent === "minify" ? undefined : indent === "tab" ? "\t" : Number(indent);
    return { ok: true, output: JSON.stringify(value, null, space) };
  } catch (error) {
    return { ok: false, ...errorPosition(text, error instanceof Error ? error.message : "") };
  }
}
