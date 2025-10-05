
"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function AppProviders({ children }) {
   const pathname = usePathname();
   const showLayout = !pathname.startsWith("/dashboard"); 
   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
      >
         {/* Navbar */}
         {showLayout && <Navbar />}

         {/* Automatic Scroll To Top When Page Changes */}
         <ScrollToTop />

         {/* Main Content */}
         <main className="min-h-screen">{children}</main>

         {/* Footer */}
         {showLayout && <Footer />}
      </ThemeProvider>
   );
}

