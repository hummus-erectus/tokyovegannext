'use client';

import { InstagramPost } from "@/lib/instagram";
import { RoughHighlight } from "./RoughHighlight";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function InstagramFeedClient({ posts }: { posts: InstagramPost[] }) {
  const t = useTranslations("HomePage.instagram");

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center">
        <div className="relative inline-block sm:pl-6 lg:pl-0 lg:mx-auto">
          {/* Desktop annotation — right of handle, arrow pointing left */}
          <div className="hidden sm:flex absolute top-1/2 left-full ml-2 sm:ml-3 lg:ml-4 -translate-y-1/2 -rotate-3 pointer-events-none select-none whitespace-nowrap items-center gap-0.5 sm:gap-1 z-10">
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9 text-slate-700 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* wobbly shaft going right-to-left */}
              <path d="M44 26 c -8 -2, -18 -4, -28 -1" />
              {/* arrowhead pointing left */}
              <path d="M16 20 l -8 5 l 8 6" />
            </svg>
            <span className="font-decorative text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700 leading-tight">
              {t("annotation")}
            </span>
          </div>
          <div className="tape-section -rotate-2">
            <div className="tape-top-center" />
            <div className="paper-strip">
              <a
                href="https://instagram.com/tokyoveganofficial"
                target="_blank"
                rel="noreferrer"
                className="group font-brand text-4xl sm:text-5xl font-bold text-emerald-700"
              >
                <RoughHighlight type="underline" color="#10b981" strokeWidth={3} trigger="hover">
                  <span>@tokyoveganofficial</span>
                </RoughHighlight>
              </a>
            </div>
          </div>
          {/* Mobile annotation — below handle, arrow curls up from right side */}
          <div className="sm:hidden mt-1 -rotate-1 pointer-events-none select-none flex items-center justify-center gap-1">
            <span className="font-decorative text-lg font-bold text-slate-700 leading-tight">
              {t("annotation")}
            </span>
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="h-9 w-9 text-slate-700 shrink-0 mb-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* quarter-circle curl: starts at left (text side), goes right then curves up */}
              <path d="M6 30 c 14 0, 24 -8, 24 -24" />
              {/* arrowhead pointing up at the handle */}
              <path d="M25 10 l 4 -8 l 8 8" />
            </svg>
          </div>
        </div>
      </div>

      {(() => {
        const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-1", "-rotate-2"];
        const verticalOffsets = ["translate-y-0", "translate-y-4", "translate-y-2", "translate-y-0", "translate-y-0", "translate-y-4"];

        return (
          <div className="mx-auto grid max-w-4xl grid-cols-2 items-center gap-4 md:gap-8 md:grid-cols-3 lg:gap-10">
            {posts.map((post, index) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className={`group relative z-0 inline-block w-full transform break-inside-avoid transition duration-300 ease-out hover:z-30 hover:scale-110 ${rotations[index % rotations.length]} ${verticalOffsets[index % verticalOffsets.length]}`}
              >
                <div className="tape-top-center" />
                <div className="flex flex-col items-center justify-center paper-card p-2 md:p-3 paper-shadow-rest transition group-hover:paper-shadow-lift">
                  {/* Fixed 4:5 (Instagram's portrait post shape) so reel covers (9:16) don't stretch the grid */}
                  <div className="relative w-full aspect-4/5 overflow-hidden bg-slate-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.caption || "Instagram post"}
                      width={500}
                      height={625}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                    {post.isVideo && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white"
                      >
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    )}
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
