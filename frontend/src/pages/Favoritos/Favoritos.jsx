import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import styles from "./Favoritos.module.css";
import fotoBanner from "../../assets/modelo.png";
import bg from "../../assets/bg1.jpg";
import { useSelector } from "react-redux";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import noEx from "../../assets/modelo2.webp";

const Favoritos = () => {
   const { user } = useSelector((state) => state.auth);
   const { exercicios } = useSelector((state) => state.exercicios);
   const favoritos = exercicios?.filter((v) => user?.favoritos?.includes(v?.id));

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
         <Container className="py-5">
            <Row>
               <Col>
                  <h2 className="fw-semibold mb-4 ">Exercícios favoritos</h2>
                  <hr />
                  <Row className="mt-2 mb-5 g-4 flex-content-stretch">
                     {favoritos?.length > 0 ? (
                        favoritos?.map((v, k) => (
                           <Col key={k} xs={4}>
                              <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                           </Col>
                        ))
                     ) : (
                        <Col className="text-center">
                           <Image src={noEx} />
                           <Alert className="mt-4" variant="warning">Ainda não existem exercícios favoritos.</Alert>
                        </Col>
                     )}
                  </Row>
               </Col>
            </Row>
         </Container>
      </>
   );
};
export default Favoritos;
