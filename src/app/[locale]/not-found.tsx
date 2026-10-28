import {getLocale, getTranslations} from "next-intl/server";
import Image from "next/image";
import {PaperSurface} from "@/components/PaperSurface";
import {PaperButton} from "@/components/PaperButton";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFoundPage");
  const locale = await getLocale();

  return (
    <section className="relative px-4 py-16 lg:py-24">
      <PaperSurface
        seed="not-found-sheet"
        texture="washi"
        edge="torn"
        shadow="md"
        rotation={-1}
        className="relative mx-auto max-w-xl"
        contentClassName="px-6 pt-10 pb-10 text-center"
      >
        <div className="paper-pin paper-pin-red" style={{top: "8px", left: "16px"}} />
        <div className="paper-pin paper-pin-blue" style={{top: "8px", right: "16px"}} />
        <div className="mx-auto mb-4 w-28 -rotate-12 drop-shadow-sm">
          <Image src="/images/chicken.webp" alt="" aria-hidden="true" width={300} height={300} className="h-auto w-full" />
        </div>
        <p className="font-brand text-6xl font-bold text-emerald-600">404</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-slate-900 sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-slate-700">{t("description")}</p>
        <div className="mt-8">
          <PaperButton href="/" type="link" locale={locale} variant="solid" color="emerald" size="lg" className="font-bold">
            {t("cta")}
          </PaperButton>
        </div>
      </PaperSurface>
    </section>
  );
}
