/**
 * Maps backend error `code`s to user-facing copy.
 *
 * The backend already returns safe messages, but mapping by stable code lets
 * the UI control tone and wording independently. Unknown codes fall back to
 * the backend's message.
 */

const ERROR_COPY: Record<string, string> = {
  network_error: "Couldn't reach the server. Check that the backend is running, then try again.",
  answer_unavailable: "The answer service is temporarily unavailable. Please try again in a moment.",
  search_unavailable: "Search is temporarily unavailable. Please try again in a moment.",
  database_unavailable: "The service is temporarily unavailable. Please try again shortly.",
  validation_error: "That question doesn't look valid. Try rephrasing it.",
  internal_error: "Something went wrong on our end. Please try again.",
};

/** Return user-facing copy for an error code, falling back to the backend message. */
export function describeError(code: string, fallback: string): string {
  return ERROR_COPY[code] ?? fallback;
}
