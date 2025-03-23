import { Col, Image, Placeholder, Row } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import { Link } from "react-router-dom";
import mediaTreinos from "../../assets/mediaTreinos.png";
Chart.register(CategoryScale);

const Dashboard = () => {
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");
   const [tempoTotalTreino, setTempoTotalTreino] = useState(null);
   const [nrTreinosHoje, setNrTreinosHoje] = useState(null);
   const [difPercentualDiasDeTreino, setDifPercentualDiasDeTreino] = useState(null);
   const [mediaTempoPorDia, setMediaTempoPorDia] = useState(null);
   const [diferencialPercentualTempo, setDiferencialPercentualTempo] = useState(null);
   const [estatisticasDaSemana, setEstatisticasDaSemana] = useState(null);
   const [partesDoCorpoTreinadas, setPartesDoCorpoTreinadas] = useState(null);
   const [ultimosExerciciosPraticados, setUltimosExerciciosPraticados] = useState(null);
   const { exercicios } = useSelector((state) => state.exercicios);
   const [exercicioMaisTreinado, setExercicioMaisTreinado] = useState(null);
   const { modoEscuro } = useSelector((state) => state.tema);

   useEffect(() => {
      if (exercicios) {
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
               v.ultimosExerciciosPraticados.map((exId) => {
                  return exercicios.find((obj) => obj.id === exId);
               })
            );
            console.log(v.ultimosExerciciosPraticados);
         });
      }
   }, [exercicios]);

   const CardExercicioMaisTreinado = ({ exercicio, tempoDeTreino }) => {
      const musculoSecundario = exercicio?.secondaryMuscles?.slice(0, 1)[0];

      return (
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
                  Tempo de treino:{" "}
                  <span className="fw-medium fst-italic border rounded px-1 shadow-sm">{segundosParaFormatoHumanizado(tempoDeTreino)}</span>
               </p>
            </div>
            <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{exercicio?.name}</p>
         </div>
      );
   };

   return (
      <div id={styles.ct} className="h-100  py-4 py-md-5 px-3  px-md-5 px-lg-0 container-lg">
         <h2 className="fw-semibold mb-3 text-center text-xl-start ">Progresso do treinamento</h2>
         {/* Separador Mobile */}
         <hr className="d-xl-none mb-4" />
         {/* Primeira linha */}
         <Row className="justify-content-center g-3 g-xl-4 flex-wrap flex-xl-nowrap">
            {/* Tempo total de treino */}
            <Col sm={6} xl={4}>
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <div className="d-flex justify-content-between">
                     <h6 id={styles.tit} className="mb-0">
                        Tempo total de treino
                     </h6>
                     <div className="p-2 rounded" id={styles.icon1}>
                        <i className="bi bi-clock fs-3 "></i>
                     </div>
                  </div>
                  {!tempoTotalTreino ? (
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
                     O tempo acumulado praticando exercícios
                  </p>
               </div>
            </Col>
            {/* Treinamentos feitos hoje */}
            <Col sm={6} xl={4}>
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <div className="d-flex justify-content-between">
                     <h6 id={styles.tit} className="mb-0">
                        Treinamentos feitos hoje
                     </h6>
                     <div className="p-2 rounded" id={styles.icon2}>
                        <i className="bi bi-person-arms-up fs-3"></i>
                     </div>
                  </div>
                  {!difPercentualDiasDeTreino ? (
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
                     Total de treinamentos executados hoje
                  </p>
               </div>
            </Col>
            {/* Média do tempo de treino (Desktop) */}
            <Col className="d-none d-xl-block" sm={6} xl={4}>
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <div className="d-flex justify-content-between">
                     <h6 id={styles.tit} className="mb-0">
                        Média do tempo de treino
                     </h6>
                     <div className="p-2 rounded" id={styles.icon3}>
                        <i className="bi bi-hourglass-split fs-3"></i>
                     </div>
                  </div>
                  {!diferencialPercentualTempo ? (
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
                     Tempo dedicado ao treinamento por dia
                  </p>
               </div>
            </Col>
         </Row>

         {/* Segunda linha */}
         <Row className="mt-0 mb-5 g-3 g-xl-4">
            {/* Estatísticas da Dedicação Semanal */}
            <Col sm={6} xl={4}>
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <h6 id={styles.tit} className="mb-0">
                     Estatísticas da Dedicação Semanal
                  </h6>

                  <div className="my-4">
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
                  </div>
                  <p className="text-secondary small">* A Unidade do tempo de treino está em segundos</p>
                  <hr className="mt-4" />
                  <p className="text-secondary mb-0" id={styles.small}>
                     <span className="fw-semibold">Melhor dia da semana:</span> <i className="bi bi-calendar-day"></i> Qua
                  </p>
                  <p className="text-secondary mb-0" id={styles.small}>
                     <span className="fw-semibold">Última sessão de treino:</span> 10/02/2025
                  </p>
               </div>
            </Col>
            {/* Partes do corpo mais treinadas */}
            <Col sm={6} xl={4}>
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <h6 id={styles.tit} className="mb-0">
                     Partes do corpo mais treinadas
                  </h6>
                  <div className="mt-4">
                     {partesDoCorpoTreinadas ? (
                        <Pie
                           data={{
                              labels: partesDoCorpoTreinadas?.map((v) => v?.nome),
                              datasets: [{ data: partesDoCorpoTreinadas?.map((v) => v?.tempoDeTreino) }],
                           }}
                        />
                     ) : (
                        <div>
                           <p>Gráfico carregando...</p>
                        </div>
                     )}
                  </div>
               </div>
            </Col>
            {/* Exercício mais praticado */}
            <Col sm={6} xl={4}>
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <h6 id={styles.tit} className="mb-0">
                     Exercício mais praticado
                  </h6>
                  {exercicios && (
                     <CardExercicioMaisTreinado
                        exercicio={exercicios?.filter((v) => v.id === exercicioMaisTreinado?.id)?.[0]}
                        tempoDeTreino={exercicioMaisTreinado?.tempoTotalDeTreinoMaisPraticado}
                     />
                  )}
               </div>
            </Col>
            {/* Média do tempo de treino (Mobile) */}
            <Col sm={6} className="d-xl-none">
               <div className={`border border-2 px-3 py-4 shadow-sm rounded-2 h-100 ${modoEscuro && "bg-black"}`}>
                  <div className="d-flex justify-content-between">
                     <h6 id={styles.tit} className="mb-0">
                        Média do tempo de treino
                     </h6>
                     <div className="p-2 rounded" id={styles.icon3}>
                        <i className="bi bi-hourglass-split fs-3"></i>
                     </div>
                  </div>
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
                  <p className="text-secondary mb-0" id={styles.small}>
                     Tempo dedicado ao treinamento por dia
                  </p>
                  <Image className="mt-4" src={mediaTreinos} />
               </div>
            </Col>
         </Row>

         {/* Últimos exercícios praticados */}
         <Row className="mb-5 px-sm-4">
            <Col>
               <h2 className="fw-semibold mb-4">Últimos exercícios praticados</h2>
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
                  {ultimosExerciciosPraticados?.map((v, k) => (
                     <CardExercicio
                        customClass="me-4"
                        titulo={v?.name}
                        id={v?.id}
                        foto={v?.gifUrl}
                        categoria={v?.secondaryMuscles?.slice(0, 2)}
                        key={k}
                     />
                  ))}
               </Slider>
            </Col>
         </Row>
      </div>
   );
};
export default Dashboard;
