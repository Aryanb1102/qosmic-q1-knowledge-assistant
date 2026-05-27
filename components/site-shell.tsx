import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const links = [
  { href: "/", label: "Ask" },
  { href: "/onboarding", label: "Onboarding Path" },
  { href: "/architecture", label: "Architecture" },
];

export function SiteShell({ children }: Props) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <header className="glass technical-line sticky top-4 z-40 mb-10 rounded-2xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">QOSMIC Knowledge Assistant</div>
            <div className="mt-1 text-sm text-slate-300">Zero-cost Obsidian retrieval layer for engineering query answering.</div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
