import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexStudio — Jasa Pembuatan Website & Desain Digital",
  description:
    "Layanan profesional pembuatan website company profile, undangan digital, UI/UX Figma, joki kodingan SMK RPL, flowchart Flowgorithm, dan solusi digital lainnya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}