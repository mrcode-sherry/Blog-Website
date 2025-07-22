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
  title: "Kintechy",
  description: "A blog covering tech, lifestyle, design, and more.",
  icons: {
    icon: "/favicon.ico", // ✅ This is the only line added
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
