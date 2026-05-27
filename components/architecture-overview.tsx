import { Panel } from "@/components/panel";

const currentPipeline = [
  "Obsidian Vault",
  "Parser",
  "JSON Index",
  "Browser Search",
  "Graph Expansion",
  "Citation Answer Card",
];

const productionPipeline = [
  "Obsidian Vault",
  "Parser",
  "Chunker",
  "Embeddings",
  "Vector DB",
  "Metadata Retriever",
  "LLM Answer Generator",
  "Citation Formatter",
  "Slack/Obsidian UI",
];

export function ArchitectureOverview() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Panel eyebrow="Current Prototype" title="Static retrieval pipeline">
        <div className="grid gap-3">
          {currentPipeline.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">Step {index + 1}</div>
              <div className="mt-2 text-lg text-white">{step}</div>
            </div>
          ))}
        </div>
      </Panel>
      <div className="space-y-6">
        <Panel eyebrow="Production Upgrade Path" title="What changes in the non-MVP system">
          <div className="grid gap-3">
            {productionPipeline.map((step, index) => (
              <div key={step} className="rounded-2xl border border-violet-300/15 bg-violet-400/5 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.22em] text-violet-200/80">Stage {index + 1}</div>
                <div className="mt-2 text-lg text-white">{step}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel eyebrow="Limitations" title="Why this stays zero-cost">
          <div className="space-y-3">
            <p>Current version uses browser-side keyword and fuzzy retrieval over a generated JSON index.</p>
            <p>No paid LLM API is used in this prototype.</p>
            <p>Production should add embeddings, vector storage, and LLM synthesis for stronger semantic retrieval and answer generation.</p>
            <p>The Obsidian vault remains the source of truth in both the MVP and any production upgrade.</p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
