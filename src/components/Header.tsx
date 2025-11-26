"use client";

import {Link, usePathname} from "@/i18n/routing";
import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";

const navLinks = [
  {key: "resources", href: "/resources", type: "internal"},
  {key: "blog", href: "/#blog", type: "internal"},
  {
    key: "events",
    href: "https://www.tokyovegan.org/en/events",
    type: "external"
  }
] as const;

type NavItemsProps = {
  direction?: "row" | "col";
  locale: string;
  translate: ReturnType<typeof useTranslations>;
  onNavigate?: () => void;
};

type LanguageSwitchProps = {
  variant?: "pill" | "list";
  locale: string;
  pathname: string;
  translate: ReturnType<typeof useTranslations>;
};

function NavItems({direction = "row", locale, translate, onNavigate}: NavItemsProps) {
  return (
    <div className={`flex ${direction === "row" ? "gap-8 items-center" : "flex-col gap-4"} font-bold text-slate-600`}>
      {navLinks.map((link) =>
        link.type === "external" ? (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${
              direction === "row" 
                ? "rounded-full bg-[#FCD34D] px-6 py-2 text-slate-900 shadow-sm hover:bg-[#fbbf24] hover:shadow-md" 
                : "text-emerald-600 hover:text-emerald-700"
            }`}
            onClick={onNavigate}
          >
            {translate(`nav.${link.key}`)}
          </a>
        ) : (
          <Link
            key={link.key}
            href={link.href}
            locale={locale}
            className="transition-colors hover:text-emerald-600"
            onClick={onNavigate}
          >
            {translate(`nav.${link.key}`)}
          </Link>
        )
      )}
    </div>
  );
}

function LanguageSwitch({variant = "pill", locale, pathname, translate}: LanguageSwitchProps) {
  const targetLocale = locale === "en" ? "ja" : "en";
  const targetKey = targetLocale === "en" ? "english" : "japanese";
  const fontStyle =
    targetLocale === "en"
      ? {fontFamily: "var(--font-amatic)"}
      : {fontFamily: "var(--font-yomogi)"};

  const commonProps = {
    href: pathname || "/",
    locale: targetLocale,
    style: fontStyle,
  } as const;

  if (variant === "pill") {
    return (
      <Link
        {...commonProps}
        className={
          targetLocale === "en"
            ? "hidden text-xl font-bold text-slate-600 underline-offset-4 hover:text-emerald-700 hover:underline md:inline md:text-2xl"
            : "hidden text-lg font-bold text-slate-600 underline-offset-4 hover:text-emerald-700 hover:underline md:inline md:text-xl"
        }
      >
        {translate(`languageToggle.${targetKey}`)}
      </Link>
    );
  }

  return (
    <Link
      {...commonProps}
      className={
        targetLocale === "en"
          ? "rounded-full border border-transparent px-3 py-2 text-center text-xl font-semibold text-slate-600 transition-colors hover:text-emerald-700"
          : "rounded-full border border-transparent px-3 py-2 text-center text-lg font-semibold text-slate-600 transition-colors hover:text-emerald-700"
      }
    >
      {translate(`languageToggle.${targetKey}`)}
    </Link>
  );
}

export default function Header() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FCF7DA]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          locale={locale}
          className="font-hand-brand text-4xl font-bold uppercase tracking-wide text-brand-green transition-colors hover:text-emerald-700"
        >
          {t("brand")}
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <NavItems locale={locale} translate={t} />
          <LanguageSwitch variant="pill" locale={locale} pathname={pathname || "/"} translate={t} />
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-emerald-900 transition hover:bg-emerald-50 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span className="block w-6 space-y-1.5">
             <span className={`block h-0.5 w-6 transform bg-current transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
             <span className={`block h-0.5 w-6 bg-current transition duration-300 ${open ? "opacity-0" : ""}`} />
             <span className={`block h-0.5 w-6 transform bg-current transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="space-y-6 border-t border-emerald-100 bg-white px-4 py-6 shadow-lg">
            <NavItems
              direction="col"
              locale={locale}
              translate={t}
              onNavigate={() => setOpen(false)}
            />
            <LanguageSwitch variant="list" locale={locale} pathname={pathname || "/"} translate={t} />
          </div>
        </div>
      )}
    </header>
  );
}
