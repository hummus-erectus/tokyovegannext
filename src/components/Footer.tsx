"use client";

import {useTranslations} from "next-intl";

export default function Footer() {
  const t = useTranslations("HomePage");

  return (
    <footer className="border-t border-emerald-100 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Tokyo Vegan · {t("brand")} · Tokyo, Japan
        </p>
        <a
          href="https://www.meetup.com/tokyovegan/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-emerald-700 transition-colors hover:text-emerald-500"
        >
          {t("hero.primaryCta")} →
        </a>
      </div>
    </footer>
  );
}
