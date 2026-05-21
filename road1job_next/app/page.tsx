import Header from "../components/Landing_Page_Compenent/header";
import Article from "../components/Landing_Page_Compenent/Article";
import SectionJob from "../components/Landing_Page_Compenent/SectionJob";
import Footer from "../components/Landing_Page_Compenent/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Article
        title="C'est quoi Road1Job ?"
        text="Simplifiez votre recherche d'emploi grâce à une plateforme pensée pour les développeurs et les étudiants tech."
        sectionClass="articleRight"
        divClass="about-text"
        imgClass="about-img"
        imgSrc="/about.png"
        imgAlt="About Road1Job"
      />
      <Article
        title="Un Dashboard évolutif et personnalisé"
        text="Suivez votre dashboard dans votre endroit personnel et regardez avec quel entreprise vous matchez le mieux !"
        sectionClass="articleLeft"
        divClass="dashboard-text"
        imgClass="dashboard-img"
        imgSrc="/dashboard.png"
        imgAlt="Dashboard preview"
      />
      <SectionJob />
      <Footer />
    </div>
  );
}
