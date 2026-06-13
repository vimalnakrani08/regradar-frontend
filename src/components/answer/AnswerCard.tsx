/**
 * Renders an /ask result, branching hard on `has_answer`.
 *
 * - true  → GROUNDED band (green, shield-check), answer, and the sources list.
 * - false → NO INFORMATION FOUND band (amber, info), the honest disclaimer,
 *   and crucially NO sources section at all — its total absence is an extra
 *   signal reinforcing the band. Same card size as a confident answer: the
 *   decline is a valid, correct response, not a lesser one.
 */

import { Info, ShieldCheck } from "lucide-react";

import { SourceList } from "@/components/answer/SourceList";
import { StatusBand, StatusCard } from "@/components/answer/StatusCard";
import type { AskResponse } from "@/lib/api/types";

export function AnswerCard({ answer }: { answer: AskResponse }) {
  const count = answer.sources.length;

  if (answer.has_answer) {
    return (
      <StatusCard role="status">
        <StatusBand
          icon={ShieldCheck}
          label={`Grounded · ${count} source${count === 1 ? "" : "s"}`}
          className="bg-emerald-600 text-white"
        />
        <div className="space-y-4 px-5 py-5">
          <p className="leading-relaxed whitespace-pre-wrap">{answer.answer}</p>
          <SourceList sources={answer.sources} />
        </div>
      </StatusCard>
    );
  }

  return (
    <StatusCard role="status">
      <StatusBand icon={Info} label="No information found" className="bg-amber-400 text-amber-950" />
      <div className="space-y-4 px-5 py-5">
        <p className="leading-relaxed whitespace-pre-wrap">{answer.answer}</p>
        <p className="text-sm text-muted-foreground">
          No Federal Register documents matched closely enough to answer this confidently. Try
          rephrasing, or browse the documents directly.
        </p>
      </div>
    </StatusCard>
  );
}
