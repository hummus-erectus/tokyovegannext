import { getLatestInstagramPosts, InstagramPost } from "@/lib/instagram";
import { InstagramFeedClient } from "./InstagramFeedClient";


const MOCK_POSTS: InstagramPost[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    caption: "Delicious vegan ramen in Tokyo!",
    permalink: "https://instagram.com/tokyoveganofficial",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    caption: "Community meetup at Yoyogi Park.",
    permalink: "https://instagram.com/tokyoveganofficial",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800",
    caption: "New vegan restaurant discovery in Shibuya.",
    permalink: "https://instagram.com/tokyoveganofficial",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    caption: "Vegan pizza night!",
    permalink: "https://instagram.com/tokyoveganofficial",
  },
];

export async function InstagramFeed() {
  const posts = await getLatestInstagramPosts(6);
  const displayPosts = posts.length ? posts : MOCK_POSTS;

  return <InstagramFeedClient posts={displayPosts} />;
}
