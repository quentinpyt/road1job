import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <section className="hero">
        <h1>Trouve ton chemin dans le développement</h1>

        <div className="search-box">
          <form action="get" className="flex">
            <input
              type="text"
              placeholder="Cherchez un thème, un mot-clé, une entreprise..."
              className="text-black"
            ></input>
            <button type="submit" >
              {" "}
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-9 text-center"
              />{" "}
            </button>
          </form>
        </div>
        <div className="bubbles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </div>
  );
}
