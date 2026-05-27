"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import type { Citation } from "@/lib/types";

interface Props {
  citation: Citation;
}

export function CitationCard({ citation }: Props) {
  const [open, setOpen] = useState(citation.initiallyExpanded);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-white">{citation.noteTitle}</div>
          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{citation.sectionHeading}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge type={citation.noteType} />
          <StatusBadge status={citation.status} />
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-400">{citation.path}</div>
      <button
        className="mt-4 inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-300/40"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? "Hide exact snippet" : "Show exact snippet"}
      </button>
      {open ? (
        <div className="prose-lite mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-200">
          {citation.snippet}
        </div>
      ) : null}
    </article>
  );
}
