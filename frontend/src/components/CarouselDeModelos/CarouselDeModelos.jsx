import ftBanner from "../../assets/modelo.png";
import ftBanner2 from "../../assets/model2.webp";
import ftBanner3 from "../../assets/model3.webp";
import Slider from "react-slick";
import styles from "./CarouselDeModelos.module.css";
import Image from "react-bootstrap/Image";

const CarouselDeModelos = () => {
   return (
      <Slider pauseOnFocus={false} pauseOnHover={false} centerMode arrows={false} autoplay fade>
         <div className="d-flex justify-content-center">
            <Image id={styles.fotoBanner} src={ftBanner} />
         </div>
         <div className="d-flex justify-content-center">
            <Image id={styles.fotoBanner} src={ftBanner2} />
         </div>
         <div className="d-flex justify-content-center">
            <Image id={styles.fotoBanner} src={ftBanner3} />
         </div>
      </Slider>
   );
};

export default CarouselDeModelos;
