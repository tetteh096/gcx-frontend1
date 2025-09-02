import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GCX Market Data Platform",
  description: "Professional market data platform for Ghana Commodity Exchange members and traders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <NextAuthProvider>
          <ThemeProvider>
            <AuthProvider>
              <SidebarProvider>
                <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                  <ConditionalNavbar />
                  {children}
                </div>
              </SidebarProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
