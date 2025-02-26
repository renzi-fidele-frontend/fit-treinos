import { Button, Image, Toast, ToastContainer } from "react-bootstrap";
import gif from "../../assets/illustration.jpg";

const ToastTreinamento = ({ mostrar, onClose }) => {
   return (
      <ToastContainer position="bottom-end" className="position-fixed">
         <Toast show={mostrar} onClose={onClose} className="me-4 mb-4">
            <Toast.Header className="d-flex justify-content-between">
               <strong>
                  <i className="bi bi-alarm me-2"></i>Controle do treinamento
               </strong>
            </Toast.Header>
            <Toast.Body>
               <Image src={gif} />
               <p className="mt-2 mb-0">Siga as instruções de como praticar o exercício ou assista os vídeos de treinamento.</p>
               <hr className="my-2" />
               <div className="d-flex justify-content-between align-items-center">
                  <strong className="fw-medium">
                     Tempo de treino: <span className="ms-1 mb-0 p-1 rounded text-bg-secondary">00:00</span>
                  </strong>
                  <Button size="sm" variant="dark">
                     <i className="bi bi-play"></i> Iniciar
                  </Button>
               </div>
            </Toast.Body>
         </Toast>
      </ToastContainer>
   );
};
export default ToastTreinamento;
