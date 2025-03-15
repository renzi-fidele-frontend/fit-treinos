import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css"

const Footer = () => {
   return (
      <div className="text-bg-dark pt-3 pb-4 pb-lg-5">
         <Container>
            <hr />
            <Row>
               <Col lg={8} className="d-flex flex-column flex-lg-row align-items-center text-center text-lg-start gap-2 gap-lg-0">
                  <Link to="/">
                     <Image className="me-lg-3" src={logo} />
                  </Link>
                  <p className="fs-5 mb-0" id={styles.copywright}>© 2025 - Todos os direitos reservados</p>
               </Col>
               <Col className="text-center text-lg-end mt-2 mt-lg-0">
                  <h2 className="fs-5 fw-bold">
                     Desenvolvedor: <span className="fw-normal text-decoration-underline">Renzi Fidele</span>{" "}
                  </h2>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Footer;
