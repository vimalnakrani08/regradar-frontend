/**
 * Fetches and renders semantic-search results for a query (server-side).
 *
 * Three distinct outcomes, with the same semantic discipline as the answer
 * card: results, a calm amber "no matches" state (a valid empty outcome, NOT
 * an error), and the red error state — reserved for an actual ApiError.
 */

import { Info } from "lucide-react";

import { ErrorCard } from "@/components/answer/ErrorCard";
import { SourceItem } from "@/components/answer/SourceItem";
import { StatusBand, StatusCard } from "@/components/answer/StatusCard";
import { ApiError, search } from "@/lib/api/client";
import type { SearchResponse } from "@/lib/api/types";

const RESULT_LIMIT = 10;

function NoMatches({ query }: { query: string }) {
  return (
    <StatusCard role="status">
      <StatusBand icon={Info} label="No matches" className="bg-amber-400 text-amber-950" />
      <div className="px-5 py-5">
        <p className="text-sm">
          No passages matched <span className="font-medium">“{query}”</span>. Try different or
          broader wording.
        </p>
      </div>
    </StatusCard>
  );
}

export async function SearchResults({ query }: { query: string }) {
  let data: SearchResponse;
  try {
    data = await search(query, RESULT_LIMIT);
  } catch (error) {
    if (error instanceof ApiError) {
      return <ErrorCard code={error.code} message={error.message} />;
    }
    return <ErrorCard code="internal_error" message="An unexpected error occurred." />;
  }

  if (data.results.length === 0) {
    return <NoMatches query={query} />;
  }

  return (
    <section aria-label="Search results" className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {data.results.length} passage{data.results.length === 1 ? "" : "s"} for{" "}
        <span className="font-medium text-foreground">“{query}”</span>
      </p>
      <ul className="space-y-3">
        {data.results.map((source, index) => (
          <SourceItem key={`${source.document_number}-${index}`} source={source} />
        ))}
      </ul>
    </section>
  );
}
