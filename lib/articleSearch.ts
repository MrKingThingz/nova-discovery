// Only text is allowed into PostgREST's filter expression. Punctuation and
// wildcards cannot become filter syntax. The UI uses the same normalized text.
export function normalizeSearch(value: string) {
  return value
    .slice(0, 100)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function pageNumber(value?: string) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? Math.min(page, 10000) : 1;
}
