import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import ftBanner from "../../assets/modelo.png";
import Titulo from "../../components/ui/Titulo";

const Home = () => {
   return (
      <Container fluid>
         {/*  Banner Inicial  */}
         <Row className="px-5">
            <Col md={6} className="d-flex flex-column justify-content-center ps-5 position-relative">
               <div className="ps-5 pe-2 ">
                  <h1 className="" id={styles.titulo}>
                     Transpire, sorria
                     <br /> e fique saudável
                  </h1>
                  <p className="mb-5 mt-5 fs-5">Descubra os exercícios que mais dão resultados, de maneira simples e organizada</p>
                  <Button variant="secondary" size="lg" className="align-self-baseline">
                     Descobrir Exercícios
                  </Button>
                  <span id={styles.textoOverflow}>Treine Pesado</span>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-bottom-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>

         {/*  Exercícios */}
         <Row className="mt-5 py-5">
            <Col className="text-center">
               <Titulo texto="Exercícios incríveis para você Treinar " />
               {/*  Pesquisa  */}
               <Form>
                  <Form.Group className="d-flex gap-2 w-25 mx-auto mt-4">
                     <Form.Control type="text" placeholder="Procure exercícios" />
                     <Button variant="secondary" type="submit">
                        Pesquisar
                     </Button>
                  </Form.Group>
               </Form>
            </Col>
         </Row>
      </Container>
   );
};
export default Home;
