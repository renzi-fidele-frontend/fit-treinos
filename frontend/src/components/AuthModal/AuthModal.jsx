import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMostrarModalAuth } from "../../state/auth/authSlice";

const AuthModal = () => {
   const { mostrarModalAuth } = useSelector((state) => state.auth);
   const navegar = useNavigate();
   const dispatch = useDispatch();

   return (
      <Modal centered show={mostrarModalAuth} onHide={() => dispatch(setMostrarModalAuth(false))}>
         <Modal.Header closeButton>
            <h5 className="mb-0">Autenticação necessária</h5>
         </Modal.Header>
         <Modal.Body>
            <p className="mb-2">Para continuar com esta ação, é necessário autenticar-se. Ao entrar você poderá:</p>
            <ul className="small fst-italic mb-1">
               <li>Rastreiar o progresso de treinos</li>
               <li>Realizar sessões de treinamento</li>
               <li>Manter seu histórico de treinos</li>
               <li>Competir contra outros usuários</li>
               <li>Guardar os exercícios na lista dos favoritos</li>
            </ul>
         </Modal.Body>
         <Modal.Footer>
            <div className="d-flex gap-2">
               <Button
                  onClick={() => {
                     navegar("/entrar");
                     dispatch(setMostrarModalAuth(false));
                  }}
               >
                  <i className="bi bi-lock"></i> Fazer login
               </Button>
               <Button variant="secondary" onClick={() => dispatch(setMostrarModalAuth(false))}>
                  <i className="bi bi-x"></i> Cancelar
               </Button>
            </div>
         </Modal.Footer>
      </Modal>
   );
};
export default AuthModal;
