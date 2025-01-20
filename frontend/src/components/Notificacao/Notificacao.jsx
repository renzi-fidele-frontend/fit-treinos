import { Toast, ToastContainer } from "react-bootstrap";

const Notificacao = ({ mensagem, mostrar, onClose }) => {
   return (
      <ToastContainer className="mb-md-5 me-md-5" position="bottom-end">
         <Toast onClose={onClose} show={mostrar} bg="warning">
            <Toast.Header>
               <strong>Notificação</strong>
               <small className="text-muted ms-auto">Agora mesmo</small>
            </Toast.Header>
            <Toast.Body>{mensagem}</Toast.Body>
         </Toast>
      </ToastContainer>
   );
};
export default Notificacao;
