import { Badge, Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gerarArray } from "../../utils/gerarArray";
import styles from "./CardExercicio.module.css";
import { traduzirTexto } from "../../utils/traduzirTexto";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// TODO: Adicionar um placeholder caso a foto não exista

const CardExercicio = ({ foto, categoria, titulo, id, truncado = false, customClass }) => {
   const [tituloTraduzido, setTituloTraduzido] = useState();
   const { idioma } = useSelector((state) => state.idioma);

   useEffect(() => {
      if (titulo && idioma?.includes("pt")) traduzirTexto(titulo).then((res) => setTituloTraduzido(res));
   }, [titulo, idioma]);

   return (foto, categoria, titulo, id) ? (
      <Card className={"h-100 " + customClass} as={Link} to={`/exercicio/${id}`}>
         <Card.Img src={foto} />
         <Card.Body className="d-flex flex-wrap gap-3">
            {categoria?.map((v, k) => (
               <Badge style={{ height: "fit-content" }} className=" text-capitalize fs-6 bg-secondary" key={k}>
                  {v}
               </Badge>
            ))}
         </Card.Body>
         <Card.Footer>
            <Card.Title className="text-start fw-semibold text-capitalize text-truncate">
               {idioma?.includes("en") ? titulo : tituloTraduzido}
            </Card.Title>
         </Card.Footer>
      </Card>
   ) : (
      <Card className={`h-100 ` + customClass}>
         <Placeholder animation="wave" xs={12}>
            <Placeholder xs={12} className={styles.exImg} />
         </Placeholder>
         <Card.Body>
            <Placeholder animation="wave" className="d-flex flex-wrap gap-3" xs={12}>
               {gerarArray(2)?.map((v, k) => (
                  <Placeholder className="rounded" xs={2} key={k} />
               ))}
            </Placeholder>
         </Card.Body>
         <Card.Footer>
            <Card.Title className="text-start fw-semibold text-capitalize text-truncate">
               <Placeholder animation="wave" xs={12}>
                  <Placeholder xs={11} /> ...
               </Placeholder>
            </Card.Title>
         </Card.Footer>
      </Card>
   );
};
export default CardExercicio;
