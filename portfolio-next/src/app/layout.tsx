import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ResumeModalProvider } from "@/context/ResumeModalContext";
import ResumeModal from "@/components/ui/ResumeModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0b] text-white selection:bg-white/30 cursor-none`}>
        <LoadingScreen />
        <ResumeModalProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
          <ResumeModal />
        </ResumeModalProvider>
      </body>
    </html>
  );
}
