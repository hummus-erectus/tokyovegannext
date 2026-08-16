import {Link} from "@/i18n/routing";
import {getLocale, getTranslations} from "next-intl/server";
import {EventFlyer} from "@/components/EventFlyer";
import {NewsletterSignup} from "@/components/NewsletterSignup";
import {InstagramFeed} from "@/components/InstagramFeed";
import {TearOffFlyer} from "@/components/TearOffFlyer";
import {PaperButton} from "@/components/PaperButton";
import {HomeBlogCard} from "@/components/HomeBlogCard";
import { RoughHighlight } from '@/components/RoughHighlight';
import { PolaroidCard } from '@/components/PolaroidCard';
import { PaperSurface } from '@/components/PaperSurface';
import { SectionLabel } from '@/components/SectionLabel';
import { WashiTape } from '@/components/WashiTape';
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

  const heroText = (
    <div className="flex flex-col justify-center space-y-8 text-center lg:text-left lg:items-start items-center">
      <div className="space-y-4 flex flex-col items-center lg:items-start">
        <h1 className="font-brand -rotate-2 text-7xl font-bold text-emerald-600 sm:text-8xl lg:text-9xl">
          {t("hero.title")}
        </h1>
        <p className="max-w-lg text-lg text-slate-700 sm:text-xl">
          {t("hero.description")}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <PaperButton
          href="#newsletter"
          type="link"
          locale={locale}
          variant="solid"
          color="emerald"
          size="lg"
          className="font-bold"
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
          className="font-bold"
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
  );

  const heroPig = (
    <div className="absolute -top-4 -right-8 lg:-right-8 z-30 w-48 sm:w-60 lg:w-72 rotate-16 drop-shadow-sm pointer-events-none">
      <Image
        src="/images/pig.webp"
        alt="Origami Pig"
        width={300}
        height={300}
        className="w-full h-auto object-contain"
      />
    </div>
  );

  const heroPhoto = (
    <div className="relative w-[calc(100%-2rem)] sm:w-full max-w-md mx-auto lg:w-[calc(100%-3rem)] xl:w-full lg:max-w-none lg:mx-0 mt-8 lg:mt-0">
       {/* Origami Pig — mobile only (desktop pig is in PaperSurface overlay) */}
       <div className="lg:hidden">{heroPig}</div>

       <div className="relative rotate-2">
          <WashiTape variant="sakura" placement="top-left" rotation={-32} size="lg" />
          <WashiTape variant="emerald" placement="bottom-right" rotation={-42} size="lg" />
          <PaperSurface
            seed="hero-photo"
            variant="polaroid"
            rotation={0}
            shadow="sm"
            edge="deckle"
            liftedCorner="bottom-left"
            contentClassName="p-3 pb-8"
          >
            <div className="relative h-[320px] sm:h-[360px] md:h-[400px] lg:h-[460px] w-full overflow-hidden">
              <Image
                src="/images/group.jpg"
                alt="Tokyo Vegan community with Ed Winters at our 2025 World Vegan Day event"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 500px, 100vw"
                priority
              />
            </div>
            <div className="mt-4 px-3 text-center -rotate-1">
              <p className="font-decorative text-lg sm:text-xl font-bold leading-relaxed text-slate-900 group cursor-default">
                <RoughHighlight type="highlight" multiline={true} color="rgba(167, 243, 208, 0.4)" trigger="hover">
                  <span>&ldquo;{t("hero.communityBlurb")}&rdquo;</span>
                </RoughHighlight>
              </p>
            </div>
          </PaperSurface>
       </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col gap-0 text-slate-900">
      {/* Hero Section — text on paper sheet, photo on corkboard (mobile) / both on paper (desktop) */}
      <section className="relative overflow-visible pt-8 pb-0 lg:pt-10 lg:pb-0">
        {/* Mobile: paper sheet with text only, photo on corkboard below */}
        <div className="lg:hidden">
          <PaperSurface
            seed="hero-sheet-mobile"
            texture="washi"
            edge="torn"
            shadow="md"
            rotation={-1}
            liftedCorner="bottom-left"
            className="relative z-40 mx-auto max-w-6xl px-3 sm:px-4"
            contentClassName="px-4 sm:px-6 pt-6 pb-8"
          >
            <div className="paper-pin paper-pin-red" style={{ top: '8px', left: '16px' }} />
            <div className="paper-pin paper-pin-blue" style={{ top: '8px', right: '16px' }} />
            {heroText}
          </PaperSurface>
          <div className="mx-auto max-w-md px-4 mt-8">
            {heroPhoto}
          </div>
        </div>

        {/* Desktop: paper sheet encompassing both text and photo */}
        <div className="hidden lg:block">
          <PaperSurface
            seed="hero-sheet-desktop"
            texture="washi"
            edge="torn"
            shadow="md"
            rotation={-1}
            liftedCorner="bottom-left"
            className="mx-auto max-w-6xl"
            contentClassName="px-8 pt-8 pb-10"
            overlay={
              <div className="absolute top-2 right-0 lg:top-4 lg:right-4">
                {heroPig}
              </div>
            }
          >
            <div className="paper-pin paper-pin-red" style={{ top: '8px', left: '16px' }} />
            <div className="paper-pin paper-pin-blue" style={{ top: '8px', right: '16px' }} />
            <div className="grid grid-cols-2 gap-12 items-center">
              {heroText}
              {heroPhoto}
            </div>
          </PaperSurface>
        </div>
      </section>

      {/* Newsletter + Next Event — directly on corkboard */}
      <section id="newsletter" className="relative w-full scroll-mt-24 py-14 sm:py-16 lg:py-20">
          <div className="relative mx-auto w-full max-w-5xl px-4">
            {/* Origami Chicken — perched on the corkboard, above the title */}
            <div className="absolute -top-8 left-4 sm:-top-10 sm:left-2 lg:left-4 z-30 w-20 sm:w-28 lg:w-36 -rotate-12 -scale-x-100 drop-shadow-sm pointer-events-none">
              <Image
                src="/images/chicken.webp"
                alt="Origami Chicken"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mb-14 text-center">
              <SectionLabel
                href="/events"
                locale={locale}
                highlightColor="#10b981"
                rotation="-rotate-1"
                textClassName="text-emerald-700"
              >
                {t("newsletter.sectionTitle")}
              </SectionLabel>
            </div>
            <div className="grid gap-12 md:gap-16 lg:gap-24 md:grid-cols-2 md:items-center">
              {/* Next Event — second on mobile, LEFT on desktop */}
              <div className="order-2 md:order-1 px-4 sm:px-6 md:px-0">
                <div className="flex flex-col items-center mx-auto w-full">
                  <EventFlyer
                    event={nextEvent ? {
                      title: nextEvent.title,
                      startDate: nextEvent.startDate,
                      endDate: nextEvent.endDate,
                      eventUrl: nextEvent.url,
                    } : undefined}
                  />
                </div>
              </div>

              {/* Newsletter — first on mobile for visibility, RIGHT on desktop */}
              <div className="order-1 md:order-2 px-4 sm:px-6 md:px-0">
                <div className="flex flex-col items-center mx-auto w-full">
                  <NewsletterSignup />
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Activities Section — paper sheet pinned to corkboard */}
      <section id="activities" className="relative scroll-mt-24 py-10 lg:py-14">
        <PaperSurface
          seed="activities-sheet"
          texture="washi"
          edge="torn"
          shadow="md"
          rotation={1}
          liftedCorner="bottom-right"
          className="mx-auto max-w-6xl px-3 sm:px-4"
          contentClassName="px-4 sm:px-6 lg:px-8 pt-6 pb-8"
          overlay={
            <>
              <div className="paper-pin paper-pin-yellow" style={{ top: '8px', left: '16px' }} />
              <div className="paper-pin paper-pin-green" style={{ top: '8px', right: '16px' }} />
              <div className="absolute -top-2 right-8 w-28 sm:w-36 lg:w-44 rotate-12 drop-shadow-sm pointer-events-none z-50">
                <Image
                  src="/images/bull.webp"
                  alt="Origami Bull"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </>
          }
        >
         <div className="mb-4 text-center">
            <SectionLabel
              href="/resources"
              locale={locale}
              highlightColor="#10b981"
              rotation="-rotate-1"
              textClassName="text-emerald-700"
            >
              {t("sections.activities.title")}
            </SectionLabel>
         </div>

         <h3 className="mb-8 font-heading text-3xl font-bold text-slate-900 group w-full text-center">
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
                       stickyRotation: "-rotate-6",
                       liftedCorner: "bottom-left" as const,
                    },
                    support: {
                       image: "/images/picnics.webp", // Changing to picnic for starter kits (friendly/intro vibe)
                       color: "sticky-yellow",
                       rotation: "-rotate-2",
                       marginTop: "mt-0 md:mt-10",
                       stickyPos: "-top-6 -left-1 sm:-top-8 sm:-left-2 md:-left-6",
                       stickyRotation: "-rotate-8",
                       liftedCorner: "none" as const,
                    },
                    community: {
                       image: "/images/groceries.webp", // Changing to groceries for shopping
                       color: "sticky-cream",
                       rotation: "-rotate-3",
                       marginTop: "mt-0 md:mt-2",
                       stickyPos: "-top-3 -right-0 sm:-top-5 sm:-right-1 md:-right-4",
                       stickyRotation: "-rotate-4",
                       liftedCorner: "bottom-right" as const,
                    },
                 };

                 const config = cardConfig[key];

                 const titleClass = "font-heading text-2xl sm:text-3xl font-bold text-slate-900 whitespace-nowrap";

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
                     liftedCorner={config.liftedCorner}
                     hover="hinge"
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

         <div className="mt-12 text-center">
            <PaperButton
               href="/resources"
               type="link"
               locale={locale}
               variant="solid"
               color="emerald"
               size="lg"
               className="font-bold inline-block"
            >
               {t("sections.activities.cta")}
            </PaperButton>
         </div>
        </PaperSurface>
      </section>

      {/* Blog Section — paper sheet with torn edges */}
      <div className="paper-torn-shadow">
      <section className="w-full paper-texture-seamless header-ripped-mask header-ripped-bottom-mask pt-12 md:pt-16 pb-12 relative scroll-mt-24" id="blog">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 overflow-x-clip">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 -rotate-1">
                {t("sections.blog.description")}
              </h2>
            </div>
            <PaperButton
              href="/blog"
              type="link"
              locale={locale}
              variant="solid"
              color="emerald"
              size="lg"
              className="font-bold"
            >
              {t("sections.blog.cta")}
            </PaperButton>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                      featured={idx === 0}
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
            <p className="text-center font-decorative text-2xl text-slate-500">
              {locale === 'ja' ? 'まだ記事がありません' : 'No posts yet — check back soon!'}
            </p>
          )}
        </div>
      </section>
      </div>

      {/* Instagram Section — directly on corkboard */}
      <section className="relative mx-auto w-full max-w-6xl px-4 py-10 lg:py-14">
        {/* Origami Pig — peeking in from the left, mirrored from the hero */}
        <div className="hidden lg:block absolute -top-1 left-4 z-20 w-32 lg:w-40 -rotate-6 -scale-x-100 drop-shadow-sm pointer-events-none">
          <Image
            src="/images/pig.webp"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
          />
        </div>
        <InstagramFeed />
      </section>

      {/* Contact Flyer Section — directly on corkboard */}
      <section className="relative w-full pt-6 pb-14 scroll-mt-24" id="contact">
          <div className="relative mx-auto w-full max-w-2xl px-4">
            {/* Origami Bull — perched on the corkboard, mirrored from the activities section */}
            <div className="absolute -top-12 right-0 sm:-top-16 sm:-right-8 lg:-right-20 z-30 w-24 sm:w-32 lg:w-40 rotate-6 -scale-x-100 drop-shadow-sm pointer-events-none">
              <Image
                src="/images/bull.webp"
                alt=""
                aria-hidden="true"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
            <TearOffFlyer
              title={t("contact.title")}
              subtitle={t("contact.subtitle")}
            />
          </div>
      </section>

    </div>
  );
}
