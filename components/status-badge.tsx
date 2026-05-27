import { noteTypeLabel, statusTone } from "@/lib/knowledge";
import type { NoteStatus, NoteType } from "@/lib/types";

interface Props {
  status?: NoteStatus;
  type?: NoteType;
}

export function StatusBadge({ status, type }: Props) {
  if (type) {
    return (
      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-200">
        {noteTypeLabel(type)}
      </span>
    );
  }

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] ${statusTone(status ?? "unknown")}`}>
      {status ?? "unknown"}
    </span>
  );
}
