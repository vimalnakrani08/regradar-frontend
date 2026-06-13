/**
 * Fetches and renders a page of documents (server-side).
 *
 * An empty page (e.g. paging past the end, or an empty corpus) is a calm,
 * normal outcome — plain muted text, never the red error state, which is
 * reserved for an actual ApiError.
 */

import { DocumentCard } from "@/components/documents/DocumentCard";
import { Pagination } from "@/components/documents/Pagination";
import { ErrorCard } from "@/components/answer/ErrorCard";
import { ApiError, listDocuments } from "@/lib/api/client";
import type { DocumentListResponse } from "@/lib/api/types";

const PAGE_SIZE = 20;

export async function DocumentList({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE;

  let data: DocumentListResponse;
  try {
    data = await listDocuments(PAGE_SIZE, offset);
  } catch (error) {
    if (error instanceof ApiError) {
      return <ErrorCard code={error.code} message={error.message} />;
    }
    return <ErrorCard code="internal_error" message="An unexpected error occurred." />;
  }

  if (data.results.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No documents to show here{page > 1 ? " — try an earlier page." : " yet."}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{data.count} documents</p>
      <ul className="space-y-3">
        {data.results.map((document) => (
          <DocumentCard key={document.document_number} document={document} />
        ))}
      </ul>
      <Pagination page={page} limit={PAGE_SIZE} count={data.count} />
    </div>
  );
}
