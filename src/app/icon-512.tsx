import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2563eb",
          borderRadius: "100px",
          fontSize: "200px",
          fontWeight: 700,
          color: "white",
        }}
      >
        DT
      </div>
    ),
    { ...size }
  );
}
