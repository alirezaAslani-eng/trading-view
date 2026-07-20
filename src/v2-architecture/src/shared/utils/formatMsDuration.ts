/**
 * Formats milliseconds into an adaptive `h:m:s` style string.
 * - >= 1 hour  -> "00:00:00"
 * - >= 1 minute -> "00:00"
 * - < 1 minute  -> "00"
 */
export default function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
    return `${pad(minutes)}:${pad(seconds)}`;
  
}
