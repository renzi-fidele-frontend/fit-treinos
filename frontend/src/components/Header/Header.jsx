import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import MudarTemaBtn from "../ui/MudarTemaBtn";
import UserDropdown from "../ui/DropDownBtn";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IdiomaBtn from "../ui/IdiomaBtn";
import { setToken, setUser } from "../../state/auth/authSlice";

const Header = () => {
   const { t } = useTranslation();
   const { links, profile, sair } = t("header");
   const loc = useLocation();
   const { user } = useSelector((state) => state.auth);
   const [mostrar, setMostrar] = useState(false);
   const dispatch = useDispatch();

   function deslogar() {
      dispatch(setUser(null));
      dispatch(setToken(null));
   }

   const MyNav = ({ offcanvas }) => (
      <Nav className={`gap-2 fs-5 ${!offcanvas ? "d-none d-xl-flex align-items-center" : "d-flex"} `} activeKey={loc.pathname} id={styles.ct}>
         {/* Home */}
         <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/"} as={Link} to={"/"}>
            <i className="me-2 d-xl-none bi bi-house-fill"></i> {links[0]}
         </Nav.Link>
         <div className="vr d-none d-xl-block my-auto"></div>
         {/* Exercícios */}
         <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/exercicios"} as={Link} to={"/exercicios"}>
            <i className="me-2 d-xl-none bi bi-person-arms-up"></i> {links[1]}
         </Nav.Link>
         <div className="vr d-none d-xl-block my-auto"></div>

         {user && (
            <>
               {/* Progresso do treinamento */}
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/dashboard"} as={Link} to="/dashboard">
                  <i className="me-2 d-xl-none bi bi-graph-up-arrow"></i> {links[4]}
               </Nav.Link>
               <div className="vr d-none d-xl-block my-auto"></div>
               {/* Favoritos */}
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/favoritos"} as={Link} to="/favoritos">
                  <i className="me-2 d-xl-none bi bi-box2-heart-fill"></i> {links[5]}
               </Nav.Link>
               <div className="vr d-none d-xl-block my-auto"></div>
            </>
         )}
         {/* Ginásios */}
         <Nav.Link
            as={Link}
            to="/encontrar_ginasios"
            className={`${offcanvas && "border-bottom pb-4"}`}
            active={loc.pathname === "/encontrar_ginasios"}
         >
            <i className="me-2 d-xl-none bi bi-pin-map-fill"></i> {links[6]}
         </Nav.Link>
         <div className="vr d-none d-xl-block my-auto"></div>
         {/* Liderança */}
         <Nav.Link as={Link} to="/leaderboard" className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/leaderboard"}>
            <i className="me-2 d-xl-none bi bi-trophy-fill"></i> {links[7]}
         </Nav.Link>
         {!user && (
            <>
               <div className="vr d-none d-xl-block my-auto"></div>
               {/* Login */}
               <Nav.Link className={`${offcanvas && "border-bottom pb-4"}`} active={loc.pathname === "/entrar"} as={Link} to={"/entrar"}>
                  <i className="me-2 d-xl-none bi bi-person-add"></i> {links[2]}
               </Nav.Link>
               <div className="vr d-none d-xl-block my-auto"></div>
               {/* Cadastro */}
               <Nav.Link className={`${offcanvas && "border-bottom pb-4 "}`} active={loc.pathname === "/cadastro"} as={Link} to={"/cadastro"}>
                  <i className="me-2 d-xl-none bi bi-person-fill-lock"></i> <Button variant="secondary">{links[3]}</Button>
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
                  {/* Toggle */}
                  <i
                     role="button"
                     className="bi bi-list border rounded d-block d-xl-none"
                     id={styles.toggle}
                     onClick={() => setMostrar(true)}
                  ></i>
                  <MyNav />
                  <div className="d-none d-sm-block">{user && <UserDropdown />}</div>
                  <div className="mx-sm-3 mx-2">
                     <IdiomaBtn />
                  </div>
                  <MudarTemaBtn />
               </div>
            </div>
         </Container>
         {/* Offcanvas do mobile */}
         <Offcanvas show={mostrar}>
            <Offcanvas.Header className="d-flex justify-content-between align-items-center border-bottom">
               <Image id={styles.logo} src={logo} alt="Logo do site" />
               <CloseButton onClick={() => setMostrar(false)} />
            </Offcanvas.Header>
            <Offcanvas.Body className="h-100 pt-4">
               <div onClick={() => setMostrar(false)}>
                  <MyNav offcanvas={true} />
               </div>
               {user && (
                  <div className="border-bottom py-3 d-flex d-sm-none align-items-center gap-3">
                     <UserDropdown />{" "}
                     <div>
                        <h6 className="fst-italic fw-medium">{user.nome}</h6>
                        <div className="d-flex gap-2">
                           <Button onClick={() => setMostrar(false)} size="sm" variant="secondary" as={Link} to="/usuario/editar_perfil">
                              {profile}
                           </Button>
                           <Button onClick={deslogar} variant="danger" size="sm">
                              <i className="bi bi-box-arrow-right"></i> {sair}
                           </Button>
                        </div>
                     </div>
                  </div>
               )}
            </Offcanvas.Body>
         </Offcanvas>
      </Navbar>
   );
};
export default Header;
