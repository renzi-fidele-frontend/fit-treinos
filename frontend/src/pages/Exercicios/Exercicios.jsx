import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Exercicios.module.css";
import fotoBanner from "../../assets/bannerEx.png";
import bg from "../../assets/bg1.jpg";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { setCategorias, setEquipamentos, setMusculoAlvo, setPaginaAtual } from "../../state/configs/configsSlice";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import Paginacao from "../../components/Paginacao/Paginacao";
import { paginarArray } from "../../utils/paginarArray";
import { setExercicios, setExerciciosPaginados } from "../../state/exercicios/exerciciosSlice";
import ModalFiltragem from "../../components/ModalFiltragem/ModalFiltragem";
import useFiltrarExercicios from "../../hooks/useFiltrarExercicios";

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
                  <Col xs={8} sm={7} className="justify-content-center flex-column gap-3 d-flex">
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
            <Row className="py-5">
               <Col className="text-center">
                  <Titulo texto="Encontre todos os exercícios" />
                  {/*  Filtragem  */}
                  
                  <Container className="mb-5 mt-4 px-5 ">
                     <Row className="px-5 g-5">
                        <Col>
                           <h6 className="fs-4 fw-semibold mb-3">Parte do corpo</h6>
                           <Button variant="outline-primary" onClick={() => setModalParteDoCorpo(true)}>
                              Escolher...
                           </Button>
                           <ModalFiltragem
                              mostrar={modalParteDoCorpo}
                              onClose={() => setModalParteDoCorpo(false)}
                              modo="Parte do corpo"
                              array={partesCorpo}
                           />
                           {/* <Form.Select
                              defaultValue={filtros?.parteDoCorpo}
                              onChange={filtrarExercicios}
                              ref={parteDoCorpoRef}
                              className="text-capitalize"
                           >
                              <option value="todos">Todos</option>
                              {partesCorpo?.map((v, k) => (
                                 <option key={k} value={v}>
                                    {v}
                                 </option>
                              ))}
                           </Form.Select> */}
                        </Col>
                        <Col>
                           <Form.Group>
                              <h6 className="fs-4 fw-semibold mb-3">Equipamento</h6>
                              <Button variant="outline-primary" onClick={() => setModalEquipamentos(true)}>
                                 Escolher...
                              </Button>
                              <ModalFiltragem
                                 mostrar={modalEquipamentos}
                                 onClose={() => setModalEquipamentos(false)}
                                 modo="Equipamento"
                                 array={equipamentos}
                              />
                              {/* <Form.Select
                                 defaultValue={filtros?.equipamento}
                                 onChange={filtrarExercicios}
                                 ref={equipamentoRef}
                                 className="text-capitalize"
                              >
                                 <option value="todos">Todos</option>
                                 {equipamentos?.map((v, k) => (
                                    <option value={v} key={k}>
                                       {v}
                                    </option>
                                 ))}
                              </Form.Select> */}
                           </Form.Group>
                        </Col>
                        <Col>
                           <Form.Group>
                              <h6 className="fs-4 fw-semibold mb-3">Músculo a fortificar</h6>
                              <Button variant="outline-primary" onClick={() => setModalMusculosAlvo(true)}>
                                 Escolher...
                              </Button>
                              <ModalFiltragem
                                 mostrar={modalMusculosAlvo}
                                 onClose={() => setModalMusculosAlvo(false)}
                                 modo="Músculo a fortificar"
                                 array={musculoAlvo}
                              />
                              {/* <Form.Select
                                 defaultValue={filtros?.musculoAlvo}
                                 onChange={filtrarExercicios}
                                 ref={musculoAlvoRef}
                                 className="text-capitalize"
                              >
                                 <option value="todos">Todos</option>
                                 {musculoAlvo?.map((v, k) => (
                                    <option value={v} key={k}>
                                       {v}
                                    </option>
                                 ))}
                              </Form.Select> */}
                           </Form.Group>
                        </Col>
                     </Row>
                  </Container>

                  {/* Exercicios */}
                  <Container fluid className="mt-5 px-5">
                     <hr className="mx-5" />

                     <Row className="mt-2 mb-5 px-5 mx-5 g-4 justify-content-center flex-content-stretch">
                        {exerciciosPaginados?.map((v, k) => (
                           <Col key={k} xs={3}>
                              <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                           </Col>
                        ))}
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
