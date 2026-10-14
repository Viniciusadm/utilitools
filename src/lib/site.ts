export function getSiteUrl(): string {
  return import.meta.env.VITE_SITE_URL;
}

export function absoluteUrl(path = "") {
  return `${getSiteUrl()}/${path.replace(/^\/+/, "")}`;
}
