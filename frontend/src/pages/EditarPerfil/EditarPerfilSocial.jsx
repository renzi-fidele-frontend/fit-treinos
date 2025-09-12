import { useDispatch, useSelector } from "react-redux";
import styles from "./EditarPerfil.module.css";
import { Button, Col, Container, Form, Image, Row, Spinner, Modal } from "react-bootstrap";
import { useRef, useState } from "react";
import fotoModelo from "../../assets/modeloEditarPerfil.webp";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { setToken, setUser } from "../../state/auth/authSlice";
import { useTranslation } from "react-i18next";
import Notificacao from "../../components/Notificacao/Notificacao";

const EditarPerfilSocial = () => {
   const { t } = useTranslation();
   const { tit, placeNome, save, cancel, sensivel, deleteBtn, aviso, modal } = t("editarPerfil");
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const nomeRef = useRef();
   const { apanharNoBackendComAuth, loading: loadingSave } = useFetch(null, null, null, "manual");
   const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
   // Possíveis erros
   const [mensagemAviso, setMensagemAviso] = useState(null);
   const [mostrarNotificacao, setMostrarNotificacao] = useState(false);

   function editarPerfil(e) {
      e.preventDefault();

      const atualizar = apanharNoBackendComAuth("auth/editarPerfil", "PATCH", {
         headers: { "Content-Type": "multipart/form-data" },
         data: { nome: nomeRef.current.value },
      }).then((res) => {
         setMostrarNotificacao(true);
         setMensagemAviso(res.message);
         dispatch(setUser(res.usuario));
         if (res.token) dispatch(setToken(res.token));
      });
   }

   function deletarConta() {
      const deletar = apanharNoBackendComAuth("auth/deletarPerfil", "DELETE").then((v) => {
         dispatch(setUser(null));
         dispatch(setToken(null));
      });
   }

   return (
      <Container>
         <Row className="g-3 g-sm-4 g-lg-5 flex-column-reverse flex-lg-row">
            <Col className="pe-5" lg={6}>
               <h1 className="fw-bold mb-3 mb-xl-3" id={styles.tit2}>
                  {tit}
               </h1>
               <div>
                  {/* Foto de perfil */}
                  <div id={styles.ctFoto} className="mb-2 rounded border p-2">
                     <Image src={user.foto} className="rounded-circle" />
                  </div>
                  <Form className="mb-4 mt-3" onSubmit={editarPerfil}>
                     {/* Rede social */}
                     <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Rede social utilizada para cadastro</Form.Label>
                        <div className="d-flex gap-2 align-items-center">
                           <div className="rounded border text-primary border-primary px-2 py-1  ">
                              <i className="bi bi-facebook "></i> Facebook
                           </div>
                           <p className="mb-0">
                              Cadastrado em{" "}
                              <span className="fst-italic text-decoration-underline fw-medium">
                                 {new Date(user?.criadoEm).toLocaleDateString()}
                              </span>
                           </p>
                        </div>
                     </Form.Group>
                     <hr />
                     {/* Credenciais do usuário */}
                     <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Suas credencias de usuário</Form.Label>
                        <Form.Control required ref={nomeRef} type="text" placeholder={placeNome} className="mb-2" defaultValue={user.nome} />
                     </Form.Group>
                     {/* Ações */}
                     <div className="d-flex gap-3">
                        <Button type="submit">
                           {loadingSave ? <Spinner size="sm" className="me-1" /> : <i className="bi bi-floppy me-1"></i>} {save}
                        </Button>
                        <Button variant="secondary" as={Link} to="/">
                           <i className="bi bi-x-lg me-1"></i> {cancel}
                        </Button>
                     </div>
                  </Form>
               </div>
               <hr />
               {/* Deletar conta */}
               <div>
                  <h6 className="fw-semibold">{sensivel}</h6>
                  <Button variant="danger" size="sm" onClick={() => setShowModalConfirmacao(true)}>
                     <i className="bi bi-trash me-1"></i> {deleteBtn}
                  </Button>
                  <p className="mb-0 mt-2">{aviso}</p>
                  {/* Modal de confirmação */}
                  <Modal show={showModalConfirmacao} centered onHide={() => setShowModalConfirmacao(false)}>
                     <Modal.Header closeButton>
                        <Modal.Title>
                           <i className="bi bi-trash"></i> {modal.tit}
                        </Modal.Title>
                     </Modal.Header>
                     <Modal.Body>{modal.descricao}</Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalConfirmacao(false)}>
                           {cancel}
                        </Button>
                        <Button variant="danger" onClick={deletarConta}>
                           {deleteBtn}
                        </Button>
                     </Modal.Footer>
                  </Modal>
               </div>
            </Col>
            <Col className="pt-3 pt-sm-5 shadow-sm text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={fotoModelo} />
            </Col>
         </Row>
         {/* Mensagem de noficação de succeso de edição */}
         <Notificacao
            variant="success"
            mensagem={mensagemAviso}
            mostrar={mostrarNotificacao}
            onClose={() => setMostrarNotificacao(false)}
         />
      </Container>
   );
};
export default EditarPerfilSocial;
