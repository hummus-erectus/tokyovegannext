"use client";

import Image from "next/image";
import {PaperButton} from "@/components/PaperButton";
import {WashiTape} from "@/components/WashiTape";

type FeaturedResourceCardProps = {
  locale: "en" | "ja";
  href: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
};

export function FeaturedResourceCard({
  locale,
  href,
  badge,
  eyebrow,
  title,
  description,
  cta,
  imageSrc,
  imageAlt
}: FeaturedResourceCardProps) {
  return (
    <div className="relative -rotate-1">
      <WashiTape variant="emerald" placement="top-left" rotation={-34} size="lg" />
      <WashiTape variant="mint" placement="bottom-right" rotation={-42} size="lg" />
      <div className="paper-card p-6 sm:p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          <div className="relative w-full max-w-[320px] shrink-0 sm:max-w-[400px] md:max-w-sm lg:max-w-md">
            <div className="absolute -top-3 -right-2 z-20 rotate-12 sm:-top-4 sm:-right-3 md:-top-5 md:-right-5">
              <div
                className="border border-amber-300/60 bg-[#FCD34D] px-4 py-2 shadow-md"
                style={{clipPath: "polygon(3% 8%, 97% 2%, 100% 92%, 4% 98%)"}}
              >
                <span className="font-decorative text-base font-bold text-slate-900 sm:text-lg md:text-xl">{badge}</span>
              </div>
            </div>

            <div className="rotate-1 paper-card p-3 pb-6 paper-shadow-rest">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="mt-3 -rotate-1 text-center font-decorative text-lg text-slate-500">{eyebrow}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2 className="mb-4 font-heading text-5xl font-bold text-slate-900 -rotate-1 md:text-6xl">
              {title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">{description}</p>
            <div>
              <PaperButton
                href={href}
                type="link"
                locale={locale}
                variant="solid"
                color="emerald"
                size="lg"
                className="font-bold"
              >
                {cta} →
              </PaperButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
