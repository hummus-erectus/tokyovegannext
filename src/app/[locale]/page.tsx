import {Link} from "@/i18n/routing";
import {getLocale, getTranslations} from "next-intl/server";
import {MeetupEventCard} from "@/components/MeetupEventCard";
import {NewsletterSignup} from "@/components/NewsletterSignup";
import {InstagramFeed} from "@/components/InstagramFeed";
import {TearOffFlyer} from "@/components/TearOffFlyer";
import {PaperButton} from "@/components/PaperButton";
import {HomeBlogCard} from "@/components/HomeBlogCard";
import { RoughHighlight } from '@/components/RoughHighlight';
import { PolaroidCard } from '@/components/PolaroidCard';
import Image from "next/image";
import {getNextMeetupEvent} from "@/lib/meetup";
import {client} from "@/sanity/client";
import {urlFor} from "@/sanity/image";

const LATEST_POSTS_QUERY = `*[_type == "post" && language == $language && defined(slug.current) && publishedAt < now()] | order(publishedAt desc)[0...4] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "authorName": author->name
}`;

const activityCardKeys = ["outreach", "support", "community"] as const;

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const isJapanese = locale.startsWith("ja");
  const stats = t.raw("stats") as Record<string, {value: string; label: string}>;
  const entries = Object.entries(stats) as [string, {value: string; label: string}][ ];

  const nextEvent = await getNextMeetupEvent();

  const latestPosts = await client.fetch(LATEST_POSTS_QUERY, { language: locale });

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-visible pt-8 pb-0 lg:pt-10 lg:pb-0">
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
                <PaperButton
                  href="#newsletter"
                  type="link"
                  locale={locale}
                  variant="solid"
                  color="emerald"
                  size="lg"
                  className="font-bold shadow-md"
                >
                  {t("hero.primaryCta")}
                </PaperButton>
                <PaperButton
                  href="#activities"
                  type="link"
                  locale={locale}
                  variant="solid"
                  color="yellow"
                  size="lg"
                  className="font-bold shadow-md"
                >
                  {t("hero.secondaryCta")}
                </PaperButton>
              </div>

              <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 lg:gap-6 pt-4 w-full max-w-lg">
                {entries.map(([key, value]) => {
                  const imageKeyMap: Record<string, string> = {
                    founded: "founded",
                    members: "members",
                    events: "hosted"
                  };
                  const imageKey = imageKeyMap[key] || key;
                  const langSuffix = isJapanese ? "_jp" : "_en";
                  const imagePath = `/images/${imageKey}${langSuffix}.webp`;

                  return (
                    <div key={key} className="relative flex-1 min-w-0 max-w-[120px] sm:max-w-[100px] lg:max-w-[110px]">
                      <Image
                        src={imagePath}
                        alt={`${value.label}: ${value.value}`}
                        width={200}
                        height={200}
                        className="w-full h-auto object-contain drop-shadow-sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:max-w-none lg:mx-0">
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
                      <p className="font-hand text-lg sm:text-xl font-bold leading-relaxed text-slate-900 group cursor-default">
                        <RoughHighlight type="highlight" multiline={true} color="rgba(167, 243, 208, 0.4)" trigger="hover">
                          <span>&ldquo;{t("hero.communityBlurb")}&rdquo;</span>
                        </RoughHighlight>
                      </p>
                    </div>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </section>

      {/* Newsletter + Next Event */}
      <section id="newsletter" className="mx-auto w-full max-w-5xl px-4 scroll-mt-24">
         <div className="mb-10 text-center">
            <h2 className="font-hand text-5xl sm:text-6xl font-bold text-emerald-800 -rotate-1">
               {t("newsletter.sectionTitle")}
            </h2>
         </div>
         <div className="grid gap-12 md:gap-16 lg:gap-24 md:grid-cols-2 md:items-center">
            {/* Next Event — second on mobile, LEFT on desktop */}
            <div className="order-2 md:order-1 px-4 sm:px-6 md:px-0">
               <div className="flex flex-col items-center mx-auto w-full">
                  {nextEvent ? (
                    <MeetupEventCard
                      title={nextEvent.title}
                      startDate={nextEvent.startDate}
                      endDate={nextEvent.endDate}
                      eventUrl={nextEvent.url}
                    />
                  ) : (
                    <div className="flex aspect-3/4 w-full max-w-sm flex-col items-center justify-center rounded-sm bg-slate-100 p-8 text-center shadow-inner">
                       <p className="font-hand text-2xl text-slate-500">No upcoming events scheduled</p>
                       <a href="https://www.meetup.com/tokyovegan/" className="mt-4 font-bold text-emerald-600">
                         <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover">
                           <span>Check Meetup Page →</span>
                         </RoughHighlight>
                       </a>
                    </div>
                  )}
               </div>
            </div>

            {/* Newsletter — first on mobile for visibility, RIGHT on desktop */}
            <div className="order-1 md:order-2 px-4 sm:px-6 md:px-0">
               <div className="flex flex-col items-center mx-auto w-full">
                  <NewsletterSignup />
               </div>
            </div>
         </div>
      </section>

      {/* Activities Section (Polaroid cards) */}
      <section id="activities" className="mx-auto w-full max-w-6xl px-4 scroll-mt-24">
         <div className="mb-4 text-center">
            <h2 className="font-hand text-6xl font-bold text-emerald-800 -rotate-1">
               {t("sections.activities.title")}
            </h2>
         </div>
         
         <h3 className="mb-8 font-hand text-3xl font-bold text-slate-900 group w-full text-center">
            <RoughHighlight type="highlight" multiline={true} color="rgba(253, 224, 71, 0.4)" trigger="hover">
               <span>{t("sections.activities.description")}</span>
            </RoughHighlight>
         </h3>

         <div className="flex flex-col items-center">
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                  <path d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0" strokeLinejoin="round" strokeLinecap="square" />
                </clipPath>
              </defs>
            </svg>
            <div className="mt-2 md:mt-6 grid w-full gap-8 sm:gap-12 md:grid-cols-3 px-6 sm:px-8 md:px-4">
               {activityCardKeys.map((key) => {
                 const getCardHref = (k: typeof activityCardKeys[number]) => {
                    if (k === "outreach") return "/about-vegan";
                    if (k === "support") return "/resources/starter-kits";
                    return "/resources/shopping";
                 };
                 const href = getCardHref(key);
                 const isExternal = href.startsWith("http");


                 const cardConfig = {
                    outreach: {
                       image: "/images/speaker.webp", // Will keep speaker for Vegan 101 for now or we can change it
                       color: "sticky-green",
                       rotation: "rotate-3",
                       marginTop: "mt-0 md:-mt-4",
                       stickyPos: "-top-6 -left-1 sm:-top-8 sm:-left-2 md:-left-6",
                       stickyRotation: "-rotate-6"
                    },
                    support: {
                       image: "/images/picnics.webp", // Changing to picnic for starter kits (friendly/intro vibe)
                       color: "sticky-yellow",
                       rotation: "-rotate-2",
                       marginTop: "mt-0 md:mt-10",
                       stickyPos: "-top-6 -left-1 sm:-top-8 sm:-left-2 md:-left-6",
                       stickyRotation: "-rotate-8"
                    },
                    community: {
                       image: "/images/groceries.webp", // Changing to groceries for shopping
                       color: "sticky-cream",
                       rotation: "-rotate-3",
                       marginTop: "mt-0 md:mt-2",
                       stickyPos: "-top-3 -right-0 sm:-top-5 sm:-right-1 md:-right-4",
                       stickyRotation: "-rotate-4"
                    },
                 };

                 const config = cardConfig[key];

                 const titleClass = isJapanese
                   ? "font-hand text-xl sm:text-2xl font-bold text-slate-900 whitespace-nowrap"
                   : "font-hand text-2xl sm:text-3xl font-bold text-slate-900";

                 const content = (
                   <PolaroidCard
                     title={t(`sections.activities.cards.${key}.title`)}
                     stickyLabel={t(`sections.activities.cards.${key}.stickyLabel`)}
                     image={config.image}
                     color={config.color}
                     rotation={config.rotation}
                     marginTop={config.marginTop}
                     stickyPos={config.stickyPos}
                     stickyRotation={config.stickyRotation}
                     titleClass={titleClass}
                     isJapanese={isJapanese}
                   />
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

         <div className="mt-16 text-center">
            <PaperButton
               href="/resources"
               type="link"
               locale={locale}
               variant="solid"
               color="emerald"
               size="lg"
               className="font-bold shadow-md inline-block transform hover:scale-105 transition-transform"
            >
               {t("sections.activities.cta")}
            </PaperButton>
         </div>
      </section>

      {/* Blog Section */}
      <div className="paper-torn-shadow">
      <section className="w-full paper-texture-seamless header-ripped-mask header-ripped-bottom-mask pt-12 md:pt-16 pb-12 relative scroll-mt-24" id="blog">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 overflow-x-clip">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-hand text-6xl font-bold text-slate-900 -rotate-1">{t("sections.blog.description")}</h2>
            </div>
            <Link
              href="/blog"
              locale={locale}
              className="group font-hand text-3xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <RoughHighlight type="underline" color="#10b981" strokeWidth={3} trigger="hover">
                <span className="whitespace-nowrap">{t("sections.blog.cta")}</span>
              </RoughHighlight>
            </Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post: {
                _id: string
                title: string
                slug: { current: string }
                excerpt?: string
                mainImage?: { asset: { _ref: string }; alt?: string }
                publishedAt?: string
                authorName?: string
              }, idx: number) => {
                const imageUrl = post.mainImage
                  ? urlFor(post.mainImage).width(600).height(400).url()
                  : undefined
                return (
                  <div key={post._id} className={idx === 3 ? 'lg:hidden' : ''}>
                    <HomeBlogCard
                      title={post.title}
                      excerpt={post.excerpt || ''}
                      slug={post.slug.current}
                      locale={locale}
                      imageUrl={imageUrl}
                      imageAlt={post.mainImage?.alt}
                      publishedAt={post.publishedAt}
                      authorName={post.authorName}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center font-hand text-2xl text-slate-500">
              {locale === 'ja' ? 'まだ記事がありません' : 'No posts yet — check back soon!'}
            </p>
          )}
        </div>
      </section>
      </div>

      {/* Instagram Section */}
      <section className="mx-auto w-full max-w-6xl px-4">
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
