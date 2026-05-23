
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr" data-scroll-behavior="smooth">
      <body className={cn("min-h-full flex flex-col font-sans", inter.variable)}>
        {children}
        </body>
    </html>
  );
}
