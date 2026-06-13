/**
 * Typed fetch wrappers for the regradar-backend API.
 *
 * Every request goes through `request()`, which centralises base-URL
 * resolution, JSON handling, and translation of the backend's error envelope
 * into a typed `ApiError`. Callers get typed responses and a single, typed
 * error to catch — they never parse raw responses or see internal details.
 */

import type {
  ApiErrorBody,
  AskResponse,
  DocumentListResponse,
  DocumentOut,
  HealthResponse,
  SearchResponse,
} from "./types";

/** Where the backend lives. Override per environment via this public env var. */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

/**
 * A failed API call, normalised to the backend's error contract.
 *
 * `code` is the stable machine code from the error envelope (e.g.
 * "answer_unavailable", "not_found"); the UI maps it to user-facing copy.
 * `status` is the HTTP status (0 for a network/transport failure).
 */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

/** Narrow an unknown JSON body to the backend's error envelope. */
function isApiErrorBody(body: unknown): body is ApiErrorBody {
  if (typeof body !== "object" || body === null || !("error" in body)) {
    return false;
  }
  const { error } = body as { error: unknown };
  return (
    typeof error === "object" &&
    error !== null &&
    typeof (error as { code: unknown }).code === "string" &&
    typeof (error as { message: unknown }).message === "string"
  );
}

/** Build an ApiError from a non-2xx response, reading the error envelope. */
async function toApiError(response: Response): Promise<ApiError> {
  let code = "internal_error";
  let message = "An unexpected error occurred.";
  try {
    const body: unknown = await response.json();
    if (isApiErrorBody(body)) {
      code = body.error.code;
      message = body.error.message;
    }
  } catch {
    // Non-JSON error body (unlikely from this backend); keep the safe defaults.
  }
  return new ApiError(response.status, code, message);
}

/** Perform a request and return its typed JSON body, or throw an ApiError. */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    // DNS failure, connection refused, CORS rejection, offline, etc.
    throw new ApiError(0, "network_error", "Could not reach the server.");
  }

  if (!response.ok) {
    throw await toApiError(response);
  }
  return (await response.json()) as T;
}

/** `POST /ask` — a retrieval-augmented, cited answer for a question. */
export function ask(question: string): Promise<AskResponse> {
  return request<AskResponse>("/ask", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
}

/** `GET /search` — semantic search over document chunks (no LLM). */
export function search(query: string, limit = 10): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  return request<SearchResponse>(`/search?${params.toString()}`);
}

/** `GET /documents` — a paginated page of documents, newest first. */
export function listDocuments(limit = 20, offset = 0): Promise<DocumentListResponse> {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return request<DocumentListResponse>(`/documents?${params.toString()}`);
}

/** `GET /documents/{document_number}` — a single document, or 404 ApiError. */
export function getDocument(documentNumber: string): Promise<DocumentOut> {
  return request<DocumentOut>(`/documents/${encodeURIComponent(documentNumber)}`);
}

/** `GET /health` — liveness probe; throws ApiError if the backend is down. */
export function health(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}
