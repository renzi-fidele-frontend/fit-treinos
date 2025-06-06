import { Alert, Col, Image, Placeholder, Row } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import { Link } from "react-router-dom";
import mediaTreinos from "../../assets/mediaTreinos.png";
import noProgress from "../../assets/noProgress.png";
import noBestTrain from "../../assets/noBestTrain.png";
import noLastExs from "../../assets/gif.gif";
import { gerarArray } from "../../utils/gerarArray";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { setExercicios } from "../../state/exercicios/exerciciosSlice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/dist/locale/pt";
Chart.register(CategoryScale);

const Dashboard = () => {
   const { t } = useTranslation();
   const { tit, tit2, card1, card2, card3, card4, card5, card6 } = t("dashboard");
   const { idioma } = useSelector((state) => state.idioma);
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");
   const dispatch = useDispatch();
   const [tempoTotalTreino, setTempoTotalTreino] = useState(null);
   const [nrTreinosHoje, setNrTreinosHoje] = useState(null);
   const [difPercentualDiasDeTreino, setDifPercentualDiasDeTreino] = useState(null);
   const [mediaTempoPorDia, setMediaTempoPorDia] = useState(null);
   const [diferencialPercentualTempo, setDiferencialPercentualTempo] = useState(null);
   const [estatisticasDaSemana, setEstatisticasDaSemana] = useState(null);
   const [partesDoCorpoTreinadas, setPartesDoCorpoTreinadas] = useState(null);
   const [ultimosExerciciosPraticados, setUltimosExerciciosPraticados] = useState(null);
   const [ultimoTreino, setUltimoTreino] = useState(null);
   const [diaMaisTreinado, setDiaMaisTreinado] = useState(null);
   const { exercicios } = useSelector((state) => state.exercicios);
   const { modoEscuro } = useSelector((state) => state.tema);
   const [exercicioMaisTreinado, setExercicioMaisTreinado] = useState(null);
   const [fetched, setFetched] = useState(false);
   const apanharExercicios = useFetch("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exercisesFetchOptions, exercicios);

   // Armazenando os dados da api
   useEffect(() => {
      if (!exercicios) dispatch(setExercicios(apanharExercicios.data));
   }, [apanharExercicios.data]);

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
            setDiaMaisTreinado(v.diaMaisTreinado);
            setUltimoTreino(moment(v.ultimosExerciciosPraticados.slice(-1)[0].data).fromNow());
            setFetched(true);
         });
      }
   }, [exercicios]);

   useEffect(() => {
      if (idioma?.includes("pt")) moment.locale("pt");
      if (idioma?.includes("en")) moment.locale("en");
   }, [idioma]);

   const CardExercicioMaisTreinado = ({ exercicio, tempoDeTreino }) => {
      const musculoSecundario = exercicio?.secondaryMuscles?.slice(0, 1)[0];

      return exercicio ? (
         <div className="mt-3">
            <Link to={`/exercicio/${exercicio?.id}`} className="position-relative h-100 d-flex justify-content-end align-items-end">
               <Image className={styles.foto + " border rounded-1"} src={exercicio?.gifUrl} />
               {/* Tag mobile */}
               <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 position-absolute d-xxl-none me-1 mb-1 shadow-lg">
                  {musculoSecundario}
               </p>
            </Link>
            <div className="d-flex align-items-center mt-2">
               <div className="d-flex gap-2">
                  {/* Tag desktop */}
                  <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 d-none d-xxl-block ">{musculoSecundario}</p>
               </div>
               <div className="vr mx-2 d-none d-xxl-block"></div>
               <p className="mb-0">
                  {card4.tempo}{" "}
                  <span className="fw-medium fst-italic border rounded px-1 shadow-sm">{segundosParaFormatoHumanizado(tempoDeTreino)}</span>
               </p>
            </div>
            <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{exercicio?.name}</p>
         </div>
      ) : (
         <div className="mt-3">
            <div to={`/exercicio/${exercicio?.id}`} className="position-relative h-100 d-flex justify-content-end align-items-end">
               <Placeholder animation="wave" xs={12}>
                  <Placeholder className={styles.fotoLoad + " border rounded-1"} />
               </Placeholder>
               {/* Tag mobile */}
               <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 position-absolute d-xxl-none me-1 mb-1 shadow-lg">
                  <Placeholder>......</Placeholder>
               </p>
            </div>
            <div className="d-flex align-items-center mt-2">
               <div className="d-flex gap-2">
                  {/* Tag desktop */}
                  <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 d-none d-xxl-block ">
                     <Placeholder>......</Placeholder>
                  </p>
               </div>
               <div className="vr mx-2 d-none d-xxl-block"></div>
               <p className="mb-0">
                  Tempo de treino: <span className="fw-medium fst-italic border rounded px-1 shadow-sm">Carregando...</span>
               </p>
            </div>
            <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{exercicio?.name}</p>
         </div>
      );
   };

   return (
      <div id={styles.ct}>
         <div className="h-100  py-4 py-md-5 px-3  px-md-5 px-lg-0 container-lg">
            <h2 className="fw-semibold mb-4 text-center text-xl-start ">{tit}</h2>
            {/* Separador Mobile */}
            <hr className="d-xl-none mb-4" />
            {/* Primeira linha */}
            <Row className="justify-content-center g-3 g-xl-4 flex-wrap flex-xl-nowrap">
               {/* Tempo total de treino */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
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
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
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
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
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
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <h6 id={styles.tit} className="mb-0">
                        {card4.stat}
                     </h6>
                     <div className="my-4">
                        {estatisticasDaSemana ? (
                           <Line
                              data={{
                                 labels: estatisticasDaSemana?.map((v) => v?.dia),
                                 datasets: [
                                    {
                                       label: "Tempo de treino",
                                       data: estatisticasDaSemana?.map((v) => v?.tempoTreinadoNoDia),
                                       fill: true,
                                       tension: 0.4,
                                       borderColor: "rgb(135, 142, 163)",
                                       backgroundColor: "rgba(116, 126, 211, 0.5)",
                                       pointBackgroundColor: "#ffffff",
                                    },
                                 ],
                              }}
                              options={{ responsive: true }}
                              className={styles.chart}
                           />
                        ) : (
                           <Placeholder animation="wave" className="d-flex align-items-center justify-content-center position-relative" xs={12}>
                              <Placeholder className={styles.chartLoad} />
                              <p className="mb-0 position-absolute">{card4.load}</p>
                           </Placeholder>
                        )}
                     </div>
                     <p className="text-secondary small">{card4.desc}</p>
                     <hr className="mt-4" />
                     <p className="text-secondary mb-0" id={styles.small}>
                        <span className="fw-semibold">{card4.bestDay}</span> <i className="bi bi-calendar-day"></i> {diaMaisTreinado}
                     </p>
                     <p className="text-secondary mb-0" id={styles.small}>
                        <span className="fw-semibold">{card4.last}</span> {ultimoTreino}
                     </p>
                  </div>
               </Col>
               {/* Partes do corpo mais treinadas */}
               <Col sm={6} xl={4}>
                  <div className={`px-3 py-4  rounded-2 h-100 ${modoEscuro ? "bg-dark-subtle border" : "bg-white"}`}>
                     <h6 id={styles.tit} className="mb-0">
                        {card5.stat}
                     </h6>
                     <div className="mt-4">
                        {partesDoCorpoTreinadas ? (
                           partesDoCorpoTreinadas?.length > 0 ? (
                              <Pie
                                 data={{
                                    labels: partesDoCorpoTreinadas?.map((v) => v?.nome),
                                    datasets: [{ data: partesDoCorpoTreinadas?.map((v) => v?.tempoDeTreino) }],
                                 }}
                              />
                           ) : (
                              <div className={styles.noProgress + " d-flex flex-column align-items-center w-100 gap-3 "}>
                                 <Image src={noProgress} />
                                 <p className="mb-0 tex-light bg-secondary-subtle px-3 py-1 rounded">{card5.noTrain}</p>
                              </div>
                           )
                        ) : (
                           <Placeholder animation="wave" className="" xs={12}>
                              <div className="mb-4 d-flex gap-2 justify-content-center flex-wrap">
                                 {gerarArray(10).map((v, k) => (
                                    <Placeholder xs={2} key={k} />
                                 ))}
                              </div>
                              <div className="d-flex align-items-center justify-content-center position-relative">
                                 <Placeholder className={styles.pieChartLoad} />
                                 <p className="mb-0 position-absolute">{card4.load}</p>
                              </div>
                           </Placeholder>
                        )}
                     </div>
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
