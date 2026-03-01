"use client";

import {Link, usePathname} from "@/i18n/routing";
import {useHeadroom} from "@/hooks/useHeadroom";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {RoughHighlight} from "./RoughHighlight";

const navLinks: { key: "events" | "resources" | "blog"; href: string; type: "internal" | "external" }[] = [
  {key: "events", href: "/#newsletter", type: "internal"},
  {key: "resources", href: "/#activities", type: "internal"},
  {key: "blog", href: "/#blog", type: "internal"}
];

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
  const isMobile = direction === "col";
  return (
    <div
      className={`flex ${
        isMobile
          ? "flex-col items-center gap-6 font-hand text-2xl font-semibold text-emerald-900"
          : "gap-8 items-center font-hand text-2xl font-bold text-emerald-900"
      }`}
    >
      {navLinks.map((link) =>
        "type" in link && link.type === "external" ? (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${
              !isMobile
                ? "rounded-full bg-[#FCD34D] px-6 py-2 text-emerald-950 font-bold shadow-sm hover:bg-[#fbbf24] hover:shadow-md"
                : "text-emerald-800 hover:text-emerald-600"
            }`}
            onClick={onNavigate}
          >
            <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover">
              <span className="relative z-10">{translate(`nav.${link.key}`)}</span>
            </RoughHighlight>
          </a>
        ) : (
          <Link
            key={link.key}
            href={link.href}
            locale={locale}
            className={`transition-colors ${
              isMobile ? "hover:text-emerald-600" : "hover:text-emerald-600"
            }`}
            onClick={onNavigate}
          >
            <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover">
              <span className="relative z-10">{translate(`nav.${link.key}`)}</span>
            </RoughHighlight>
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
            ? "hidden text-xl font-bold text-emerald-900 underline-offset-4 hover:text-emerald-700 hover:underline md:inline md:text-2xl"
            : "hidden text-lg font-bold text-emerald-900 underline-offset-4 hover:text-emerald-700 hover:underline md:inline md:text-xl"
        }
      >
        <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover">
          <span className="relative z-10">{translate(`languageToggle.${targetKey}`)}</span>
        </RoughHighlight>
      </Link>
    );
  }

  return (
    <Link
      {...commonProps}
      className={
        targetLocale === "en"
          ? "text-center text-2xl font-bold text-emerald-900 transition-colors hover:text-emerald-700"
          : "text-center text-xl font-bold text-emerald-900 transition-colors hover:text-emerald-700"
      }
    >
      <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover">
        <span className="relative z-10">{translate(`languageToggle.${targetKey}`)}</span>
      </RoughHighlight>
    </Link>
  );
}

export default function Header() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(96);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { style: headroomStyle, className: headroomClass } = useHeadroom({
    upTolerance: 1,
    downTolerance: 1,
    pinStart: 0,
    forcePinned: open,
  });

  // Hide ripped edge on mobile when menu is open (menu has its own ripped edge)
  const headerClass = `bg-[#FFFEF5] backdrop-blur-sm ${
    open ? "header-ripped header-ripped--mobile-open" : "header-ripped"
  }`;

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [open]);

  return (
    <>
      <div ref={headerRef} style={headroomStyle} className={`headroom-wrapper ${headroomClass}`}>
        <header className={headerClass}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link
              href="/"
              locale={locale}
              className="font-hand-brand text-4xl font-bold uppercase tracking-wide text-brand-green transition-colors hover:text-emerald-700"
              onClick={(e) => {
                setOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {t("brand")}
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              <NavItems locale={locale} translate={t} />
              <LanguageSwitch variant="pill" locale={locale} pathname={pathname || "/"} translate={t} />
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-green transition hover:bg-emerald-50 md:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 right-0 h-[3px] bg-current transform transition duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 top-1/2 h-[3px] bg-current transform -translate-y-1/2 transition duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-[3px] bg-current transform transition duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </header>
      </div>
      <div aria-hidden="true" style={{ height: headerHeight }} />
      <MobileMenu
        open={open}
        locale={locale}
        pathname={pathname || "/"}
        translate={t}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function MobileMenu({
  open,
  locale,
  pathname,
  translate,
  onClose,
}: {
  open: boolean;
  locale: string;
  pathname: string;
  translate: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Mobile dropdown - overlays content */}
      <div
        className={`fixed top-0 left-0 right-0 z-45 bg-[#FFFEF5] shadow-lg transform transition-transform duration-300 ease-out md:hidden ${
          open
            ? "translate-y-[56px]"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 px-4 py-8">
          <NavItems
            direction="col"
            locale={locale}
            translate={translate}
            onNavigate={onClose}
          />
          <LanguageSwitch variant="list" locale={locale} pathname={pathname || "/"} translate={translate} />
        </div>
        {/* Ripped edge on mobile menu */}
        <div className="header-ripped-edge" />
      </div>
    </>
  );
}
