import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import foto from "../../assets/findModel.webp";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import usePlacesService from "../../hooks/usePlacesService";

const Ginasios = () => {
   // TODO: Integrar o places API para encontrar os ginásios mais próximos ao usuário
   // TODO: Primeiro renderizar a localização do usuário no mapa
   const [localizacao, setLocalizacao] = useState(null);
   const placesService = usePlacesService();
   const [ginasiosProximos, setGinasiosProximos] = useState(null);

   function encontrarLocalizacao() {
      // Apanhando as cooordenadas do usuário
      navigator.geolocation.getCurrentPosition(
         async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLocalizacao({ lat, lng });
         },
         (error) => {
            console.log("Erro ao obter a localização do usuário");
         }
      );
   }

   function encontrarGinasiosProximos() {
      // Apanhando os ginásios próximos
      placesService?.nearbySearch({ location: localizacao, radius: 4500, type: "gym" }, (response, status) => {
         console.log(response);
         setGinasiosProximos(response);
      });
   }

   useEffect(() => {
      if (!localizacao) encontrarLocalizacao();
   }, [localizacao, placesService]);

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
                        {/* Posição do usuário */}
                        <AdvancedMarker position={localizacao} />
                        {/* TODO: Renderizar os ginásios mais próximos */}
                        {ginasiosProximos &&
                           ginasiosProximos?.map((v, k) => (
                              // TODO: Adicionar uma cor diferente para o Marker dos ginásios próximos
                              <AdvancedMarker position={{ lat: v?.geometry?.location?.lat(), lng: v?.geometry?.location?.lng() }} key={k} />
                           ))}
                     </Map>
                  )}
                  <Button size="lg" variant="secondary" onClick={encontrarGinasiosProximos}>
                     <i className="bi bi-search me-1"></i> Iniciar busca
                  </Button>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Ginasios;
