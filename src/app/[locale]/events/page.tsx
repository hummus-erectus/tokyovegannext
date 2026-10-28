import type {Metadata} from "next";
import {localeAlternates} from "@/lib/site";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {NewsletterSignup} from "@/components/NewsletterSignup";
import {EventFlyer} from "@/components/EventFlyer";
import { getNextMeetupEvent } from "@/lib/meetup";
import {PaperSurface} from "@/components/PaperSurface";
import {WashiTape} from "@/components/WashiTape";
import {PeatixIcon} from "@/components/PeatixIcon";
import Image from "next/image";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "EventsPage"});
  return {
    title: t("hero.title"),
    description: t("hero.description"),
    alternates: localeAlternates(locale, "/events"),
  };
}

export default async function EventsPage(props: {
  params: Promise<{locale: string}>;
}) {
  const params = await props.params;
  const locale = params.locale;
  setRequestLocale(locale);
  const t = await getTranslations("EventsPage");

  // Fetch next meetup event (null if none scheduled or fetch fails)
  const nextEvent = await getNextMeetupEvent();

  // Map to EventFlyer's expected shape
  const event = nextEvent
    ? {
        title: nextEvent.title,
        startDate: nextEvent.startDate,
        endDate: nextEvent.endDate,
        eventUrl: nextEvent.url,
      }
    : undefined;

  return (
    <main className="flex-1">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        locale={locale}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10 pb-24">
        {/* Next Event Banner */}
        <section className="mb-24">
          <div className="bg-white p-6 sm:p-8 md:p-10 transform -rotate-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full max-w-md">
                <EventFlyer event={event} />
              </div>
              <div className="flex-1 w-full space-y-6">
                <div className="text-center md:text-left space-y-4">
                  <h3 className="text-3xl font-bold text-emerald-900 font-heading">
                    {t("peatix.title")}
                  </h3>
                  <p className="text-emerald-800/80 leading-relaxed font-medium">
                    {t("peatix.description")}
                  </p>
                  <div>
                    <a
                      href="https://peatix.com/group/16486093"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sticker btn-sticker--yellow group/cta inline-flex items-center gap-2 px-5 py-2.5 font-ui text-lg font-bold"
                    >
                      <PeatixIcon className="h-5 w-5" aria-hidden="true" />
                      <span>{t("peatix.cta")}</span>
                      <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
                <a
                  href="https://peatix.com/group/16486093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-slit relative block"
                >
                  <Image
                    src="/images/group.jpg"
                    alt="Tokyo Vegan community with Ed Winters at our 2025 World Vegan Day event"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </a>
              </div>
            </div>
            {/* Washi tape decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-white/40 backdrop-blur-md rotate-2 border border-white/20 shadow-sm" />
          </div>
        </section>

        {/* Event Types Grid */}
        <section className="mb-24 space-y-12">
          <PaperSurface
            seed="events-types-heading"
            texture="washi"
            edge="torn"
            shadow="sm"
            rotation={1}
            className="mx-auto max-w-2xl"
            contentClassName="px-6 py-6 text-center"
            overlay={
              <WashiTape variant="emerald" placement="top-center" rotation={-3} size="md" widthPct={50} />
            }
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-emerald-900 mb-6 tracking-wide">
              {t("types.title")}
            </h2>
            <p className="text-emerald-800/80 text-lg font-medium">
              {t("types.description")}
            </p>
          </PaperSurface>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Social Card */}
            <div className="bg-white p-6 shadow-md relative tape-section">
              <div className="tape-top-center pointer-events-none" aria-hidden="true" />
              <div className="aspect-video relative mb-6 photo-slit">
                <Image
                  src="/images/picnics.webp"
                  alt="Social Gathering"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-2xl font-bold text-emerald-900 mb-3">
                {t("types.social.title")}
              </h3>
              <p className="text-emerald-800/80 font-medium">
                {t("types.social.description")}
              </p>
            </div>

            {/* Workshops Card */}
            <div className="bg-white p-6 shadow-md relative tape-section">
              <div className="tape-top-center pointer-events-none" aria-hidden="true" />
              <div className="aspect-video relative mb-6 photo-slit">
                <Image
                  src="/images/speaker.webp"
                  alt="Workshop"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-2xl font-bold text-emerald-900 mb-3">
                {t("types.workshops.title")}
              </h3>
              <p className="text-emerald-800/80 font-medium">
                {t("types.workshops.description")}
              </p>
            </div>

            {/* Outreach Card */}
            <div className="bg-white p-6 shadow-md relative tape-section">
              <div className="tape-top-center pointer-events-none" aria-hidden="true" />
              <div className="aspect-video relative mb-6 photo-slit">
                <Image
                  src="/images/group.jpg"
                  alt="Outreach"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-2xl font-bold text-emerald-900 mb-3">
                {t("types.outreach.title")}
              </h3>
              <p className="text-emerald-800/80 font-medium">
                {t("types.outreach.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="max-w-md mx-auto scroll-mt-32">
          <NewsletterSignup />
        </section>
      </div>
    </main>
  );
}
