import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.jpg";
import MudarTemaBtn from "../ui/MudarTemaBtn";
import DropDownBtn from "../ui/DropDownBtn";
import { useSelector } from "react-redux";

const rotas = [
   { texto: "Início", path: "/" },
   { texto: "Exercícios", path: "/exercicios" },
   { texto: "Cadastrar", path: "/cadastro", user: false },
   { texto: "Entrar", path: "/entrar", user: false },
   { texto: "Progresso do treinamento", path: "/progresso", user: true },
];

const Header = () => {
   const loc = useLocation();
   const { user } = useSelector((state) => state.auth);

   return (
      <Navbar className="border border-bottom">
         <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
               <Navbar.Brand as={Link} to="/" className="fw-medium">
                  <Image id={styles.logo} src={logo} alt="Logo do site" />
               </Navbar.Brand>

               <div className="d-flex align-items-center">
                  <Nav className="gap-3 fs-5" activeKey={loc.pathname}>
                     {rotas.map(
                        (v, k) =>
                           v.user === !!user || v.user === undefined && (
                              <Nav.Link active={loc.pathname === v.path} as={Link} to={v.path} key={k}>
                                 {v.texto}
                              </Nav.Link>
                           )
                     )}
                  </Nav>
                  {user && <DropDownBtn />}

                  <MudarTemaBtn />
               </div>
            </div>
         </Container>
      </Navbar>
   );
};
export default Header;
