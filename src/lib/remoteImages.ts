// Hosts next/image may optimize. next.config.ts builds its allowlist from this.
export const optimizedImageHosts = [
  "images.unsplash.com",
  "books.google.co.jp",
  "lanternpub.wpenginepowered.com",
  "res.cloudinary.com",
  "cdn.sanity.io",
  "cdn.feedframer.com", // Instagram feed images
];

// Sheet editors can paste an image from any site, and the optimizer rejects hosts
// it doesn't know, so those images load directly instead of showing as broken.
export function skipImageOptimization(src: string): boolean {
  if (src.startsWith("/")) return false;
  try {
    const url = new URL(src);
    return url.protocol !== "https:" || !optimizedImageHosts.includes(url.hostname);
  } catch {
    return true;
  }
}
