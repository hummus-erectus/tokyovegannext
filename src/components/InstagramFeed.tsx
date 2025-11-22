import { useTranslations } from "next-intl";

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

const MOCK_POSTS: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    caption: "Delicious vegan ramen in Tokyo! 🍜 #tokyovegan #veganjapan",
    permalink: "https://instagram.com",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    caption: "Community meetup at Yoyogi Park 🌱",
    permalink: "https://instagram.com",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800",
    caption: "New vegan burger spot in Shibuya 🍔",
    permalink: "https://instagram.com",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    caption: "Vegan pizza night! 🍕",
    permalink: "https://instagram.com",
  },
];

export function InstagramFeed() {
  const t = useTranslations("HomePage.instagram");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📸</span>
          <h2 className="text-2xl font-bold text-slate-900">@tokyovegan</h2>
        </div>
        <a
          href="https://instagram.com/tokyovegan"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          {t("followUs")} →
        </a>
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {MOCK_POSTS.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </a>
        ))}
      </div>
    </div>
  );
}
