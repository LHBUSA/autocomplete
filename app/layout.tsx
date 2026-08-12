import type { Metadata } from "next";
import { DM_Mono, Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autocomplete.proptechusa.ai"),
  alternates: {
    canonical: "/",
  },
  title: "Autocomplete to Instant Value | PropData",
  description:
    "Turn an address into an instant property value or a customer-specific instant offer with PropData autocomplete, parcel resolution, enrichment, and custom rules.",
  keywords: [
    "property address autocomplete API",
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PropData Autocomplete to Instant Value",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autocomplete to Instant Value | PropData",
    description:
      "Turn an address into a real-time property value or a customized instant offer.",
    images: ["/opengraph-image"],
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
  url: "https://autocomplete.proptechusa.ai",
  offers: {
    "@type": "Offer",
    price: "79",
    priceCurrency: "USD",
    description: "Self-serve API access from $79 per month; custom enterprise implementations available.",
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
    <html lang="en" className={`${geist.variable} ${dmMono.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
