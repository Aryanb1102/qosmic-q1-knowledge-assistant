# QOSMIC Knowledge Assistant

Static `Next.js + TypeScript + Tailwind` prototype for browser-side retrieval over the QOSMIC Obsidian engineering vault.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the knowledge index from the Obsidian vault:

```bash
npm run build:index
```

3. Start the local development server:

```bash
npm run dev
```

## Build Flow

- `npm run build:index`: scans `../02_Obsidian_Vault/QOSMIC_Knowledge_Vault` and writes `public/knowledge-index.json`
- `npm run build`: rebuilds the JSON index and then runs the static Next.js build
- `npm run export`: alias for the static build flow

## Deploying to GitHub Pages

This app is fully static and browser-side only. It does not use API routes, databases, environment variables, or paid services.

1. Open [next.config.mjs](/d:/QOSMIC_Assessment/RAG_Webapp/next.config.mjs).
2. Leave `const BASE_PATH = ''` for local preview and generic static hosting.
3. Before deploying to a GitHub Pages project URL, change it to:

```js
const BASE_PATH = '/REPO_NAME';
```

4. `basePath` and `assetPrefix` are both derived from that single constant. Do not duplicate the base path anywhere else.
5. Run:

```bash
npm run build
```

6. Publish the generated `out/` folder to GitHub Pages.

## Retrieval Behavior

- Parses Obsidian markdown notes, frontmatter, wikilinks, and heading sections
- Loads `knowledge-index.json` directly in the browser
- Uses `Fuse.js` for local fuzzy retrieval
- Applies status-aware ranking and one-hop graph expansion
- Builds citation-backed answer cards without any LLM API

## Assessment Screenshots to Capture

- Ask page with FSM 400 Hz query result
- Onboarding path for controls engineer, 7 days
- Architecture page
- Citation panel showing source notes
