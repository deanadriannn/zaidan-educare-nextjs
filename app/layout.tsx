import type { Metadata } from "next";
import { Geist, Geist_Mono, Secular_One, League_Spartan } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const secularOne = Secular_One({
  variable: "--font-secular",
  subsets: ["latin"],
  weight: ["400"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Zaidan Educare",
  description: "Aplikasi Pendanaan Sekolah Zaidan Educare",
  icons: {
    icon: "/images/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${secularOne.variable} ${leagueSpartan.variable} antialiased`}
      >
        <NextTopLoader color="#ED4498" />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
