import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import foto from "../../assets/findModel.webp";
import { AdvancedMarker, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import usePlacesService from "../../hooks/usePlacesService";

const Ginasios = () => {
   const [localizacao, setLocalizacao] = useState(null);
   const [ginasiosProximos, setGinasiosProximos] = useState(null);
   const placesService = usePlacesService();
   const map = useMap();

   // Desenhando o círculo ao redor da localização do usuário

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
      placesService?.nearbySearch({ location: localizacao, radius: 4500, type: "gym" }, (response, status) => {
         setGinasiosProximos(response);
      });
   }

   useEffect(() => {
      if (!localizacao) encontrarLocalizacao();
      if (!map) return;

      // Desenhando o círculo ao redor da localização do usuário
      const circle = new google.maps.Circle({
         map,
         center: localizacao,
         radius: 4500,
         fillColor: "#4285F4",
         fillOpacity: 0.2,
         strokeColor: "#4285F4",
         strokeOpacity: 0.8,
         strokeWeight: 2,
      });

      // Cleanup
      return () => {
         circle?.setMap(null);
      };
   }, [localizacao, placesService, map]);

   return (
      <div>
         <BannerTopo
            descricao="Descubra academias próximas, compare distâncias e escolha o melhor lugar para treinar agora mesmo."
            fotoModelo={foto}
            titulo="Encontre o Ginásio Perfeito Perto de Você"
         />
         <Container>
            {/* TODO: Renderizar os ginásios mais próximos em formato de listagem em card */}
            <Row className="py-4 py-sm-5 mb-sm-4">
               <Col className="d-flex flex-column align-items-center justify-content-center gap-4">
                  {/* Mapa */}
                  {localizacao && (
                     <>
                        <Map
                           mapId="d95c984c2c99e484fcaaf9b5"
                           className={styles.mapa}
                           defaultZoom={13}
                           defaultCenter={localizacao}
                           mapTypeId="hybrid"
                        >
                           {/* Posição do usuário */}
                           <AdvancedMarker position={localizacao} />

                           {/* Ginásios próximos do usuário */}
                           {ginasiosProximos &&
                              ginasiosProximos?.map((v, k) => (
                                 <AdvancedMarker position={{ lat: v?.geometry?.location?.lat(), lng: v?.geometry?.location?.lng() }} key={k}>
                                    <Pin background={"#ffee00ff"} borderColor={"#000000ff"} glyphColor={"#000000ff"} />
                                 </AdvancedMarker>
                              ))}
                        </Map>

                        {/* Legenda do mapa */}
                        <div className="d-flex justify-content-center align-items-center gap-4 fst-italic">
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.you}></div> Você
                           </div>
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.gym}></div> Ginásio
                           </div>
                        </div>
                     </>
                  )}

                  {!ginasiosProximos?.length && (
                     <Button size="lg" variant="secondary" onClick={encontrarGinasiosProximos}>
                        <i className="bi bi-search me-1"></i> Iniciar busca
                     </Button>
                  )}
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Ginasios;
