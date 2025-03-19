import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Exercicios.module.css";
import fotoBanner from "../../assets/bannerEx.png";
import bg from "../../assets/bg1.jpg";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { setCategorias, setEquipamentos, setMusculoAlvo, setPaginaAtual } from "../../state/configs/configsSlice";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import Paginacao from "../../components/Paginacao/Paginacao";
import { paginarArray } from "../../utils/paginarArray";
import { setExercicios, setExerciciosPaginados } from "../../state/exercicios/exerciciosSlice";
import ModalFiltragem from "../../components/ModalFiltragem/ModalFiltragem";
import useFiltrarExercicios from "../../hooks/useFiltrarExercicios";
import noFilter from "../../assets/noFilter.webp";

const Exercicios = () => {
   const { categorias: partesCorpo, equipamentos, musculoAlvo, filtros, paginaAtual } = useSelector((state) => state.configs);
   const { exercicios, exerciciosFiltrados, exerciciosPaginados } = useSelector((state) => state.exercicios);
   const dispatch = useDispatch();
   const { filtrarExercicios } = useFiltrarExercicios();

   // Modais de filtragem
   const [modalParteDoCorpo, setModalParteDoCorpo] = useState(false);
   const [modalEquipamentos, setModalEquipamentos] = useState(false);
   const [modalMusculosAlvo, setModalMusculosAlvo] = useState(false);

   // Requisições
   const apanharExercicios = useFetch("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exercisesFetchOptions, exercicios);
   const apanharPartesCorpo = useFetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exercisesFetchOptions, partesCorpo);
   const apanharEquipamentos = useFetch("https://exercisedb.p.rapidapi.com/exercises/equipmentList", exercisesFetchOptions, equipamentos);
   const apanharMusculoAlvo = useFetch("https://exercisedb.p.rapidapi.com/exercises/targetList", exercisesFetchOptions, musculoAlvo);

   // Armazenando os dados da api
   useEffect(() => {
      if (!exercicios) dispatch(setExercicios(apanharExercicios.data));
      if (!partesCorpo) dispatch(setCategorias(apanharPartesCorpo.data));
      if (!equipamentos) dispatch(setEquipamentos(apanharEquipamentos.data));
      if (!musculoAlvo) dispatch(setMusculoAlvo(apanharMusculoAlvo.data));
   }, [apanharPartesCorpo.data, apanharEquipamentos.data, apanharMusculoAlvo.data, apanharExercicios.data]);

   // Caso a página carrege e hajam filtros
   useEffect(() => {
      if (!exerciciosFiltrados && exercicios) filtrarExercicios(filtros);
   }, [exercicios, filtros]);

   return (
      <div>
         {/*  Banner inicial */}
         <div
            id={styles.banner}
            className="position-relative overflow-hidden bg-secondary
bg-gradient pt-4 pt-sm-5  pb-0"
         >
            <Image src={bg} id={styles.bg} className="position-absolute top-0 start-0 end-0 h-auto" />
            <div className="container-md">
               <Row className="position-relative px-2 px-sm-5 px-md-0">
                  <Col xs={8} sm={7} className="justify-content-center flex-column gap-1 gap-sm-3 d-flex">
                     <h2 id={styles.titBanner}>Está na hora de dar aquela melhorada no seu físico</h2>
                     <p className="fs-4 mb-3 mb-sm-0" id={styles.bannerSub}>
                        Mais de 1000 exercícios foram preparados para você
                     </p>
                  </Col>
                  <Col className="text-end pe-md-5">
                     <Image id={styles.fotoBanner} src={fotoBanner} />
                  </Col>
               </Row>
            </div>
         </div>
         <Container fluid>
            <Row className="py-4 py-sm-5">
               <Col className="text-center">
                  <Titulo texto="Encontre todos os exercícios" />
                  {/*  Filtragem  */}
                  <Container className="mb-5 mt-5 px-2 ">
                     <Row className="px-sm-5 g-5 justify-content-center">
                        <Col xs={6} lg={4} className="mt-4 mt-xxl-5" >
                           <h6 className="fs-4 fw-semibold mb-1 mb-sm-3" id={styles.label}>Parte do corpo</h6>
                           <p className="mb-2 text-secondary text-capitalize">[{filtros.parteDoCorpo}]</p>
                           <Button variant="outline-primary" onClick={() => setModalParteDoCorpo(true)}>
                              Escolher...
                           </Button>
                           <ModalFiltragem
                              mostrar={modalParteDoCorpo}
                              onClose={() => setModalParteDoCorpo(false)}
                              modo="Parte do corpo"
                              array={partesCorpo}
                           />
                        </Col>
                        <Col xs={6} lg={4} className="mt-4 mt-xxl-5"  id={styles.border}>
                           <h6 className="fs-4 fw-semibold mb-1 mb-sm-3" id={styles.label}>Equipamento</h6>
                           <p className="mb-2 text-secondary text-capitalize">[{filtros.equipamento}]</p>
                           <Button variant="outline-primary" onClick={() => setModalEquipamentos(true)}>
                              Escolher...
                           </Button>
                           <ModalFiltragem
                              mostrar={modalEquipamentos}
                              onClose={() => setModalEquipamentos(false)}
                              modo="Equipamento"
                              array={equipamentos}
                           />
                        </Col>
                        <Col xs={6} lg={4} className="mt-4 mt-xxl-5" >
                           <Form.Group>
                              <h6 className="fs-4 fw-semibold mb-1 mb-sm-3" id={styles.label}>Músculo a fortificar</h6>
                              <p className="mb-2 text-secondary text-capitalize">[{filtros.musculoAlvo}]</p>
                              <Button variant="outline-primary" onClick={() => setModalMusculosAlvo(true)}>
                                 Escolher...
                              </Button>
                              <ModalFiltragem
                                 mostrar={modalMusculosAlvo}
                                 onClose={() => setModalMusculosAlvo(false)}
                                 modo="Músculo a fortificar"
                                 array={musculoAlvo}
                              />
                           </Form.Group>
                        </Col>
                     </Row>
                  </Container>

                  {/* Exercicios */}
                  <Container fluid className="mt-5 px-xxl-5">
                     <hr className="mx-5" />
                     <Row className="mt-2 mb-5 px-0 px-sm-1 px-md-4 px-xxl-5 g-4 justify-content-center flex-content-stretch">
                        {exerciciosPaginados?.length > 0 ? (
                           exerciciosPaginados?.map((v, k) => (
                              <Col key={k} sm={6} lg={4} xl={3}>
                                 <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                              </Col>
                           ))
                        ) : (
                           <div>
                              <Image className="mb-4" src={noFilter} />
                              <Alert variant="secondary">Nenhum exercício corresponde com os filtros definidos!</Alert>
                           </div>
                        )}
                     </Row>

                     {/* Pagicação */}
                     <Paginacao
                        onPageClick={(pagina) => {
                           if (pagina === paginaAtual) return;
                           dispatch(setPaginaAtual(pagina));
                           dispatch(setExerciciosPaginados(paginarArray(exerciciosFiltrados, pagina, 12)));
                        }}
                        paginaAtual={paginaAtual}
                        totalPaginas={Math.ceil(exerciciosFiltrados?.length / 12)}
                     />
                  </Container>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Exercicios;
