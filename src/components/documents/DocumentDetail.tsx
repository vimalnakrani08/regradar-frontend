/**
 * Fetches and renders a single document (server-side).
 *
 * Two failure paths are kept deliberately distinct:
 *   - 404 (not_found): a calm "document not found" card — a normal outcome.
 *   - any other ApiError (503, network): the red error card — a real failure.
 * Collapsing these would tell the user "something broke" when nothing did.
 */

import { ExternalLink } from "lucide-react";

import { ErrorCard } from "@/components/answer/ErrorCard";
import { NotFoundCard } from "@/components/documents/NotFoundCard";
import { Badge } from "@/components/ui/badge";
import { ApiError, getDocument } from "@/lib/api/client";
import { formatDate } from "@/lib/format";
import type { DocumentOut } from "@/lib/api/types";

export async function DocumentDetail({ documentNumber }: { documentNumber: string }) {
  let document: DocumentOut;
  try {
    document = await getDocument(documentNumber);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.code === "not_found") {
        return <NotFoundCard documentNumber={documentNumber} />;
      }
      return <ErrorCard code={error.code} message={error.message} />;
    }
    return <ErrorCard code="internal_error" message="An unexpected error occurred." />;
  }

  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{document.document_type}</Badge>
          <span className="font-mono">{document.document_number}</span>
          <span>·</span>
          <span>Published {formatDate(document.publication_date)}</span>
          {document.comments_close_on ? (
            <Badge variant="outline">
              Comments close {formatDate(document.comments_close_on)}
            </Badge>
          ) : null}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{document.title}</h2>
        {document.agency_names.length > 0 ? (
          <p className="text-sm text-muted-foreground">{document.agency_names.join(", ")}</p>
        ) : null}
      </div>

      {document.abstract ? (
        <p className="leading-relaxed whitespace-pre-wrap">{document.abstract}</p>
      ) : (
        <p className="text-sm text-muted-foreground">No abstract provided.</p>
      )}

      <a
        href={document.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        View on the Federal Register
        <ExternalLink className="size-3.5" aria-hidden />
      </a>
    </article>
  );
}
