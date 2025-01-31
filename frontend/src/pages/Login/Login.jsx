import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import ftBanner from "../../assets/modelo.png";
import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import Notificacao from "../../components/Notificacao/Notificacao";

const Login = () => {
   const navegar = useNavigate();
   const dispatch = useDispatch();
   const emailRef = useRef();
   const passwordRef = useRef();
   const [erro, setErro] = useState("");
   const [mostrarErro, setMostrarErro] = useState(false);
   const { apanharNoBackend, loading } = useFetch(null, null, null, "manual");

   function fazerLogin(e) {
      e.preventDefault();
      const res = apanharNoBackend("auth/login", "POST", {
         data: { email: emailRef.current.value, password: passwordRef.current.value },
      }).then((v) => {
         if (v.error) {
            setMostrarErro(true);
            setErro(v.error);
            return;
         }
         dispatch(setUser(v.usuario));
         dispatch(setToken(v.token));
         if (v.usuario && v.token) navegar("/");
      });
   }
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
                     <Button size="sm" variant="outline-danger">
                        <i className="bi bi-google"></i> Google
                     </Button>
                     <Button size="sm" variant="outline-primary">
                        <i className="bi bi-facebook"></i> Facebook
                     </Button>
                  </div>
               </div>
               <hr className="my-3" />
               <div>
                  <h6 className="fw-semibold">Ou utilize email e password</h6>
                  <Form onSubmit={fazerLogin} className="mt-3">
                     <Form.Control ref={emailRef} className="my-3" type="email" placeholder="Insira seu email" />
                     <Form.Control ref={passwordRef} type="password" placeholder="Insira a palavra-chave" />
                     <Button variant="secondary" className="mt-4" type="submit">
                        Continuar treinamento
                     </Button>
                  </Form>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
         <Notificacao mensagem={erro} mostrar={mostrarErro} onClose={() => setMostrarErro(false)} />
      </Container>
   );
};
export default Login;
