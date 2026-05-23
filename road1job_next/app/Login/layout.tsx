import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div className="min-h-full flex flex-col">
        <div className="flex flex-col md:flex-row m-bg-white h-screen ">
          <div className="hidden md:flex flex-col items-center justify-center p-6 md:w-1/2 text-3xl text-center gap-6">
            <img src="/logo_1.png" className="logo" alt="logo"></img>
            <h2>Reprends ta recherche là où tu l'as laissée.</h2>
          </div>
          <a href="/" className="back-btn">
            <span className="arrow">←</span>
            Accueil
          </a>
          {children}
        </div>
      </div>

  );
}
