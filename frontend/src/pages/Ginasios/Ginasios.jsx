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
import CardGinasio from "../../components/CardGinasio/CardGinasio";
import { useSelector } from "react-redux";
import MarkerWithInfoWindow from "../../components/MarkerWithInfoWindow/MarkerWithInfoWindow";
import { useTranslation } from "react-i18next";

const Ginasios = () => {
   const { t } = useTranslation();
   const { titulo, descricao, you, gym, closeGyms, info, cta } = t("ginasios");
   const [localizacao, setLocalizacao] = useState(null);
   const [ginasiosProximos, setGinasiosProximos] = useState(null);
   const placesService = usePlacesService();
   const map = useMap();
   const { user } = useSelector((state) => state.auth);

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

   // FIXME: No mobile o mapa não está sendo renderizado
   // TODO: Integrar o DirectionsApi para encontrar o caminho até o ginásio encontrado
   // TODO: Descobrir um jeito de apanhar todas as fotos de cada ginásio e mostralás através de um modal com Slider
   // TODO: Adicionar funcionalidade de se alterar o raio de alcance (opcional)
   // TODO: Adicionar funcionalidade de guardar um ginásio nos favoritos

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
         <BannerTopo descricao={descricao} fotoModelo={foto} titulo={titulo} />
         <Container>
            <Row className="py-4 py-sm-5 mb-sm-4 g-5">
               <Col xl={7} className="d-flex flex-column align-items-center justify-content-center">
                  {/* Mapa */}
                  {localizacao && (
                     <>
                        <Map
                           mapId="d95c984c2c99e484fcaaf9b5"
                           className={styles.mapa}
                           defaultZoom={12}
                           defaultCenter={localizacao}
                           mapTypeId="hybrid"
                        >
                           {/* Posição do usuário */}
                           <AdvancedMarker position={localizacao}>
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                 <Image
                                    src={user?.foto}
                                    className="rounded-circle border border-4 object-fit-cover border-danger"
                                    width={40}
                                    height={40}
                                 />
                                 <p className={"mb-1 text-white " + styles.p}>{you}</p>
                                 <div className={styles.cursor}></div>
                              </div>
                           </AdvancedMarker>

                           {/* Ginásios próximos do usuário */}
                           {ginasiosProximos &&
                              ginasiosProximos?.map((v, k) => (
                                 <MarkerWithInfoWindow
                                    titulo={v?.name}
                                    position={{ lat: v?.geometry?.location?.lat(), lng: v?.geometry?.location?.lng() }}
                                    key={k}
                                 />
                              ))}
                        </Map>

                        {/* Legenda do mapa */}
                        <div className="d-flex justify-content-center align-items-center gap-4 fst-italic mt-2">
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.you}></div> {you}
                           </div>
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.gym}></div> {gym}
                           </div>
                        </div>
                     </>
                  )}
               </Col>
               <Col xl={5} className="pb-4 pb-sm-0">
                  <h3 className="text-center">
                     {closeGyms} <span className="text-success">({ginasiosProximos?.length || 0})</span>
                  </h3>
                  <hr className="mb-4" />
                  <div className={"d-flex flex-wrap flex-xl-nowrap flex-xl-column justify-content-center justify-content-xl-start gap-3 pe-xl-3 " + styles.gymsWrapper}>
                     {ginasiosProximos ? (
                        ginasiosProximos?.map((v, k) => <CardGinasio ginasio={v} key={k} />)
                     ) : (
                        <div className="text-center">
                           <Image src={findGym} className="w-75 mt-sm-4" />
                           <p className="mt-2 mb-4 bg-primary-subtle rounded border-black border">
                              <i className="bi bi-info-circle me-2"></i>
                              {info}
                           </p>
                           {/* Botão de pesquisa */}
                           {!ginasiosProximos?.length && (
                              <Button size="lg" variant="secondary" onClick={encontrarGinasiosProximos}>
                                 <i className="bi bi-search me-1"></i> {cta}
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
