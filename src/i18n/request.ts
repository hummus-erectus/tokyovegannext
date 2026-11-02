import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "ja")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Events are in Tokyo; without this, dates render in the server's timezone (UTC on Vercel)
    timeZone: 'Asia/Tokyo',
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
