import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google"; // ✅ Import these instead
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBar from "@/components/FooterBar";
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";

// ✅ Inter for body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ✅ Lora for headings
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "My Blog Site",
  description: "A blog covering tech, lifestyle, design, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        <AuthProvider>
        <section>
          <Navbar />
        </section>
        <main>
          {children}
        </main>
        <section>
          <Footer/>
        </section>
        <section>
          <FooterBar/>
        </section>
        </AuthProvider>
      </body>
    </html>
  );
}
