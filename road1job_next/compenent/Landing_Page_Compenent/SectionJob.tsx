import CardJob from "../Card_Job_Compenent/CardJob";

export default function SectionJob() {
  return (
    <div>
      <section className="offers" id="offers">
        <h2>Découvrez les nombreuses offres disponibles ici !</h2>

        <div className="offers-grid">
          <CardJob />
        </div>

        <a href="#" className="see-more">
          Voir plus
        </a>
      </section>
    </div>
  );
}
