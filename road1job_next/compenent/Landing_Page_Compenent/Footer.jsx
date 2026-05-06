export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src="/logo_1.png" alt="logo"></img>
            <p className="site">road1job.com</p>
          </div>

          <div className="footer-center">
            <h4>Navigation</h4>
            <a href="#">Accueil</a>
            <a href="#">Offres</a>
            <a href="#">Dashboard</a>
          </div>

          <div className="footer-right">
            <h4>Infos</h4>
            <p>Projet Epitech</p>
            <p>Plateforme d’agrégation d’offres</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            En partenariat avec <span>WeLoveDevs</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
