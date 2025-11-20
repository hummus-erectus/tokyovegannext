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

const languageToggle = [
  {key: "japanese", locale: "ja"},
  {key: "english", locale: "en"}
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
    <div className={`flex ${direction === "row" ? "gap-6" : "flex-col gap-4"} text-sm font-medium text-slate-600`}>
      {navLinks.map((link) =>
        link.type === "external" ? (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-emerald-700"
            onClick={onNavigate}
          >
            {translate(`nav.${link.key}`)}
          </a>
        ) : (
          <Link
            key={link.key}
            href={link.href}
            locale={locale}
            className="transition-colors hover:text-emerald-700"
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
  const baseClass = "rounded-full px-3 py-1 transition-colors";
  return (
    <div
      className={
        variant === "pill"
          ? "hidden items-center gap-1 rounded-full border border-emerald-200 bg-white p-1 text-xs font-semibold text-slate-500 md:flex"
          : "flex flex-col gap-2 text-sm font-semibold"
      }
    >
      {languageToggle.map((toggle) => (
        <Link
          key={toggle.key}
          href={pathname || "/"}
          locale={toggle.locale}
          className={
            variant === "pill"
              ? `${baseClass} ${
                  locale === toggle.locale
                    ? "bg-emerald-100 text-emerald-900"
                    : "text-slate-500 hover:text-emerald-700"
                }`
              : `rounded-full border px-3 py-2 text-center transition-colors ${
                  locale === toggle.locale
                    ? "border-emerald-500 text-emerald-700"
                    : "border-transparent text-slate-500 hover:text-emerald-700"
                }`
          }
        >
          {translate(`languageToggle.${toggle.key}`)}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          locale={locale}
          className="text-lg font-semibold text-emerald-800 transition-colors hover:text-emerald-600"
        >
          {t("brand")}
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <NavItems locale={locale} translate={t} />
          <LanguageSwitch variant="pill" locale={locale} pathname={pathname || "/"} translate={t} />
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span className="block h-0.5 w-6 bg-emerald-700 transition-all">
            <span className="sr-only">menu</span>
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="space-y-6 border-t border-emerald-100 bg-white px-4 py-6 shadow-inner">
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
