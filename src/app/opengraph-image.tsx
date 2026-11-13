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
          background:
            "linear-gradient(135deg, #061B35 0%, #063B50 56%, #087F8C 100%)",
          color: "#F5FAFA",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Crystalline Ambient Orbs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(115,201,208,0.34) 0%, rgba(22,166,176,0.08) 55%, transparent 75%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "260px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(22,166,176,0.25) 0%, transparent 70%)",
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
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "9999px",
                background: "#73C9D0",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#73C9D0",
              }}
            >
              Rejubliss • London Creative Studio
            </span>
          </div>

          <span
            style={{
              padding: "10px 22px",
              borderRadius: "9999px",
              border: "1px solid rgba(115, 201, 208, 0.45)",
              background: "rgba(6, 27, 53, 0.55)",
              fontSize: "18px",
              fontWeight: 600,
              color: "#D8E8E8",
            }}
          >
            rejubliss.co.uk
          </span>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#F5FAFA",
            }}
          >
            Ideas Crafted Into Extraordinary 3D, CGI &amp; WebGL Worlds
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.42,
              color: "#D8E8E8",
              maxWidth: "880px",
            }}
          >
            Bespoke 3D animation, photorealistic product CGI, explainer videos,
            motion design, and interactive Three.js web experiences.
          </div>
        </div>

        {/* Bottom Capability Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "26px",
            borderTop: "1px solid rgba(216, 232, 232, 0.22)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
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
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  background: "rgba(245, 250, 250, 0.1)",
                  border: "1px solid rgba(115, 201, 208, 0.3)",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#F5FAFA",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#73C9D0",
            }}
          >
            London • Worldwide Delivery
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
