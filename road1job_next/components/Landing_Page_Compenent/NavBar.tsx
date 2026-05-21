import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo_1.png" alt="logo"></img>
        <span>Road1Job</span>
      </div>
      <form action="get">
        <input
          type="text"
          placeholder="Cherchez un thème, un mot-clé..."
          className="nav-search text-black text-start"
        ></input>
      </form>
      <div className="nav-right">
        <a href="/Login">Se connecter</a>
        <div className="avatar">
          <FontAwesomeIcon
            icon={faUser}
            className="profile"
            style={{ width: "20px" }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
