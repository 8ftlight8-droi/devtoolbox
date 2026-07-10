import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DevToolBox — Free Developer Utilities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#030712",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
            }}
          >
            DT
          </div>
          <span style={{ fontSize: "48px", fontWeight: 700, color: "white" }}>
            DevToolBox
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Free, privacy-first developer utilities. JSON formatter, regex tester,
          Base64, JWT decoder, and more.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["JSON", "Regex", "Base64", "JWT", "Hash", "URL", "Color"].map(
            (tool) => (
              <div
                key={tool}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "1px solid #374151",
                  backgroundColor: "#111827",
                  fontSize: "18px",
                  color: "#d1d5db",
                }}
              >
                {tool}
              </div>
            )
          )}
        </div>
        <p
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "16px",
            color: "#6b7280",
          }}
        >
          100% Client-Side • No Signup • Free Forever
        </p>
      </div>
    ),
    { ...size }
  );
}
