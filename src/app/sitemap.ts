import type {MetadataRoute} from "next";
import {client} from "@/sanity/client";
import {routing} from "@/i18n/routing";
import {SITE_URL} from "@/lib/site";

export const revalidate = 3600;

const STATIC_PATHS = [
  "",
  "/events",
  "/about-vegan",
  "/blog",
  "/resources",
  "/resources/starter-kits",
  "/resources/restaurants",
  "/resources/shopping",
  "/resources/cooking",
  "/resources/community",
  "/resources/books",
  "/resources/movies",
];

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && publishedAt < now()] {
  language,
  "slug": slug.current,
  _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = routing.locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({url: `${SITE_URL}/${locale}${path}`}))
  );

  const posts: {language: string; slug: string; _updatedAt: string}[] = await client
    .fetch(POSTS_QUERY)
    .catch(() => []);

  const postEntries = posts
    .filter((post) => routing.locales.includes(post.language as "en" | "ja"))
    .map((post) => ({
      url: `${SITE_URL}/${post.language}/blog/${post.slug}`,
      lastModified: post._updatedAt,
    }));

  return [...staticEntries, ...postEntries];
}
