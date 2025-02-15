import { Col, Container, Row } from "react-bootstrap";
import styles from "./Dashboard.module.css"

const Dashboard = () => {
   return (
      <Container className="h-100">
         <h2 className="fw-semibold mb-5">Progresso do treinamento</h2>

         {/* Primeira linha */}
         <Row>
            <Col md={4}>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">Tempo total de treino</h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-2">02h30min</h5>
                  <p className="text-secondary fw-medium mb-0">O tempo acumulado praticando exercícios</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">Treinamentos feitos hoje</h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-2">
                     5.00 <span id={styles.small} className="text-small text-success">(+10%)</span>
                  </h5>
                  <p className="text-secondary fw-medium mb-0">Número total de treinamentos executados hoje</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="border px-3 py-4 shadow-sm rounded-2">
                  <div className="d-flex justify-content-between h-100">
                     <h6 id={styles.tit} className="mb-0">Média do tempo de treino</h6>
                  </div>
                  <h5 className="fs-1 fw-bold my-2">
                     02min 93s <span id={styles.small} className="text-small text-success">(+10%)</span>
                  </h5>
                  <p className="text-secondary fw-medium mb-0">Média de calorias queimadas a cada treinamento</p>
               </div>
            </Col>
         </Row>

         {/* Segunda linha */}
         <Row className="mt-4">
            <Col>
               <div></div>
            </Col>
            <Col>
               <div></div>
            </Col>
            <Col>
               <div></div>
            </Col>
         </Row>
      </Container>
   );
};
export default Dashboard;
