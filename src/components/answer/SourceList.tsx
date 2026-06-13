/**
 * Renders the citations behind a grounded answer.
 *
 * Each source links out to the real Federal Register document via the
 * canonical short URL (federalregister.gov/d/<document_number>), so users can
 * verify the grounding — the credibility core of the product.
 */

import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { SourceOut } from "@/lib/api/types";

const FR_DOCUMENT_URL = "https://www.federalregister.gov/d/";

export function SourceList({ sources }: { sources: SourceOut[] }) {
  return (
    <section aria-label="Sources" className="space-y-3 border-t pt-4">
      <h3 className="text-sm font-semibold">Sources</h3>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li
            key={`${source.document_number}-${index}`}
            className="rounded-lg border bg-background p-3"
          >
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
        ))}
      </ul>
    </section>
  );
}
