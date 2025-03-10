import { Col, Container, Image, Row } from "react-bootstrap";
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
Chart.register(CategoryScale);

const Dashboard = () => {
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");
   const [tempoTotalTreino, setTempoTotalTreino] = useState(0);
   const [nrTreinosHoje, setNrTreinosHoje] = useState(0);
   const [difPercentualDiasDeTreino, setDifPercentualDiasDeTreino] = useState(0);
   const [mediaTempoPorDia, setMediaTempoPorDia] = useState(0);
   const [diferencialPercentualTempo, setDiferencialPercentualTempo] = useState(0);
   const [estatisticasDaSemana, setEstatisticasDaSemana] = useState(null);
   const [partesDoCorpoTreinadas, setPartesDoCorpoTreinadas] = useState(null);
   const { exercicios } = useSelector((state) => state.exercicios);
   const [exercicioMaisTreinado, setExercicioMaisTreinado] = useState(null);

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
         });
      }
   }, [exercicios]);

   const CardExercicioMaisTreinado = ({ exercicio, tempoDeTreino }) => (
      <div className="mt-3">
         <Link to={`/exercicio/${exercicio?.id}`}>
            <Image className={styles.foto + " border rounded-1"} src={exercicio?.gifUrl} />
         </Link>
         <div className="d-flex align-items-center mt-2">
            <div className="d-flex gap-2">
               {exercicio?.secondaryMuscles?.slice(0, 1)?.map((v, k) => (
                  <p key={k} className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0">
                     {v}
                  </p>
               ))}
            </div>
            <div className="vr mx-2"></div>
            <p className="mb-0">
               Tempo de treino:{" "}
               <span className="fw-medium fst-italic border rounded px-1 shadow-sm">{segundosParaFormatoHumanizado(tempoDeTreino)}</span>
            </p>
         </div>
         <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{exercicio?.name}</p>
      </div>
   );

   return (
      <Container id={styles.ct} className="h-100 py-5">
         <h2 className="fw-semibold mb-4 ">Progresso do treinamento</h2>

         {/* Primeira linha */}
         <Row>
            <Col md={4}>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
                  <div className="d-flex justify-content-between">
                     <h6 id={styles.tit} className="mb-0">
                        Tempo total de treino
                     </h6>
                     <div className="p-2 rounded" id={styles.icon1}>
                        <i className="bi bi-clock fs-3 "></i>
                     </div>
                  </div>
                  <h5 className="fs-1 fw-bold mb-3">{segundosParaFormatoHumanizado(tempoTotalTreino)}</h5>
                  <p className="text-secondary mb-0">O tempo acumulado praticando exercícios</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
                  <div className="d-flex justify-content-between">
                     <h6 id={styles.tit} className="mb-0">
                        Treinamentos feitos hoje
                     </h6>
                     <div className="p-2 rounded" id={styles.icon2}>
                        <i className="bi bi-person-arms-up fs-3"></i>
                     </div>
                  </div>
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
                  <p className="text-secondary mb-0">Número total de treinamentos executados hoje</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
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
                  <p className="text-secondary mb-0">Tempo dedicado ao treinamento por dia</p>
               </div>
            </Col>
         </Row>

         {/* Segunda linha */}
         <Row className="mt-4 mb-5">
            <Col>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
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
                  <p className="text-secondary mb-0">
                     <span className="fw-semibold">Melhor dia da semana:</span> <i className="bi bi-calendar-day"></i> Qua
                  </p>
                  <p className="text-secondary mb-0">
                     <span className="fw-semibold">Última sessão de treino:</span> 10/02/2025
                  </p>
               </div>
            </Col>
            <Col>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
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
            <Col>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
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
         </Row>

         {/* Últimos exercícios praticados */}
         <Row className="mb-5">
            <Col>
               <h2 className="fw-semibold mb-4">Últimos exercícios praticados</h2>
               <Slider swipeToSlide slidesToShow={3} infinite={false} dots>
                  {exercicios.slice(0, 6)?.map((v, k) => (
                     <CardExercicio customClass="me-4" titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} key={k} />
                  ))}
               </Slider>
            </Col>
         </Row>
      </Container>
   );
};
export default Dashboard;
