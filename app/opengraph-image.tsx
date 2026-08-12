import { ImageResponse } from "next/og";

export const alt = "PropData Autocomplete to Instant Value";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "white",
          background:
            "radial-gradient(circle at 84% 20%, #2855f5 0%, transparent 34%), linear-gradient(135deg, #07152f 0%, #0b2043 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="70" height="76" viewBox="0 0 64 68">
            <path d="M32 2 58 11v18c0 17-10.1 29.7-26 36.6C16.1 58.7 6 46 6 29V11Z" fill="#fff" stroke="#dce7f4" strokeWidth="2" />
            <path d="M32 6 54 13.6v15c0 14.2-7.8 24.9-22 31.6-14.2-6.7-22-17.4-22-31.6v-15Z" fill="#17458f" stroke="#0a2548" strokeWidth="2.4" />
            <path d="M32 10.2 50 16.4v12.2c0 11.6-6 20.5-18 26.5-12-6-18-14.9-18-26.5V16.4Z" fill="none" stroke="#a9c9ff" strokeWidth="1.4" />
            <rect x="17" y="23" width="30" height="13" rx="4" fill="#fff" />
            <circle cx="24" cy="29.5" r="3.1" fill="none" stroke="#2563eb" strokeWidth="2" />
            <path d="m26.4 32 3.1 3" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            <path d="m35 39 10 4.8-4.6 2-2.1 5.2Z" fill="#ef3340" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "26px", fontWeight: 800 }}>PropData</span>
            <span style={{ color: "#9bb5ff", fontSize: "15px", letterSpacing: "0.22em" }}>
              AUTOCOMPLETE + INSTANT VALUE
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ color: "#72e0b7", fontSize: "18px", letterSpacing: "0.16em" }}>
            AUTOCOMPLETE TO ACTION
          </div>
          <div style={{ maxWidth: "980px", fontSize: "70px", lineHeight: 1.02, letterSpacing: "-0.05em" }}>
            Turn an address into an instant value—or an instant offer.
          </div>
          <div style={{ color: "#a8b9d2", fontSize: "23px" }}>
            Property resolution, valuation, and customer-defined offer logic.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
