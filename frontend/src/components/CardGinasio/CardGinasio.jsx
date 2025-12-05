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
import LightBoxDeFotos from "../LightBoxDeFotos/LightBoxDeFotos";
import useFetch from "../../hooks/useFetch";
import Tooltip from "../Tooltip/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/auth/authSlice";

const CardGinasio = ({ ginasio, encontrarDirecao }) => {
   const { t } = useTranslation();
   const { contato, showWay, seePhotos } = t("ginasios");
   const { user } = useSelector((state) => state.auth);
   const placesService = usePlacesService();
   const [loadingFotos, setLoadingFotos] = useState(false);
   const [fotos, setFotos] = useState(null);
   const [mostrarLightbox, setMostrarLightbox] = useState(false);
   const { apanharNoBackendComAuth } = useFetch();
   const [loadingGuardarGinasio, setLoadingGuardarGinasio] = useState(false);
   const [guardado, setGuardado] = useState(user?.ginasiosFavoritos?.some((fav) => fav.place_id === ginasio?.place_id));
   const dispatch = useDispatch();

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

   function guardarGinasio() {
      setLoadingGuardarGinasio(true);
      const res = apanharNoBackendComAuth("actions/guardarGinasioNosFavoritos", "POST", {
         data: {
            place_id: ginasio?.place_id,
            name: ginasio?.name,
            position: ginasio?.position,
            vicinity: ginasio?.vicinity,
            international_phone_number: ginasio?.international_phone_number,
            rating: ginasio?.rating,
            user_ratings_total: ginasio?.user_ratings_total,
            photo: ginasio?.photo,
            lat: ginasio?.geometry?.location?.lat(),
            lng: ginasio?.geometry?.location?.lng(),
         },
      }).then((res) => {
         setLoadingGuardarGinasio(false);
         setGuardado(true);
         dispatch(setUser({ ...user, ginasiosFavoritos: res.ginasiosFavoritos }));
      });
   }

   // TODO: Adicionar a funcionalidade de remover um ginásio da lista dos favoritos
   function removerGinasio() {
      
   }

   return (
      <>
         <Card className={"d-flex flex-column flex-sm-row flex-sm-nowrap position-relative " + styles.body}>
            <PreloadImage className={styles.cardImg} src={ginasio?.photos?.[0].getUrl()} errorSrc={noGym} preloaderCn={styles.cardImg} />
            <Card.Body className={styles.body + " position-relative"}>
               {/* Nome */}
               <h6 className="fs-6">{ginasio?.name}</h6>

               {/* Detalhes */}
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

               {/* Ações */}
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
                  {ginasio?.photos && (
                     <Button size="sm" onClick={apanharFotos} className="text-bg-dark d-sm-none">
                        <i className="bi bi-images me-1"></i> {seePhotos} {loadingFotos && <Spinner className="mx-1" size="sm" />}
                     </Button>
                  )}
               </div>

               {/* Botão de salvar */}
               <div className="position-absolute end-0 top-0 me-2 mt-2 fs-5">
                  <Tooltip conteudo={!guardado ? "Salvar nos favoritos" : "Remover dos favoritos"}>
                     {loadingGuardarGinasio ? (
                        <Spinner size="sm" />
                     ) : guardado ? (
                        <i className="bi bi-heart-fill" role="button" onClick={removerGinasio} style={{ color: "#B01E28" }}></i>
                     ) : (
                        <i className="bi bi-heart" role="button" onClick={guardarGinasio}></i>
                     )}
                  </Tooltip>
               </div>
            </Card.Body>
            {/* Botão de mostrar todas as fotos do ginásio (Desktop) */}
            {ginasio?.photos && (
               <div
                  role="button"
                  onClick={apanharFotos}
                  className="text-bg-dark position-absolute bottom-0 small rounded ms-1 mb-1 border d-none d-sm-flex align-items-center gap-1"
                  id={styles.verFotosBtn}
               >
                  <i className="bi bi-images"></i> {seePhotos} {loadingFotos && <Spinner className="mx-1" size="sm" />}
               </div>
            )}
         </Card>
         {/* Modal de fotos do ginásio */}
         {mostrarLightbox && <LightBoxDeFotos fotos={fotos} mostrar={true} onClose={() => setMostrarLightbox(false)} />}
      </>
   );
};
export default CardGinasio;
