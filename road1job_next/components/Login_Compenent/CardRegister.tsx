
"use client";

type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CardRegister({setLogin}: Childprops) {
    return (
              <div className="auth-right">
        <div className="form-box">
          <h1 className="text-xl font-bold">S'inscrire</h1>

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

          <button type="button" className="link" onClick={() => setLogin(true)}>
            J'ai déjà un compte
          </button>

          <div className="actions">
            <button type="button" className="google text-sm">
              S'inscrire avec Google
            </button>
            <button type="button" className="primary text-sm">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    );
    
}