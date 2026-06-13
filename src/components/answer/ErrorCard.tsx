/**
 * The request-failure state — a real ApiError (network, 5xx, etc.).
 *
 * This is the one place red is correct: something actually went wrong, which
 * is categorically different from the honest "no information" decline (amber).
 * Distinct band color (red), icon (warning triangle), and label keep it
 * unmistakable from the decline.
 */

import { TriangleAlert } from "lucide-react";

import { StatusBand, StatusCard } from "@/components/answer/StatusCard";
import { describeError } from "@/lib/errors";

export function ErrorCard({ code, message }: { code: string; message: string }) {
  return (
    <StatusCard role="alert">
      <StatusBand icon={TriangleAlert} label="Request failed" className="bg-red-600 text-white" />
      <div className="px-5 py-5">
        <p className="text-sm">{describeError(code, message)}</p>
      </div>
    </StatusCard>
  );
}
