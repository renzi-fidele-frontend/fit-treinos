import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"

const Notificacao = ({ mensagem, mostrar, onClose, variant }) => {
   return (
      <ToastContainer className="mb-md-5 me-md-5 position-fixed" position="bottom-end">
         <Toast onClose={onClose} show={mostrar} bg={variant}>
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
