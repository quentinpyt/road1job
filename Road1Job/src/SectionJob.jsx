import './index.css'
import CardJob from './CardJob'

export default function SectionJob() {
    return (<div>
        <section class="offers" id="offers">
  <h2>Découvrez les nombreuses offres disponibles ici !</h2>

  <div class="offers-grid">
    <CardJob />
    </div>

  <a href="#" class="see-more">Voir plus</a>
</section>
    </div>)
}