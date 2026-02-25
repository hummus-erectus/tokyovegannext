'use client';

import { useState } from "react";
import { InstagramPost } from "@/lib/instagram";
import { RoughHighlight } from "./RoughHighlight";

export function InstagramFeedClient({ posts }: { posts: InstagramPost[] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <a
          href="https://instagram.com/tokyoveganofficial"
          target="_blank"
          rel="noreferrer"
          className="font-hand-brand text-5xl font-bold text-emerald-600 hover:text-emerald-700 -rotate-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <RoughHighlight type="underline" color="#10b981" strokeWidth={3} trigger="hover" show={isHovered}>
            <span>@tokyoveganofficial</span>
          </RoughHighlight>
        </a>
      </div>

      {(() => {
        const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-1", "-rotate-2"];
        const verticalOffsets = ["translate-y-0", "translate-y-4", "translate-y-2", "translate-y-0", "translate-y-0", "translate-y-4"];

        return (
          <div className="grid grid-cols-2 items-center gap-4 md:gap-8 md:grid-cols-3 lg:gap-12">
            {posts.map((post, index) => (
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
