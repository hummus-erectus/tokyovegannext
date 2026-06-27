import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {NewsletterSignup} from "@/components/NewsletterSignup";
import {EventFlyer} from "@/components/EventFlyer";
import { getNextMeetupEvent } from "@/lib/meetup";
import Image from "next/image";

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
    <main className="flex-1 bg-[url('/images/mulberry.jpg')] bg-repeat">
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
                <div className="text-center md:text-left space-y-6">
                  <h3 className="text-2xl font-bold text-emerald-900 font-heading">
                    <a
                      href="https://www.meetup.com/tokyovegan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-hand hover:text-emerald-700 transition-colors"
                    >
                      {t("meetup.title")}
                    </a>
                  </h3>
                  <p className="text-emerald-800/80 leading-relaxed font-medium">
                    {t("meetup.description")}
                  </p>
                </div>
                <a
                  href="https://www.meetup.com/tokyovegan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-slit relative block transition-transform hover:scale-[1.02]"
                >
                  <Image
                    src="/images/group.jpg"
                    alt="Tokyo Vegan Meetup group"
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
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-emerald-900 mb-6 tracking-wide">
              {t("types.title")}
            </h2>
            <p className="text-emerald-800/80 text-lg font-medium">
              {t("types.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Social Card */}
            <div className="bg-white p-6 shadow-md relative group hover:-translate-y-1 transition-transform">
              <div className="aspect-video relative mb-6 overflow-hidden rounded-sm photo-slit">
                <Image
                  src="/images/picnics.webp"
                  alt="Social Gathering"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            <div className="bg-white p-6 shadow-md relative group hover:-translate-y-1 transition-transform">
              <div className="aspect-video relative mb-6 overflow-hidden rounded-sm photo-slit">
                <Image
                  src="/images/speaker.webp"
                  alt="Workshop"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            <div className="bg-white p-6 shadow-md relative group hover:-translate-y-1 transition-transform">
              <div className="aspect-video relative mb-6 overflow-hidden rounded-sm photo-slit">
                <Image
                  src="/images/group.jpg"
                  alt="Outreach"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
