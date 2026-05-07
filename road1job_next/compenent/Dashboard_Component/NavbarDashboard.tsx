

export default function NavBarDash(){
    return (
        <aside className="sidebar">
    <div className="profile">
      <img src="media/avatar.png" alt="profil avatar"></img>
      <h3>Salut, John!</h3>
    </div>

    <nav>
      <a>Messages <span>1</span></a>
      <a className="active">Jobs</a>
      <a>Réglages</a>
      <a>Favoris</a>
      <a>Map</a>
    </nav>

    <div className="progress">
      <p>Votre profil est complet à :</p>
      <div className="circle">62%</div>
    </div>
  </aside>
    )
}