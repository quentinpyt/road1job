
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const montserrat = Montserrat({subsets:['latin'],variable:'--font-montserrat'});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr" data-scroll-behavior="smooth">
      <body className={cn("min-h-full flex flex-col font-sans", inter.variable, montserrat.variable)}>
        {children}
        </body>
    </html>
  );
}
