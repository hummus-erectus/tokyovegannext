import type {Metadata, Viewport} from "next";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {Klee_One, Noto_Sans, Noto_Sans_JP, Inter, Amatic_SC, Caveat} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {routing} from "@/i18n/routing";
import {Analytics} from "@vercel/analytics/next";
import "../globals.css";

const klee = Klee_One({
  variable: "--font-klee",
  weight: ["400", "600"],
  subsets: ["latin"],
  preload: false,
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const amatic = Amatic_SC({
  variable: "--font-amatic",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tokyo Vegan",
  description: "Connecting and supporting the Tokyo vegan community",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as "en" | "ja")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${klee.variable} ${notoSans.variable} ${notoSansJp.variable} ${inter.variable} ${amatic.variable} ${caveat.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col text-slate-900 overflow-x-hidden w-full relative">
            <Header />
            <main className="flex-1 w-full relative">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
