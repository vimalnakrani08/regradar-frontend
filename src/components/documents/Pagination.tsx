/**
 * Prev/next pagination driven by the URL (?page=N), so pages are shareable
 * and back/forward works. Renders plain links (no client state needed); an
 * unavailable direction is shown as disabled rather than a dead link.
 */

import Link from "next/link";

interface PaginationProps {
  page: number;
  limit: number;
  count: number;
}

export function Pagination({ page, limit, count }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(count / limit));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className="flex items-center justify-between text-sm" aria-label="Pagination">
      {hasPrev ? (
        <Link href={`/documents?page=${page - 1}`} className="text-primary hover:underline">
          ← Previous
        </Link>
      ) : (
        <span className="text-muted-foreground/50">← Previous</span>
      )}
      <span className="text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      {hasNext ? (
        <Link href={`/documents?page=${page + 1}`} className="text-primary hover:underline">
          Next →
        </Link>
      ) : (
        <span className="text-muted-foreground/50">Next →</span>
      )}
    </nav>
  );
}
