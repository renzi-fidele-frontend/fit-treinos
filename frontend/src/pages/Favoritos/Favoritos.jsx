import { Alert, Col, Image, Row } from "react-bootstrap";
import fotoBanner from "../../assets/myguy.webp";
import { useDispatch, useSelector } from "react-redux";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import noEx from "../../assets/modelo2.webp";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import { gerarArray } from "../../utils/gerarArray";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { useEffect } from "react";
import { setExercicios } from "../../state/exercicios/exerciciosSlice";

const Favoritos = () => {
   const { t } = useTranslation();
   const { tit, desc, subtit, noTrain } = t("favoritos");
   const { user } = useSelector((state) => state.auth);
   const { exercicios } = useSelector((state) => state.exercicios);
   const dispatch = useDispatch();
   const favoritos = exercicios?.filter((v) => user?.favoritos?.includes(v?.id));
   const apanharExercicios = useFetch("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exercisesFetchOptions, exercicios);

   // Armazenando os dados da api
   useEffect(() => {
      if (!exercicios) dispatch(setExercicios(apanharExercicios.data));
   }, [apanharExercicios.data]);

   return (
      <>
         {/* Banner inicial */}
         <BannerTopo titulo={tit} descricao={desc} fotoModelo={fotoBanner} />

         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row>
               <Col>
                  <h2 className="fw-semibold mb-4">{subtit}</h2>
                  <hr />
                  <Row className="mt-2 mb-5 g-4 flex-content-stretch justify-content-center justify-content-sm-start">
                     {exercicios ? (
                        favoritos?.length > 0 ? (
                           favoritos?.map((v, k) => (
                              <Col key={k} sm={6} lg={4}>
                                 <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                              </Col>
                           ))
                        ) : (
                           <Col className="text-center">
                              <Image src={noEx} />
                              <Alert className="mt-4" variant="warning">
                                 {noTrain}
                              </Alert>
                           </Col>
                        )
                     ) : (
                        gerarArray(3).map((v, k) => (
                           <Col md={4} sm={6} key={k} className="text-center">
                              <CardExercicio />
                           </Col>
                        ))
                     )}
                  </Row>
               </Col>
            </Row>
         </div>
      </>
   );
};
export default Favoritos;
