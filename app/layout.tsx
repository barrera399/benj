import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ParticlesBackground } from "./../components/globals/bg-particle";
import Header from "@/components/globals/Header";
import { poppins } from '@/assets/fonts'
import Footer from "@/components/globals/Footer";
// import Chatbot from "@/components/chatbot/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benj Barrera",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-black`}
      >
        <Header />
        {/* <ParticlesBackground /> */}
        {children}
        <Footer />
        {/* <Chatbot /> */}
      </body>
    </html>
  );
}
