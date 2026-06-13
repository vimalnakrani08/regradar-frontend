/** A single row in the document list, linking to its detail page. */

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { DocumentOut } from "@/lib/api/types";

export function DocumentCard({ document }: { document: DocumentOut }) {
  return (
    <li className="rounded-lg border p-4">
      <Link
        href={`/documents/${document.document_number}`}
        className="font-medium underline-offset-4 hover:underline"
      >
        {document.title}
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary">{document.document_type}</Badge>
        <span className="font-mono">{document.document_number}</span>
        <span>·</span>
        <span>{formatDate(document.publication_date)}</span>
        {document.comments_close_on ? (
          <Badge variant="outline">Comments close {formatDate(document.comments_close_on)}</Badge>
        ) : null}
      </div>
      {document.agency_names.length > 0 ? (
        <p className="mt-1 text-xs text-muted-foreground">{document.agency_names.join(", ")}</p>
      ) : null}
    </li>
  );
}
