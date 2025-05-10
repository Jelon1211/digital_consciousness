import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/index.css";
import "../styles/gridLines.css";

const orbitron = localFont({
  src: "../fonts/Orbitron-Regular.ttf",
  variable: "--font-orbitron",
  display: "swap",
});

const vcr = localFont({
  src: "../fonts/VCR_OSD_MONO_1.001.ttf",
  variable: "--font-vcr",
  display: "swap",
});

const mega = localFont({
  src: "../fonts/megaman.woff",
  variable: "--font-mega",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Consciousness",
  description: "Retro cyberpunk experience, by Jelon",
  other: {
    "google-font": `<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${vcr.variable} ${mega.variable} antialiased min-h-dvh mt-20`}
      >
        {/* <h4
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "3rem",
            textTransform: "uppercase",
          }}
        >
          ORBITRON FONT
        </h4>

        <h4
          style={{
            fontFamily: "var(--font-vcr)",
            fontSize: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          VCR OSD MONO
        </h4>
        <h4
          style={{
            fontFamily: "var(--font-mega)",
            fontSize: "2rem",
          }}
        >
          MEGA MAN
        </h4> */}
        {children}
      </body>
    </html>
  );
}
