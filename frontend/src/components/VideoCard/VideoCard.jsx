import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Placeholder from "react-bootstrap/Placeholder";
import styles from "./VideoCard.module.css";
import { useState } from "react";
import YouTube from "react-youtube";

const VideoCard = ({ thumbnail, titulo, canal, videoId, visualizacoes, descricao }) => {
   const [show, setShow] = useState(false);
   return thumbnail ? (
      <>
         <Card title={titulo} role="button" className="position-relative m-2 h-100" onClick={() => setShow(true)}>
            <Card.Img src={thumbnail} />
            <Card.Header>
               <Card.Subtitle className="text-truncate w-75 fw-semibold">
                  <i className="bi bi-person-fill-check"></i> {canal}
               </Card.Subtitle>
            </Card.Header>
            <Card.Body className="text-start">
               <Card.Title className="text-truncate">{titulo}</Card.Title>
            </Card.Body>
            <Card.Footer>
               <Card.Text className="fs-6 text-end">
                  <i className="bi bi-eye-fill"></i> {visualizacoes}
               </Card.Text>
            </Card.Footer>
         </Card>
         {/* Modal do video do youtube */}
         <Modal centered show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
               <YouTube opts={{ width: "100%", height: 600 }} videoId={videoId} />
            </Modal.Body>
            <Modal.Footer>{descricao}</Modal.Footer>
         </Modal>
      </>
   ) : (
      <Card className="position-relative m-2 h-100">
         <Placeholder animation="wave">
            <Placeholder className={styles.imgLoad} />
         </Placeholder>
         <Card.Header>
            <Card.Subtitle className="text-truncate w-75 fw-semibold">
               <i className="bi bi-person-fill-check"></i> <Placeholder xs={8} />
            </Card.Subtitle>
         </Card.Header>
         <Card.Body className="text-start">
            <Card.Title className="text-truncate">
               <Placeholder xs={8} s />
            </Card.Title>
         </Card.Body>
         <Card.Footer>
            <Card.Text className="fs-6 text-end">
               <i className="bi bi-eye-fill"></i> <Placeholder xs={5} />
            </Card.Text>
         </Card.Footer>
      </Card>
   );
};
export default VideoCard;
