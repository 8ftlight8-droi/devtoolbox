import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "DevToolBox — Free Developer Utilities",
    template: "%s | DevToolBox",
  },
  description:
    "Free online developer tools: JSON formatter, regex tester, Base64 encoder/decoder, JWT decoder, and more. No signup required.",
  keywords: [
    "developer tools",
    "json formatter",
    "regex tester",
    "base64 encoder",
    "jwt decoder",
    "online dev tools",
    "free developer utilities",
  ],
  authors: [{ name: "DevToolBox" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevToolBox",
    title: "DevToolBox — Free Developer Utilities",
    description:
      "Free online developer tools. JSON formatter, regex tester, Base64 encoder, JWT decoder. No signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolBox — Free Developer Utilities",
    description:
      "Free online developer tools. JSON formatter, regex tester, Base64 encoder, JWT decoder.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
