import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const workspaceRoot = process.cwd();
const vaultRoot = path.resolve(workspaceRoot, "../02_Obsidian_Vault/QOSMIC_Knowledge_Vault");
const outputPath = path.resolve(workspaceRoot, "public/knowledge-index.json");

const excludedDirectories = new Set([".obsidian", "templates"]);
const markdownExtension = ".md";

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeLink(rawLink) {
  return rawLink
    .replace(/^\[\[/, "")
    .replace(/\]\]$/, "")
    .split("|")[0]
    .trim();
}

function extractWikiLinks(text) {
  return [...text.matchAll(/\[\[([^\]]+)\]\]/g)].map((match) => normalizeLink(`[[${match[1]}]]`));
}

function deriveType(frontmatterType, fileName) {
  if (frontmatterType) return frontmatterType;
  if (fileName === "_index.md" || fileName.endsWith("-index.md") || fileName.includes("index")) return "index";
  return "general";
}

function deriveTitle(content, fileName) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fileName.replace(/\.md$/i, "");
}

function deriveSubsystem(relativePath) {
  const segments = relativePath.split(path.sep);
  if (segments[0] === "wiki" && segments[1] && !segments[1].endsWith(".md")) {
    return segments[1];
  }
  if (segments[0] === "wiki") return "vault-navigation";
  return "root";
}

function deriveFolder(relativePath) {
  const dir = path.dirname(relativePath);
  return dir === "." ? "root" : dir.replace(/\\/g, "/");
}

function extractFrontmatterLinks(frontmatter) {
  const entries = Object.entries(frontmatter);
  const links = {};

  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      const normalized = value
        .filter((item) => typeof item === "string")
        .flatMap((item) => extractWikiLinks(item));
      if (normalized.length) {
        links[key] = normalized;
      }
      continue;
    }
    if (typeof value === "string" && value.includes("[[")) {
      const normalized = extractWikiLinks(value);
      if (normalized.length) {
        links[key] = normalized;
      }
    }
  }

  return links;
}

function splitSections(content, noteId) {
  const lines = content.split(/\r?\n/);
  const sections = [];
  let current = { heading: "Document Overview", level: 1, lines: [] };
  let counter = 0;

  const pushCurrent = () => {
    const rawContent = current.lines.join("\n").trim();
    if (!rawContent) return;
    sections.push({
      id: `${noteId}-section-${counter++}`,
      heading: current.heading,
      level: current.level,
      content: rawContent,
      searchText: `${current.heading}\n${rawContent}`.trim(),
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      pushCurrent();
      current = {
        heading: headingMatch[2].trim(),
        level: headingMatch[1].length,
        lines: [],
      };
      continue;
    }
    current.lines.push(line);
  }

  pushCurrent();
  return sections;
}

async function walkMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (excludedDirectories.has(entry.name)) continue;
      files.push(...(await walkMarkdownFiles(path.join(directory, entry.name))));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(markdownExtension)) continue;
    files.push(path.join(directory, entry.name));
  }

  return files;
}

async function ensureVault() {
  try {
    const stat = await fs.stat(vaultRoot);
    if (!stat.isDirectory()) throw new Error("Vault path is not a directory.");
  } catch (error) {
    throw new Error(`Knowledge vault not found at ${vaultRoot}`);
  }
}

async function build() {
  await ensureVault();
  const files = await walkMarkdownFiles(vaultRoot);
  const notes = [];

  for (const filePath of files) {
    const relativePath = path.relative(vaultRoot, filePath);
    const source = await fs.readFile(filePath, "utf8");
    const parsed = matter(source);
    const title = deriveTitle(parsed.content, path.basename(filePath));
    const id = slugify(relativePath.replace(/\\/g, "/"));
    const sections = splitSections(parsed.content, id);
    const bodyLinks = extractWikiLinks(parsed.content);
    const frontmatterLinks = extractFrontmatterLinks(parsed.data);
    const allLinks = [...new Set([...bodyLinks, ...Object.values(frontmatterLinks).flat()])];
    const summarySection = sections.find((section) => /summary|overview/i.test(section.heading)) ?? sections[0];
    const fullText = sections.map((section) => section.searchText).join("\n\n").trim();

    notes.push({
      id,
      slug: slugify(title),
      title,
      path: relativePath.replace(/\\/g, "/"),
      folder: deriveFolder(relativePath),
      subsystem: deriveSubsystem(relativePath),
      type: deriveType(parsed.data.type, path.basename(filePath)),
      status: parsed.data.status ?? "unknown",
      owner: parsed.data.owner ?? undefined,
      frontmatter: parsed.data,
      frontmatterLinks,
      wikilinks: allLinks,
      sections,
      summaryText: summarySection?.content?.replace(/\s+/g, " ").trim() ?? title,
      fullText: fullText.replace(/\s+/g, " ").trim(),
    });
  }

  notes.sort((left, right) => left.path.localeCompare(right.path));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(notes, null, 2), "utf8");
  console.log(`Wrote ${notes.length} notes to ${outputPath}`);
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
