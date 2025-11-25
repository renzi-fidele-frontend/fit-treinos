import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import foto from "../../assets/findModel.webp";
import ilustracao from "../../assets/FindIlustration.webp";

const Ginasios = () => {
   return (
      <div>
         <BannerTopo
            descricao="Descubra academias próximas, compare distâncias e escolha o melhor lugar para treinar agora mesmo."
            fotoModelo={foto}
            titulo="Encontre o Ginásio Perfeito Perto de Você"
         />
         <Container>
            <Row className="py-4 py-sm-5 mb-sm-4">
               <Col className="d-flex flex-column align-items-center justify-content-center gap-4">
                  <Image className="rounded-3" src={ilustracao} alt="Ilustração demostrando a funcionalidade de busca por ginásios" />
                  <Button size="lg" variant="secondary">
                     <i className="bi bi-search me-1"></i> Iniciar busca
                  </Button>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Ginasios;
