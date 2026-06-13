/**
 * A single retrieved chunk row — used both as an answer citation and as a
 * search result. Links out to the real Federal Register document via the
 * canonical short URL so users can verify the source.
 */

import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { SourceOut } from "@/lib/api/types";

const FR_DOCUMENT_URL = "https://www.federalregister.gov/d/";

export function SourceItem({ source }: { source: SourceOut }) {
  return (
    <li className="rounded-lg border bg-background p-3">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`${FR_DOCUMENT_URL}${source.document_number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {source.document_number}
          <ExternalLink className="size-3" aria-hidden />
        </a>
        {source.section ? (
          <span className="text-xs text-muted-foreground">{source.section}</span>
        ) : null}
        <Badge variant="secondary" className="ml-auto tabular-nums">
          {source.similarity.toFixed(2)}
        </Badge>
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{source.excerpt}</p>
    </li>
  );
}
