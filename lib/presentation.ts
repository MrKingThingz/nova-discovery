export function formatDate(value: string | null) {
  if (!value || Number.isNaN(Date.parse(value))) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
export function readTime(words: number | null) {
  return words && words > 0
    ? `${Math.max(1, Math.ceil(words / 220))} min read`
    : "";
}
export function topicStyle(slug = "") {
  if (/black|relativ|time/.test(slug)) return "orbit";
  if (/mars|planet/.test(slug)) return "planet";
  if (/mission|explor/.test(slug)) return "mission";
  return "stars";
}
