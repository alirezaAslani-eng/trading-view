export function getInitials(fullName?: string): string {
  if (!fullName) return "";

  return fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((item: string) => item.charAt(0))
    .slice(0, 2)
    .join(" ")
    .toUpperCase();
}