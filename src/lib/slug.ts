export type SlugSeparator = "-" | "_";

export function stripDiacritics(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function slugify(text: string, separator: SlugSeparator = "-", lowercase = true) {
  const slug = stripDiacritics(text)
    .replace(/['’]/g, "")
    .replace(/[^A-Za-z0-9]+/g, separator)
    .replace(separator === "-" ? /^-+|-+$/g : /^_+|_+$/g, "");
  return lowercase ? slug.toLowerCase() : slug;
}
