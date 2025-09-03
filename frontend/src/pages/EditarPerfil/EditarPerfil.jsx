import { useDispatch, useSelector } from "react-redux";
import styles from "./EditarPerfil.module.css";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useRef } from "react";
import profilepic from "../../assets/profile.jpg";
import fotoModelo from "../../assets/modeloEditarPerfil.webp";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { setToken, setUser } from "../../state/auth/authSlice";

// TODO: refactor: Separar a utilidade de renderizar prévia de foto carrega para um input field

const EditarPerfil = () => {
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const inputFotoPerfilRef = useRef();
   const fotoPreviaRef = useRef();
   const nomeRef = useRef();
   const passwordRef = useRef();
   const { apanharNoBackendComAuth, loading } = useFetch(null, null, null, "manual");

   /** Renderiza a prévia no componente de imagem sempre que se carrega uma foto ao input field. */
   function renderizarPrevia() {
      const reader = new FileReader();
      reader.onloadend = () => {
         fotoPreviaRef.current.src = reader.result;
      };
      reader.readAsDataURL(inputFotoPerfilRef.current.files[0]);
   }

   function editarPerfil(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nome", nomeRef.current.value);
      formData.append("password", passwordRef.current.value);

      // No caso de se adicionar uma nova foto de perfil
      const foto = inputFotoPerfilRef.current.files[0];
      if (foto) {
         formData.append("foto", foto);
         formData.append("fotoRemovida", user.foto);
      }

      const atualizar = apanharNoBackendComAuth("auth/editarPerfil", "PATCH", {
         headers: { "Content-Type": "multipart/form-data" },
         data: formData,
      }).then((res) => {
         console.log(res);
         if (res.error) {
            // TODO: Renderizar o erro que ocorre ao tentar se atualizar a foto do perfil do usuário
            return;
         }

         // TODO: Renderizar mensagem no caso de sucesso ao se atualizar a foto de perfil deverei

         dispatch(setUser(res.usuario));
         dispatch(setToken(res.token));
      });
   }

   return (
      <Container>
         <Row className="g-3 g-sm-4 g-lg-5 flex-column-reverse flex-lg-row">
            <Col className="pe-5" lg={6}>
               <h1 className="fw-bold mb-3 mb-xl-3" id={styles.tit2}>
                  Edite o seu perfil
               </h1>
               <div>
                  {/* Prévia da foto de perfil */}
                  <div id={styles.ctFoto} className="mb-2 rounded border p-2">
                     <Image ref={fotoPreviaRef} src={user.foto || profilepic} className="rounded-circle" />
                  </div>
                  <Form className="mb-4" onSubmit={editarPerfil}>
                     {/* Input upload  */}
                     <Form.Group className="mb-4">
                        <Form.Label>
                           <i className="bi bi-arrow-down me-2"></i>
                           Clique abaixo para editar a sua foto de perfil
                        </Form.Label>
                        <Form.Control
                           id="foto"
                           ref={inputFotoPerfilRef}
                           onChange={renderizarPrevia}
                           accept="image/*"
                           className="shadow-sm"
                           type="file"
                        />
                     </Form.Group>
                     {/* Credenciais do usuário */}
                     <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Suas credencias de usuário</Form.Label>
                        <Form.Control required ref={nomeRef} type="text" placeholder="Insira seu novo nome de usuário" className="mb-2" />
                        <Form.Control required ref={passwordRef} type="text" placeholder="Insira sua nova palavra-chave" />
                     </Form.Group>
                     {/* Ações */}
                     <div className="d-flex gap-3">
                        <Button type="submit">
                           <i className="bi bi-floppy me-1"></i> Salvar alterações
                        </Button>
                        <Button variant="secondary" as={Link} to="/">
                           <i className="bi bi-x-lg me-1"></i> Cancelar
                        </Button>
                     </div>
                  </Form>
               </div>
               {/* Deletar conta */}
               {/* TODO: Implementar a funcionalidade de remover a conta do usuário */}
               <div>
                  <h6 className="fw-semibold">Ação sensível</h6>
                  <Button variant="danger" size="sm">
                     <i className="bi bi-trash me-1"></i> Deletar conta
                  </Button>
                  <p className="mb-0 mt-2">* Depois de excluir sua conta, não há como voltar atrás.</p>
               </div>
            </Col>
            <Col className="pt-3 pt-sm-5 shadow-sm text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={fotoModelo} />
            </Col>
         </Row>
      </Container>
   );
};
export default EditarPerfil;
