import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import MudarTemaBtn from "../ui/MudarTemaBtn";
import DropDownBtn from "../ui/DropDownBtn";
import { useSelector } from "react-redux";

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
                     <Nav.Link active={loc.pathname === "/"} as={Link} to={"/"}>
                        Início
                     </Nav.Link>
                     <Nav.Link active={loc.pathname === "/exercicios"} as={Link} to={"/exercicios"}>
                        Exercícios
                     </Nav.Link>
                     {!user && (
                        <>
                           <Nav.Link active={loc.pathname === "/cadastro"} as={Link} to={"/cadastro"}>
                              Cadastrar
                           </Nav.Link>
                           <Nav.Link active={loc.pathname === "/entrar"} as={Link} to={"/entrar"}>
                              Entrar
                           </Nav.Link>
                        </>
                     )}
                     {user && (
                        <Nav.Link active={loc.pathname === "/dashboard"} as={Link} to="/dashboard">
                           Progresso do treinamento
                        </Nav.Link>
                     )}
                     {user && (
                        <Nav.Link active={loc.pathname === "/favoritos"} as={Link} to="/favoritos">
                           Favoritos
                        </Nav.Link>
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
