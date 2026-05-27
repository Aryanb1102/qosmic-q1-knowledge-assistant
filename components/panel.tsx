interface Props {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ title, eyebrow, children, className = "" }: Props) {
  return (
    <section className={`glass rounded-3xl p-5 sm:p-6 ${className}`}>
      {eyebrow ? <div className="mb-2 text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">{eyebrow}</div> : null}
      <h2 className="display text-xl text-white sm:text-2xl">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-slate-300">{children}</div>
    </section>
  );
}
