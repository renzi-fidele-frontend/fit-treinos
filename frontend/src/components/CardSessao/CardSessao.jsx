import { Badge, Card, Col, Image, Row } from "react-bootstrap";
import styles from "./CardSessao.module.css";
import { Link } from "react-router-dom";

const CardSessao = ({ concluido, exercicios, nome, objetivo, id }) => {
   return (
      <Card className="h-100 me-4" as={Link} to={`/exercicio/${id}`}>
         <Row className="g-0">
            {exercicios?.map((v, k) => (
               <Col xs={6} key={k}>
                  <Image src={v?.gifUrl} thumbnail className="" />
               </Col>
            ))}
         </Row>
         <Card.Body className="d-flex flex-wrap gap-3">
            {exercicios[0]?.secondaryMuscles?.map((v, k) => (
               <Badge style={{ height: "fit-content" }} className=" text-capitalize fs-6 bg-secondary" key={k}>
                  {v}
               </Badge>
            ))}
         </Card.Body>
         <Card.Footer>
            <Card.Title className="text-start fw-semibold text-capitalize text-truncate">{nome}</Card.Title>
         </Card.Footer>
      </Card>
   );
};
export default CardSessao;
