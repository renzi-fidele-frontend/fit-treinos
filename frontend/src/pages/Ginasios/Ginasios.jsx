import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import foto from "../../assets/findModel.webp";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const Ginasios = () => {
   // TODO: Integrar o places API para encontrar os ginásios mais próximos ao usuário
   // TODO: Primeiro renderizar a localização do usuário no mapa
   const [localizacao, setLocalizacao] = useState(null);

   function encontrarLocalizacao() {
      // Apanhando as cooordenadas do usuário
      navigator.geolocation.getCurrentPosition(
         async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log({ lat, lng });
            setLocalizacao({ lat, lng });
         },
         (error) => {
            console.log("Erro ao obter a localização do usuário");
         }
      );
   }

   function encontrarGinasiosProximos() {
      // Apanhando os ginásios próximos
      /* const res = await fetch(`https://places.googleapis.com/v1/places:searchNearby?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`, {
               method: "POST",
               body: JSON.stringify({
                  includedTypes: ["gym"],
                  maxResultCount: 20,
                  locationRestriction: {
                     circle: {
                        center: {
                           latitude: lat,
                           longitude: long,
                        },
                        radius: 500.0,
                     },
                  },
               }),
               headers: {
                  "X-Goog-FieldMask": "*",
               },
            });
            const data = await res.json();
            console.log(data);
            */
   }

   useEffect(() => {
      if (!localizacao) encontrarLocalizacao();
   }, [localizacao]);

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
                  {localizacao && (
                     <Map mapId="d95c984c2c99e484fcaaf9b5" className={styles.mapa} defaultZoom={17} defaultCenter={localizacao}>
                        <AdvancedMarker position={localizacao} />
                     </Map>
                  )}
                  <Button size="lg" variant="secondary" onClick={encontrarGinasiosProximos}>
                     <i className="bi bi-search me-1"></i> Iniciar busca
                  </Button>

                  {/* <Image className="rounded-3 mt-3 mb-4" src={ilustracao} alt="Ilustração demostrando a funcionalidade de busca por ginásios" /> */}
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Ginasios;
