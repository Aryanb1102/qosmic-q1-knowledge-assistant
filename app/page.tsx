import Link from "next/link";
import { AskExperience } from "@/components/ask-experience";
import { OnboardingExperience } from "@/components/onboarding-experience";
import { Panel } from "@/components/panel";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <AskExperience />
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <OnboardingExperience />
        <Panel eyebrow="Production framing" title="Limitations and upgrade path">
          <div className="space-y-4">
            <p>
              This prototype is a zero-cost retrieval layer. It demonstrates status-aware search, graph-link expansion, and citation-backed answers
              without any server-side inference.
            </p>
            <p>
              In production, QOSMIC should add chunking, embeddings, a vector database, metadata filtering, and an LLM answer generator while still
              preserving Obsidian as the source of truth.
            </p>
            <Link
              className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/45"
              href="/architecture"
            >
              Open full architecture page
            </Link>
          </div>
        </Panel>
      </section>
    </div>
  );
}
