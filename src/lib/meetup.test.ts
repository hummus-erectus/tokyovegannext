import {describe, it, expect, vi, afterEach} from "vitest";
import {getNextMeetupEvent} from "./meetup";

const futureIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:test-1
DTSTART:20300101T100000Z
DTEND:20300101T120000Z
SUMMARY:Tokyo Vegan Test Event
DESCRIPTION:https://www.meetup.com/tokyovegan/events/123456/
LOCATION:Tokyo
END:VEVENT
END:VCALENDAR
`;

const pastIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:test-2
DTSTART:20000101T100000Z
DTEND:20000101T120000Z
SUMMARY:Old Event
DESCRIPTION:https://www.meetup.com/tokyovegan/events/old/
LOCATION:Tokyo
END:VEVENT
END:VCALENDAR
`;

const originalFetch = globalThis.fetch;

afterEach(() => {
  vi.resetAllMocks();
  globalThis.fetch = originalFetch;
});

describe("getNextMeetupEvent", () => {
  it("returns the next future event from the ICS feed", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => futureIcs
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).fetch = mockFetch;

    const event = await getNextMeetupEvent();

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(event).not.toBeNull();
    expect(event?.title).toBe("Tokyo Vegan Test Event");
    expect(event?.url).toBe("https://www.meetup.com/tokyovegan/events/123456/");
    expect(event?.startDate).toBeInstanceOf(Date);
  });

  it("returns null when there are no future events", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => pastIcs
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).fetch = mockFetch;

    const event = await getNextMeetupEvent();

    expect(event).toBeNull();
  });
});
