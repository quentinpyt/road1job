import Header from "../compenent/Landing_Page_Compenent/header";
import Article from "../compenent/Landing_Page_Compenent/Article";
import SectionJob from "../compenent/Landing_Page_Compenent/SectionJob";
import Footer from "../compenent/Landing_Page_Compenent/Footer";


export default function Home() {
  return (
    <div>
      <Header />
      <Article
        title="C'est quoi Road1Job ?"
        text="Nous proposons une large gamme d'opportunités, maison loupes l'organisation rendant vos recherches !"
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
