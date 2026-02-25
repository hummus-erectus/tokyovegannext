"use client";

import { useState } from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {useLocale} from "next-intl";
import Image from "next/image";
import { RoughHighlight } from "./RoughHighlight";

export default function Footer() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const [hoverMeetup, setHoverMeetup] = useState(false);
  const [hoverInsta, setHoverInsta] = useState(false);
  const [hoverRes, setHoverRes] = useState(false);

  return (
    <footer className="relative z-10 mt-16 bg-emerald-50/90 px-4 pb-8 pt-10 text-emerald-900 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] backdrop-blur-sm">
      {/* Perforated edge effect */}
      <div className="absolute left-0 right-0 top-[-4px] border-t-8 border-dotted border-emerald-300/60" />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        {/* Brand / Tagline */}
        <div className="space-y-2">
          <div className="drop-shadow-sm">
            <Image
              src="/images/hanko_square.png"
              alt={t("brand")}
              width={140}
              height={140}
              className="mx-auto h-auto w-32"
            />
          </div>
          <p className="font-hand text-2xl font-bold text-emerald-800/70">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 font-hand text-xl font-bold text-emerald-900">
          <a
            href="https://www.meetup.com/tokyovegan/"
            target="_blank"
            rel="noreferrer"
            className="group relative transition-transform"
            onMouseEnter={() => setHoverMeetup(true)}
            onMouseLeave={() => setHoverMeetup(false)}
          >
            <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover" show={hoverMeetup}>
              <span className="relative z-10">
                {t("footer.links.meetup")}
              </span>
            </RoughHighlight>
          </a>

          <a
            href="https://www.instagram.com/tokyoveganofficial/"
            target="_blank"
            rel="noreferrer"
            className="group relative transition-transform"
            onMouseEnter={() => setHoverInsta(true)}
            onMouseLeave={() => setHoverInsta(false)}
          >
             <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover" show={hoverInsta}>
               <span className="relative z-10">
                {t("footer.links.instagram")}
              </span>
            </RoughHighlight>
          </a>

          <Link
            href="/resources"
            locale={locale}
            className="group relative transition-transform"
            onMouseEnter={() => setHoverRes(true)}
            onMouseLeave={() => setHoverRes(false)}
          >
             <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover" show={hoverRes}>
               <span className="relative z-10">
                {t("footer.links.resources")}
              </span>
            </RoughHighlight>
          </Link>
        </div>

        {/* Copyright */}
        <div className="font-hand text-xl text-emerald-700/50">
          <p>
            © {new Date().getFullYear()} Tokyo Vegan. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
