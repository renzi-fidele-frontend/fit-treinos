import { Card } from "react-bootstrap";
import styles from "./VideoCard.module.css";

const VideoCard = ({ thumbnail, titulo, canal, url, visualizacoes }) => {
   return (
      <a href="" target="_blank">
         <Card className="position-relative h-100">
            <Card.Img src={thumbnail} />
            <Card.Header>
               <Card.Subtitle className="text-truncate w-75 fw-semibold">
                  <i className="bi bi-person-fill-check"></i> {canal}
               </Card.Subtitle>
            </Card.Header>
            <Card.Body className="text-start">
               <Card.Title>{titulo}</Card.Title>
            </Card.Body>
            <Card.Footer>
               <Card.Text className="fs-6 text-end">
                  <i className="bi bi-eye-fill"></i> {visualizacoes}
               </Card.Text>
            </Card.Footer>
         </Card>
      </a>
   );
};
export default VideoCard;
