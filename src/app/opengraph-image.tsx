import { ImageResponse } from "next/og";

export const alt =
  "Rejubliss | London 3D Animation, Photorealistic CGI, Motion & Interactive WebGL Studio";
export const size = {
  width: 1200,
  height: 630,
};
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
          padding: "64px 72px",
          background: "#000000",
          color: "#F5F4EF",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Upper-Right Crimson Radial Wash */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-90px",
            width: "620px",
            height: "620px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(229,55,38,0.28) 0%, rgba(229,55,38,0.08) 52%, transparent 74%)",
          }}
        />

        {/* Top Studio Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              background: "rgba(255, 255, 255, 0.04)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                background: "#E53726",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F5F4EF",
              }}
            >
              LONDON, UK • 3D, CGI &amp; WEBGL STUDIO
            </span>
          </div>

          <span
            style={{
              padding: "10px 22px",
              borderRadius: "9999px",
              background: "#E53726",
              fontSize: "17px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000000",
            }}
          >
            REJUBLISS.CO.UK
          </span>
        </div>

        {/* Monumental Stacked Display Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "1040px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#F5F4EF" }}>IDEAS CRAFTED INTO</span>
            <span style={{ color: "#E53726" }}>EXTRAORDINARY 3D,</span>
            <span style={{ color: "#F5F4EF" }}>CGI &amp; DIGITAL WORLDS</span>
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "rgba(245, 244, 239, 0.72)",
              maxWidth: "880px",
            }}
          >
            Bespoke 3D animation, photorealistic product CGI, explainer videos,
            motion design, and interactive Three.js web experiences.
          </div>
        </div>

        {/* Bottom Hairline Capability Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              "3D Animation",
              "Photorealistic CGI",
              "Product Visualization",
              "Explainer Videos",
              "Interactive WebGL",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  background: "#0B0B0F",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "rgba(245, 244, 239, 0.86)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: "17px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#E53726",
            }}
          >
            REJUBLISS STUDIO
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
