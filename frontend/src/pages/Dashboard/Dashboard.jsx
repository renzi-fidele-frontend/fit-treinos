import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
Chart.register(CategoryScale);

const Dashboard = () => {
   // TODO: Renderizar o gráfico de estatísticas de treino semanal
   const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
   const dedicacaoSemanal = [150, 60, 200, 50, 76, 30, 90];

   const { categorias: partesDoCorpo, exercicios } = useSelector((state) => state.exercicios);
   const treinosPorCategoria = [1, 0, 4, 0, 0, 4, 0, 2, 8, 0];

   return (
      <Container className="h-100 py-5">
         <h2 className="fw-semibold mb-4 ">Progresso do treinamento</h2>

         {/* Primeira linha */}
         <Row>
            <Col md={4}>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">
                        Tempo total de treino
                     </h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-3">02h30min</h5>
                  <p className="text-secondary mb-0">O tempo acumulado praticando exercícios</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">
                        Treinamentos feitos hoje
                     </h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-3">
                     5.00{" "}
                     <span id={styles.small} className="text-small text-success">
                        (+10%)
                     </span>
                  </h5>
                  <p className="text-secondary mb-0">Número total de treinamentos executados hoje</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">
                        Média do tempo de treino
                     </h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-3">
                     02min 93s{" "}
                     <span id={styles.small} className="text-small text-success">
                        (+10%)
                     </span>
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
                           labels: diasDaSemana,
                           datasets: [
                              {
                                 label: "Tempo de treino",
                                 data: dedicacaoSemanal,
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
                     <Pie data={{ labels: partesDoCorpo, datasets: [{ data: treinosPorCategoria }] }} />
                  </div>
               </div>
            </Col>
            <Col>
               <div className="border border-2 px-3 py-4 shadow-sm rounded-2 h-100">
                  <h6 id={styles.tit} className="mb-0">
                     Exercício mais praticado
                  </h6>
                  {exercicios && (
                     <div className="mt-3">
                        <Image className={styles.foto} src={exercicios[20]?.gifUrl} />
                        <div className="d-flex align-items-center mt-2">
                           <div className="d-flex gap-2">
                              {exercicios[20]?.secondaryMuscles.map((v, k) => (
                                 <p key={k} className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0">
                                    {v}
                                 </p>
                              ))}
                           </div>
                           <div className="vr mx-2"></div>
                           <p className="mb-0">Treinos: 12</p>
                        </div>
                        <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{exercicios[20]?.name}</p>
                     </div>
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
                     <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} key={k} />
                  ))}
               </Slider>
            </Col>
         </Row>

         {/* TODO: Adicionar a estrutura básica da seção das sessões de treino do usuário */}
         {/* Sessões de treino */}
      </Container>
   );
};
export default Dashboard;
