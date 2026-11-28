/** Consistent section wrapper and heading block for marketing pages. */
export function Section({
  id,
  tone = "plain",
  children,
}: {
  id?: string;
  tone?: "plain" | "alt" | "dark";
  children: React.ReactNode;
}) {
  const toneCls =
    tone === "alt" ? "bg-bg-alt" : tone === "dark" ? "bg-ink text-white" : "bg-white";
  return (
    <section id={id} className={`${toneCls} py-[72px] md:py-[88px]`}>
      <div className="mx-auto max-w-[1180px] px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-[760px]">
      {eyebrow && (
        <span
          className={`mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] ${
            dark ? "text-accent" : "text-accent-2"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`mb-4 ${dark ? "text-white" : ""}`}>{title}</h2>
      {intro && (
        <p className={`m-0 text-[1.05rem] leading-7 ${dark ? "text-slate-300" : "text-ink-2"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
