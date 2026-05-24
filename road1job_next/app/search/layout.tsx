import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/Landing_Page_Compenent/NavBar";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={cn("min-h-screen flex flex-col font-sans", inter.variable)}>
          <NavBar />
        {children}
        </div>

  );
}