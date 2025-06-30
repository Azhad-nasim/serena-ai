import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Head from "next/head";

import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SerenaAI",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <html lang="en" className="dark">
        <body className={`${monaSans.className} antialiased pattern`}>
          {children}

          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </>
  );
}
