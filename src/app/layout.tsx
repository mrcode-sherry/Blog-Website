import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBar from "@/components/FooterBar";
import { AuthProvider } from '@/context/AuthContext';
import Analytics from "@/components/Analytics";
import Providers from "./providers";
import "./globals.css";

// ✅ Load fonts with custom variables that match your globals.css
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

// ✅ Updated metadata with favicon
export const metadata: Metadata = {
  title: "Kintechy | Explore tech finance crypto health fashion",
  description: "Enhance your knowledge by staying on top of the trends in technology, cryptocurrency, business, finance, healthcare, fashion, and even sports.",
  keywords: [
    "tech news", "AI tools", "latest smartphones", "web development",
    "finance tips", "crypto trends", "business ideas", "startup growth",
    "blockchain news", "bitcoin updates", "NFTs explained", "ethereum guide",
    "sports updates", "fitness routines", "lifestyle hacks", "fashion tips",
    "mental health", "healthy diet", "SEO tricks", "digital marketing",
    "app development", "UI/UX trends", "programming basics", "React.js",
    "Next.js tutorials", "cloud hosting", "mobile apps", "crypto wallets",
    "investment strategies", "online business", "passive income", "freelancing",
    "self improvement", "remote work", "Google algorithm", "YouTube SEO",
    "design inspiration", "coding tips", "finance news", "ecommerce trends",
    "sports tech", "life coaching", "travel guides", "nutrition plans",
    "tech gadgets", "startup tips", "market analysis", "fashion 2025",
    "blockchain dev", "javascript"
  ],
  alternates: {
    canonical: "https://www.kintechy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        <Analytics />
        <Providers>
          <AuthProvider>
            <section>
              <Navbar />
            </section>
            <main>{children}</main>
            <section>
              <Footer />
            </section>
            <section>
              <FooterBar />
            </section>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
