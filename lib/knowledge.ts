import Fuse from "fuse.js";
import type {
  AnswerCardData,
  Citation,
  ExpandedResult,
  KnowledgeNote,
  KnowledgeSection,
  NoteStatus,
  NoteType,
  OnboardingDuration,
  OnboardingRole,
  OnboardingStep,
  SearchHit,
} from "@/lib/types";

interface SectionRecord {
  id: string;
  noteId: string;
  noteTitle: string;
  noteType: NoteType;
  status: NoteStatus;
  subsystem: string;
  heading: string;
  content: string;
  relationshipText: string;
}

type Intent = "why" | "dependency" | "onboarding" | "general";

const statusWeight: Record<NoteStatus, number> = {
  canonical: 1.15,
  reviewed: 1.02,
  draft: 0.88,
  superseded: 0.72,
  conflicting: 0.64,
  unknown: 0.8,
};

const noteLabels: Record<NoteType, string> = {
  subsystem: "Subsystem",
  requirement: "Requirement",
  design_decision: "Design Decision",
  physics_concept: "Physics Concept",
  component: "Component",
  reference: "Reference",
  index: "Index",
  general: "General",
};

const roleSeeds: Record<OnboardingRole, { owners: string[]; types: NoteType[]; keywords: string[] }> = {
  "optical engineer": {
    owners: ["optical-systems"],
    types: ["subsystem", "requirement", "physics_concept", "design_decision", "component", "reference"],
    keywords: ["optical", "telescope", "receiver", "fiber", "aperture", "coupling"],
  },
  "controls engineer": {
    owners: ["controls-and-optics"],
    types: ["subsystem", "requirement", "physics_concept", "design_decision", "component", "reference"],
    keywords: ["fine pointing", "tracking", "bandwidth", "jitter", "control", "fsm", "beam wander"],
  },
  "systems engineer": {
    owners: ["systems-engineering", "controls-and-optics", "optical-systems"],
    types: ["subsystem", "requirement", "design_decision", "physics_concept", "reference"],
    keywords: ["requirement", "pass", "architecture", "link margin", "trade-off"],
  },
  "procurement operator": {
    owners: ["optical-systems", "controls-and-optics"],
    types: ["component", "design_decision", "subsystem", "reference"],
    keywords: ["vendor", "procurement", "lead time", "cost", "serviceability", "customs", "risk"],
  },
};

const durationCounts: Record<OnboardingDuration, number> = {
  "3 days": 4,
  "7 days": 7,
  "30 days": 10,
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function sentence(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/.*?[.!?](\s|$)/);
  return match ? match[0].trim() : cleaned;
}

function relationshipText(note: KnowledgeNote): string {
  return Object.entries(note.frontmatterLinks)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join(" ");
}

function buildSectionRecords(notes: KnowledgeNote[]): SectionRecord[] {
  return notes.flatMap((note) =>
    note.sections.map((section) => ({
      id: `${note.id}:${section.id}`,
      noteId: note.id,
      noteTitle: note.title,
      noteType: note.type,
      status: note.status,
      subsystem: note.subsystem,
      heading: section.heading,
      content: section.content,
      relationshipText: relationshipText(note),
    }))
  );
}

function detectIntent(query: string): Intent {
  const q = normalize(query);
  if (q.includes("why")) return "why";
  if (q.includes("depend") || q.includes("depends on") || q.includes("dependency")) return "dependency";
  if (q.includes("read first") || q.includes("onboard") || q.includes("new ") || q.includes("what should")) {
    return "onboarding";
  }
  return "general";
}

function typeBoost(intent: Intent, type: NoteType): number {
  const byIntent: Record<Intent, Partial<Record<NoteType, number>>> = {
    why: {
      design_decision: 1.18,
      requirement: 1.08,
      physics_concept: 1.08,
      component: 0.98,
    },
    dependency: {
      subsystem: 1.16,
      component: 1.12,
      requirement: 1.04,
      design_decision: 1.02,
    },
    onboarding: {
      subsystem: 1.14,
      requirement: 1.12,
      physics_concept: 1.08,
      design_decision: 1.06,
      reference: 1.04,
    },
    general: {
      subsystem: 1.04,
      requirement: 1.04,
      design_decision: 1.04,
    },
  };
  return byIntent[intent][type] ?? 1;
}

