import "server-only";

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

const FEEDFRAMER_API_KEY = process.env.FEEDFRAMER_API_KEY;

interface FeedframerPost {
  id: string;
  caption: string | null;
  mediaUrl: string;
  thumbnailUrl: string | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REELS";
  permalink: string;
}

interface FeedframerResponse {
  posts: FeedframerPost[];
}

export async function getLatestInstagramPosts(limit = 4): Promise<InstagramPost[]> {
  if (!FEEDFRAMER_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[instagram] Missing FEEDFRAMER_API_KEY env var");
    }
    return [];
  }

  const params = new URLSearchParams({
    api_key: FEEDFRAMER_API_KEY!,
    "filter[type]": "CAROUSEL_ALBUM",
    "page[size]": String(limit),
  });

  const url = `https://feedframer.com/api/v1/me?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: {revalidate: 3600},
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[instagram] Failed to fetch posts from FeedFramer:", response.status, response.statusText);
      }
      return [];
    }

    const json = (await response.json()) as FeedframerResponse;
    const items = (json.posts ?? []).filter(
      (item) => item.mediaType === "CAROUSEL_ALBUM",
    );

    const getImageUrl = (item: FeedframerPost): string => {
      // Prefer thumbnail for video/reel content, main media URL for images
      if ((item.mediaType === "VIDEO" || item.mediaType === "REELS") && item.thumbnailUrl) {
        return item.thumbnailUrl;
      }

      if (item.mediaType === "IMAGE" || item.mediaType === "CAROUSEL_ALBUM") {
        return item.mediaUrl;
      }

      return item.thumbnailUrl ?? item.mediaUrl;
    };

    return items.slice(0, limit).map((item) => ({
      id: item.id,
      imageUrl: getImageUrl(item),
      caption: item.caption ?? "",
      permalink: item.permalink,
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[instagram] Error fetching posts from FeedFramer", error);
    }
    return [];
  }
}
