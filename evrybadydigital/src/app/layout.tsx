import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Evrybady Digital",
  description: "Creative digital agency for web, marketing, and growth.",
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
      <body className="min-h-full flex flex-col bg-[#08140d] text-white">
        <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a1e0a]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
            <div className="font-semibold tracking-[0.24em] text-[#f7e7a6]">EVRYBADY</div>
            <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              <a href="#about" className="hover:text-white">About</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#work" className="hover:text-white">Work</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>

        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}
