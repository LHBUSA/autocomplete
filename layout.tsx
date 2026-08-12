import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autocomplete.proptechusa.ai"),
  title: "Autocomplete to Instant Value | PropData",
  description:
    "Turn an address into an instant property value or a customer-specific instant offer with PropData autocomplete, parcel resolution, enrichment, and custom rules.",
  keywords: [
    "property address autocomplete",
    "instant home value API",
    "instant offer API",
    "property valuation widget",
    "real estate AVM API",
    "PropData",
  ],
  openGraph: {
    title: "Turn an Address Into an Instant Value—or an Instant Offer",
    description:
      "Autocomplete, parcel resolution, property intelligence, valuation, and custom offer logic in one PropData-powered experience.",
    type: "website",
    url: "https://autocomplete.proptechusa.ai",
    siteName: "PropData Instant Value",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autocomplete to Instant Value | PropData",
    description:
      "Turn an address into a real-time property value or a customized instant offer.",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PropData Autocomplete to Instant Value",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, API",
  description:
    "Address autocomplete, property resolution, instant valuation, and customizable instant-offer infrastructure powered by PropData.",
  provider: {
    "@type": "Organization",
    name: "PropTechUSA.ai",
    url: "https://www.proptechusa.ai",
  },
  featureList: [
    "Address autocomplete",
    "Parcel resolution",
    "Instant property valuation",
    "Custom instant-offer logic",
    "Embeddable white-label experiences",
    "Property data API",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
