import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardExercicio = ({ foto, categoria, titulo, id }) => {
   return (
      <Card className="h-100" as={Link} to={`/exercicio/${id}`}>
         <Card.Img src={foto} />
         <Card.Body className="d-flex flex-wrap gap-3">
            {categoria?.map((v, k) => (
               <Badge style={{ height: "fit-content" }} className=" text-capitalize bg-secondary" key={k}>
                  {v}
               </Badge>
            ))}
         </Card.Body>
         <Card.Footer>
            <Card.Title className="text-start fw-semibold text-capitalize">{titulo}</Card.Title>
         </Card.Footer>
      </Card>
   );
};
export default CardExercicio;
