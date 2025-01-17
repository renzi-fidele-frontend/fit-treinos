import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Cadastro.module.css";
import ftBanner from "../../assets/modelo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import profilepic from "../../assets/profile.jpg";

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
         <Form className="mt-3">
            <div className="d-flex gap-3">
               <Form.Control type="text" placeholder="Primeiro nome" />
               <Form.Control type="text" placeholder="Sobrenome" />
            </div>
            <Form.Control className="my-3" type="email" placeholder="E-mail" />
            <Form.Control type="password" placeholder="Insira sua senha" />
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
         <Image src={profilepic} className="rounded-circle" />
      </div>

      <Form>
         <Form.Group className="mb-4">
            <Form.Label>
               <i className="bi bi-arrow-down me-2"></i>Clique abaixo para selecionar a foto:
            </Form.Label>
            <Form.Control required className="shadow-sm" type="file" />
         </Form.Group>
         <Button type="submit">Concluir cadastro</Button>
      </Form>
   </>
);

const Cadastro = () => {
   const [step, setStep] = useState(2);
   return (
      <Container>
         <Row className="gap-5">
            <Col sm={6} className="justify-content-center d-flex flex-column pe-5">
               {step === 1 ? <Step1 /> : <Step2 />}
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
      </Container>
   );
};
export default Cadastro;
