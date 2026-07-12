/**
 * Deterministic hash-based pick — stable across page reloads.
 * Uses FNV-1a with a salt so the same id yields different selections
 * for variant vs. secondary variant, etc.
 */
export function washiPick(id: string, salt: number, n: number): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= salt;
  h = Math.imul(h, 16777619);
  return Math.abs(h >>> 0) % n;
}
