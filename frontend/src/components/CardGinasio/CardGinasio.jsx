import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./CardGinasio.module.css";
import PreloadImage from "../ui/PreloadImage";
import noGym from "../../assets/noGym.webp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CardGinasio = ({ ginasio, encontrarDirecao, apanharFotos }) => {
   const { t } = useTranslation();
   const { contato, showWay } = t("ginasios");
   return (
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
               <p className={"text-truncate  " + styles.endereco}>
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
            </div>
         </Card.Body>
         {/* Botão de mostrar todas as fotos do ginásio (Desktop) */}
         <div
            role="button"
            onClick={apanharFotos}
            className="text-bg-dark position-absolute bottom-0 small rounded ms-1 mb-1 border d-none d-sm-block"
            id={styles.verFotosBtn}
         >
            <i className="bi bi-images me-1"></i> Ver fotos
         </div>
      </Card>
   );
};
export default CardGinasio;
