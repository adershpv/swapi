import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swapi App",
  description: "Characters from Star Wars universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-content3">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Navigation />
          <div className="max-w-[1024px] mx-auto my-10">
            <div className="px-6 w-full">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
