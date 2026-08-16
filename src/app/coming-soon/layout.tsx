import type {Metadata, Viewport} from "next";
import {Klee_One, Noto_Sans, Noto_Sans_JP, Inter, Amatic_SC, Caveat} from "next/font/google";
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
  title: "Tokyo Vegan — 準備中 / Coming Soon",
  description: "東京ヴィーガンの新しいウェブサイトを制作中です。メーリングリストにご登録ください！",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${klee.variable} ${notoSans.variable} ${notoSansJp.variable} ${inter.variable} ${amatic.variable} ${caveat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
