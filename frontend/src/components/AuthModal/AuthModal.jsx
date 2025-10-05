import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMostrarModalAuth } from "../../state/auth/authSlice";
import { useTranslation } from "react-i18next";

const AuthModal = () => {
   const { mostrarModalAuth } = useSelector((state) => state.auth);
   const { t } = useTranslation();
   const { tit, subtit, destaques, actions } = t("authModal");
   const navegar = useNavigate();
   const dispatch = useDispatch();

   return (
      <Modal centered show={mostrarModalAuth} onHide={() => dispatch(setMostrarModalAuth(false))}>
         <Modal.Header closeButton>
            <h5 className="mb-0">{tit}</h5>
         </Modal.Header>
         <Modal.Body>
            <p className="mb-2">{subtit}</p>
            <ul className="small fst-italic mb-1">
               {destaques?.map((v, k) => (
                  <li key={k}>{v}</li>
               ))}
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
                  <i className="bi bi-lock"></i> {actions[0]}
               </Button>
               <Button variant="secondary" onClick={() => dispatch(setMostrarModalAuth(false))}>
                  <i className="bi bi-x"></i> {actions[1]}
               </Button>
            </div>
         </Modal.Footer>
      </Modal>
   );
};
export default AuthModal;
