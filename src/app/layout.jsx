"use client";
import { Gabriela, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const gabriela = Gabriela({
  variable: "--font-gabriela",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${gabriela.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          {!pathname.startsWith("/dashboard") && <Navbar />}

          {/* Main Content */}
          <main>{children}</main>
          {/* Footer */}
          {!pathname.startsWith("/dashboard") && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
