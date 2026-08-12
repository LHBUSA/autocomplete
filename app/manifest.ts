import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PropData Autocomplete to Instant Value",
    short_name: "PropData Autocomplete",
    description:
      "Address autocomplete, canonical property resolution, instant value, and configurable instant-offer infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0b1f3a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
