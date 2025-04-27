import { CloseButton, Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import MudarTemaBtn from "../ui/MudarTemaBtn";
import DropDownBtn from "../ui/DropDownBtn";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
   const { t } = useTranslation();
   const { links } = t("header");
   const loc = useLocation();
   const { user } = useSelector((state) => state.auth);
   const [mostrar, setMostrar] = useState(false);

   const MyNav = ({ offcanvas }) => (
      <Nav className={`gap-3 fs-5 ${!offcanvas ? "d-none d-lg-flex" : "d-flex"} `} activeKey={loc.pathname}>
         <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/"} as={Link} to={"/"}>
            <i className="me-2 d-lg-none bi bi-house-fill"></i> {links[0]}
         </Nav.Link>
         <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/exercicios"} as={Link} to={"/exercicios"}>
            <i className="me-2 d-lg-none bi bi-person-arms-up"></i> {links[1]}
         </Nav.Link>
         {!user && (
            <>
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/cadastro"} as={Link} to={"/cadastro"}>
                  <i className="me-2 d-lg-none bi bi-person-add"></i> {links[2]}
               </Nav.Link>
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/entrar"} as={Link} to={"/entrar"}>
                  <i className="me-2 d-lg-none bi bi-person-fill-lock"></i> {links[3]}
               </Nav.Link>
            </>
         )}
         {user && (
            <>
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/dashboard"} as={Link} to="/dashboard">
                  <i className="me-2 d-lg-none bi bi-graph-up-arrow"></i> {links[4]}
               </Nav.Link>
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/favoritos"} as={Link} to="/favoritos">
                  <i className="me-2 d-lg-none bi bi-box2-heart-fill"></i> {links[5]}
               </Nav.Link>
            </>
         )}
      </Nav>
   );

   return (
      <Navbar className="border border-bottom">
         <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
               <Navbar.Brand as={Link} to="/" className="fw-medium">
                  <Image id={styles.logo} src={logo} alt="Logo do site" />
               </Navbar.Brand>
               <div className="d-flex align-items-center">
                  <i
                     role="button"
                     className="bi bi-list border rounded d-block d-lg-none"
                     id={styles.toggle}
                     onClick={() => setMostrar(true)}
                  ></i>
                  <MyNav />
                  {user && <DropDownBtn />}
                  <MudarTemaBtn />
               </div>
            </div>
         </Container>
         <Offcanvas show={mostrar}>
            <Offcanvas.Header className="d-flex justify-content-between align-items-center border-bottom">
               <Image id={styles.logo} src={logo} alt="Logo do site" />
               <CloseButton onClick={() => setMostrar(false)} />
            </Offcanvas.Header>
            <Offcanvas.Body onClick={() => setMostrar(false)} className="h-100 pt-4">
               <MyNav offcanvas={true} />
            </Offcanvas.Body>
         </Offcanvas>
      </Navbar>
   );
};
export default Header;
