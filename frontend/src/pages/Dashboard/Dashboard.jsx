import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";
import styles from "./Dashboard.module.css";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import mediaTreinos from "../../assets/mediaTreinos.png";

import noBestTrain from "../../assets/noBestTrain.png";
import noLastExs from "../../assets/gif.gif";
import { gerarArray } from "../../utils/gerarArray";
import { useTranslation } from "react-i18next";
import "moment/dist/locale/pt";
import useExercisesApiAndDispatchOnStore from "../../hooks/useExercisesApiAndDispatchOnStore";
import useAnalisarTraducao from "../../hooks/useAnalisarTraducao";
import CardExercicioMaisTreinado from "../../components/CardExercicioMaisTreinado/CardExercicioMaisTreinado";
import CardEstatisticasDedicacaoSemanal from "../../components/CardEstatisticasDedicacaoSemanal/CardEstatisticasDedicacaoSemanal";
import CardPartesDoCorpoMaisTreinadas from "../../components/CardPartesDoCorpoMaisTreinadas/CardPartesDoCorpoMaisTreinadas";

const Dashboard = () => {
   const { t } = useTranslation();
   const { tit, tit2, card1, card2, card3, card4, card5, card6 } = t("dashboard");
   const { idioma } = useSelector((state) => state.idioma);
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");
   const [tempoTotalTreino, setTempoTotalTreino] = useState(null);
   const [nrTreinosHoje, setNrTreinosHoje] = useState(null);
   const [difPercentualDiasDeTreino, setDifPercentualDiasDeTreino] = useState(null);
   const [mediaTempoPorDia, setMediaTempoPorDia] = useState(null);
   const [diferencialPercentualTempo, setDiferencialPercentualTempo] = useState(null);
   const [estatisticasDaSemana, setEstatisticasDaSemana] = useState(null);
   const [partesDoCorpoTreinadas, setPartesDoCorpoTreinadas] = useState(null);
   const [ultimosExerciciosPraticados, setUltimosExerciciosPraticados] = useState(null);
   const [ultimosTreinos, setUltimosTreinos] = useState(null);
   const [diaMaisTreinado, setDiaMaisTreinado] = useState(null);
   const { exercicios } = useSelector((state) => state.exercicios);
   const { modoEscuro } = useSelector((state) => state.tema);
   const [exercicioMaisTreinado, setExercicioMaisTreinado] = useState(null);
   const [fetched, setFetched] = useState(false);
   const { investigarParteDoCorpo } = useAnalisarTraducao();
   useExercisesApiAndDispatchOnStore();

   useEffect(() => {
      if (!fetched && exercicios) {
         const apanharEstatisticasDeTreino = apanharNoBackendComAuth("actions/retornarDadosTreinamento").then((v) => {
            setTempoTotalTreino(v.tempoTotalAbsoluto);
            setNrTreinosHoje(v.nrTreinosHoje);
            setDifPercentualDiasDeTreino(parseFloat(v.diferencialPercentual.toFixed(3)));
            setMediaTempoPorDia(v.mediaTempoPorDia);
            setDiferencialPercentualTempo(parseFloat(v.diferencialPercentualTempo).toFixed(2));
            setEstatisticasDaSemana(v.estatisticasDaSemana);
            setPartesDoCorpoTreinadas(v.partesDoCorpoTreinadas);
            setExercicioMaisTreinado(v.exercicioMaisTreinado);
            setUltimosExerciciosPraticados(
               v.ultimosExerciciosPraticados.map((v) => {
                  return exercicios.find((obj) => obj.id === v.idExercicio);
               })
            );
            setUltimosTreinos(v?.ultimosExerciciosPraticados);
            setDiaMaisTreinado(v.diaMaisTreinado);
            setFetched(true);
         });
      }
   }, [exercicios]);

   return (
      <div id={styles.ct}>
         <div className="h-100 py-4 py-md-5 px-3 px-md-5 px-lg-0 container-lg">
            <h2 className="fw-semibold mb-4 text-center text-xl-start ">{tit}</h2>
            {/* Separador Mobile */}
            <hr className="d-xl-none mb-4" />
            {/* Primeira linha */}
            <Row className="justify-content-center g-3 g-xl-4 flex-wrap flex-xl-nowrap">
               {/* Tempo total de treino */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4 rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <div className="d-flex justify-content-between">
                        <h6 id={styles.tit} className="mb-0">
                           {card1.stat}
                        </h6>
                        <div className="p-2 rounded" id={styles.icon1}>
                           <i className="bi bi-clock fs-3 "></i>
                        </div>
                     </div>
                     {tempoTotalTreino !== null ? (
                        <h5 className="fs-1 fw-bold mb-3">{segundosParaFormatoHumanizado(tempoTotalTreino)}</h5>
                     ) : (
                        <h5 className="fs-1 fw-bold mb-3">
                           <Placeholder animation="wave">
                              <Placeholder className={styles.loadtit} xs={2} />
                              min <Placeholder className={styles.loadtit} xs={2} />s
                           </Placeholder>
                        </h5>
                     )}
                     <p className="text-secondary mb-0" id={styles.small}>
                        {card1.desc}
                     </p>
                  </div>
               </Col>
               {/* Treinamentos feitos hoje */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4 rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <div className="d-flex justify-content-between">
                        <h6 id={styles.tit} className="mb-0">
                           {card2.stat}
                        </h6>
                        <div className="p-2 rounded" id={styles.icon2}>
                           <i className="bi bi-person-arms-up fs-3"></i>
                        </div>
                     </div>
                     {difPercentualDiasDeTreino !== null ? (
                        <h5 className="fs-1 fw-bold mb-3">
                           {nrTreinosHoje}{" "}
                           {difPercentualDiasDeTreino >= 0 ? (
                              <span id={styles.small} className={"text-small text-success"}>
                                 (+{difPercentualDiasDeTreino}%)
                              </span>
                           ) : (
                              <span id={styles.small} className={"text-small text-danger"}>
                                 ({difPercentualDiasDeTreino}%)
                              </span>
                           )}
                        </h5>
                     ) : (
                        <h5 className="fs-1 fw-bold mb-3">
                           <Placeholder animation="wave">
                              <Placeholder xs={2} />{" "}
                              <span id={styles.small} className={"text-small text-success"}>
                                 (+
                                 <Placeholder xs={2} />
                                 %)
                              </span>
                           </Placeholder>
                        </h5>
                     )}

                     <p className="text-secondary mb-0" id={styles.small}>
                        {card2.desc}
                     </p>
                  </div>
               </Col>
               {/* Média do tempo de treino (Desktop) */}
               <Col className="d-none d-xl-block" sm={6} xl={4}>
                  <div className={`px-3 py-4 rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <div className="d-flex justify-content-between">
                        <h6 id={styles.tit} className="mb-0">
                           {card3.stat}
                        </h6>
                        <div className="p-2 rounded" id={styles.icon3}>
                           <i className="bi bi-hourglass-split fs-3"></i>
                        </div>
                     </div>
                     {diferencialPercentualTempo ? (
                        <h5 className="fs-1 fw-bold mb-3">
                           {segundosParaFormatoHumanizado(mediaTempoPorDia)}{" "}
                           {diferencialPercentualTempo >= 0 ? (
                              <span id={styles.small} className={"text-small text-success"}>
                                 (+{diferencialPercentualTempo}%)
                              </span>
                           ) : (
                              <span id={styles.small} className={"text-small text-danger"}>
                                 ({diferencialPercentualTempo}%)
                              </span>
                           )}
                        </h5>
                     ) : (
                        <h5 className="fs-1 fw-bold mb-3">
                           <Placeholder animation="wave">
                              <Placeholder className={styles.loadtit} xs={2} />
                              min <Placeholder className={styles.loadtit} xs={2} />s{" "}
                              <span id={styles.small} className={"text-small text-success"}>
                                 (+
                                 <Placeholder xs={2} />
                                 %)
                              </span>
                           </Placeholder>
                        </h5>
                     )}
                     <p className="text-secondary mb-0" id={styles.small}>
                        {card3.desc}
                     </p>
                  </div>
               </Col>
            </Row>

            {/* Segunda linha */}
            <Row className="mt-0 mb-5 g-3 g-xl-4">
               {/* Estatísticas da Dedicação Semanal */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4 rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <CardEstatisticasDedicacaoSemanal
                        diaMaisTreinado={diaMaisTreinado}
                        estatisticasDaSemana={estatisticasDaSemana}
                        ultimosExerciciosPraticados={ultimosTreinos}
                     />
                  </div>
               </Col>
               {/* Partes do corpo mais treinadas */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <CardPartesDoCorpoMaisTreinadas partesDoCorpoTreinadas={partesDoCorpoTreinadas} />
                  </div>
               </Col>
               {/* Exercício mais praticado */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <h6 id={styles.tit} className="mb-0">
                        {card6.stat}
                     </h6>
                     {exercicios && exercicioMaisTreinado && (
                        <CardExercicioMaisTreinado
                           exercicio={exercicios?.filter((v) => v.id === exercicioMaisTreinado?.id)?.[0]}
                           tempoDeTreino={exercicioMaisTreinado?.tempoTotalDeTreinoMaisPraticado}
                        />
                     )}

                     {exercicioMaisTreinado === false && (
                        <div className="d-flex flex-column gap-3 align-items-center justify-content-center h-100">
                           <Image src={noBestTrain} className={styles.noBestTrain} />
                           <p className="mb-0 tex-light bg-secondary-subtle px-3 py-1 rounded">{card5.noTrain}</p>
                        </div>
                     )}

                     {exercicioMaisTreinado === null && <CardExercicioMaisTreinado />}
                  </div>
               </Col>
               {/* Média do tempo de treino (Mobile) */}
               <Col sm={6} className="d-xl-none">
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <div className="d-flex justify-content-between">
                        <h6 id={styles.tit} className="mb-0">
                           {card3.stat}
                        </h6>
                        <div className="p-2 rounded" id={styles.icon3}>
                           <i className="bi bi-hourglass-split fs-3"></i>
                        </div>
                     </div>
                     {mediaTempoPorDia !== null && diferencialPercentualTempo !== null ? (
                        <h5 className="fs-1 fw-bold mb-3">
                           {segundosParaFormatoHumanizado(mediaTempoPorDia)}{" "}
                           {diferencialPercentualTempo >= 0 ? (
                              <span id={styles.small} className={"text-small text-success"}>
                                 (+{diferencialPercentualTempo}%)
                              </span>
                           ) : (
                              <span id={styles.small} className={"text-small text-danger"}>
                                 ({diferencialPercentualTempo}%)
                              </span>
                           )}
                        </h5>
                     ) : (
                        <h5 className="fs-1 fw-bold mb-3">
                           <Placeholder animation="wave">
                              <Placeholder className={styles.loadtit} xs={2} />
                              min <Placeholder className={styles.loadtit} xs={2} />s{" "}
                              <span id={styles.small} className={"text-small text-success"}>
                                 (+
                                 <Placeholder xs={2} />
                                 %)
                              </span>
                           </Placeholder>
                        </h5>
                     )}
                     <p className="text-secondary mb-0" id={styles.small}>
                        {card3.desc}
                     </p>
                     <Image className="mt-4" src={mediaTreinos} />
                  </div>
               </Col>
            </Row>

            {/* Últimos exercícios praticados */}
            <Row className="mb-5">
               <Col>
                  <h2 className="fw-semibold mb-4">{tit2}</h2>
                  <Slider
                     swipeToSlide
                     slidesToShow={3}
                     responsive={[
                        { breakpoint: 992, settings: { slidesToShow: 2 } },
                        { breakpoint: 576, settings: { slidesToShow: 1 } },
                     ]}
                     infinite={false}
                     dots
                  >
                     {ultimosExerciciosPraticados &&
                        ultimosExerciciosPraticados?.map((v, k) => (
                           <CardExercicio
                              customClass="me-4"
                              titulo={v?.name}
                              id={v?.id}
                              foto={v?.gifUrl}
                              categoria={v?.secondaryMuscles?.slice(0, 2)}
                              key={k}
                           />
                        ))}
                     {ultimosExerciciosPraticados?.length === 0 && (
                        <div className="text-center">
                           <Image src={noLastExs} />
                           <Alert variant="warning">{card5.noTrain}</Alert>
                        </div>
                     )}
                     {ultimosExerciciosPraticados === null && gerarArray(4).map((v, k) => <CardExercicio customClass="me-4" key={k} />)}
                  </Slider>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default Dashboard;
