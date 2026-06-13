/**
 * The calm "document not found" state (a 404 from the backend).
 *
 * A missing document is a normal outcome — a bad URL or a removed document —
 * not a failure, so it uses the amber/info treatment (the same vocabulary as
 * the answer decline and the search no-matches), never the red error state.
 */

import { Info } from "lucide-react";

import { StatusBand, StatusCard } from "@/components/answer/StatusCard";

export function NotFoundCard({ documentNumber }: { documentNumber: string }) {
  return (
    <StatusCard role="status">
      <StatusBand icon={Info} label="Document not found" className="bg-amber-400 text-amber-950" />
      <div className="px-5 py-5">
        <p className="text-sm">
          No document with number <span className="font-mono">{documentNumber}</span>. It may have
          been removed, or the link may be incorrect.
        </p>
      </div>
    </StatusCard>
  );
}
