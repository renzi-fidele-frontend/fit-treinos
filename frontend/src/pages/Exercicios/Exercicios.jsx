import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Exercicios.module.css";
import fotoBanner from "../../assets/bannerEx.png";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFiltros, setPaginaAtual } from "../../state/configs/configsSlice";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import Paginacao from "../../components/Paginacao/Paginacao";
import { paginarArray } from "../../utils/paginarArray";
import { setExerciciosPaginados } from "../../state/exercicios/exerciciosSlice";
import ModalFiltragem from "../../components/ModalFiltragem/ModalFiltragem";
import useFiltrarExercicios from "../../hooks/useFiltrarExercicios";
import noFilter from "../../assets/noFilter.webp";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import { gerarArray } from "../../utils/gerarArray";
import { useTranslation } from "react-i18next";
import useExercisesApiAndDispatchOnStore from "../../hooks/useExercisesApiAndDispatchOnStore";

const Exercicios = () => {
   const { t } = useTranslation();
   const { tit, subtit, titEx, sectionFiltros } = t("exercicios");
   const { partesDoCorpo, equipamentos, musculoAlvo, filtros, paginaAtual } = useSelector((state) => state.configs);
   const { exercicios, exerciciosFiltrados, exerciciosPaginados } = useSelector((state) => state.exercicios);
   const { idioma } = useSelector((state) => state.idioma);
   const dispatch = useDispatch();
   const { filtrarExercicios } = useFiltrarExercicios();

   useExercisesApiAndDispatchOnStore();

   // Modais de filtragem
   const [modalParteDoCorpo, setModalParteDoCorpo] = useState(false);
   const [modalEquipamentos, setModalEquipamentos] = useState(false);
   const [modalMusculosAlvo, setModalMusculosAlvo] = useState(false);

   // Caso a página carrege e hajam filtros
   useEffect(() => {
      if (!exerciciosFiltrados && exercicios) filtrarExercicios(filtros);
   }, [exercicios, filtros]);

   function processarFiltro(filtro) {
      if (idioma?.includes("pt")) {
         return filtro;
      } else {
         if (filtro === "todos") {
            return "All";
         } else {
            return filtro;
         }
      }
   }

   // TODO: Avisar que as vezes não é ter preciso para poder realizar treinamentos

   return (
      <div>
         {/*  Banner inicial */}
         <BannerTopo titulo={tit} descricao={subtit} fotoModelo={fotoBanner} />
         <Container fluid>
            <Row className="py-4 py-sm-5">
               <Col className="text-center">
                  <Titulo texto={titEx} />
                  {/*  Filtragem  */}
                  <Container className="mb-4 mb-xl-5 mt-5 px-2 ">
                     <Row className="px-sm-5 g-5 justify-content-center">
                        {/* Parte do corpo */}
                        <Col xs={6} lg={4} className="mt-4 mt-xxl-5">
                           <h6 className="fs-4 fw-semibold mb-1 mb-sm-3" id={styles.label}>
                              {sectionFiltros.items[0]}
                           </h6>
                           <p className="mb-2 text-secondary text-capitalize">[{processarFiltro(filtros?.parteDoCorpo)}]</p>
                           <Button variant="outline-primary" onClick={() => setModalParteDoCorpo(true)}>
                              {sectionFiltros.escolher}...
                           </Button>
                           <ModalFiltragem
                              mostrar={modalParteDoCorpo}
                              onClose={() => setModalParteDoCorpo(false)}
                              escolhido={sectionFiltros.items[0]}
                              modo="parteDoCorpo"
                              array={partesDoCorpo}
                           />
                        </Col>
                        {/* Equipamento */}
                        <Col xs={6} lg={4} className="mt-4 mt-xxl-5" id={styles.border}>
                           <h6 className="fs-4 fw-semibold mb-1 mb-sm-3" id={styles.label}>
                              {sectionFiltros.items[1]}
                           </h6>
                           <p className="mb-2 text-secondary text-capitalize">[{processarFiltro(filtros?.equipamento)}]</p>
                           <Button variant="outline-primary" onClick={() => setModalEquipamentos(true)}>
                              {sectionFiltros.escolher}...
                           </Button>
                           <ModalFiltragem
                              mostrar={modalEquipamentos}
                              onClose={() => setModalEquipamentos(false)}
                              escolhido={sectionFiltros.items[1]}
                              modo="equipamento"
                              array={equipamentos}
                           />
                        </Col>
                        {/* Músculo a fortificar */}
                        <Col xs={6} lg={4} className="mt-4 mt-xxl-5">
                           <Form.Group>
                              <h6 className="fs-4 fw-semibold mb-1 mb-sm-3" id={styles.label}>
                                 {sectionFiltros.items[2]}
                              </h6>
                              <p className="mb-2 text-secondary text-capitalize">[{processarFiltro(filtros?.musculoAlvo)}]</p>
                              <Button variant="outline-primary" onClick={() => setModalMusculosAlvo(true)}>
                                 {sectionFiltros.escolher}...
                              </Button>
                              <ModalFiltragem
                                 mostrar={modalMusculosAlvo}
                                 onClose={() => setModalMusculosAlvo(false)}
                                 escolhido={sectionFiltros.items[2]}
                                 modo="musculoAlvo"
                                 array={musculoAlvo}
                              />
                           </Form.Group>
                        </Col>
                     </Row>
                  </Container>
                  {/* Botão de resetar os filtros */}
                  {!(filtros?.equipamento === "todos" && filtros?.musculoAlvo === "todos" && filtros?.parteDoCorpo === "todos") && (
                     <div className="text-center">
                        <Button
                           variant="warning"
                           onClick={() => dispatch(setFiltros({ equipamento: "todos", musculoAlvo: "todos", parteDoCorpo: "todos" }))}
                        >
                           <i className="bi bi-arrow-clockwise"></i> Resetar filtragem
                        </Button>
                     </div>
                  )}

                  {/* Exercicios */}
                  <Container fluid className="mt-5 px-xxl-5">
                     <hr className="mx-5" />
                     <Row className="mt-2 mb-5 px-0 px-sm-1 px-md-4 px-xxl-5 g-4 justify-content-center flex-content-stretch">
                        {exercicios ? (
                           exerciciosPaginados?.length > 0 ? (
                              exerciciosPaginados?.map((v, k) => (
                                 <Col key={k} sm={6} lg={4} xl={3}>
                                    <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                                 </Col>
                              ))
                           ) : (
                              <div>
                                 <Image className="mb-4" src={noFilter} />
                                 <Alert variant="secondary">{sectionFiltros.noFilter}</Alert>
                              </div>
                           )
                        ) : (
                           gerarArray(8).map((v, k) => (
                              <Col key={k} sm={6} lg={4} xl={3}>
                                 <CardExercicio />
                              </Col>
                           ))
                        )}
                     </Row>

                     {/* Pagicação */}
                     <Paginacao
                        onPageClick={(pagina) => {
                           if (pagina === paginaAtual) return;
                           dispatch(setPaginaAtual(pagina));
                           dispatch(setExerciciosPaginados(paginarArray(exerciciosFiltrados, pagina, 12)));
                           window.scroll({ top: 0, behavior: "smooth" });
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
