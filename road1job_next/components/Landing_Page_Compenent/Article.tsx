
export default function Article(props: {
    title: string;
    text: string;
    sectionClass: string;
    divClass: string;
    imgClass: string;
    imgSrc: string;
    imgAlt: string;
}) {
    return (
        <section className={props.sectionClass}>
  <div className={props.divClass}>
    <h2>{props.title}</h2>
    <p>
      {props.text}
    </p>
  </div>
  <div className={props.imgClass}>
    <img src={props.imgSrc} alt={props.imgAlt} />
  </div>
</section>
    )
}