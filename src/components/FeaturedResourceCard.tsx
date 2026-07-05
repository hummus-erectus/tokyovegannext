"use client";

import {useState} from "react";
import Image from "next/image";
import {Link} from "@/i18n/routing";
import {RoughHighlight} from "@/components/RoughHighlight";

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
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      href={href}
      locale={locale}
      className="group block"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className="tape-section -rotate-1">
        <div className="tape-top-center" />
        <div className="bg-white p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-300/60 transition-shadow duration-300 group-hover:shadow-2xl">
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

              <div className="rotate-1 bg-white p-3 pb-6 shadow-lg shadow-slate-300/40 transition-transform duration-300 group-hover:rotate-2">
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
                <RoughHighlight
                  type="highlight"
                  multiline={true}
                  color="rgba(167, 243, 208, 0.4)"
                  className="group-hover:[&>span]:text-slate-900!"
                  show={isActive}
                >
                  <span>{title}</span>
                </RoughHighlight>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">{description}</p>
              <div>
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-md transition-all duration-150 group-hover:-translate-y-0.5 group-hover:shadow-lg hover:bg-emerald-700">
                  {cta} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
