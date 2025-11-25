import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import foto from "../../assets/findModel.webp";
import ilustracao from "../../assets/FindIlustration.webp";
import useFetch from "../../hooks/useFetch";

const Ginasios = () => {
   const { apanharDadosComParam } = useFetch();

   // TODO: Integrar o places API para encontrar os ginásios mais próximos ao usuário
   async function encontrarGinasios() {
      const myLoc = navigator.geolocation.getCurrentPosition(
         (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log(`A latitude é ${lat} e a longitude é: ${long}`);
         },
         (error) => {
            console.log("Erro ao obter a localização do usuário");
         }
      );
   }

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
                  <Button size="lg" variant="secondary" onClick={encontrarGinasios}>
                     <i className="bi bi-search me-1"></i> Iniciar busca
                  </Button>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Ginasios;
