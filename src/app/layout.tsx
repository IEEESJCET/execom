import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "IEEE Student Branch | Executive Committee Directory",
  description: "Official Executive Committee Directory of IEEE Student Branch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-between">
        <div className="flex-1">{children}</div>

        {/* Site Footer */}
        <footer className="w-full text-white py-8 px-4 md:px-8 mt-auto shadow-inner bg-gradient-black-blue">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Link href="/" className="font-extrabold text-lg tracking-tight text-white hover:text-blue-200 transition-colors">
                IEEE Student Branch
              </Link>
              <p className="text-xs text-blue-100/80 font-medium mt-0.5">
                Executive Committee Directory & Profiles
              </p>
            </div>

            <div className="text-xs text-blue-100/70 font-medium text-center sm:text-right">
              &copy; {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}