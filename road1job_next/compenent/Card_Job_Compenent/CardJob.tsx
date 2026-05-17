

export default  function CardJob(props: any) {
    return(<div>
            <div className="offer-card">
      <h3>{props.company}</h3>
      <div className="divider"></div>

      <p className="company">{props.name}</p>
      <p className="location">{props.geolocation?.city || "Non spécifié"} - {props.geolocation?.country=="none" ? "" : props.geolocation?.country}</p>
      <p className="contract">Contrat : {props.type}</p>

      <div className="meta">
        <p>Niveau : {props.level== null ? "Dev Junior" : props.level}</p>
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