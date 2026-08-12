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
          <div
            style={{
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background: "#2855f5",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            PD
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "26px", fontWeight: 800 }}>PropData</span>
            <span style={{ color: "#9bb5ff", fontSize: "15px", letterSpacing: "0.22em" }}>
              INSTANT VALUE
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
