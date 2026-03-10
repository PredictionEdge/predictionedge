import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  title: {
    default: "PredictionEdge — Prediction Market Arbitrage Scanner",
    template: "%s | PredictionEdge",
  },
  description:
    "Find real-time arbitrage opportunities across Polymarket and Kalshi. 200+ daily opportunities. Built-in calculator. Backed by math, not luck.",
  keywords: [
    "prediction market arbitrage", "polymarket arbitrage", "kalshi arbitrage",
    "arbitrage scanner", "prediction markets", "arbitrage calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PredictionEdge",
    title: "PredictionEdge — Prediction Market Arbitrage Scanner",
    description: "Real-time arbitrage across Polymarket & Kalshi. 200+ daily opportunities.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PredictionEdge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PredictionEdge — Prediction Market Arbitrage Scanner",
    description: "Real-time arbitrage across Polymarket & Kalshi. 200+ daily opportunities.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
