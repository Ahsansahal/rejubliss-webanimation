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
  title: "Rejubliss | Design, Animate, Develop, Grow",
  description:
    "We design, develop, and animate digital experiences that help brands stand out, engage audiences, and grow in a digital world.",
  keywords: [
    "Digital Agency",
    "Website Design",
    "2D Animation",
    "3D Animation",
    "Motion Design",
    "Brand Identity",
    "Rejubliss",
  ],
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
      <body className="font-sans antialiased text-[#1b2621] bg-[#faf8f5] selection:bg-[#d4af37]/20 selection:text-[#0a2920]">
        {children}
      </body>
    </html>
  );
}
