import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "./ReactQueryProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./globals.css";

const lora = Lora({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: "%s | Mish Pets",
    absolute: "Mish Pets",
  },
  description: "Mish Pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
