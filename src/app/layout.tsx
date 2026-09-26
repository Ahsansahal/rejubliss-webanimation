import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Rejubliss | 3D Animation Studios",
  description:
    "Next-generation 3D animation, photorealistic CGI, WebGL experiences, and motion design that elevate brands beyond limits.",
  keywords: [
    "3D Animation Studio",
    "CGI Animation",
    "WebGL Development",
    "Motion Design",
    "Product Visualization",
    "Visual Effects",
    "Rejubliss",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${caveat.variable}`}
    >
      <body className="font-sans antialiased text-[#0b1b36] bg-[#f8fafc] selection:bg-[#00e5ff]/25 selection:text-[#071527]">
        {children}
      </body>
    </html>
  );
}
