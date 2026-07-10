import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JWT Decoder — DevToolBox";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#030712", padding: "60px" }}>
        <div style={{ fontSize: "72px", fontWeight: 700, color: "#c084fc", marginBottom: "20px" }}>JWT</div>
        <h1 style={{ fontSize: "52px", fontWeight: 700, color: "white", textAlign: "center", marginBottom: "16px" }}>JWT Decoder</h1>
        <p style={{ fontSize: "24px", color: "#9ca3af", textAlign: "center", maxWidth: "700px" }}>Decode and inspect JSON Web Tokens. Check expiration, view claims. 100% client-side.</p>
        <div style={{ position: "absolute", bottom: "30px", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "white" }}>DT</div>
          <span style={{ fontSize: "18px", color: "#6b7280" }}>DevToolBox</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
