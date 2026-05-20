import { Metadata } from "next";
import DealersClient from "./DealersClient";

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Wholesale Dealers & Distributors - Nanmai Appalam",
      template: "%s | Nanmai Appalam",
    },
    description:
      "Become a wholesale dealer or distributor for Nanmai Appalam. Get premium quality traditional papads at competitive prices for bulk orders. Join our network of trusted partners across India.",
    keywords: [
      "wholesale appalam",
      "bulk papad",
      "dealers",
      "distributors",
      "wholesale food",
      "nanmai appalam wholesale",
      "papad distributors",
    ],
    authors: [{ name: "Nanmai Appalam" }],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: process.env.NEXT_PUBLIC_APP_URL,
      siteName: "Nanmai Appalam",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: "Nanmai Appalam Wholesale" },
      ],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),
  };
}

export default function DealersPage() {
  return <DealersClient />;
}
