import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
   return (
      <div className="text-bg-dark pt-3 pb-4">
         <Container>
            <hr />
            <Row>
               <Col className="d-flex align-items-center">
                  <h1 className="fs-5 fw-bold">
                     GymApp <span className="fw-normal">© 2025 - Todos os direitos reservados</span>
                  </h1>
               </Col>
               <Col className="text-end ">
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
