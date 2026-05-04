import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    return (<div>
        <header className="navbar">
        <div className="logo">
            <img src="src/assets/logo_1.png" alt="logo"></img>
            <span>Road1Job</span>
        </div>
        <input type="text" placeholder="Cherchez un thème, un mot-clé..." class="nav-search"></input>
        <div className="nav-right">
            <a href="login.html">Se connecter</a>
            <div className="avatar"><FontAwesomeIcon icon={faUser} className='profile'/> </div>
        </div>
        </header>

        <section className="hero">
        <h1>Trouve ton chemin dans le développement</h1>
        
        <div className="search-box">
            <input type="text" placeholder="Cherchez un thème, un mot-clé, une entreprise..."></input>
            <button> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
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