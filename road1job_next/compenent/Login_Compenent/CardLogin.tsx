
type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardLogin({setLogin}: Childprops) {
    return(      
    <div className="auth-right">
        <div className="form-box">
          <h1>Se connecter</h1>

          <div className="input-group">
            <label>Email</label>
            <input type="email"></input>
          </div>

          <div className="input-group">
            <label>Mots de passe</label>
            <input type="password"></input>
          </div>

          <a className="link" onClick={() => setLogin(false)}>
            Je n'ai pas encore de compte
          </a>

          <div className="actions">
            <button className="google">Se connecter avec Google</button>
            <button className="primary">Se connecter</button>
          </div>
        </div>
      </div>)
}