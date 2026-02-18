import Image from "next/image";

export default function DevPage() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px", fontFamily: "var(--font-geist-sans)" }}>
      <h1 style={{ fontFamily: "var(--font-geist-mono)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        /dev
      </h1>
      <p style={{ color: "#78716c", fontSize: 13, marginBottom: 32 }}>
        Current assets in use.
      </p>

      <div style={{ border: "1px solid #d6d3d1", background: "#fff", padding: 16 }}>
        <div style={{
          background: "#fafaf9",
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: 300, marginBottom: 12,
        }}>
          <Image src="/clav/jester-hero.png" alt="jester-hero" width={260} height={260}
            style={{ objectFit: "contain" }} unoptimized />
        </div>
        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, fontWeight: 700 }}>jester-hero</div>
        <div style={{ fontSize: 12, color: "#57534e", marginTop: 4, lineHeight: 1.5 }}>
          Landing page hero + favicon source. Jester hat caricature, bg removed.
        </div>
      </div>

      <div style={{ marginTop: 32, border: "1px solid #d6d3d1", background: "#fff", padding: 16 }}>
        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>OG Image Preview</div>
        <div style={{ fontSize: 12, color: "#57534e", marginBottom: 12 }}>
          Visit <code style={{ background: "#f5f5f4", padding: "1px 4px" }}>/opengraph-image</code> to preview the generated OG image.
        </div>
      </div>
    </div>
  );
}
