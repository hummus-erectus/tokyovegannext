import "server-only";

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

export async function getLatestInstagramPosts(limit = 4): Promise<InstagramPost[]> {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[instagram] Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID env vars");
    }
    return [];
  }

  const params = new URLSearchParams({
    fields: "id,caption,media_url,permalink,media_type",
    access_token: INSTAGRAM_ACCESS_TOKEN,
    limit: String(limit),
  });

  const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[instagram] Failed to fetch posts:", response.status, response.statusText);
      }
      return [];
    }

    type ApiMedia = {
      id: string;
      caption?: string;
      media_url: string;
      permalink: string;
      media_type: string;
    };

    const json = (await response.json()) as { data?: ApiMedia[] };
    const items = json.data ?? [];

    return items
      .filter((item) => item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM" || item.media_type === "VIDEO")
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        imageUrl: item.media_url,
        caption: item.caption ?? "",
        permalink: item.permalink,
      }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[instagram] Error fetching posts", error);
    }
    return [];
  }
}
