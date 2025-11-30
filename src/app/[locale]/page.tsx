import {Link} from "@/i18n/routing";
import {getLocale, getTranslations} from "next-intl/server";
import {MeetupEventCard} from "@/components/MeetupEventCard";
import {InstagramFeed} from "@/components/InstagramFeed";
import {TearOffFlyer} from "@/components/TearOffFlyer";
import Image from "next/image";
import {getNextMeetupEvent} from "@/lib/meetup";

const activityCardKeys = ["outreach", "support", "community"] as const;
const resourceItemKeys = ["starterKits", "restaurants", "shopping", "community"] as const;
const blogPostKeys = ["maff", "chicken", "council"] as const;

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const isJapanese = locale.startsWith("ja");
  const stats = t.raw("stats") as Record<string, {value: string; label: string}>;
  const entries = Object.entries(stats) as [string, {value: string; label: string}][ ];

  const nextEvent = await getNextMeetupEvent();

  return (
    <div className="flex flex-col gap-24 pb-24 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-visible pt-10 pb-4 lg:pt-12 lg:pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col justify-center space-y-8 text-center lg:text-left lg:items-start items-center">
              <div className="space-y-4 flex flex-col items-center lg:items-start">
                <h1 className="font-hand-brand -rotate-2 text-7xl font-bold text-emerald-600 sm:text-8xl lg:text-9xl">
                  {t("hero.title")}
                </h1>
                <p className="max-w-lg text-lg text-slate-700 sm:text-xl">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.meetup.com/tokyovegan/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200/50 transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-xl"
                >
                  {t("hero.primaryCta")}
                </a>
                <Link
                  href="/resources"
                  locale={locale}
                  className="inline-flex items-center justify-center rounded-full bg-[#FCD34D] px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-amber-200/50 transition hover:-translate-y-0.5 hover:bg-[#fbbf24] hover:shadow-xl"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-12 pt-2 justify-center lg:justify-start">
                {entries.map(([key, value]) => (
                  <div key={key}>
                    <p className="font-hand text-4xl font-bold text-emerald-600">{value.value}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {value.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-12 max-w-md mx-auto lg:max-w-none lg:mx-0 lg:mt-0">
               <div className="tape-section rotate-2">
                  <div className="tape-top-center" />
                  <div className="bg-white p-3 pb-8 shadow-xl shadow-slate-300/60">
                    <div className="relative h-[320px] sm:h-[360px] md:h-[400px] lg:h-[460px] w-full overflow-hidden">
                      <Image
                        src="/images/group.jpg"
                        alt="Tokyo Vegan Next community group at a meetup event"
                        width={800}
                        height={1000}
                        className="h-full w-full object-cover"
                        sizes="(min-width: 1024px) 500px, 100vw"
                        priority
                      />
                    </div>
                    <div className="mt-4 px-3 text-center -rotate-1">
                      <p className="font-hand text-lg sm:text-xl font-bold leading-relaxed text-slate-900">
                        &ldquo;{t("hero.communityBlurb")}&rdquo;
                      </p>
                    </div>
                  </div>
               </div>

               {/* Decorative elements */}
               <div className="absolute -left-12 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-100/50 blur-3xl" />
               <div className="absolute -right-12 bottom-0 -z-10 h-64 w-64 rounded-full bg-yellow-100/50 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Board Section (Next Event + Activities) */}
      <section id="activities" className="mx-auto w-full max-w-6xl px-4">
         <div className="mb-12 text-center">
            <h2 className="font-hand text-6xl font-bold text-emerald-800 -rotate-1">
               {t("sections.activities.title")}
            </h2>
         </div>

         <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Next Event Flyer */}
            <div className="lg:col-span-5 xl:col-span-4 px-4 sm:px-6 lg:px-0">
               <div className="flex flex-col items-center max-w-sm mx-auto lg:max-w-none">
                  <h3 className="mb-8 font-hand text-4xl font-bold text-slate-900">
                    {t("meetup.nextEvent")}
                  </h3>
                  {nextEvent ? (
                    <MeetupEventCard
                      title={nextEvent.title}
                      startDate={nextEvent.startDate}
                      endDate={nextEvent.endDate}
                      imageUrl="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000"
                      eventUrl={nextEvent.url}
                    />
                  ) : (
                    <div className="flex aspect-3/4 w-full max-w-sm flex-col items-center justify-center rounded-sm bg-slate-100 p-8 text-center shadow-inner">
                       <p className="font-hand text-2xl text-slate-500">No upcoming events scheduled</p>
                       <a href="https://www.meetup.com/tokyovegan/" className="mt-4 font-bold text-emerald-600 hover:underline">Check Meetup Page →</a>
                    </div>
                  )}
               </div>
            </div>

            {/* Right Column: Post-it Notes */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex flex-col items-center lg:items-start">
                 <svg width="0" height="0" className="absolute">
                   <defs>
                     <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                       <path d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0" strokeLinejoin="round" strokeLinecap="square" />
                     </clipPath>
                   </defs>
                 </svg>
                 <h3 className="mb-8 font-hand text-3xl font-bold text-slate-900 pl-4">
                  {t("sections.activities.description")}
                </h3>
                <div className="mt-2 md:mt-10 grid w-full gap-8 sm:gap-12 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 px-6 sm:px-8 md:px-4">
                   {activityCardKeys.map((key) => {
                     const getCardHref = (k: typeof activityCardKeys[number]) => {
                        if (k === "outreach") return "/about-vegan";
                        if (k === "support") return "/resources";
                        return "https://www.meetup.com/tokyovegan/";
                     };
                     const href = getCardHref(key);
                     const isExternal = href.startsWith("http");


                     const cardConfig = {
                        outreach: {
                           image: "/images/speaker.webp",
                           color: "sticky-green",
                           rotation: "rotate-3",
                           marginTop: "mt-0 md:-mt-4 lg:mt-0",
                           stickyPos: "-top-4 -right-1 sm:-top-6 sm:-right-2 md:-right-6",
                           stickyRotation: "rotate-6"
                        },
                        support: {
                           image: "/images/groceries.webp",
                           color: "sticky-yellow",
                           rotation: "-rotate-2",
                           marginTop: "mt-0 md:mt-10 lg:mt-50 xl:mt-40",
                           stickyPos: "-top-6 -left-1 sm:-top-8 sm:-left-2 md:-left-6",
                           stickyRotation: "-rotate-8"
                        },
                        community: {
                           image: "/images/picnics.webp",
                           color: "sticky-cream",
                           rotation: "-rotate-3",
                           marginTop: "mt-0 md:mt-2 lg:-mt-42 xl:mt-10",
                           stickyPos: "-top-3 -right-0 sm:-top-5 sm:-right-1 md:-right-4",
                           stickyRotation: "-rotate-4"
                        },
                     };

                     const config = cardConfig[key];

                     const titleClass = isJapanese
                       ? "font-hand text-xl sm:text-2xl font-bold text-slate-900 whitespace-nowrap"
                       : "font-hand text-2xl sm:text-3xl font-bold text-slate-900";

                     const content = (
                        <div className={`relative group ${config.marginTop} ${config.rotation}`}>
                           {/* Tape Element */}
                           <div className="tape-section">
                              <div className="tape-top-center" />
                           </div>

                           {/* Polaroid Card */}
                           <div className="bg-white p-4 pb-8 shadow-xl shadow-slate-300/60">
                             <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                                 <Image
                                    src={config.image}
                                    alt={t(`sections.activities.cards.${key}.title`)}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 33vw, 300px"
                                 />
                              </div>
                             <div className="mt-4 text-center">
                                 <h3 className={titleClass}>
                                    {t(`sections.activities.cards.${key}.title`)}
                                 </h3>
                              </div>
                           </div>

                           {/* Sticky Note Badge */}
                           <div className={`absolute ${config.stickyPos} w-36 md:w-32 z-10 transition duration-300 hover:scale-110 hover:z-20`}>
                              <div className={`sticky-container ${config.stickyRotation}`}>
                                 <div className="sticky-outer">
                                    <div className="sticky-wrapper">
                                       <div className={`sticky-content ${config.color} p-3 text-center flex flex-col items-center justify-center shadow-lg min-h-[80px]`}>
                                          <p className={`font-hand font-bold text-slate-900 leading-tight mb-1 ${isJapanese ? "text-base" : "text-lg"} ${key === "community" && isJapanese ? "whitespace-nowrap" : ""}`}>
                                             {t(`sections.activities.cards.${key}.stickyLabel`)}
                                          </p>
                                          <p className="font-hand text-base font-bold text-slate-800/80 leading-none">
                                             Go &rarr;
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );

                     const linkClass = "block w-full max-w-[280px] mx-auto md:max-w-[210px] lg:max-w-none";

                     return isExternal ? (
                        <a key={key} href={href} target="_blank" rel="noreferrer" className={linkClass}>
                           {content}
                        </a>
                     ) : (
                        <Link key={key} href={href} locale={locale} className={linkClass}>
                           {content}
                        </Link>
                     );
                   })}
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Resources Preview Section */}
      {/* <section className="bg-yellow-50/50 py-24" id="resources-preview">
         <div className="mx-auto max-w-6xl space-y-12 px-4">
            <div className="text-center">
              <h2 className="font-hand text-6xl font-bold text-slate-900 rotate-1">
                {t("sections.resources.description")}
              </h2>
              <p className="mt-4 font-hand text-3xl text-emerald-600">
                {t("sections.resources.title")}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resourceItemKeys.map((key) => (
                <div key={key} className="group flex flex-col rounded-sm bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg ring-1 ring-slate-100">
                  <h3 className="font-hand text-3xl font-bold text-slate-900 group-hover:text-emerald-700">
                    {t(`sections.resources.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">
                    {t(`sections.resources.items.${key}.description`)}
                  </p>
                  <Link
                    href={`/resources#${key}`}
                    locale={locale}
                    className="mt-4 inline-flex items-center font-hand text-2xl font-bold text-emerald-600"
                  >
                    {t(`sections.resources.items.${key}.linkLabel`)} →
                  </Link>
                </div>
              ))}
            </div>
         </div>
      </section> */}

      {/* Blog Section */}
      <section className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-4" id="blog">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-hand text-6xl font-bold text-slate-900 -rotate-1">{t("sections.blog.description")}</h2>
            </div>
            <a
              className="font-hand text-3xl font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              href="https://www.tokyovegan.org/jp/blog"
              target="_blank"
              rel="noreferrer"
            >
              {t("sections.blog.cta")} →
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {blogPostKeys.map((key) => {
              const post = t.raw(`sections.blog.posts.${key}`) as {title: string; excerpt: string; href: string};
              return (
                <a
                  key={key}
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between bg-white p-8 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="h-2 w-12 bg-emerald-100" />
                    <h3 className="font-hand text-4xl font-bold text-slate-900 group-hover:text-emerald-700">{post.title}</h3>
                    <p className="text-slate-600">{post.excerpt}</p>
                  </div>
                  <span className="mt-6 font-hand text-2xl font-bold text-emerald-700 group-hover:underline">Read more →</span>
                </a>
              );
            })}
          </div>
      </section>

      {/* Instagram Section */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-4">
        <InstagramFeed />
      </section>

      {/* Contact Flyer Section */}
      <section className="mx-auto w-full max-w-6xl px-4" id="contact">
        <div className="flex flex-col items-center">
          <TearOffFlyer
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />
        </div>
      </section>
    </div>
  );
}
