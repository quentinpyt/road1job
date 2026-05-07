

export default function ProgresBar(props: {progress: number}) {
    return(
    <div className="progress">
      <p>Votre profil est complet à :</p>
      <div className="circle">{props.progress}%</div>
    </div>

    )
}