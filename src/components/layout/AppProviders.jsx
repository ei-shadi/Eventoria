// src/components/layout/AppProviders.jsx (Client Component)

"use client"; // 👈 এটি অবশ্যই দিতে হবে

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
     {!pathname.startsWith("/dashboard") && <Navbar />}

     {/* Main Content: children Prop-টি অবশ্যই রাখতে হবে */}
     <main className="font-gabriela">{children}</main>
     
     {/* Footer */}
     {!pathname.startsWith("/dashboard") && <Footer />}
  </ThemeProvider>
  );
}