import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import { NewsletterSignupCard } from '@/components/NewsletterSignup';
import { WashiTape } from '@/components/WashiTape';
import { PeatixIcon } from '@/components/PeatixIcon';

/**
 * Bilingual copy for the signup card. The coming-soon page has no language
 * switcher, so every string is shown in Japanese and English, each marked up
 * with its own `lang` attribute for screen readers and font selection.
 */
const newsletterLabels = {
  title: (
    <span className="flex flex-col items-center gap-0.5">
      <span lang="ja" className="text-2xl">
        最新情報をメールで
      </span>
      <span lang="en" className="text-3xl text-emerald-700">
        Get updates by email
      </span>
    </span>
  ),
  description: (
    <span className="block">
      <span lang="ja" className="block">
        サイト公開とイベントのお知らせ。
      </span>
      <span lang="en" className="block text-slate-500">
        Launch news &amp; event updates.
      </span>
    </span>
  ),
  emailLabel: 'メールアドレス / Email address',
  emailPlaceholder: 'your@email.com',
  submit: (
    <span className="inline-flex items-baseline gap-2">
      <span lang="ja">登録する</span>
      <span aria-hidden="true" className="opacity-50">
        /
      </span>
      <span lang="en">Sign up</span>
    </span>
  ),
  successTitle: (
    <span className="flex flex-col items-center gap-1">
      <span lang="ja">登録完了！</span>
      <span lang="en" className="text-3xl text-emerald-700">
        You&apos;re in!
      </span>
    </span>
  ),
  successMessage: (
    <span className="block space-y-1">
      <span lang="ja" className="block">
        登録ありがとうございます！ウェルカムメールをお送りしました。まもなく届くはずですが、見当たらない場合は迷惑メールフォルダーをご確認いただき、今後のメールを見逃さないよう「迷惑メールではない」とマークしてください。
      </span>
      <span lang="en" className="block text-slate-500">
        You&apos;re subscribed! A welcome email is on its way. If it doesn&apos;t arrive soon, check your spam folder and mark us as &ldquo;not spam&rdquo; so you don&apos;t miss future updates.
      </span>
    </span>
  ),
  errorMessage: 'エラーが発生しました。もう一度お試しください。/ Something went wrong. Please try again.',
  privacy: (
    <span className="block">
      <span lang="ja">いつでも配信停止できます。</span>{' '}
      <span lang="en">Unsubscribe anytime.</span>
    </span>
  ),
};

export default function ComingSoonPage() {
  return (
    <div className="paper-sheet relative flex min-h-screen flex-col items-center overflow-hidden px-4 py-10 text-slate-900 sm:py-14 lg:py-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* ─── Header: brand + coming soon stamp + description (centered) ─── */}
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col items-center space-y-1">
            <h1 className="font-brand -rotate-2 text-6xl font-bold text-emerald-600 sm:text-7xl lg:text-7xl xl:text-8xl">
              Tokyo Vegan
            </h1>
            <p className="font-heading text-xl font-bold text-slate-700 sm:text-2xl lg:text-2xl">
              東京ヴィーガン
            </p>
          </div>

          {/* Coming soon stamp */}
          <div className="inline-block -rotate-3 border-[3px] border-red-500 px-5 py-1.5 sm:px-6 sm:py-2">
            <span className="font-heading text-2xl font-bold tracking-wide text-red-600 sm:text-3xl">
              準備中
            </span>
            <span className="mx-2 font-decorative text-base text-slate-500 sm:text-lg">
              /
            </span>
            <span className="font-decorative text-xl font-bold tracking-wide text-red-600 sm:text-2xl">
              Coming Soon
            </span>
          </div>

          {/* Description — bilingual */}
          <div className="space-y-1">
            {/* No text-balance on the JA line: it breaks mid-word without spaces.
                Split at the sentence boundary so it can wrap on narrow screens
                without breaking mid-word, while staying on one line on sm+. */}
            <p lang="ja" className="whitespace-nowrap text-base leading-relaxed text-slate-700 sm:text-lg lg:text-lg">
              新しいウェブサイトを制作中です。<br className="sm:hidden" />もうしばらくお待ちください！
            </p>
            <p lang="en" className="whitespace-nowrap text-sm leading-relaxed text-slate-500 sm:text-base lg:text-base">
              We&apos;re building a new website. Check back soon!
            </p>
          </div>
        </header>

        {/* ─── Two columns: form (left) + polaroid (right) ─── */}
        <div className="mt-8 grid gap-8 lg:mt-4 lg:grid-cols-2 lg:items-start lg:gap-10">
          {/* Left: mailing list signup + socials */}
          <div className="flex flex-col items-center gap-5 lg:gap-4">
            <div className="relative mx-auto w-full max-w-sm -rotate-1">
              <WashiTape variant="emerald-soft" placement="top-center" rotation={-3} size="md" widthPct={55} />
              <NewsletterSignupCard
                labels={newsletterLabels}
                pinned={false}
                compact
                className="max-w-none"
              />
            </div>

            {/* Social CTAs — brand names read the same in both languages */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://peatix.com/group/16486093"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sticker btn-sticker--yellow group/cta inline-flex items-center gap-2 px-4 py-2 font-ui text-base font-bold sm:text-lg"
                >
                  <PeatixIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Peatix</span>
                  <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">→</span>
                </a>

                <a
                  href="https://www.instagram.com/tokyoveganofficial/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sticker btn-sticker--yellow group/cta inline-flex items-center gap-2 px-4 py-2 font-ui text-base font-bold sm:text-lg"
                >
                  <FaInstagram className="h-5 w-5" aria-hidden="true" />
                  <span>Instagram</span>
                  <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">→</span>
                </a>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                <span lang="ja">ぜひご参加ください。</span>{' '}
                <span lang="en">Come say hi!</span>
              </p>
            </div>
          </div>

          {/* Right: polaroid — fixed size for consistent ratio/height */}
          <div className="relative mx-auto w-[calc(100%-2rem)] max-w-sm lg:mx-auto">
            {/* Origami Pig */}
            <div className="absolute -top-5 -right-3 sm:-right-6 z-30 w-24 sm:w-32 rotate-16 drop-shadow-sm pointer-events-none">
              <Image
                src="/images/pig.webp"
                alt="Origami Pig"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="relative rotate-2">
              <WashiTape variant="sakura" placement="top-center" rotation={-3} size="md" widthPct={50} />
              <div className="relative bg-white p-3 pb-6 shadow-xl shadow-slate-300/60">
                <div className="relative h-[340px] w-full overflow-hidden">
                  <Image
                    src="/images/group.jpg"
                    alt="Tokyo Vegan community group at a meetup event"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 500px, 100vw"
                    priority
                  />
                </div>
                <p className="mt-3 px-3 text-center font-decorative text-base font-bold leading-relaxed text-slate-900 -rotate-1 sm:text-lg">
                  &ldquo;2006年から続く、ヴィーガンライフを楽しむ温かいコミュニティ。&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
