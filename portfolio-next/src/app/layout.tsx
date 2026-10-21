import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import { ResumeModalProvider } from "@/context/ResumeModalContext";
import ResumeModal from "@/components/ui/ResumeModal";
import { profile } from "@/lib/data";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sumeetkanhiya.dev"),
  title: "Sumeet Kanhiya | Systems Architect",
  description:
    "Personal portfolio of Sumeet Kanhiya, Systems Architect & Full-Stack Developer specializing in high-throughput distributed systems, Next.js, and real-time architectures.",
  openGraph: {
    title: "Sumeet Kanhiya | Systems Architect",
    description:
      "Personal portfolio of Sumeet Kanhiya, Systems Architect & Full-Stack Developer specializing in high-throughput distributed systems, Next.js, and real-time architectures.",
    url: "https://sumeetkanhiya.dev",
    siteName: "Sumeet Kanhiya",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Sumeet Kanhiya Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumeet Kanhiya | Systems Architect",
    description:
      "Personal portfolio of Sumeet Kanhiya, Systems Architect & Full-Stack Developer specializing in high-throughput distributed systems, Next.js, and real-time architectures.",
    images: ["/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.tagline,
    email: profile.email,
    url: "https://sumeetkanhiya.dev",
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white selection:bg-white selection:text-black`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ResumeModalProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <CommandPalette />
          </SmoothScroll>
          <ResumeModal />
        </ResumeModalProvider>
      </body>
    </html>
  );
}
