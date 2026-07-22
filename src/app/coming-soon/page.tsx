import { FaMeetup } from 'react-icons/fa';
import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <div className="paper-sheet relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-slate-900">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* ─── Left column: text + CTA ─── */}
          <div className="flex flex-col items-center justify-center space-y-8 text-center lg:items-start lg:text-left">
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              <h1 className="font-brand -rotate-2 text-7xl font-bold text-emerald-600 sm:text-8xl lg:text-9xl">
                Tokyo Vegan
              </h1>
              <p className="font-heading text-2xl font-bold text-slate-700 sm:text-3xl">
                東京ヴィーガン
              </p>
            </div>

            {/* Coming soon stamp */}
            <div className="inline-block -rotate-3 border-[3px] border-red-500 px-6 py-2 sm:px-8 sm:py-3">
              <span className="font-heading text-3xl font-bold tracking-wide text-red-600 sm:text-4xl">
                準備中
              </span>
              <span className="mx-2 font-decorative text-lg text-slate-500 sm:text-xl">
                /
              </span>
              <span className="font-decorative text-2xl font-bold tracking-wide text-red-600 sm:text-3xl">
                Coming Soon
              </span>
            </div>

            {/* Description — bilingual */}
            <div className="space-y-2">
              <p className="max-w-lg text-lg leading-relaxed text-slate-700 sm:text-xl">
                新しいウェブサイトを制作中です。もうしばらくお待ちください！
              </p>
              <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
                We&apos;re building a new website. Check back soon!
              </p>
            </div>

            {/* Meetup CTA */}
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <a
                href="https://www.meetup.com/tokyovegan/"
                target="_blank"
                rel="noreferrer"
                className="group/cta relative z-10 inline-flex items-center gap-2 border-2 border-slate-800 bg-white/70 px-5 py-2.5 font-ui text-lg font-bold text-slate-800 shadow-sm transition-all hover:bg-[#ED1C40] hover:border-[#ED1C40] hover:text-white hover:shadow-md active:translate-y-px sm:px-6 sm:py-3 sm:text-xl"
              >
                <FaMeetup className="h-5 w-5" />
                <span>Meetupに参加しよう！</span>
                <span className="transition-transform group-hover/cta:translate-x-1">→</span>
              </a>
              <p className="text-sm text-slate-400">
                Join our Meetup group while you wait!
              </p>
            </div>
          </div>

          {/* ─── Right column: taped group photo ─── */}
          <div className="relative mx-auto mt-8 w-[calc(100%-2rem)] max-w-md sm:w-full lg:mx-0 lg:mt-0 lg:w-[calc(100%-3rem)] lg:max-w-none xl:w-full">
            {/* Origami Pig */}
            <div className="absolute -top-6 -right-4 sm:-right-8 lg:-right-12 z-30 w-32 sm:w-40 lg:w-48 rotate-16 drop-shadow-sm pointer-events-none">
              <Image
                src="/images/pig.webp"
                alt="Origami Pig"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="tape-section rotate-2">
              <div className="tape-top-center" />
              <div className="bg-white p-3 pb-8 shadow-xl shadow-slate-300/60">
                <div className="relative h-[300px] w-full overflow-hidden sm:h-[340px] md:h-[380px] lg:h-[420px]">
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
                <p className="mt-4 px-3 text-center font-decorative text-lg font-bold leading-relaxed text-slate-900 -rotate-1 sm:text-xl">
                  &ldquo;2006年から続く、ヴィーガンライフを楽しむ温かいコミュニティ。&rdquo;
                </p>
              </div>
            </div>

            {/* Hanko stamp — bottom right of photo */}
            <div className="absolute -bottom-8 -right-3 sm:-right-6 z-40 w-14 sm:w-16 -rotate-6 opacity-80 pointer-events-none">
              <Image
                src="/images/hanko_square.png"
                alt="Tokyo Vegan hanko stamp"
                width={200}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
