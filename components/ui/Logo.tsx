/** The Nipige node-graph mark, ported from the inline SVG in the prototype. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <line x1="20" y1="8" x2="8" y2="17" stroke="#22D3EE" strokeWidth="2" strokeOpacity=".7" />
      <line x1="20" y1="8" x2="32" y2="17" stroke="#22D3EE" strokeWidth="2" strokeOpacity=".7" />
      <line x1="8" y1="17" x2="11" y2="31" stroke="#22D3EE" strokeWidth="2" strokeOpacity=".7" />
      <line x1="32" y1="17" x2="29" y2="31" stroke="#22D3EE" strokeWidth="2" strokeOpacity=".7" />
      <line x1="11" y1="31" x2="29" y2="31" stroke="#22D3EE" strokeWidth="2" strokeOpacity=".7" />
      <g className="logo-dots">
        <circle cx="20" cy="8" r="4.5" fill="#22D3EE" />
        <circle cx="8" cy="17" r="3.5" fill="#06B6D4" />
        <circle cx="32" cy="17" r="3.5" fill="#06B6D4" />
        <circle cx="11" cy="31" r="3.5" fill="#0891B2" />
        <circle cx="29" cy="31" r="3.5" fill="#0891B2" />
      </g>
    </svg>
  );
}
