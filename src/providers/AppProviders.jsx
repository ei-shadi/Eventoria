
"use client"; 

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/layout/ScrollToTop";
// TanStack Query import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// QueryClient তৈরি
const queryClient = new QueryClient();

export default function AppProviders({ children }) {
   const pathname = usePathname();
   const showLayout = !pathname.startsWith("/dashboard"); // Navbar & Footer visibility

   return (
       <QueryClientProvider client={queryClient}>
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
      >
         {/* Navbar */}
         {showLayout && (
            <header className="h-[104px]">
               <Navbar />
            </header>
         )}

         {/* Automatic Scroll To Top When Page Changes */}
         <ScrollToTop />
         
         {/* Main Content */}
         <main className="min-h-screen">{children}</main>

         {/* Footer */}
         {showLayout && <Footer />}
      </ThemeProvider>
      </QueryClientProvider>
   );
}

