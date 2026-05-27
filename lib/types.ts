export type NoteStatus =
  | "canonical"
  | "reviewed"
  | "draft"
  | "superseded"
  | "conflicting"
  | "unknown";

export type NoteType =
  | "subsystem"
  | "requirement"
  | "design_decision"
  | "physics_concept"
  | "component"
  | "reference"
  | "index"
  | "general";

export interface KnowledgeSection {
  id: string;
  heading: string;
  level: number;
  content: string;
  searchText: string;
}

export type RelationshipMap = Record<string, string[]>;

export interface KnowledgeNote {
  id: string;
  slug: string;
  title: string;
  path: string;
  folder: string;
  subsystem: string;
  type: NoteType;
  status: NoteStatus;
  owner?: string;
  frontmatter: Record<string, unknown>;
  frontmatterLinks: RelationshipMap;
  wikilinks: string[];
  sections: KnowledgeSection[];
  summaryText: string;
  fullText: string;
}

export interface SearchHit {
  noteId: string;
  note: KnowledgeNote;
  sectionId: string;
  section: KnowledgeSection;
  rawScore: number;
  score: number;
  reasons: string[];
  direct: boolean;
}

export interface ExpandedResult {
  note: KnowledgeNote;
  score: number;
  direct: boolean;
  reasons: string[];
  matchedSections: KnowledgeSection[];
}

export interface Citation {
  noteId: string;
  noteTitle: string;
  noteType: NoteType;
  status: NoteStatus;
  path: string;
  sectionHeading: string;
  snippet: string;
  score: number;
  initiallyExpanded: boolean;
}

export interface AnswerCardData {
  query: string;
  headline: string;
  summary: string[];
  statusMessage: string;
  confidenceLabel: string;
  citations: Citation[];
  support: Record<string, KnowledgeNote[]>;
  relatedNotes: KnowledgeNote[];
}

export type OnboardingRole =
  | "optical engineer"
  | "controls engineer"
  | "systems engineer"
  | "procurement operator";

export type OnboardingDuration = "3 days" | "7 days" | "30 days";

export interface OnboardingStep {
  note: KnowledgeNote;
  why: string;
  phase: string;
}
