/** Formatting helpers shared across the UI. */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Format a backend ISO date ("YYYY-MM-DD") as "Jun 12, 2026".
 *
 * Parses the parts directly rather than via `new Date()` to avoid timezone
 * shifts that can move a date-only value to the previous day. Returns the
 * input unchanged if it is not a well-formed date.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day || month < 1 || month > 12) {
    return iso;
  }
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}
