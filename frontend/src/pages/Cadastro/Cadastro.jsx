import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Cadastro.module.css";
import ftBanner from "../../assets/modelo.png";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import profilepic from "../../assets/profile.jpg";
import useFetch from "../../hooks/useFetch";

const Cadastro = () => {
   const navegar = useNavigate();
   const [step, setStep] = useState(1);
   // Refs do formulario
   const nomeRef = useRef();
   const sobrenomeRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const inputFotoPerfilRef = useRef();
   const [estadoForm, setEstadoForm] = useState();

   const fotoPreviaRef = useRef();

   const { apanharNoBackend } = useFetch(null, null, null, "manual");

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

   async function handleSubmit2(e) {
      e.preventDefault();
      const data = { ...estadoForm, foto: inputFotoPerfilRef.current.files[0] };
      const cadastrar = apanharNoBackend("auth/cadastro", "POST", {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         data,
      }).then((res) => console.log(res));

      navegar("/");
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
               <Button size="sm" variant="outline-secondary">
                  <i className="bi bi-google"></i> Google
               </Button>
               <Button size="sm" variant="outline-secondary">
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
               <Button className="mt-4" type="submit">
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

         <Form onSubmit={handleSubmit2}>
            <Form.Group className="mb-4">
               <Form.Label>
                  <i className="bi bi-arrow-down me-2"></i>Clique abaixo para selecionar a foto:
               </Form.Label>
               <Form.Control
                  id="foto"
                  ref={inputFotoPerfilRef}
                  onChange={() => {
                     renderizarPrevia();
                  }}
                  accept="image/*"
                  required
                  className="shadow-sm"
                  type="file"
               />
            </Form.Group>
            <Button type="submit">Concluir cadastro</Button>
         </Form>
      </>
   );

   return (
      <Container>
         <Row className="gap-5">
            <Col sm={6} className="justify-content-center d-flex flex-column pe-5">
               {step === 1 ? <Step1 /> : <Step2 />}
            </Col>
            <Col className="pt-5 shadow-sm text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
      </Container>
   );
};
export default Cadastro;
