/**
 * The in-flight state for an ask request.
 *
 * Deliberately neutral (muted band, spinner) so it reads as distinct from both
 * answer states (green/amber bands) and the error state (red band).
 */

import { Loader2 } from "lucide-react";

import { StatusBand, StatusCard } from "@/components/answer/StatusCard";

export function LoadingCard() {
  return (
    <StatusCard role="status">
      <StatusBand
        icon={Loader2}
        label="Searching"
        className="bg-muted text-muted-foreground"
        iconClassName="animate-spin"
      />
      <div className="px-5 py-5">
        <p className="text-sm text-muted-foreground">
          Searching the Federal Register and grounding an answer…
        </p>
      </div>
    </StatusCard>
  );
}
