

export default  function CardJob(props: any) {
    return(<div>
            <div className="offer-card">
      <h3>{props.name}</h3>
      <div className="divider"></div>

      <p className="company">{props.company}</p>
      <p className="location">{props.geolocation?.city || "Non spécifié"} - {props.geolocation?.country=="none" ? "" : props.geolocation?.country}</p>
      <p className="contract">Contrat : CDI</p>

      <div className="meta">
        <p>Niveau : {props.job?.level== null ? "Dev Junior" : props.job?.level}</p>
        <p>Salaire : {props.salary?.min || "Non spécifié"} - {props.salary?.max || "Non spécifié"} {props.salary?.currency=="none" ? "" : props.salary?.currency}</p>
      </div>
      <p>Skills:</p>
      <div className="tags">
        
        {props.skills?.map((skill: any) => (
          <span key={skill.id} className="tag">{skill.name}</span>
        ))}
      </div>
    </div>
    </div>)
}