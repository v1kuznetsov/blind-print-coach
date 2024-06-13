import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["500"] });

export const metadata: Metadata = {
  title: "BlindPrintCoach",
  description: "I teach you use keyboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`flex h-screen flex-col items-center gap-2 ${roboto.className}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
