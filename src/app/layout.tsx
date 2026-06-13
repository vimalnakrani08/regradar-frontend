import type { Metadata } from "next";
import { IBM_Plex_Mono, Public_Sans, Source_Serif_4 } from "next/font/google";

import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

// Public Sans is the U.S. Web Design System typeface — native to the
// institution this tool serves. Source Serif 4 gives headings an editorial,
// "of record" authority. IBM Plex Mono sets document numbers and data.
const sans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Regradar — AI search for the U.S. Federal Register",
    template: "%s · Regradar",
  },
  description:
    "Ask questions and search U.S. Federal Register regulations. Answers are grounded in " +
    "retrieved documents and cite their sources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
