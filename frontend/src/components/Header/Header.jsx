import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.jpg";
import MudarTemaBtn from "../ui/MudarTemaBtn";

const rotas = [
   { texto: "Início", path: "/" },
   { texto: "Exercícios", path: "/exercicios" },
   { texto: "Cadastrar", path: "/cadastro" },
   { texto: "Entrar", path: "/entrar" },
];

const Header = () => {
   const loc = useLocation();

   return (
      <Navbar className="border border-bottom">
         <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
               <Navbar.Brand as={Link} to="/" className="fw-medium">
                  <Image id={styles.logo} src={logo} alt="Logo do site" />
               </Navbar.Brand>

               <div className="d-flex align-items-center">
                  <Nav className="gap-3 fs-5" activeKey={loc.pathname}>
                     {rotas.map((v, k) => (
                        <Nav.Link active={loc.pathname === v.path} as={Link} to={v.path} key={k}>
                           {v.texto}
                        </Nav.Link>
                     ))}
                  </Nav>
                  <MudarTemaBtn />
                  {/* TODO: Adicionar dropdown do usuário logado */}
               </div>
            </div>
         </Container>
      </Navbar>
   );
};
export default Header;
