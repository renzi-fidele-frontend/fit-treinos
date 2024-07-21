import { Button, Col, Container, Image, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import ftBanner from "../../assets/modelo.png";

const Home = () => {
   return (
      <Container fluid>
         {/*  Banner Inicial  */}
         <Row className="px-5">
            <Col md={6} className="d-flex flex-column justify-content-center ps-5">
               <div className="ps-5">
                  <h1 className="" id={styles.titulo}>
                     Transpire, sorria
                     <br /> e fique saudável
                  </h1>
                  <p className="mb-5 mt-5 fs-5">Descubra os exercícios que mais dão resultados, de maneira simples e organizada</p>
                  <Button variant="secondary" size="lg" className="align-self-baseline">
                     Descobrir Exercícios
                  </Button>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="text-center rounded-bottom-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>

         {/*  Exercícios */}
         <Row>
            <Col></Col>
         </Row>
      </Container>
   );
};
export default Home;
