import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";
import { LayoutClientWrapper } from "@/components/layout/LayoutClientWrapper";

export const metadata: Metadata = {
  title: {
    default: "Nanmai Appalam – Pure & Crispy Traditional Papads",
    template: "%s | Nanmai Appalam",
  },
  description:
    "Nanmai Appalam – Premium quality traditional South Indian papads. Crispy, tasty, and made with superior ingredients. Order online for home delivery.",
  keywords: [
    "appalam",
    "papad",
    "south indian",
    "crispy papad",
    "nanmai appalam",
    "traditional papad",
    "buy papad online",
  ],
  authors: [{ name: "Nanmai Appalam" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Nanmai Appalam",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Nanmai Appalam" },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="font-body">
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
        <CartDrawer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#fff",
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: { iconTheme: { primary: "#66BB6A", secondary: "#fff" } },
            error: { iconTheme: { primary: "#12A6DF", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
