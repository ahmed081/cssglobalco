import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { siteData } from "@/data/site.data";
import { siteUrl } from "@/seo/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteData.name,
    template: "%s"
  },
  description: "Scale your SaaS team faster with nearshore talent from Morocco.",
  applicationName: siteData.name,
  authors: [{ name: "CSSGLOBALCO.com" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: siteData.name,
    description: "Hire Sales, Customer Success, and Engineering teams faster with nearshore talent from Morocco."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
