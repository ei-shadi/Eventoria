"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";


export default function AppProviders({ children }) {
   const pathname = usePathname();

   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
      >
         {/* Navbar */}
         <header className="h-[111px]">
            {!pathname.startsWith("/dashboard") && <Navbar />}
         </header>

         {/* Main Content */}
         <main className="min-h-screen">{children}</main>

         {/* Footer */}
         {!pathname.startsWith("/dashboard") && <Footer />}
      </ThemeProvider>
   );
}