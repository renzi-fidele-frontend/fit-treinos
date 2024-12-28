import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { Col, Container, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import styles from "./DetalhesExercicio.module.css";
import { fotoDaParteDoCorpo } from "../../utils/fotoParteCorpo";

const DetalhesExercicio = () => {
   const { id } = useParams();

   const [exercicio, setExercicio] = useState(null);

   const apanharDetalhes = useFetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exercisesFetchOptions, exercicio);

   useEffect(() => {
      if (!exercicio) {
         setExercicio(apanharDetalhes.data);
      }
   }, [id, apanharDetalhes.data, exercicio]);

   return (
      <Container className="pt-5">
         {/* Seção inicial */}
         <Row>
            <Col lg={4} className="ps-4 pt-4 me-3 align-items-stretch" id={styles.left}>
               <Image className="" src={exercicio?.gifUrl} alt={exercicio?.name} fluid />
            </Col>
            <Col>
               <h1 className="fw-bold mb-4 pt-3">
                  Como praticar o: <span className="text-capitalize text-secondary">{exercicio?.name}</span>
               </h1>
               <ListGroup>
                  {exercicio?.instructions?.map((v, key) => (
                     // TODO: Renderizar as imagens da parte do corpo na lista
                     <ListGroupItem key={key}>{v}</ListGroupItem>
                  ))}
               </ListGroup>
               <p> {exercicio?.description}</p>
            </Col>
         </Row>

         {/* Seção de baixo */}
         <Row className="mt-5">
            <Col lg={7}>
               <h2 className="fw-bold mb-4">
                  Parte do corpo que irá se desenvolver: <span className="text-secondary text-capitalize">{exercicio?.bodyPart}</span>
               </h2>
               <Image className="border-3 shadow-lg border rounded-2" src={fotoDaParteDoCorpo(exercicio?.bodyPart)} alt={exercicio?.bodyPart} fluid />
            </Col>
            <Col></Col>
         </Row>
         {/* TODO: Criar seção de vídeos do youtube explicando o respectivo objectivo */}
         {/* TODO: Renderizar exercícios com o mesmo tipo de equipamento */}
      </Container>
   );
};
export default DetalhesExercicio;
