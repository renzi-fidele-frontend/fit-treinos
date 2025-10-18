import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
   const { t } = useTranslation();
   const { copy, dev, politica, terms, descricao } = t("footer");
   return (
      <div className="text-bg-dark pt-3 pb-5 pb-xl-4 ">
         <Container>
            <hr />
            <Row>
               <Col xl={8}>
                  <div className="d-flex flex-column flex-xl-row align-items-center text-center text-lg-start gap-2 gap-lg-0">
                     <Link to="/">
                        <Image className="me-lg-3" src={logo} />
                     </Link>
                     <p className="fs-5 mb-0" id={styles.copywright}>
                        © 2025 - {copy}
                     </p>
                  </div>
                  <p className="mb-0 mt-2 text-center text-xl-start">{descricao}</p>
               </Col>
               <Col className="text-center text-xl-end mt-3 mt-xl-0">
                  <h2 className="fs-5 fw-bold">
                     {dev} <span className="fw-normal text-decoration-underline">Renzi Fidele</span>{" "}
                  </h2>
                  <div className="d-flex gap-3 justify-content-center justify-content-xl-end mt-3 mt-xl-0" id={styles.fim}>
                     <Link className="text-decoration-underline" to="/privacy">
                        {politica}
                     </Link>
                     <div className="vr"></div>
                     <Link className="text-decoration-underline" to="/terms_and_conditions">
                        {terms}
                     </Link>
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Footer;
