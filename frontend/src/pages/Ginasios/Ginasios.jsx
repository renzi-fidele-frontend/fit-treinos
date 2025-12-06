import styles from "./Ginasios.module.css";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import foto from "../../assets/findModel.webp";
import findGym from "../../assets/findGym.webp";
import noGymFound from "../../assets/noGymFound.webp";
import { useEffect, useRef, useState } from "react";
import usePlacesService from "../../hooks/usePlacesService";
import CardGinasio from "../../components/CardGinasio/CardGinasio";
import { useSelector } from "react-redux";
import MarkerWithInfoWindow from "../../components/MarkerWithInfoWindow/MarkerWithInfoWindow";
import { useTranslation } from "react-i18next";
import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import useRoutesService from "../../hooks/useRoutesService";

const Ginasios = () => {
   const { t } = useTranslation();
   const { titulo, descricao, you, gym, closeGyms, info, cta, distance, duration, load, gymNotFound } = t("ginasios");
   const [localizacao, setLocalizacao] = useState(null);
   const [ginasiosProximos, setGinasiosProximos] = useState(null);
   const placesService = usePlacesService();
   const map = useMap();
   const { user } = useSelector((state) => state.auth);
   const [caminho, setCaminho] = useState(null);
   const { directionsService, directionsRenderer } = useRoutesService();
   const [loadingCaminho, setLoadingCaminho] = useState(false);
   const mapRef = useRef();

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

   async function encontrarGinasiosProximos() {
      setLoadingCaminho(true);
      await placesService?.nearbySearch({ location: localizacao, radius: 4500, type: "gym" }, (response, status) => {
         if (status === "OK") {
            setGinasiosProximos(response);
            setLoadingCaminho(false);
         }

         if (response.length === 0) {
            setLoadingCaminho(false);
            setGinasiosProximos([]);
         }
      });
   }

   async function encontrarDirecao(destino) {
      setLoadingCaminho(true);
      mapRef.current.scrollIntoView({ behavior: "smooth" });
      await directionsService.route(
         {
            origin: localizacao,
            destination: destino,
            travelMode: "DRIVING",
         },
         (result, status) => {
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(result);
            directionsRenderer.setOptions({
               markerOptions: {
                  visible: false,
               },
               polylineOptions: {
                  strokeColor: "red",
               },
            });
            setCaminho(result);
         }
      );
      setLoadingCaminho(false);
   }

   // TODO: Adicionar funcionalidade de se alterar o raio de alcance (opcional)

   // Encontrando a localização do usuário no carregamento da página
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
         <Container ref={mapRef}>
            <Row className="py-4 py-sm-5 mb-sm-4 g-5">
               <Col xl={7} className="d-flex flex-column align-items-center ">
                  {/* Mapa */}
                  {localizacao && (
                     <>
                        <div className={"position-relative " + styles.mapa}>
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

                           {/* Overlay de loading */}
                           {loadingCaminho && (
                              <div className="position-absolute start-0 end-0 top-0 bottom-0 bg-black bg-opacity-50 d-flex flex-column align-items-center justify-content-center text-center text-white">
                                 <p className="fw-medium fs-5">{load}</p>
                                 <Spinner />
                              </div>
                           )}
                        </div>

                        {/* Legenda do mapa */}
                        <div className="d-flex justify-content-center align-items-center gap-4 fst-italic mt-2">
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.you}></div> {you}
                           </div>
                           <div className="d-flex gap-2 align-items-center">
                              <div className={styles.gym}></div> {gym}
                           </div>
                        </div>

                        {/* Informação da distância até ao alvo */}
                        {caminho && (
                           <>
                              <hr className="w-100 border-4" />
                              <div className="d-flex gap-2 gap-sm-4 flex-column flex-sm-row text-center">
                                 <p className="mb-0">
                                    <span className="fw-bold">
                                       <i className="bi bi-car-front me-1"></i> {distance}:
                                    </span>{" "}
                                    {caminho?.routes[0]?.legs[0]?.distance?.text}
                                 </p>
                                 <p className="mb-0">
                                    <span className="fw-bold">
                                       <i className="bi bi-clock me-1"></i> {duration}:
                                    </span>{" "}
                                    {caminho?.routes[0]?.legs[0]?.duration?.text}
                                 </p>
                              </div>
                           </>
                        )}
                     </>
                  )}
               </Col>
               <Col xl={5} className="pb-4 pb-sm-0">
                  <h3 className="text-center">
                     {closeGyms} <span className="text-success">({ginasiosProximos?.length || 0})</span>
                  </h3>
                  <hr className="mb-4" />
                  <div
                     className={
                        "d-flex flex-column flex-sm-row flex-sm-wrap flex-xl-nowrap flex-xl-column justify-content-center justify-content-xl-start gap-3 pe-xl-2 " +
                        styles.gymsWrapper
                     }
                  >
                     {ginasiosProximos?.length > 0 &&
                        ginasiosProximos?.map((v, k) => (
                           <div key={k}>
                              <CardGinasio encontrarDirecao={encontrarDirecao} ginasio={v} />
                           </div>
                        ))}

                     {ginasiosProximos?.length === 0 && (
                        <div className="text-center">
                           <Image src={noGymFound} className="mt-3" />
                           <p className="mt-2 mb-4 bg-primary-subtle rounded border-black border">{gymNotFound}</p>
                        </div>
                     )}

                     {ginasiosProximos === null && (
                        <div className="text-center">
                           <Image src={findGym} className="w-75 mt-sm-4" />
                           <p className="mt-2 mb-4 bg-primary-subtle rounded border-black border">
                              <i className="bi bi-info-circle me-2"></i>
                              {info}
                           </p>
                           {/* Botão de pesquisa */}
                           {!ginasiosProximos?.length && (
                              <Button
                                 size="lg"
                                 variant="secondary"
                                 onClick={() => {
                                    mapRef.current.scrollIntoView({ behavior: "smooth" });
                                    encontrarGinasiosProximos();
                                 }}
                              >
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
