/** "#RRGGBB" -> "r, g, b", so CSS can build rgba(var(--acc-rgb), alpha) per element. */
export function hexToRgbTriplet(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
