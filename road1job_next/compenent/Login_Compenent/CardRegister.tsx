
type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CardRegister({setLogin}: Childprops) {
    return (
              <div className="auth-right">
        <div className="form-box">
          <h1>S'inscrire</h1>

          <div className="row">
            <div className="input-group">
              <label>Nom</label>
              <input type="text"></input>
            </div>

            <div className="input-group">
              <label>Prénom</label>
              <input type="text"></input>
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email"></input>
          </div>

          <div className="input-group">
            <label>Confirmation mots de passe</label>
            <input type="password"></input>
          </div>

          <a className="link" onClick={() => setLogin(true)}>
            J'ai déjà un compte
          </a>

          <div className="actions">
            <button className="google">S'inscrire avec Google</button>
            <button className="primary">S'inscrire</button>
          </div>
        </div>
      </div>
    );
    
}