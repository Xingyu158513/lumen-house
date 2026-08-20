import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });
const chinese = Noto_Sans_SC({ variable: "--font-cn", subsets: ["latin"], weight: ["300", "400", "500"] });

const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001").replace(/\/$/, "");
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "lumen-house";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const isUserSite = repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const pagesBasePath = process.env.GITHUB_PAGES === "true" && !isUserSite ? `/${repositoryName}` : "";
const imageUrl = `${siteOrigin}${pagesBasePath}/og.png`;

export const metadata: Metadata = {
  title: { default: "Lumen House｜因地而生的酒店", template: "%s｜Lumen House" },
  description: "海岸、岛屿、山境与旧城中的原创酒店概念体验。",
  icons: { icon: `${pagesBasePath}/icon.png`, shortcut: `${pagesBasePath}/icon.png` },
  openGraph: {
    title: "Lumen House｜因地而生的酒店",
    description: "Stays shaped by place — 海岸、岛屿、山境与旧城中的原创酒店体验。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: imageUrl, width: 1200, height: 630, alt: "Lumen House — Stays Shaped by Place" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen House｜因地而生的酒店",
    description: "Stays shaped by place.",
    images: [imageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${sans.variable} ${serif.variable} ${chinese.variable}`}>{children}</body></html>;
}
