import { Children } from "react";

export default function Article(props: {
    title: string;
    sectionClass: string;
    divClass: string;
    imgClass: string;
    imgSrc: string;
    imgAlt: string;
    children: React.ReactNode;
}) {
    return (
        <section className={props.sectionClass}>
  <div className={props.divClass}>
    <h2>{props.title}</h2>
    <p>
      {props.children}
    </p>
  </div>
  <div className={props.imgClass}>
    <img src={props.imgSrc} alt={props.imgAlt} />
  </div>
</section>
    )
}