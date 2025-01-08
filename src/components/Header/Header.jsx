import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
   const loc = useLocation();

   return (
      <Navbar className="border border-bottom">
         <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
               {/* TODO: Melhorar a logo do website */}
               <Navbar.Brand as={Link} to="/" className="fw-medium">
                  GymApp
               </Navbar.Brand>

               <div className="d-flex">
                  <Nav className="gap-3 fs-5" activeKey={loc.pathname}>
                     <Nav.Link as={Link} to="/">
                        Início
                     </Nav.Link>
                     <Nav.Link as={Link} to="/exercicios">
                        Exercícios
                     </Nav.Link>
                     <Nav.Link as={Link} to="/cadastro">
                        Cadastrar
                     </Nav.Link>
                     <Nav.Link as={Link} to="/entrar">
                        Entrar
                     </Nav.Link>
                     {/* TODO: Adicionar feat de toggle de modo escuro/claro  */}
                  </Nav>
               </div>
            </div>
         </Container>
      </Navbar>
   );
};
export default Header;
