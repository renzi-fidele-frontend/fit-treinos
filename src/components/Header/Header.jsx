import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Header = () => {
   const loc = useLocation();

   return (
      <Navbar className="border border-bottom">
         <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
               <Navbar.Brand className="fw-medium">GymApp</Navbar.Brand>
               <div className="d-flex">
                  <Nav className="gap-3" activeKey={loc.pathname}>
                     <Nav.Link>Início</Nav.Link>
                     <Nav.Link>Exercícios</Nav.Link>
                     <Nav.Link>Cadastrar</Nav.Link>
                     <Nav.Link>Entrar</Nav.Link>
                  </Nav>
               </div>
            </div>
         </Container>
      </Navbar>
   );
};
export default Header;
