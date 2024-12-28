import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { Col, Container, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import styles from "./DetalhesExercicio.module.css";

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
         <Row>
            <Col lg={4} className="ps-4 pt-4 me-3 align-items-stretch" id={styles.left}>
               <Image className="" src={exercicio?.gifUrl} alt={exercicio?.name} fluid />
            </Col>
            <Col>
               <h1 className="fw-bold mb-4">Como praticar o: {exercicio?.name}</h1>
               <ListGroup>
                  {exercicio?.instructions?.map((v, key) => (
                     // TODO: Renderizar as imagens da parte do corpo na lista
                     <ListGroupItem key={key}>{v}</ListGroupItem>
                  ))}
               </ListGroup>
               <p> {exercicio?.description}</p>
            </Col>
         </Row>

         {/* TODO: Criar seção de vídeos do youtube explicando o respectivo objectivo */}
         {/* TODO: Renderizar exercícios com o mesmo tipo de equipamento */}
      </Container>
   );
};
export default DetalhesExercicio;