function sectionPriority(intent: Intent, heading: string): number {
  const h = normalize(heading);
  const common =
    (h.includes("summary") ? 0.12 : 0) +
    (h.includes("context") ? 0.08 : 0) +
    (h.includes("why") ? 0.14 : 0) +
    (h.includes("decision") ? 0.14 : 0) +
    (h.includes("testing") || h.includes("validation") ? 0.12 : 0) +
    (h.includes("dependencies") ? 0.14 : 0) +
    (h.includes("vendor") || h.includes("procurement") ? 0.1 : 0);
  if (intent === "dependency") return common + (h.includes("dependencies") ? 0.18 : 0);
  if (intent === "why") return common + (h.includes("physics") || h.includes("trade") ? 0.08 : 0);
  return common;
}

function makeFuse(records: SectionRecord[]) {
  return new Fuse(records, {
    includeScore: true,
    threshold: 0.34,
    minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      { name: "noteTitle", weight: 2.6 },
      { name: "heading", weight: 1.8 },
      { name: "content", weight: 1.6 },
      { name: "relationshipText", weight: 1.1 },
      { name: "noteType", weight: 0.8 },
      { name: "status", weight: 0.5 },
      { name: "subsystem", weight: 0.8 },
    ],
  });
}

function gatherLinks(note: KnowledgeNote): string[] {
  const relationshipLinks = Object.values(note.frontmatterLinks).flat();
  return [...new Set([...note.wikilinks, ...relationshipLinks])];
}

function selectBestSections(note: KnowledgeNote, intent: Intent, matchedIds: Set<string>): KnowledgeSection[] {
  const sections = note.sections
    .map((section) => ({
      section,
      score: (matchedIds.has(section.id) ? 0.4 : 0) + sectionPriority(intent, section.heading),
    }))
    .sort((a, b) => b.score - a.score);
  return sections.slice(0, 3).map((entry) => entry.section);
}

function confidenceLabel(results: ExpandedResult[]): string {
  const primary = results.slice(0, 3);
  if (primary.some((result) => result.note.status === "draft" || result.note.status === "conflicting")) {
    return "Use with caution";
  }
  if (primary.some((result) => result.note.status === "reviewed")) {
    return "Reviewed evidence";
  }
  return "Canonical evidence";
}

function statusMessage(results: ExpandedResult[]): string {
  const topStatuses = Array.from(new Set(results.slice(0, 4).map((result) => result.note.status)));
  if (topStatuses.includes("reviewed") || topStatuses.includes("draft")) {
    return "This MVP prefers canonical notes, but this answer also draws from reviewed and draft notes where they carry the strongest rationale or implementation detail.";
  }
  return "This answer is grounded in canonical notes first, with one-hop graph expansion for linked requirements, physics, components, and references.";
}

function groupSupport(results: ExpandedResult[]): Record<string, KnowledgeNote[]> {
  const buckets: Record<string, KnowledgeNote[]> = {
    requirements: [],
    decisions: [],
    physics: [],
    components: [],
    references: [],
    subsystems: [],
  };

  for (const result of results) {
    const target =
      result.note.type === "requirement"
        ? "requirements"
        : result.note.type === "design_decision"
          ? "decisions"
          : result.note.type === "physics_concept"
            ? "physics"
            : result.note.type === "component"
              ? "components"
              : result.note.type === "reference"
                ? "references"
                : "subsystems";
    if (!buckets[target].some((note) => note.id === result.note.id)) {
      buckets[target].push(result.note);
    }
  }

  return buckets;
}

function buildHeadline(query: string, primary: ExpandedResult | undefined): string {
  if (!primary) return `No retrieved answer for "${query}"`;
  if (detectIntent(query) === "why") return `Why the knowledge graph points to ${primary.note.title}`;
  if (detectIntent(query) === "dependency") return `Dependency view centered on ${primary.note.title}`;
  if (detectIntent(query) === "onboarding") return `Starter path inferred from ${primary.note.title}`;
  return `Retrieved answer anchored in ${primary.note.title}`;
}

