import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "jesterGPT — translate anything into chronically online looksmax speak";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const heroData = await readFile(
    join(process.cwd(), "public", "clav", "jester-hero.png"),
    "base64"
  );
  const heroSrc = `data:image/png;base64,${heroData}`;

  const fontData = await fetch(
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap"
  )
    .then((res) => res.text())
    .then((css) => {
      const url = css.match(/src: url\((.+?)\)/)?.[1];
      return url ? fetch(url).then((res) => res.arrayBuffer()) : null;
    });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f5f5f4",
          padding: "0px 80px 0px 80px",
        }}
      >
        <img alt="" src={heroSrc} width="520" height="520" style={{ objectFit: "contain", marginLeft: "-30px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              fontFamily: fontData ? "JetBrains Mono" : "monospace",
              color: "#1c1c1c",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            JESTERMAXX
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              fontFamily: fontData ? "JetBrains Mono" : "monospace",
              color: "#1c1c1c",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            YOUR COPY
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "JetBrains Mono",
                data: fontData,
                style: "normal" as const,
                weight: 800 as const,
              },
            ],
          }
        : {}),
    }
  );
}
