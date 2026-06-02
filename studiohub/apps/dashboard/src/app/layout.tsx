import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioHub — Project Dashboard",
  description: "Manage your projects, track progress, and collaborate with your team.",
  keywords: ["dashboard", "project management", "studio", "collaboration"],
  authors: [{ name: "StudioHub" }],
  creator: "StudioHub",
  robots: { index: true, follow: true },
  openGraph: {
    title: "StudioHub — Project Dashboard",
    description: "Manage your projects, track progress, and collaborate with your team.",
    siteName: "StudioHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "StudioHub Dashboard",
    description: "Project management and collaboration platform.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {children}
      </body>
    </html>
  );
}