function citationFromSection(note: KnowledgeNote, section: KnowledgeSection, score: number, index: number): Citation {
  return {
    noteId: note.id,
    noteTitle: note.title,
    noteType: note.type,
    status: note.status,
    path: note.path,
    sectionHeading: section.heading,
    snippet: section.content.trim(),
    score,
    initiallyExpanded: index === 0,
  };
}

export function noteTypeLabel(type: NoteType): string {
  return noteLabels[type];
}

export function statusTone(status: NoteStatus): string {
  switch (status) {
    case "canonical":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
    case "reviewed":
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-100";
    case "draft":
      return "border-amber-400/30 bg-amber-400/10 text-amber-100";
    case "conflicting":
      return "border-rose-400/30 bg-rose-400/10 text-rose-100";
    case "superseded":
      return "border-slate-400/30 bg-slate-400/10 text-slate-200";
    default:
      return "border-white/10 bg-white/5 text-slate-200";
  }
}

export async function loadKnowledgeIndex(relativePath: string): Promise<KnowledgeNote[]> {
  const response = await fetch(relativePath, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Failed to load knowledge index from ${relativePath}`);
  }
  return (await response.json()) as KnowledgeNote[];
}

export function resolveRelativeAssetPath(routePath: string, assetName: string): string {
  const trimmed = routePath.replace(/^\/+|\/+$/g, "");
  if (!trimmed) return `./${assetName}`;
  const depth = trimmed.split("/").filter(Boolean).length;
  return `${"../".repeat(depth)}${assetName}`;
}

export function answerQuery(query: string, notes: KnowledgeNote[]): AnswerCardData {
  const intent = detectIntent(query);
  const records = buildSectionRecords(notes);
  const noteById = new Map(notes.map((note) => [note.id, note]));
  const fuse = makeFuse(records);
  const results = fuse.search(query).slice(0, 18);
  const grouped = new Map<string, SearchHit>();

  for (const result of results) {
    const record = result.item;
    const note = noteById.get(record.noteId);
    if (!note) continue;
    const section = note.sections.find((item) => item.id === record.id.split(":").slice(1).join(":"));
    if (!section) continue;
    const rawScore = result.score ?? 0.5;
    const baseScore = (1.12 - rawScore) * statusWeight[note.status] * typeBoost(intent, note.type) + sectionPriority(intent, section.heading);
    const existing = grouped.get(note.id);
    const hit: SearchHit = {
      noteId: note.id,
      note,
      sectionId: section.id,
      section,
      rawScore,
      score: baseScore,
      reasons: ["direct lexical match"],
      direct: true,
    };
    if (!existing || hit.score > existing.score) {
      grouped.set(note.id, hit);
    }
  }

  const expanded = new Map<string, ExpandedResult>();
  for (const hit of grouped.values()) {
    const matchedIds = new Set([hit.section.id]);
    expanded.set(hit.note.id, {
      note: hit.note,
      score: hit.score,
      direct: true,
      reasons: hit.reasons,
      matchedSections: selectBestSections(hit.note, intent, matchedIds),
    });
  }

  for (const hit of grouped.values()) {
    for (const link of gatherLinks(hit.note)) {
      const linked = notes.find((candidate) => candidate.title === link);
      if (!linked) continue;
      const existing = expanded.get(linked.id);
      const matchedSections = selectBestSections(linked, intent, new Set<string>());
      const expandedScore = hit.score * 0.72 * statusWeight[linked.status] * typeBoost(intent, linked.type);
      const reason = hit.note.type === "index" ? "linked from navigation index" : `one-hop link from ${hit.note.title}`;
      if (!existing || expandedScore > existing.score) {
        expanded.set(linked.id, {
          note: linked,
          score: expandedScore,
          direct: false,
          reasons: [reason],
          matchedSections,
        });
      }
    }
  }

  const ranked = Array.from(expanded.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  const primary = ranked[0];
  const citations = ranked
    .flatMap((result) =>
      result.matchedSections.slice(0, 2).map((section, index) => citationFromSection(result.note, section, result.score, index))
    )
    .slice(0, 8);

  const summary = ranked.slice(0, 4).flatMap((result, index) => {
    const section = result.matchedSections[0];
    if (!section) return [];
    const lead = sentence(section.content);
    if (index === 0 && result.note.type === "design_decision" && detectIntent(query) === "why") {
      return [`${result.note.title} is the strongest retrieved rationale: ${lead}`];
    }
    return [lead];
  });

  return {
    query,
    headline: buildHeadline(query, primary),
    summary: summary.slice(0, 4),
    statusMessage: statusMessage(ranked),
    confidenceLabel: confidenceLabel(ranked),
    citations,
    support: groupSupport(ranked),
    relatedNotes: ranked.slice(0, 8).map((result) => result.note),
  };
}

function noteKeywordScore(note: KnowledgeNote, keywords: string[]): number {
  const haystack = normalize(`${note.title} ${note.summaryText} ${note.fullText} ${relationshipText(note)}`);
  return keywords.reduce((score, keyword) => score + (haystack.includes(normalize(keyword)) ? 1 : 0), 0);
}

function onboardingReason(role: OnboardingRole, note: KnowledgeNote): string {
  if (role === "procurement operator" && note.type === "component") {
    return "Included for vendor, lead-time, and procurement-risk context around a concrete hardware candidate.";
  }
  if (note.type === "subsystem") {
    return "Included first to anchor the subsystem context before diving into requirements and decisions.";
  }
  if (note.type === "requirement") {
    return "Included to show the operational constraint that downstream design decisions must satisfy.";
  }
  if (note.type === "design_decision") {
    return "Included to capture the design rationale and trade-offs behind the current architecture.";
  }
  if (note.type === "physics_concept") {
    return "Included because the linked physics concept explains why the engineering constraints matter.";
  }
  if (note.type === "reference") {
    return "Included as the external grounding note that points to deeper study material.";
  }
  return `Included because it is directly relevant to a ${role} onboarding path.`;
}

export function buildOnboardingPath(
  role: OnboardingRole,
  duration: OnboardingDuration,
  notes: KnowledgeNote[],
): { steps: OnboardingStep[]; coverageMessage: string } {
  const seed = roleSeeds[role];
  const scored = notes
    .filter((note) => note.type !== "index" && note.type !== "general")
    .map((note) => {
      const ownerBoost = seed.owners.includes(note.owner ?? "") ? 1.25 : 1;
      const typeBoostValue = seed.types.includes(note.type) ? 1.18 : 0.92;
      const keywordBoost = 1 + noteKeywordScore(note, seed.keywords) * 0.12;
      const score = statusWeight[note.status] * ownerBoost * typeBoostValue * keywordBoost;
      return { note, score };
    })
    .sort((a, b) => b.score - a.score);

  const phases = ["System context", "Requirements", "Physics and rationale", "Implementation", "Deep references"];
  const typeOrder: NoteType[] = ["subsystem", "requirement", "physics_concept", "design_decision", "component", "reference"];
  const picked: OnboardingStep[] = [];

  for (const type of typeOrder) {
    const match = scored.find((entry) => entry.note.type === type && !picked.some((item) => item.note.id === entry.note.id));
    if (match) {
      picked.push({
        note: match.note,
        why: onboardingReason(role, match.note),
        phase: phases[Math.min(picked.length, phases.length - 1)],
      });
    }
  }

  for (const entry of scored) {
    if (picked.length >= durationCounts[duration]) break;
    if (picked.some((item) => item.note.id === entry.note.id)) continue;
    picked.push({
      note: entry.note,
      why: onboardingReason(role, entry.note),
      phase: phases[Math.min(picked.length, phases.length - 1)],
    });
  }

  const procurementMentions = notes.filter((note) =>
    normalize(`${note.title} ${note.fullText}`).includes("procurement") || normalize(`${note.title} ${note.fullText}`).includes("vendor")
  ).length;

  const coverageMessage =
    role === "procurement operator" && procurementMentions < 5
      ? "Coverage note: the vault has partial procurement detail, so this path mixes component risk, vendor notes, and adjacent subsystem context instead of pretending full operator coverage."
      : "Coverage note: this path is best-effort and derived entirely from the current vault graph, with the vault remaining the source of truth.";

  return {
    steps: picked.slice(0, durationCounts[duration]),
    coverageMessage,
  };
}
