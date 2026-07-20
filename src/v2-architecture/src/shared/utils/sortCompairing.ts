interface SortComparingConfig {
  a: unknown;
  b: unknown;
  direction?: "ASC" | "DESC";
}
function sortComparing({ a, b, direction }: SortComparingConfig) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  const multiplier = direction === "ASC" ? 1 : -1;

  if (typeof a === "number" && typeof b === "number") {
    return (a - b) * multiplier;
  }

  return String(a).localeCompare(String(b), ["fa", "en"]) * multiplier;
}

export type { SortComparingConfig };
export default sortComparing;
