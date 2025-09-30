import { useState } from "react";
import Image from "react-bootstrap/Image"
import styles from "./ModalFiltragem.module.css";

const ImagePreloader = ({ src }) => {
   const [loaded, setLoaded] = useState(false);
   return (
      <div className="position-relative">
         <Image className={`rounded  ${!loaded && "d-none"}`} onLoad={() => setLoaded(true)} src={src} />
         {!loaded && (
            <div className={styles.imgPreloader + " bg-secondary d-flex align-items-center rounded z-3"}>
               <i className="bi bi-image"></i>
            </div>
         )}
      </div>
   );
};
export default ImagePreloader;
