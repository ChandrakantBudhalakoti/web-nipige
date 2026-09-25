import { planLimits } from "@/lib/data/pricing";

const HEAD_CELL: React.CSSProperties = {
  background: "var(--cd)",
  color: "var(--wd)",
  padding: "8px 10px",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
};

const BODY_CELL: React.CSSProperties = {
  padding: "8px 10px",
  borderBottom: "1px solid var(--wb)",
  color: "var(--wm)",
};

/** "What each tier includes" comparison table - ported from the prototype's plan-limits table. */
export function PlanLimits() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ ...HEAD_CELL, textAlign: "left" }}>Feature</th>
            <th style={HEAD_CELL}>Starter</th>
            <th style={{ ...HEAD_CELL, color: "var(--cy)" }}>Growth ★</th>
            <th style={HEAD_CELL}>Business</th>
            <th style={HEAD_CELL}>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {planLimits.map((row) => (
            <tr key={row[0]}>
              <td style={{ ...BODY_CELL, fontWeight: 600, color: "var(--w)" }}>{row[0]}</td>
              <td style={{ ...BODY_CELL, textAlign: "center" }}>{row[1]}</td>
              <td style={{ ...BODY_CELL, textAlign: "center", color: "var(--w)" }}>{row[2]}</td>
              <td style={{ ...BODY_CELL, textAlign: "center" }}>{row[3]}</td>
              <td style={{ ...BODY_CELL, textAlign: "center" }}>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
