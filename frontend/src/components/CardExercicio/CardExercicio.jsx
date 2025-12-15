import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { Link } from "react-router-dom";
import { gerarArray } from "../../utils/gerarArray";
import styles from "./CardExercicio.module.css";
import { traduzirTexto } from "../../utils/traduzirTexto";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useAnalisarTraducao from "../../hooks/useAnalisarTraducao";
import PreloadImage from "../ui/PreloadImage";
import loadError from "../../assets/loadError.webp";
import moment from "moment";

const CardExercicio = ({ foto, categoria, titulo, id, customClass, ultimoTreino }) => {
   const [tituloTraduzido, setTituloTraduzido] = useState();
   const { idioma } = useSelector((state) => state.idioma);
   const { investigarParteDoCorpo, investigarMusculoAlvo } = useAnalisarTraducao();

   useEffect(() => {
      if (titulo && idioma?.includes("pt")) traduzirTexto(titulo).then((res) => setTituloTraduzido(res));
   }, [titulo, idioma]);

   return (foto, categoria, titulo, id) ? (
      <Card className={"h-100 position-relative " + customClass} as={Link} to={`/exercicio/${id}`}>
         <PreloadImage src={foto} errorSrc={loadError} preloaderCn={styles.exImg} alt={"Ilustração do exercício " + titulo} />
         <Card.Body className="d-flex flex-wrap gap-3">
            {categoria?.map((v, k) => (
               <Badge style={{ height: "fit-content" }} className=" text-capitalize fs-6 bg-secondary" key={k}>
                  {idioma?.includes("en") ? v : investigarParteDoCorpo(v) || investigarMusculoAlvo(v) || v}
               </Badge>
            ))}
         </Card.Body>
         <Card.Footer>
            <Card.Title className="text-start fw-semibold text-capitalize text-truncate">
               {idioma?.includes("en") ? titulo : tituloTraduzido}
            </Card.Title>
         </Card.Footer>
         {/* Período do treinamento */}
         {ultimoTreino && (
            <div className="position-absolute end-0 top-0 mt-1 me-2 text-black text-capitalize">{moment(ultimoTreino).fromNow()}</div>
         )}
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
