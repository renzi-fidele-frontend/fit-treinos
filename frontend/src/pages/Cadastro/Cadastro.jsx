import { Button, Col, Container, Form, Image, ProgressBar, Row } from "react-bootstrap";
import styles from "./Cadastro.module.css";
import ftBanner from "../../assets/modelo.png";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import profilepic from "../../assets/profile.jpg";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import Notificacao from "../../components/Notificacao/Notificacao";
import { facebookAuth, googleAuth } from "../../services/SocialAuth";

const Cadastro = () => {
   const navegar = useNavigate();
   const dispatch = useDispatch();
   const [step, setStep] = useState(1);
   const [erro, setErro] = useState("");
   const [mostrarErro, setMostrarErro] = useState(false);
   // Refs do formulario
   const nomeRef = useRef();
   const sobrenomeRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const inputFotoPerfilRef = useRef();
   const [estadoForm, setEstadoForm] = useState();

   const fotoPreviaRef = useRef();

   const { apanharNoBackend, loading } = useFetch(null, null, null, "manual");

   function handleSubmit1(e) {
      e.preventDefault();
      const estadoAtual = {
         nome: nomeRef.current.value + " " + sobrenomeRef.current.value,
         email: emailRef.current.value,
         password: passwordRef.current.value,
      };
      setStep(2);
      setEstadoForm(estadoAtual);
   }

   function handleSubmit2(e) {
      e.preventDefault();
      const data = { ...estadoForm, foto: inputFotoPerfilRef.current.files[0] };
      const cadastrar = apanharNoBackend("auth/cadastro", "POST", {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         data,
      }).then((res) => {
         console.log(res);
         if (res.error) {
            setMostrarErro(true);
            setErro(res.error);
            return;
         }
         dispatch(setUser(res.usuario));
         dispatch(setToken(res.token));
         if (res.usuario && res.token) navegar("/");
      });
   }

   function renderizarPrevia() {
      const reader = new FileReader();
      reader.onloadend = () => {
         fotoPreviaRef.current.src = reader.result;
      };
      reader.readAsDataURL(inputFotoPerfilRef.current.files[0]);
   }

   const Step1 = () => (
      <>
         <h1 className="fw-bold">Crie a sua conta</h1>
         <p className="fs-5">
            Já tens uma conta criada? <Link to="/entrar">Faça Login</Link>
         </p>
         <div className="mt-1">
            <h6 className="fw-semibold">Cadastre-se usando uma rede social</h6>
            <div className="d-flex gap-3">
               <Button onClick={() => googleAuth()} size="sm" variant="outline-danger">
                  <i className="bi bi-google"></i> Google
               </Button>
               <Button onClick={() => facebookAuth()} size="sm" variant="outline-primary">
                  <i className="bi bi-facebook"></i> Facebook
               </Button>
            </div>
         </div>
         <hr className="my-3" />
         <div>
            <h6 className="fw-semibold">Ou utilize email e password</h6>
            <Form onSubmit={handleSubmit1} className="mt-3">
               <div className="d-flex gap-3">
                  <Form.Control required ref={nomeRef} type="text" placeholder="Primeiro nome" />
                  <Form.Control required ref={sobrenomeRef} type="text" placeholder="Sobrenome" />
               </div>
               <Form.Control required ref={emailRef} className="my-3" type="email" placeholder="E-mail" />
               <Form.Control required ref={passwordRef} type="password" placeholder="Insira sua senha" />
               <Button variant="secondary" className="mt-4" type="submit">
                  Começar treinamento
               </Button>
            </Form>
         </div>
      </>
   );

   const Step2 = () => (
      <>
         <h1 className="fw-bold mb-5">Quase lá! Agora adicione a sua foto de perfil</h1>
         {/* Prévia */}
         <div id={styles.ctFoto} className="mb-2 rounded border">
            <Image ref={fotoPreviaRef} src={profilepic} className="rounded-circle" />
         </div>
         <Form className="mb-3" onSubmit={handleSubmit2}>
            <Form.Group className="mb-3">
               <Form.Label>
                  <i className="bi bi-arrow-down me-2"></i>Clique abaixo para selecionar a foto:
               </Form.Label>
               <Form.Control
                  id="foto"
                  ref={inputFotoPerfilRef}
                  onChange={renderizarPrevia}
                  accept="image/*"
                  required
                  className="shadow-sm"
                  type="file"
               />
            </Form.Group>
            <Button variant="secondary" type="submit">
               Concluir cadastro
            </Button>
         </Form>

         <ProgressBar variant="success" animated striped now={80} label={`${80}%`} />
      </>
   );

   return (
      <Container>
         <Row className="gap-5">
            <Col sm={6} className="justify-content-center d-flex flex-column pe-5">
               {!loading ? (
                  step === 1 ? (
                     <Step1 />
                  ) : (
                     <Step2 />
                  )
               ) : (
                  <>
                     {/* TODO: Adicionar loading ao se criar a conta */}
                     <p>Carregando...</p>
                  </>
               )}
            </Col>
            <Col className="pt-5 shadow-sm text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
         <Notificacao mostrar={mostrarErro} onClose={() => setMostrarErro(false)} mensagem={erro} />
      </Container>
   );
};
export default Cadastro;
