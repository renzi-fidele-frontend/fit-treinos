import { Col, Container, Row } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const Dashboard = () => {
   // TODO: Renderizar o gráfico de estatísticas de treino semanal
   const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
   const dedicacaoSemanal = [120, 60, 150, 50, 76, 30, 90];

   return (
      <Container className="h-100">
         <h2 className="fw-semibold mb-5">Progresso do treinamento</h2>

         {/* Primeira linha */}
         <Row>
            <Col md={4}>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">
                        Tempo total de treino
                     </h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-2">02h30min</h5>
                  <p className="text-secondary fw-medium mb-0">O tempo acumulado praticando exercícios</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">
                        Treinamentos feitos hoje
                     </h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-2">
                     5.00{" "}
                     <span id={styles.small} className="text-small text-success">
                        (+10%)
                     </span>
                  </h5>
                  <p className="text-secondary fw-medium mb-0">Número total de treinamentos executados hoje</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">
                        Média do tempo de treino
                     </h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-2">
                     02min 93s{" "}
                     <span id={styles.small} className="text-small text-success">
                        (+10%)
                     </span>
                  </h5>
                  <p className="text-secondary fw-medium mb-0">Tempo dedicado ao treinamento por dia</p>
               </div>
            </Col>
         </Row>

         {/* Segunda linha */}
         <Row className="mt-4">
            <Col>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <h6 id={styles.tit} className="mb-0">
                     Estatísticas da Dedicação Semanal
                  </h6>

                  <div className="mt-4 mb-3">
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
                     />
                  </div>
                  <p className="text-secondary fw-medium mb-0">* O unidade do tempo de treino está em segundos</p>
               </div>
            </Col>
            <Col>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <h6 id={styles.tit} className="mb-0">
                     Partes do corpo mais treinadas
                  </h6>
               </div>
            </Col>
            <Col>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <h6 id={styles.tit} className="mb-0">
                     Exercício mais praticado
                  </h6>
               </div>
            </Col>
         </Row>
      </Container>
   );
};
export default Dashboard;
