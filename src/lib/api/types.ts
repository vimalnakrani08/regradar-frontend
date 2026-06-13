/**
 * TypeScript mirrors of the regradar-backend API contracts.
 *
 * These shapes match the backend's Pydantic response models exactly (see
 * CLAUDE.md). Keep them in sync with the backend; the frontend treats them as
 * the source of truth for what the API returns.
 */

/** A retrieved chunk: either a citation on an answer or a search hit. */
export interface SourceOut {
  document_number: string;
  /** Structural section the chunk came from, e.g. "SUMMARY"; may be absent. */
  section: string | null;
  /** Cosine similarity to the query (1.0 = identical meaning). */
  similarity: number;
  /** The chunk's text, already truncated for display by the backend. */
  excerpt: string;
}

/** Response from `POST /ask`. */
export interface AskResponse {
  /** The grounded answer, or the honest "no information" disclaimer. */
  answer: string;
  /**
   * Whether the answer is grounded in retrieved sources. `false` is the
   * honest decline state and MUST render visually distinct from a confident
   * answer (see the product rule in CLAUDE.md). `sources` is empty when false.
   */
  has_answer: boolean;
  sources: SourceOut[];
}

/** Response from `GET /search`. */
export interface SearchResponse {
  query: string;
  results: SourceOut[];
}

/** A Federal Register document's metadata. */
export interface DocumentOut {
  document_number: string;
  title: string;
  document_type: string;
  abstract: string | null;
  /** ISO date string, "YYYY-MM-DD". */
  publication_date: string;
  /** Canonical federalregister.gov URL — link citations out to this. */
  html_url: string;
  /** ISO date string, or null when the document has no comment deadline. */
  comments_close_on: string | null;
  agency_names: string[];
}

/** Response from `GET /documents` (paginated list). */
export interface DocumentListResponse {
  /** Total documents stored, not just this page. */
  count: number;
  limit: number;
  offset: number;
  results: DocumentOut[];
}

/** Response from `GET /health`. */
export interface HealthResponse {
  status: string;
}

/** The backend's uniform error envelope: `{ "error": { code, message } }`. */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    /** Present on validation_error (422); shape is backend-defined. */
    details?: unknown;
  };
}
