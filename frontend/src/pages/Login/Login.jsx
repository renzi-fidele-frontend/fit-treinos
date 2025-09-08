import { Button, Col, Container, Form, Image, Row, Spinner } from "react-bootstrap";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import ftBanner from "../../assets/login.webp";
import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import Notificacao from "../../components/Notificacao/Notificacao";
import { facebookAuth, googleAuth } from "../../services/SocialAuth";
import { useTranslation } from "react-i18next";

const Login = () => {
   const { t } = useTranslation();
   const { tit, subtit, subtit2, social, pass, form } = t("login");
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
         <Row className="gap-3 gap-lg-5 flex-column-reverse flex-lg-row pb-5 pb-lg-0">
            <Col lg={6} className="justify-content-center d-flex flex-column pe-5">
               <h1 id={styles.tit2} className="fw-bold">
                  {tit}
               </h1>
               <p id={styles.subtit} className="fs-5">
                  {subtit} <Link to="/cadastro">{subtit2}</Link>
               </p>
               <div className="mt-1">
                  <h6 className="fw-semibold">{social}</h6>
                  <div className="d-flex gap-3">
                     <Button onClick={googleAuth} size="sm" variant="outline-danger">
                        <i className="bi bi-google"></i> Google
                     </Button>
                     <Button onClick={facebookAuth} size="sm" variant="outline-primary">
                        <i className="bi bi-facebook"></i> Facebook
                     </Button>
                  </div>
               </div>
               <hr className="my-3" />
               <div>
                  <h6 className="fw-semibold">{pass}</h6>
                  <Form onSubmit={fazerLogin} className="mt-3">
                     <Form.Control ref={emailRef} className="my-3" type="email" placeholder={form.email} />
                     <Form.Control ref={passwordRef} type="password" placeholder={form.pass} />
                     {!loading ? (
                        <Button variant="secondary" className="mt-4" type="submit">
                           {form.btn}
                        </Button>
                     ) : (
                        <Button variant="secondary" className="mt-4" type="submit">
                           <Spinner />
                        </Button>
                     )}
                  </Form>
               </div>
               <div>
                  <p className="mt-4 mb-0 small">
                     {form.privacy} <Link to="/privacy">{form.privacy2}</Link>.
                  </p>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-3 pt-sm-5 text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
         <Notificacao variant="warning" mensagem={erro} mostrar={mostrarErro} onClose={() => setMostrarErro(false)} />
      </Container>
   );
};
export default Login;
