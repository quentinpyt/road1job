
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
    >
      <body className="min-h-full flex flex-col">
        {children}
        </body>
    </html>
  );
}
