import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {Geist, Geist_Mono, Amatic_SC, Yomogi} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {routing} from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amatic = Amatic_SC({
  variable: "--font-amatic",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const yomogi = Yomogi({
  variable: "--font-yomogi",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tokyo Vegan",
  description: "Connecting and supporting the Tokyo vegan community",
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${amatic.variable} ${yomogi.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col bg-[#FCF7DA] text-slate-900">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
