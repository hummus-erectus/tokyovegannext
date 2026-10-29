import type {Metadata} from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tokyovegan.org";

/** Canonical + hreflang links for a path that exists in both locales, e.g. "/events". */
export function localeAlternates(locale: string, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      en: `/en${path}`,
      ja: `/ja${path}`,
      "x-default": `/ja${path}`,
    },
  };
}
