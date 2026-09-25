import type { ReactNode } from "react";

/** The `// label` + title + optional description block used across sections. */
export function SectionHeading({
  label,
  title,
  description,
  centered = false,
  maxWidth,
  className,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  maxWidth?: number;
  className?: string;
}) {
  return (
    <div
      className={[centered ? "ct" : "", className].filter(Boolean).join(" ") || undefined}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div className="sl">{label}</div>
      <h2 className="st">{title}</h2>
      {description ? <p className="sd">{description}</p> : null}
    </div>
  );
}
