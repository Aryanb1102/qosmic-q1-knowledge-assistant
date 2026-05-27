"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { CitationCard } from "@/components/citation-card";
import { Panel } from "@/components/panel";
import { StatusBadge } from "@/components/status-badge";
import { answerQuery, loadKnowledgeIndex, noteTypeLabel, resolveRelativeAssetPath } from "@/lib/knowledge";
import type { AnswerCardData, KnowledgeNote } from "@/lib/types";

const sampleQueries = [
  "Why does our FSM need 400 Hz bandwidth?",
  "What does the fine pointing subsystem depend on?",
  "What should a new controls engineer read first?",
];

export function AskExperience() {
  const pathname = usePathname();
  const [notes, setNotes] = useState<KnowledgeNote[]>([]);
  const [query, setQuery] = useState(sampleQueries[0]);
  const [activeQuery, setActiveQuery] = useState(sampleQueries[0]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const assetPath = resolveRelativeAssetPath(pathname, "knowledge-index.json");
    loadKnowledgeIndex(assetPath)
      .then(setNotes)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Failed to load knowledge index."));
  }, [pathname]);

  const answer = useMemo<AnswerCardData | null>(() => {
    if (!notes.length) return null;
    return answerQuery(activeQuery, notes);
  }, [activeQuery, notes]);

  const submit = () => {
    startTransition(() => setActiveQuery(query));
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <div className="mb-4 text-[11px] uppercase tracking-[0.34em] text-cyan-200/75">Zero-cost MVP retrieval layer</div>
          <h1 className="display max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
            Ask engineering questions across QOSMIC&apos;s optical ground station knowledge graph
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Citation-backed retrieval over Obsidian design decisions, requirements, physics concepts, components, and references.
          </p>
          <div className="mt-8 rounded-[1.6rem] border border-cyan-300/15 bg-slate-950/35 p-4">
            <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-cyan-100/80" htmlFor="knowledge-query">
              Ask the knowledge graph
            </label>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35"
              id="knowledge-query"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a question about requirements, decisions, dependencies, or onboarding."
              value={query}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {sampleQueries.map((sample) => (
                <button
                  key={sample}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
                  onClick={() => {
                    setQuery(sample);
                    startTransition(() => setActiveQuery(sample));
                  }}
                  type="button"
                >
                  {sample}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-400">
                Browser-side fuzzy retrieval only. No LLM API, no server inference, and no paid services are used in this prototype.
              </p>
              <button
                className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-300/15"
                onClick={submit}
                type="button"
              >
                {isPending ? "Retrieving..." : "Retrieve answer"}
              </button>
            </div>
          </div>
        </div>

        <Panel eyebrow="Pipeline" title="Mini Architecture Panel">
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-white">Current MVP:</span> Obsidian Vault -&gt; Parser -&gt; JSON Index -&gt; Browser Search
              -&gt; Graph Expansion -&gt; Citation Answer Card.
            </p>
            <p>
              <span className="font-semibold text-white">Production upgrade:</span> Obsidian Vault -&gt; Parser -&gt; Chunker -&gt; Embeddings
              -&gt; Vector DB -&gt; Metadata Retriever -&gt; LLM Answer Generator -&gt; Citation Formatter -&gt; Slack/Obsidian UI.
            </p>
          </div>
        </Panel>
      </section>

      {error ? <Panel title="Index Load Error">{error}</Panel> : null}

      {answer ? (
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel eyebrow="Retrieved Answer Card" title={answer.headline}>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
                  {answer.confidenceLabel}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Query: {answer.query}</span>
              </div>
              <div className="prose-lite space-y-3">
                {answer.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
                {answer.statusMessage}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {Object.entries(answer.support)
                  .filter(([, notes]) => notes.length > 0)
                  .map(([group, entries]) => (
                    <div key={group} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">{group}</div>
                      <div className="flex flex-wrap gap-2">
                        {entries.slice(0, 4).map((note) => (
                          <div key={note.id} className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-xs text-slate-200">
                            <span className="font-medium text-white">{note.title}</span>
                            <span className="mx-2 text-slate-500">•</span>
                            {noteTypeLabel(note.type)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Panel>

          <Panel eyebrow="Citations and Source Notes" title="Evidence panel">
            <div className="space-y-4">
              {answer.citations.map((citation) => (
                <CitationCard citation={citation} key={`${citation.noteId}-${citation.sectionHeading}`} />
              ))}
            </div>
          </Panel>
        </section>
      ) : (
        <Panel title="Loading knowledge graph">The app will load `knowledge-index.json` in the browser and build the local search graph on demand.</Panel>
      )}

      {answer ? (
        <Panel eyebrow="Linked Notes" title="Graph expansion trace">
          <div className="flex flex-wrap gap-3">
            {answer.relatedNotes.map((note) => (
              <div key={note.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-sm font-medium text-white">{note.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <StatusBadge type={note.type} />
                  <StatusBadge status={note.status} />
                </div>
                <div className="mt-2 text-xs text-slate-400">{note.path}</div>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
