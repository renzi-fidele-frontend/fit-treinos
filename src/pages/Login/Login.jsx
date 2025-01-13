import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import ftBanner from "../../assets/modelo.png";

const Login = () => {
   return (
      <Container>
         <Row className="gap-5">
            <Col sm={6} className="justify-content-center d-flex flex-column pe-5">
               <h1 className="fw-bold">Entre na sua conta</h1>
               <p className="fs-5">
                  Você ainda não tem uma conta criada? <Link to="/cadastro">Crie uma conta</Link>
               </p>
               <div className="mt-1">
                  <h6 className="fw-semibold">Entre com uma rede social</h6>
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
                     <Form.Control className="my-3" type="email" placeholder="Insira seu email" />
                     <Form.Control type="password" placeholder="Insira a palavra-chave" />
                     <Button className="mt-4" type="submit">
                        Começar treinamento
                     </Button>
                  </Form>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
      </Container>
   );
};
export default Login;
