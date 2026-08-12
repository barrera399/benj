import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";
import ScrollProgress from "@/components/globals/ScrollProgress";
import MotionProvider from "@/components/globals/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joseph Barrera — Full-Stack Developer · Web & Mobile",
  description:
    "Joseph Benjamin Barrera — full-stack developer from Tarlac, Philippines. Building scalable, thoughtful software for the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-ink`}
      >
        <MotionProvider>
          <ScrollProgress />
          <div className="grain" aria-hidden />
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
