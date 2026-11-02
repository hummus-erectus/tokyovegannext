import ICAL from 'ical.js';

const ICS_URL = process.env.MEETUP_ICS_URL ?? 'https://www.meetup.com/tokyovegan/events/ical/';

export interface MeetupEvent {
  title: string;
  url: string;
  startDate: Date;
  endDate: Date;
}

interface EventCandidate {
  title: string;
  url: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export async function getNextMeetupEvent(): Promise<MeetupEvent | null> {
  try {
    const response = await fetch(ICS_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch meetup ICS:', response.statusText);
      return null;
    }

    const icsData = await response.text();

    if (!icsData.includes('BEGIN:VCALENDAR')) {
      console.error('Invalid ICS data received');
      return null;
    }

    const jcalData = ICAL.parse(icsData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    if (vevents.length === 0) {
        return null;
    }

    const now = new Date();
    const futureEvents: EventCandidate[] = vevents
      .map((vevent) => {
        const event = new ICAL.Event(vevent);

        // Meetup descriptions often contain Markdown links like [https://...](https://...)
        // or [text](https://...), or plain URLs. Match clean URL characters only.
        const peatixUrlMatch = event.description?.match(
          /https?:\/\/[a-zA-Z0-9_.-]*peatix\.com(?:\/[a-zA-Z0-9_.~%!$&'()*+,;=:@/-]*)?/i
        )?.[0];
        const peatixUrlFromDescription = peatixUrlMatch
          ? peatixUrlMatch.replace(/[.,;:!?。、\s\])]+$/, '')
          : undefined;

        const urlFromProperty =
          (vevent as { getFirstPropertyValue?: (name: string) => string | null })
            .getFirstPropertyValue?.("url") ?? undefined;

        const meetupUrlFromDescription = event.description?.match(
          /https:\/\/www\.meetup\.com\/[^/]+\/events\/[a-zA-Z0-9_]+\/?/
        )?.[0];

        const url =
          peatixUrlFromDescription ??
          urlFromProperty ??
          meetupUrlFromDescription ??
          "https://peatix.com/group/16486093";

        return {
          title: event.summary,
          url,
          startDate: event.startDate.toJSDate(),
          endDate: event.endDate.toJSDate(),
          description: event.description,
        } satisfies EventCandidate;
      })
      .filter((e) => e.startDate > now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    if (futureEvents.length === 0) return null;

    const nextEvent = futureEvents[0];

    return {
      title: nextEvent.title,
      url: nextEvent.url,
      startDate: nextEvent.startDate,
      endDate: nextEvent.endDate,
    };

  } catch (error) {
    console.error('Error parsing meetup data:', error);
    return null;
  }
}
