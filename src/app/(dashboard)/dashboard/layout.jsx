'use client'
import Sidebar from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <section
      className="flex "
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Sidebar/>
          {/* Main Content */}
          <main>{children}</main>
          
        </ThemeProvider>
      </section>
    </div>
  );
}