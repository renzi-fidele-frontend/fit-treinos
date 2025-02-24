import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./Favoritos.module.css";
import fotoBanner from "../../assets/modelo.png";
import bg from "../../assets/bg1.jpg";
import { useSelector } from "react-redux";
import CardExercicio from "../../components/CardExercicio/CardExercicio";

const Favoritos = () => {
   const { user } = useSelector((state) => state.auth);
   const favoritos = user?.favoritos
   return (
      <>
         {/* Banner inicial */}
         <div
            id={styles.banner}
            className="position-relative overflow-hidden bg-secondary
bg-gradient pt-5  pb-0"
         >
            <Image src={bg} id={styles.bg} className="position-absolute top-0 start-0 end-0 h-auto" />
            <Container>
               <Row className="position-relative">
                  <Col sm={7} className="justify-content-center flex-column gap-3 d-flex pe-4">
                     <h2 id={styles.titBanner}>Veja os seus exercícios favoritos</h2>
                     <p className="fs-4">Sempre que você ver algo de interessante podes guardar por aqui</p>
                  </Col>
                  <Col className="text-end pe-5">
                     <Image id={styles.modelo} src={fotoBanner} />
                  </Col>
               </Row>
            </Container>
         </div>
         <Container>
            <Row>
               <Col>
                  <h2 className="fw-semibold mb-4 ">Exercícios favoritos</h2>
                  <hr />
                  <Row className="mt-2 mb-5 px-5 mx-5 g-4 justify-content-center flex-content-stretch">
                     {user?.exercícios?.map((v, k) => (
                        <Col key={k} xs={3}>
                           <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                        </Col>
                     ))}
                  </Row>
               </Col>
            </Row>
         </Container>
      </>
   );
};
export default Favoritos;
