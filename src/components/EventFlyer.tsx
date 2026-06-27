'use client';

import { useTranslations, useFormatter } from 'next-intl';
import { FaMeetup } from 'react-icons/fa';
import { RoughHighlight } from './RoughHighlight';

interface EventFlyerProps {
  /** If provided, renders the "next event" flyer. Otherwise renders the general meetup flyer. */
  event?: {
    title: string;
    startDate: Date;
    endDate: Date;
    eventUrl: string;
  };
}

export function EventFlyer({ event }: EventFlyerProps) {
  if (event) {
    return <NextEventFlyer {...event} />;
  }
  return <MeetupFlyer />;
}

/* ─── Next Event Flyer ─── */

function NextEventFlyer({
  title,
  startDate,
  endDate,
  eventUrl,
}: {
  title: string;
  startDate: Date;
  endDate: Date;
  eventUrl: string;
}) {
  const t = useTranslations('HomePage.meetup');
  const format = useFormatter();

  const dayName = format.dateTime(startDate, { weekday: 'long' });
  const monthDay = format.dateTime(startDate, { month: 'long', day: 'numeric' });
  const displayTime = `${format.dateTime(startDate, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })} – ${format.dateTime(endDate, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })}`;

  return (
    <div className="event-flyer-wrapper event-flyer-wrapper--event h-full">
      {/* Pushpin */}
      <div className="event-flyer-pin" />

      <div className="event-flyer event-flyer--event h-full min-h-[420px]">
        {/* Decorative dashed inner border */}
        <div className="event-flyer-inner-border" />

        {/* Top accent band */}
        <div className="event-flyer-band bg-emerald-600 pt-6 pb-3 sm:pt-7">
          <span className="font-decorative text-xl font-bold uppercase tracking-[0.2em] text-white/95 sm:text-2xl">
            ★ {t('nextEvent')} ★
          </span>
        </div>

        {/* Body */}
        <div className="relative z-2 flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
          <h3
            className="mb-4 font-heading font-bold leading-tight text-slate-800 wrap-break-word"
            style={{ fontSize: 'clamp(1.5rem, 8cqw, 2.25rem)' }}
            title={title}
          >
            {title}
          </h3>

          {/* Date block */}
          <div className="mb-3">
            <RoughHighlight
              type="circle"
              color="#fd7272"
              strokeWidth={6}
              trigger="visible"
              animationDuration={1200}
              className="px-4 py-2 sm:px-5 sm:py-3"
            >
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold uppercase tracking-wide text-slate-600 sm:text-base">
                  {dayName}
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 sm:text-4xl">
                  {monthDay}
                </span>
              </div>
            </RoughHighlight>
          </div>

          <span className="mb-6 font-heading text-2xl font-bold text-slate-800 sm:text-3xl">
            {displayTime}
          </span>

          {/* CTA */}
          <a
            href={eventUrl}
            target="_blank"
            rel="noreferrer"
            className="group/cta relative z-6 inline-flex items-center gap-2 border-2 border-slate-800 bg-white/70 px-5 py-2 font-ui text-xl font-bold text-slate-800 shadow-sm transition-all hover:bg-emerald-600 hover:border-emerald-600 hover:text-white hover:shadow-md active:translate-y-px sm:px-6 sm:py-2.5 sm:text-2xl"
          >
            <FaMeetup className="h-5 w-5" />
            <span>{t('rsvp')}</span>
            <span className="transition-transform group-hover/cta:translate-x-1">→</span>
          </a>
        </div>

        {/* Bottom decorative band */}
        <div className="event-flyer-band bg-emerald-600 mt-auto py-3">
          <span className="font-decorative text-base font-bold uppercase tracking-[0.25em] text-white/90 sm:text-lg">
            ★ Tokyo Vegan ★
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── General Meetup Flyer (no event scheduled) ─── */

function MeetupFlyer() {
  const t = useTranslations('HomePage.meetupFlyer');

  return (
    <div className="event-flyer-wrapper event-flyer-wrapper--meetup h-full">
      {/* Pushpin — centered */}
      <div className="event-flyer-pin" />

      <div className="event-flyer event-flyer--meetup h-full min-h-[420px]">
        {/* Decorative dashed inner border */}
        <div className="event-flyer-inner-border" />

        {/* Body */}
        <div className="relative z-2 flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
          {/* Large Meetup logo */}
          <div className="mb-6 flex flex-col items-center justify-center text-[#ED1C40]">
            <FaMeetup className="h-32 w-32 drop-shadow-sm" />
            <span className="mt-1 block font-brand text-3xl font-bold leading-tight text-emerald-800">
              Tokyo Vegan
              <br />
              Meetup Group
            </span>
          </div>

          <h3 className="mb-3 font-heading text-3xl font-bold leading-none sm:text-4xl md:text-5xl">
            {t('title')}
          </h3>

          <p className="mb-6 max-w-[250px] text-sm leading-relaxed">
            {t('description')}
          </p>

          {/* CTA */}
          <a
            href="https://www.meetup.com/tokyovegan/"
            target="_blank"
            rel="noreferrer"
            className="group/cta relative z-6 mt-auto inline-flex items-center gap-2 border-2 border-slate-800 bg-white/70 px-5 py-2 font-ui text-xl font-bold text-slate-800 shadow-sm transition-all hover:bg-[#ED1C40] hover:border-[#ED1C40] hover:text-white hover:shadow-md active:translate-y-px sm:px-6 sm:py-2.5 sm:text-2xl"
          >
            <FaMeetup className="h-5 w-5" />
            <span>{t('cta')}</span>
            <span className="transition-transform group-hover/cta:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
