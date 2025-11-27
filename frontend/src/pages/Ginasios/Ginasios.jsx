import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import foto from "../../assets/findModel.webp";
import findGym from "../../assets/findGym.webp";
import { AdvancedMarker, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import usePlacesService from "../../hooks/usePlacesService";
import GymCard from "../../components/GymCard/GymCard";

const Ginasios = () => {
   const [localizacao, setLocalizacao] = useState(null);
   const [ginasiosProximos, setGinasiosProximos] = useState(null);
   const placesService = usePlacesService();
   const map = useMap();

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
            <Row className="py-4 py-sm-5 mb-sm-4 g-5">
               {/* TODO: Adicionar mais detalhes ao Marker dos ginásio */}
               <Col md={7} className="d-flex flex-column align-items-center justify-content-center">
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
                        <div className="d-flex justify-content-center align-items-center gap-4 fst-italic mt-2">
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.you}></div> Você
                           </div>
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.gym}></div> Ginásio
                           </div>
                        </div>
                     </>
                  )}
               </Col>
               <Col>
                  <h3>
                     Ginásios próximos a você <span className="text-success">({ginasiosProximos?.length || 0})</span>
                  </h3>
                  <hr className="mb-4" />
                  <div className={"d-flex flex-column gap-3 pe-3 " + styles.gymsWrapper}>
                     {ginasiosProximos ? (
                        ginasiosProximos?.map((v, k) => <GymCard ginasio={v} key={k} />)
                     ) : (
                        <div className="text-center">
                           <Image src={findGym} className="w-75" />
                           <p className="mt-2 mb-4 bg-primary-subtle rounded border-black border">
                              <i className="bi bi-info-circle me-2"></i>Clique abaixo para encontrar os ginásios
                           </p>
                           {/* Botão de pesquisa */}
                           {!ginasiosProximos?.length && (
                              <Button size="lg" variant="secondary" onClick={encontrarGinasiosProximos}>
                                 <i className="bi bi-search me-1"></i> Iniciar pesquisa
                              </Button>
                           )}
                        </div>
                     )}
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Ginasios;
