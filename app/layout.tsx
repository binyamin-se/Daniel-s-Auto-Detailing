import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyConversionBar } from "@/components/StickyConversionBar";
import { businessName, getLocalBusinessJsonLd, siteUrl } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${businessName} | Premium Mobile Auto Detailing`,
    template: `%s | ${businessName}`
  },
  description:
    "Premium mobile detailing, coatings, paint correction, tint, and weekly memberships delivered to your home or workplace.",
  openGraph: {
    title: `${businessName} | Premium Mobile Auto Detailing`,
    description:
      "Premium mobile detailing, coatings, paint correction, tint, and weekly memberships delivered to your home or workplace.",
    url: siteUrl,
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

const localBusinessSchema = getLocalBusinessJsonLd();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-[var(--font-body)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main className="pb-28">{children}</main>
        <Footer />
        <StickyConversionBar />
      </body>
    </html>
  );
}
