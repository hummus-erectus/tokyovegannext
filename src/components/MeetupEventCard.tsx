'use client';

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { RoughHighlight } from "./RoughHighlight";

interface MeetupEventCardProps {
  title: string;
  startDate: Date;
  endDate: Date;
  eventUrl: string;
}

export function MeetupEventCard({
  title,
  startDate,
  endDate,
  eventUrl
}: MeetupEventCardProps) {
  const t = useTranslations("HomePage.meetup");
  const format = useFormatter();
  const [isHovered, setIsHovered] = useState(false);

  const displayTime = `${format.dateTime(startDate, {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  })} - ${format.dateTime(endDate, {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  })}`;

  return (
    <div className="relative mx-auto w-full max-w-sm -rotate-1">
      {/* Tape Element */}
      <div className="tape-section">
        <div className="tape-top-center" />
      </div>

      <div className="overflow-hidden bg-white shadow-xl shadow-slate-400/40 border border-slate-200/60 flex flex-col">
        
        {/* Top half with paper texture */}
        <div className="p-6 pt-8 pb-8 text-center bg-paper-texture flex-1 flex flex-col justify-center">
          <div className="inline-block mb-4">
            <div className="border-[3px] border-slate-800/20 px-3 py-1 -rotate-2 rounded-sm inline-block">
              <span className="font-hand text-sm font-bold tracking-widest text-slate-500 uppercase">
                {t("nextEvent")}
              </span>
            </div>
          </div>
          <h3 className="mb-2 font-hand text-3xl sm:text-4xl font-bold leading-tight text-slate-800 wrap-break-word">
            {title}
          </h3>
        </div>

        {/* Ticket Perforation */}
        <div className="relative h-0 w-full z-10">
          <div className="absolute inset-0 flex items-center justify-center -mt-[1.5px]">
            <div className="w-full border-t-[3px] border-dashed border-slate-300"></div>
          </div>
        </div>

        {/* Bottom half (Ticket stub) */}
        <div className="p-6 bg-slate-50 flex flex-col items-center">
          <RoughHighlight type="circle" color="#fd7272" strokeWidth={3} trigger="visible" animationDuration={1200} className="px-5 py-3 mb-2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-slate-700">
                {format.dateTime(startDate, { weekday: "long", month: "long", day: "numeric" })}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 px-2 mt-0.5">
                {displayTime}
              </span>
            </div>
          </RoughHighlight>

          <div className="mt-4">
            <a
              href={eventUrl}
              target="_blank"
              rel="noreferrer"
              className="font-hand group inline-flex items-center text-2xl font-bold text-slate-800 transition-colors hover:text-emerald-600"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <RoughHighlight type="underline" color="#10b981" strokeWidth={2} show={isHovered}>
                <span className="whitespace-nowrap">{t("rsvp")}</span>
              </RoughHighlight>
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
