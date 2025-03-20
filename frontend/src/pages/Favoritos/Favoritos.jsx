import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import styles from "./Favoritos.module.css";
import fotoBanner from "../../assets/myguy.webp";
import bg from "../../assets/bg1.jpg";
import { useSelector } from "react-redux";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import noEx from "../../assets/modelo2.webp";
import BannerTopo from "../../components/BannerTopo/BannerTopo";

const Favoritos = () => {
   const { user } = useSelector((state) => state.auth);
   const { exercicios } = useSelector((state) => state.exercicios);
   const favoritos = exercicios?.filter((v) => user?.favoritos?.includes(v?.id));

   return (
      <>
         {/* Banner inicial */}
         <BannerTopo
            titulo="Veja os seus exercícios favoritos"
            descricao="Sempre que você ver algo de interessante podes guardar por aqui"
            fotoModelo={fotoBanner}
         />

         <Container className="py-5">
            <Row>
               <Col>
                  <h2 className="fw-semibold mb-4 ">Exercícios favoritos</h2>
                  <hr />
                  <Row className="mt-2 mb-5 g-4 flex-content-stretch">
                     {favoritos?.length > 0 ? (
                        favoritos?.map((v, k) => (
                           <Col key={k} sm={6} lg={4}>
                              <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                           </Col>
                        ))
                     ) : (
                        <Col className="text-center">
                           <Image src={noEx} />
                           <Alert className="mt-4" variant="warning">
                              Ainda não existem exercícios favoritos.
                           </Alert>
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
