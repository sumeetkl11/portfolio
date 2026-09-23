import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumeet Kanhiya | Systems Architect",
  description: "Personal portfolio of Sumeet Kanhiya, Systems Architect & Full-Stack Developer",
  openGraph: {
    title: "Sumeet Kanhiya | Systems Architect",
    description: "Personal portfolio of Sumeet Kanhiya, Systems Architect & Full-Stack Developer",
    url: "https://sumeetkanhiya.dev",
    siteName: "Sumeet Kanhiya",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Sumeet Kanhiya Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumeet Kanhiya | Systems Architect",
    description: "Personal portfolio of Sumeet Kanhiya, Systems Architect & Full-Stack Developer",
    images: ["/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased bg-black text-white selection:bg-white/30 cursor-none`}>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
