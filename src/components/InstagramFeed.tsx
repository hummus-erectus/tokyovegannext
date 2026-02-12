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
  const posts = await getLatestInstagramPosts(6);
  const displayPosts = posts.length ? posts : MOCK_POSTS;

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <a
          href="https://instagram.com/tokyoveganofficial"
          target="_blank"
          rel="noreferrer"
          className="font-hand-brand text-5xl font-bold text-emerald-600 hover:text-emerald-700 hover:underline -rotate-2"
        >
          @tokyoveganofficial
        </a>
      </div>

      {(() => {
        const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-1", "-rotate-2"];
        const verticalOffsets = ["translate-y-0", "translate-y-4", "translate-y-2", "translate-y-0", "translate-y-0", "translate-y-4"];

        return (
          <div className="grid grid-cols-2 items-center gap-4 md:gap-8 md:grid-cols-3 lg:gap-12">
            {displayPosts.map((post, index) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className={`group relative z-0 inline-block w-full transform break-inside-avoid transition duration-300 ease-out hover:z-30 hover:scale-110 ${rotations[index % rotations.length]} ${verticalOffsets[index % verticalOffsets.length]}`}
              >
                <div className="tape-top-center" />
                <div className="flex flex-col items-center justify-center bg-white p-2 md:p-3 shadow-lg shadow-slate-300 transition group-hover:shadow-xl">
                  <div className="w-full overflow-hidden bg-slate-100 flex items-center">
                    <img
                      src={post.imageUrl}
                      alt={post.caption || "Instagram post"}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
