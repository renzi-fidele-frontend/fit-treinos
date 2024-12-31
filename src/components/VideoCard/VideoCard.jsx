import { Card } from "react-bootstrap";
import styles from "./VideoCard.module.css";
import { useNavigate } from "react-router-dom";

{/* TODO: Criar o modal com o vídeo */}
const VideoCard = ({ thumbnail, titulo, canal, url, visualizacoes }) => {
   const navegar = useNavigate();
   return (
      <Card title={titulo} role="button" className="position-relative m-2 h-100" onClick={() => navegar(url)}>
         <Card.Img src={thumbnail} />
         <Card.Header>
            <Card.Subtitle className="text-truncate w-75 fw-semibold">
               <i className="bi bi-person-fill-check"></i> {canal}
            </Card.Subtitle>
         </Card.Header>
         <Card.Body className="text-start">
            <Card.Title className="text-truncate" >{titulo}</Card.Title>
         </Card.Body>
         <Card.Footer>
            <Card.Text className="fs-6 text-end">
               <i className="bi bi-eye-fill"></i> {visualizacoes}
            </Card.Text>
         </Card.Footer>
      </Card>
   );
};
export default VideoCard;
