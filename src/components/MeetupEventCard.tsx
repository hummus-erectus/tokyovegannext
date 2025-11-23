import { useTranslations, useFormatter } from "next-intl";

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

  const dayNumber = format.dateTime(startDate, { day: "2-digit" });
  const monthShort = format.dateTime(startDate, { month: "short" });
  const weekdayShort = format.dateTime(startDate, { weekday: "short" });
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
    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200 ring-1 ring-slate-100 lg:flex">
      <div className="relative h-64 lg:h-auto lg:w-2/5">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent lg:bg-linear-to-r" />
        <div className="absolute bottom-4 left-4 text-white lg:hidden">
          <p className="font-semibold text-emerald-400">{t("nextEvent")}</p>
        </div>
      </div>
      <div className="p-8 lg:w-3/5">
        <div className="mb-2 hidden lg:block">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            {t("nextEvent")}
          </p>
        </div>
        <h3 className="mb-5 text-2xl font-bold leading-tight text-slate-900">{title}</h3>

        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-linear-to-br from-emerald-50 to-emerald-100/50 p-4 shadow-sm ring-1 ring-emerald-100">
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-white px-4 py-3 text-center shadow-md ring-1 ring-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {monthShort}
            </span>
            <span className="text-3xl font-extrabold leading-none text-slate-900">
              {dayNumber}
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              {weekdayShort}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-lg font-bold text-slate-900">
              {displayTime}
            </span>
            <span className="text-sm text-slate-600">
              {format.dateTime(startDate, { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <a
            href={eventUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full justify-center rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 hover:shadow-emerald-300 sm:w-auto"
          >
            {t("rsvp")}
          </a>
        </div>
      </div>
    </div>
  );
}
