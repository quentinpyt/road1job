

export default  function CardJob(props: any ,onClick?: () => void) {
    return(<div>
            <div className="card bg-primary shadow-xl p-6 cursor-pointer" onClick={props.onClick}>
      <h3 className="text-lg font-bold">{props.company}</h3>
      <div className="divider"></div>

      <p className="text-lg font-bold">{props.name}</p>
      <p className="location">{props.geolocation?.city || "Non spécifié"} - {props.geolocation?.country=="none" ? "" : props.geolocation?.country}</p>
      <p className="contract">Contrat : {props.type}</p>

      <div className="meta">
        <p>Niveau : {props.level== null ? "Dev Junior" : props.level}</p>
        <p>Salaire : {props.salary?.min || "Non spécifié"} - {props.salary?.max || "Non spécifié"} {props.salary?.currency=="none" ? "" : props.salary?.currency}</p>
      </div>
      <p className="p-2">Skills:</p>
      <div className="flex  md:flex flex-wrap gap-2">
        
        {props.skills?.map((skill: any) => (
          <span key={skill.id} className="badge badge-primary p-2">{skill.name}</span>
        ))}
      </div>
    </div>
    </div>)
}