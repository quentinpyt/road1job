
import ClientJobs from "../Card_Job_Compenent/ClientJob";

export default async function SectionJob() {
 
  return (
    <div>
      <section className="offers" id="offers">
        <h2>Découvrez les nombreuses offres disponibles ici !</h2>
        <ClientJobs />

      </section>
    </div>
  );
}
