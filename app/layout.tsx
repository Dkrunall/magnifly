
import Footer from "@/components/footer";
import type { Metadata } from "next";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Motion from "@/components/motion";
import PageFlight from "@/components/page-flight";
import "./globals.css";
import "./modern.css";
import "./hero.css";
import "lenis/dist/lenis.css";
import "./interactions.css";
import "./responsive.css";
import "./stacked-hero.css";
import "./navigation.css";
import "./editorial-navigation.css";
import "./footer.css";
import "./accessibility.css";
import "./service-groups.css";
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
const mono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://magnifly-media-studio.magniflydesign.chatgpt.site",
  ),
  openGraph: {
    title: "MAGNIFLY MEDIA — We Magnifly Brands",
    description:
      "Brand strategy, design, social media, production, performance marketing, and web and app development. One creative team to help ambitious brands rise.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MAGNIFLY MEDIA — Big ideas. Bigger impact.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAGNIFLY MEDIA — We Magnifly Brands",
    images: ["/og.png"],
  },
  title: {
    default: "MAGNIFLY MEDIA | Branding, Digital Marketing & Web Development",
    template: "%s | MAGNIFLY MEDIA",
  },
  description:
    "MAGNIFLY MEDIA connects brand strategy, design, social media, production, performance marketing, and web and app development to help ambitious brands rise.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="page-top" className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <header className="header">
          <Link href="/" aria-label="MAGNIFLY MEDIA home">
            <Image
              src="/logo.png"
              alt="MAGNIFLY MEDIA"
              width={1600}
              height={243}
              className="logo"
              priority
            />
          </Link>
          <Navigation />
        </header>
        <div id="content">{children}</div>
        <Footer />
        <Motion />
        <PageFlight />
      </body>
    </html>
  );
}
