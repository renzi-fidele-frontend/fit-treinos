import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styles from "./CardGinasio.module.css";
import PreloadImage from "../ui/PreloadImage";
import noGym from "../../assets/noGym.webp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePlacesService from "../../hooks/usePlacesService";
import { useState } from "react";
import LightboxDeFotos from "../LightBoxDeFotos/LightBoxDeFotos";

const CardGinasio = ({ ginasio, encontrarDirecao }) => {
   const { t } = useTranslation();
   const { contato, showWay } = t("ginasios");
   const placesService = usePlacesService();
   const [loadingFotos, setLoadingFotos] = useState(false);
   const [fotos, setFotos] = useState(null);
   const [mostrarLightbox, setMostrarLightbox] = useState(false);

   async function apanharFotos() {
      setLoadingFotos(true);
      await placesService?.getDetails({ placeId: ginasio?.place_id, fields: ["photos"] }, (response, status) => {
         if (status === "OK") {
            setFotos(response.photos);
            setLoadingFotos(false);
            setMostrarLightbox(true);
         }
      });
   }

   return (
      <>
         <Card className={"d-flex flex-column flex-sm-row flex-sm-nowrap position-relative " + styles.body}>
            <PreloadImage className={styles.cardImg} src={ginasio?.photos?.[0].getUrl()} errorSrc={noGym} preloaderCn={styles.cardImg} />
            <Card.Body className={styles.body}>
               {/* Nome */}
               <h6 className="fs-6">{ginasio?.name}</h6>

               <div className="small">
                  {/* Classificação */}
                  <p className="text-muted mb-1">
                     {ginasio?.rating || 0} / 5.0 <i className="bi bi-star-fill text-warning me-2"></i> ({ginasio?.user_ratings_total || 0})
                  </p>
                  {/* Localização */}
                  <p className={"text-truncate " + styles.endereco}>
                     <i className="bi bi-geo-alt"></i> {ginasio?.vicinity}
                  </p>
               </div>

               <div className="d-flex gap-2">
                  {/* Contato via whatsapp */}
                  {ginasio?.international_phone_number && (
                     <Button
                        size="sm"
                        variant="success"
                        as={Link}
                        to={`https://wa.me/${String(ginasio?.international_phone_number).replace(/[+\s]/g, "")}`}
                        target="_blank"
                     >
                        <i className="bi bi-whatsapp me-1"></i> {contato}
                     </Button>
                  )}
                  {/* Botão de ver direção */}
                  <Button
                     size="sm"
                     variant="danger"
                     onClick={() => encontrarDirecao({ lat: ginasio?.geometry?.location?.lat(), lng: ginasio?.geometry?.location?.lng() })}
                  >
                     <i className="bi bi-geo-alt-fill me-1"></i> {showWay}
                  </Button>
                  {/* Botão de mostrar todas as fotos do ginásio (Mobile) */}
                  <Button size="sm" onClick={apanharFotos} className="text-bg-dark d-sm-none">
                     <i className="bi bi-images me-1"></i> Ver fotos
                  </Button>
               </div>
            </Card.Body>
            {/* Botão de mostrar todas as fotos do ginásio (Desktop) */}
            <div
               role="button"
               onClick={apanharFotos}
               className="text-bg-dark position-absolute bottom-0 small rounded ms-1 mb-1 border d-none d-sm-flex align-items-center gap-1"
               id={styles.verFotosBtn}
            >
               <i className="bi bi-images"></i> Ver fotos {loadingFotos && <Spinner className="mx-1" size="sm" />}
            </div>
         </Card>
         {/* Modal de fotos do ginásio */}
         {mostrarLightbox && <LightboxDeFotos fotos={fotos} mostrar={true} onClose={() => setMostrarLightbox(false)} />}
      </>
   );
};
export default CardGinasio;
