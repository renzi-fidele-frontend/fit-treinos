import { useSelector } from "react-redux";
import styles from "./BannerTopo.module.css";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const BannerTopo = ({ titulo, descricao, fotoModelo }) => {
   const { modoEscuro } = useSelector((state) => state.tema);
   return (
      <div
         id={styles.banner}
         className="position-relative overflow-hidden 
pb-0"
      >
         <div className={`pt-4 pt-sm-5 ${modoEscuro ? "bg-dark bg-opacity-75" : "bg-light bg-opacity-50"} `}>
            <div className="container-md">
               <Row className="position-relative px-2 px-sm-5 px-md-0">
                  <Col xs={8} sm={7} className="justify-content-center flex-column gap-1 gap-sm-3 d-flex">
                     <h2 className={modoEscuro && styles.txtShadow} id={styles.titBanner}>
                        {titulo}
                     </h2>
                     <p className="fs-4 mb-3 mb-sm-0" id={styles.bannerSub}>
                        {descricao}
                     </p>
                  </Col>
                  <Col className="text-end pe-md-5">
                     <Image id={styles.fotoBanner} src={fotoModelo} />
                  </Col>
               </Row>
            </div>
         </div>
      </div>
   );
};
export default BannerTopo;
