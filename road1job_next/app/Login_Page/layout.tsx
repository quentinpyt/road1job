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
        <div className="auth-container">
        
          <div className="auth-left">
            <img src="/logo_1.png" className="logo" alt="logo"></img>
            <h2>Reprends ta recherche là où tu l'as laissée.</h2>
          </div>
        
         {children}
        
        </div>
        </body>
    </html>
  );
}