

export default  function CardJob(props: any) {
    return(<div>
            <div className="offer-card">
      <h3>{props.name}</h3>
      <div className="divider"></div>

      <p className="company">{props.company}</p>
      <p className="location">Paris - Télétravail</p>
      <p className="contract">Contrat : CDI</p>

      <div className="meta">
        <p>Niveau : 1 an</p>
        <p>Salaire : 30k - 50k€</p>
      </div>

      <div className="tags">
        <span>React</span>
        <span>JS</span>
        <span>Python</span>
        <span>Docker</span>
      </div>
    </div>
    </div>)
}