import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./GymCard.module.css";

const GymCard = ({ ginasio }) => {
   return (
      <Card className={"d-flex flex-row flex-nowrap"}>
         <Image className={styles.cardImg} src={ginasio?.photos?.[0].getUrl()} />
         <Card.Body>
            {/* Nome */}
            <h6 className="fs-6">{ginasio?.name}</h6>
            {/* Classificação */}
            <p className="text-muted">
               {ginasio?.rating || 0} / 5.0 <i className="bi bi-star-fill text-warning me-2"></i> ({ginasio?.user_ratings_total || 0})
            </p>
            {/* Localização */}
            <p className={"text-truncate  " + styles.endereco}>
               <i></i> {ginasio?.vicinity}
            </p>
            {/* Contato via whatsapp */}
            <Button size="sm" variant="success"><i className="bi bi-whatsapp me-1"></i> Entrar em contato</Button>
         </Card.Body>
      </Card>
   );
};
export default GymCard;
