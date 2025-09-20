import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.png";
import styles from "./Preloader.module.css";

const Preloader = () => {
   return (
      <div id={styles.ct} className="d-flex flex-column align-items-center justify-content-center gap-4" style={{ height: "100dvh" }}>
         <Image src={logo} alt="Logo do website" />
         <p className="fs-5 text-center fst-italic">
            Seu espaço para treinar, aprender e alcançar seus objetivos fitness com praticidade e motivação.
         </p>
      </div>
   );
};
export default Preloader;
