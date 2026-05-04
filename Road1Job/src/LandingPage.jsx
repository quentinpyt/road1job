import { useState } from 'react'
import Header from './header.jsx' 
import Article from './Article.jsx' 
import SectionJob from './SectionJob.jsx'
import Footer from './Footer.jsx'
import './App.css'
import './index.css'

function LandingPage() {
   return (
     <div>
       <Header />
       <Article 
         title="C'est quoi Road1Job ?"
         text="Nous proposons une large gamme d'opportunités, maison loupes l'organisation rendant vos recherches !"
         sectionClass="articleRight"
         divClass="about-text"
         imgClass="about-img"
          imgSrc="src/assets/about.png"
          imgAlt="About Road1Job"
       />
       <Article
       title = "Un Dashboard évolutif et personnalisé"
       text = "Suivez votre dashboard dans votre endroit personnel et regardez avec quel entreprise vous matchez le mieux !"
       sectionClass = "articleLeft"
       divClass = "dashboard-text"
       imgClass = "dashboard-img"
        imgSrc = "src/assets/dashboard.png"
        imgAlt = "Dashboard preview"
       />
       <SectionJob />
       <Footer />
     </div>
   )
}

export default LandingPage
