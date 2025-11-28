import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./CardGinasio.module.css";
import PreloadImage from "../ui/PreloadImage";
import noGym from "../../assets/noGym.webp";
import { Link } from "react-router-dom";

const CardGinasio = ({ ginasio }) => {
   return (
      <Card className={"d-flex flex-row flex-nowrap"}>
         <PreloadImage className={styles.cardImg} src={ginasio?.photos?.[0].getUrl()} errorSrc={noGym} preloaderCn={styles.cardImg} />
         <Card.Body>
            {/* Nome */}
            <h6 className="fs-6">{ginasio?.name}</h6>
            {/* Classificação */}
            <p className="text-muted mb-1">
               {ginasio?.rating || 0} / 5.0 <i className="bi bi-star-fill text-warning me-2"></i> ({ginasio?.user_ratings_total || 0})
            </p>
            {/* Localização */}
            <p className={"text-truncate  " + styles.endereco}>
               <i className="bi bi-geo-alt"></i> {ginasio?.vicinity}
            </p>
            {/* Contato via whatsapp */}
            <Button
               size="sm"
               variant="success"
               as={Link}
               to={`https://wa.me/${String(ginasio?.international_phone_number).replace(/[+\s]/g, "")}`}
               target="_blank"
            >
               <i className="bi bi-whatsapp me-1"></i> Entrar em contato
            </Button>
         </Card.Body>
      </Card>
   );
};
export default CardGinasio;
