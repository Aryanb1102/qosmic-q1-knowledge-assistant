"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Panel } from "@/components/panel";
import { StatusBadge } from "@/components/status-badge";
import { buildOnboardingPath, loadKnowledgeIndex, resolveRelativeAssetPath } from "@/lib/knowledge";
import type { KnowledgeNote, OnboardingDuration, OnboardingRole } from "@/lib/types";

const roles: OnboardingRole[] = ["optical engineer", "controls engineer", "systems engineer", "procurement operator"];
const durations: OnboardingDuration[] = ["3 days", "7 days", "30 days"];

export function OnboardingExperience() {
  const pathname = usePathname();
  const [notes, setNotes] = useState<KnowledgeNote[]>([]);
  const [role, setRole] = useState<OnboardingRole>("controls engineer");
  const [duration, setDuration] = useState<OnboardingDuration>("7 days");

  useEffect(() => {
    const assetPath = resolveRelativeAssetPath(pathname, "knowledge-index.json");
    loadKnowledgeIndex(assetPath).then(setNotes).catch(() => setNotes([]));
  }, [pathname]);

  const path = useMemo(() => {
    if (!notes.length) return null;
    return buildOnboardingPath(role, duration, notes);
  }, [duration, notes, role]);

  return (
    <div className="space-y-6">
      <Panel eyebrow="Onboarding Path Generator" title="Role-specific reading path">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Role</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300/35"
              onChange={(event) => setRole(event.target.value as OnboardingRole)}
              value={role}
            >
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Duration</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300/35"
              onChange={(event) => setDuration(event.target.value as OnboardingDuration)}
              value={duration}
            >
              {durations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Panel>

      {path ? (
        <>
          <Panel eyebrow="Coverage" title="Best-effort role mapping">
            {path.coverageMessage}
          </Panel>
          <div className="grid gap-4">
            {path.steps.map((step, index) => (
              <article className="glass rounded-3xl p-5" key={step.note.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/75">
                      Day block {index + 1} • {step.phase}
                    </div>
                    <h3 className="display mt-2 text-2xl text-white">{step.note.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{step.why}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge type={step.note.type} />
                    <StatusBadge status={step.note.status} />
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  {step.note.summaryText}
                </div>
                <div className="mt-3 text-xs text-slate-400">{step.note.path}</div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <Panel title="Loading onboarding map">The path generator needs the static knowledge index before it can build role-specific reading plans.</Panel>
      )}
    </div>
  );
}
