import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import styles from "./Cadastro.module.css";
import ftBanner from "../../assets/register.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import profilepic from "../../assets/profile.jpg";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import Notificacao from "../../components/Notificacao/Notificacao";
import { facebookAuth, googleAuth } from "../../services/SocialAuth";
import { useTranslation } from "react-i18next";
import { renderizarPrevia } from "../../utils/renderizarPrevia";

const Cadastro = () => {
   const { t } = useTranslation();
   const { tit, tit2, foto, subtit, subtit2, social, email, form, voltar } = t("cadastro");
   const { form: form2 } = t("login");
   const navegar = useNavigate();
   const location = useLocation();
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

   async function handleSubmit1(e) {
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
      console.log(data);
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

   const Step1 = () => (
      <>
         <h1 className="fw-bold">{tit}</h1>
         <p className="fs-5">
            {subtit}
            <br className="d-sm-none" /> <Link to="/entrar">{subtit2}</Link>
         </p>
         <div className="mt-1">
            <h6 className="fw-semibold">{social}</h6>
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
            <h6 className="fw-semibold">{email}</h6>
            <Form onSubmit={handleSubmit1} className="mt-3">
               <div className="d-flex gap-3">
                  <Form.Control required ref={nomeRef} type="text" placeholder={form.nome} defaultValue={estadoForm?.nome?.split(" ")[0]} />
                  <Form.Control
                     required
                     ref={sobrenomeRef}
                     type="text"
                     placeholder={form.sobre}
                     defaultValue={estadoForm?.nome?.split(" ")[1]}
                  />
               </div>
               <Form.Control required ref={emailRef} className="my-3" type="email" placeholder={form.email} defaultValue={estadoForm?.email} />
               <Form.Control required ref={passwordRef} type="password" placeholder={form.pass} defaultValue={estadoForm?.password} />
               <Button variant="secondary" className="mt-4" type="submit">
                  {form.btn}
               </Button>
            </Form>
         </div>
      </>
   );

   const Step2 = () => (
      <>
         <div className="mb-3">
            <Button variant="outline-primary" size="sm" onClick={() => setStep(1)}>
               <i className="bi bi-arrow-left me-1"></i> {voltar}
            </Button>
         </div>
         <h1 className="fw-bold mb-3 mb-xl-4" id={styles.tit2}>
            {tit2}
         </h1>
         {/* Prévia */}
         <div id={styles.ctFoto} className="mb-2 rounded border">
            <Image ref={fotoPreviaRef} src={profilepic} className="rounded-circle" />
         </div>
         <Form className="mb-3" onSubmit={handleSubmit2}>
            <Form.Group className="mb-4">
               <Form.Label>
                  <i className="bi bi-arrow-down me-2"></i>
                  {foto}
               </Form.Label>
               <Form.Control
                  id="foto"
                  ref={inputFotoPerfilRef}
                  onChange={() => renderizarPrevia(fotoPreviaRef, inputFotoPerfilRef)}
                  accept="image/*"
                  required
                  className="shadow-sm"
                  type="file"
               />
            </Form.Group>
            <Button variant="secondary" type="submit">
               {form.btn2}
            </Button>
         </Form>

         <ProgressBar variant="success" animated striped now={80} label={`${80}%`} />
      </>
   );

   // Caso haja erro ao se fazer autenticação
   useEffect(() => {
      if (location.search.split("=")[0].includes("error")) {
         setMostrarErro(true);
         setErro(decodeURIComponent(location.search.split("=")[1]));
      }
   }, [location.search]);

   return (
      <Container className="pb-5 pb-lg-0">
         <Row className="gap-3 gap-sm-4 gap-lg-5 flex-column-reverse flex-lg-row">
            <Col lg={6} className="justify-content-center d-flex flex-column pe-lg-5">
               {!loading ? step === 1 ? <Step1 /> : <Step2 /> : <p>Carregando...</p>}
               <div>
                  <p className="mt-4 mb-0 small">
                     {form2.privacy} <Link to="/privacy">{form2.privacy2}</Link>.
                  </p>
               </div>
            </Col>
            <Col className="pt-3 pt-sm-5 shadow-sm text-center rounded-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>
         <Notificacao variant="warning" mostrar={mostrarErro} onClose={() => setMostrarErro(false)} mensagem={erro} />
      </Container>
   );
};
export default Cadastro;
