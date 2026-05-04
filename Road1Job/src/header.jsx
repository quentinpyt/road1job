import './index.css'
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function handleSubmit(event) {
    event.preventDefault();
    const query = event.target.elements.search.value;
    console.log('Recherche pour :', query);
}

export default function Header() {
    return (<div>
        <header >
            <NavBar />
        </header>

        <section className="hero">
        <h1>Trouve ton chemin dans le développement</h1>
        
        <div className="search-box">
            <form action="get" onSubmit={handleSubmit}>
                <input type="text" placeholder="Cherchez un thème, un mot-clé, une entreprise..."></input>
                <button type="submit"> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
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
)}