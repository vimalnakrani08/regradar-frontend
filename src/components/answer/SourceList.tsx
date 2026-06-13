/**
 * The citations behind a grounded answer. Renders the shared SourceItem row
 * under a "Sources" heading, separated from the answer text above it.
 */

import { SourceItem } from "@/components/answer/SourceItem";
import type { SourceOut } from "@/lib/api/types";

export function SourceList({ sources }: { sources: SourceOut[] }) {
  return (
    <section aria-label="Sources" className="space-y-3 border-t pt-4">
      <h3 className="text-sm font-semibold">Sources</h3>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <SourceItem key={`${source.document_number}-${index}`} source={source} />
        ))}
      </ul>
    </section>
  );
}
