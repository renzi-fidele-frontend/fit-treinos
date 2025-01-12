import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Cadastro.module.css";
import ftBanner from "../../assets/modelo.png";
import { Link } from "react-router-dom";

const Cadastro = () => {
   return (
      <Container>
         <Row className="gap-5">
            <Col sm={6} className="justify-content-center d-flex flex-column pe-5">
               <h1 className="fw-bold">Crie a sua conta</h1>
               <p className="fs-5">
                  Já tens uma conta criada? <Link to="entrar">Faça Login</Link>
               </p>
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
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
      </Container>
   );
};
export default Cadastro;
