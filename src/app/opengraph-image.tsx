import { ImageResponse } from "next/og";
import { EVENT } from "@/lib/site";

export const alt =
  "India's Best 100 Institute Award Show 2026 — DITRP, Sunday 27 September 2026, Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, in the same royal-blue and gold as the printed nominee cards.
 *
 * Satori supports flexbox and a CSS subset only — no grid, no Tailwind, no
 * external stylesheet — so everything here is inline styles and every
 * container holding more than one child declares display:flex explicitly.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#01184A",
          backgroundImage:
            "radial-gradient(118% 82% at 50% 34%, #12276A 0%, #01184A 46%, #01143C 88%)",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Gold double frame, as printed. */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            border: "2px solid #F1C974",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px solid rgba(241,201,116,0.45)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 21,
            letterSpacing: 9,
            color: "#F6ECA4",
          }}
        >
          DITRP PRESENTS
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 26,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: 1,
            color: "#F1C974",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex" }}>INDIA&apos;S BEST 100</div>
          <div style={{ display: "flex" }}>INSTITUTE AWARD SHOW</div>
          <div style={{ display: "flex", fontSize: 86 }}>2026</div>
        </div>

        <div
          style={{
            display: "flex",
            width: 260,
            height: 2,
            marginTop: 30,
            backgroundColor: "#F1C974",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 27,
            letterSpacing: 5,
            color: "#FFFFFF",
          }}
        >
          SUNDAY 27 SEPTEMBER 2026
          <span style={{ color: "#F1C974", margin: "0 14px" }}>·</span>
          {EVENT.city.toUpperCase()}
        </div>
      </div>
    ),
    { ...size },
  );
}
