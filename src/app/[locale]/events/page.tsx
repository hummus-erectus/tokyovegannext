import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {NewsletterSignup} from "@/components/NewsletterSignup";
import {MeetupEventCard} from "@/components/MeetupEventCard";
import { getNextMeetupEvent } from "@/lib/meetup";
import Image from "next/image";

export default async function EventsPage(props: {
  params: Promise<{locale: string}>;
}) {
  const params = await props.params;
  const locale = params.locale;
  setRequestLocale(locale);
  const t = await getTranslations("EventsPage");
  
  // Fetch next meetup event
  const nextEvent = await getNextMeetupEvent();

  // Create a dummy event for fallback if fetching fails
  const dummyEvent = {
    title: "Tokyo Vegan Meetup - Shinjuku Dinner",
    // We use a fixed date relative to a known point to avoid Date.now() in render
    startDate: new Date("2026-03-08T19:00:00+09:00"), 
    endDate: new Date("2026-03-08T21:00:00+09:00"), 
    url: "https://www.meetup.com/vegan-389/"
  };

  const eventToDisplay = nextEvent || dummyEvent;

  return (
    <main className="flex-1 bg-[url('/images/mulberry.jpg')] bg-repeat">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        locale={locale}
      />

      <div className="relative -mt-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10 pb-24">
        {/* Next Event Banner */}
        <section className="mb-24">
          <div className="bg-white p-6 sm:p-8 md:p-10 transform -rotate-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full max-w-md">
                <MeetupEventCard 
                  title={eventToDisplay.title}
                  startDate={eventToDisplay.startDate}
                  endDate={eventToDisplay.endDate}
                  eventUrl={eventToDisplay.url}
                />
              </div>
              <div className="flex-1 text-center md:text-left space-y-6">
                <h3 className="text-2xl font-bold text-emerald-900 font-hand">
                  {t("meetup.title")}
                </h3>
                <p className="text-emerald-800/80 leading-relaxed font-medium">
                  {t("meetup.description")}
                </p>
                <div className="pt-4">
                  <a
                    href="https://www.meetup.com/vegan-389/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#FCD34D] px-8 py-3 rounded-full text-emerald-950 font-bold font-hand text-xl shadow-sm hover:bg-[#fbbf24] hover:shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    {t("meetup.cta")}
                  </a>
                </div>
              </div>
            </div>
            {/* Washi tape decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-white/40 backdrop-blur-md rotate-2 border border-white/20 shadow-sm" />
          </div>
        </section>

        {/* Event Types Grid */}
        <section className="mb-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-hand-brand text-4xl sm:text-5xl font-bold text-emerald-900 mb-6 tracking-wide">
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
              <h3 className="font-hand text-2xl font-bold text-emerald-900 mb-3">
                {t("types.social.title")}
              </h3>
              <p className="text-emerald-800/80 font-medium">
                {t("types.social.description")}
              </p>
            </div>

            {/* Workshops Card */}
            <div className="bg-white p-6 shadow-md relative group hover:-translate-y-1 transition-transform md:mt-12">
              <div className="aspect-video relative mb-6 overflow-hidden rounded-sm photo-slit">
                <Image
                  src="/images/speaker.webp"
                  alt="Workshop"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-hand text-2xl font-bold text-emerald-900 mb-3">
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
              <h3 className="font-hand text-2xl font-bold text-emerald-900 mb-3">
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
