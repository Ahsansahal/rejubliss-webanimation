import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { MotionProvider } from "@/components/common/AmbientBackgrounds";
import { AnalyticsTracker } from "@/components/common/AnalyticsTracker";
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

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://rejubliss.co.uk"),
  title: {
    default:
      "Rejubliss | London 3D Animation, CGI, Motion & Interactive WebGL Studio",
    template: "%s | Rejubliss",
  },
  description:
    "London creative studio crafting bespoke 3D animation, photorealistic CGI rendering, product visualization, explainer videos, motion graphics, website design, and interactive WebGL experiences.",
  keywords: [
    "3D Animation Studio London",
    "CGI Product Visualization",
    "Photorealistic 3D Rendering",
    "Explainer Video Production London",
    "Motion Graphics Studio",
    "Interactive WebGL Studio",
    "Three.js Product Configurator",
    "Character Animation Studio",
    "Architectural Visualization London",
    "Rejubliss",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { "msvalidate.01": bingVerification } }
            : {}),
        },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://rejubliss.co.uk",
    siteName: "Rejubliss 3D Animation Studios",
    title:
      "Rejubliss | London 3D Animation, CGI, Motion & Interactive WebGL Studio",
    description:
      "Cinematic 3D animation, photorealistic CGI product visualization, explainer videos, motion storytelling, and interactive WebGL experiences built to elevate ambitious brands.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Rejubliss | London 3D Animation, CGI, Motion & Interactive WebGL Studio",
    description:
      "Cinematic 3D animation, photorealistic CGI product visualization, explainer videos, motion design, and interactive WebGL experiences.",
  },
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

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('rejubliss-theme');
    var mode = stored === 'dark' ? 'dark' : 'light';
    var root = document.documentElement;
    root.setAttribute('data-theme', mode);
    root.classList.toggle('dark', mode === 'dark');
    root.style.colorScheme = mode;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.colorScheme = 'light';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${caveat.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased text-text-primary bg-bg-primary selection:bg-accent-interactive/25 selection:text-text-heading transition-colors duration-300">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <AnalyticsTracker />
      </body>
    </html>
  );
}
