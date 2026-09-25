import { formatLastUpdated } from "@/lib/data/pageFreshness";

/** Visible freshness line for visitors and alignment with dateModified schema. */
export function LastUpdated({ date }: { date: string }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: "var(--wd)",
        marginTop: 8,
        marginBottom: 0,
        letterSpacing: "0.02em",
      }}
    >
      Last updated: {formatLastUpdated(date)}
    </p>
  );
}
