import { Badge, Card } from "react-bootstrap";

const CardExercicio = ({ foto, categoria, titulo }) => {
   return (
      <Card>
         <Card.Img src={foto} />
         <Card.Body className="d-flex gap-3">
            {categoria?.map((v, k) => (
               <Badge className=" text-capitalize bg-secondary" key={k}>
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
