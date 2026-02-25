'use client';

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { RoughHighlight } from "./RoughHighlight";

interface MeetupEventCardProps {
  title: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  eventUrl: string;
}

export function MeetupEventCard({
  title,
  startDate,
  endDate,
  imageUrl,
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
    <div className="relative mx-auto w-full max-w-sm rotate-1">
      {/* Push Pin */}
      <div className="absolute -top-3 left-1/2 z-20 h-6 w-6 -translate-x-1/2 rounded-full bg-red-500 shadow-md ring-2 ring-red-600/50" />

      <div className="overflow-hidden rounded-sm bg-white p-4 shadow-xl shadow-slate-400/50">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-slate-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
            <p className="font-hand text-2xl font-bold text-white">{t("nextEvent")}</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="mb-2 font-hand text-3xl font-bold leading-tight text-emerald-800">{title}</h3>

          <div className="my-4 flex flex-col items-center gap-1 border-y-2 border-dashed border-emerald-100 py-6">
            <RoughHighlight type="circle" color="#fd7272" strokeWidth={4} trigger="visible" animationDuration={1200} className="px-4 py-2">
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-bold text-slate-700">
                  {format.dateTime(startDate, { weekday: "long", month: "long", day: "numeric" })}
                </span>
                <span className="text-xl font-extrabold text-emerald-600 px-2 mt-1">
                  {displayTime}
                </span>
              </div>
            </RoughHighlight>
          </div>

          <a
            href={eventUrl}
            target="_blank"
            rel="noreferrer"
            className="font-hand group mt-2 inline-flex items-center text-2xl font-bold text-slate-800 transition-colors hover:text-emerald-600"
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
  );
}
