import './index.css'

export default function Article(props) {
    return (
        <section class={props.sectionClass}>
  <div class={props.divClass}>
    <h2>{props.title}</h2>
    <p>
      {props.text}
    </p>
  </div>
  <div class={props.imgClass}>
    <img src={props.imgSrc} alt={props.imgAlt} />
  </div>
</section>
    )
}