import {getTranslations} from "next-intl/server";
import {getLatestInstagramPosts, InstagramPost} from "@/lib/instagram";

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
  const t = await getTranslations("HomePage.instagram");
  const posts = await getLatestInstagramPosts(6);
  const displayPosts = posts.length ? posts : MOCK_POSTS;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-900 wrap-break-word sm:text-2xl">
          @tokyoveganofficial
        </h2>
        <a
          href="https://instagram.com/tokyoveganofficial"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:text-base"
        >
          {t("followUs")}
        </a>
      </div>

      {(() => {
        const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0", "-rotate-1"];

        return (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {displayPosts.map((post, index) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className={`group relative z-0 mb-4 inline-block w-full transform break-inside-avoid transition duration-300 ease-out hover:z-30 hover:scale-105 ${rotations[index % rotations.length]}`}
              >
                <div className="overflow-hidden rounded-xl shadow-sm shadow-slate-400 transition group-hover:shadow-lg">
                  <img
                    src={post.imageUrl}
                    alt={post.caption || "Instagram post"}
                    className="w-full h-auto transition duration-500"
                  />
                </div>
              </a>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
