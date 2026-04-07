import type { Metadata } from "next";
import { Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "rence",
  description:
    "Visual designer — I make things look good and feel right. Being messy is part of the master plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-on-background selection:bg-neutral-200 selection:text-neutral-900">
        {children}
      </body>
    </html>
  );
}
