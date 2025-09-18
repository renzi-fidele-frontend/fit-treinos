import { Col, Row, Table } from "react-bootstrap";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import styles from "./TabelaDeClassificacao.module.css";
import fotoBanner from "../../assets/leaderWomen2.webp";

const TabelaDeClassificacao = () => {
   return (
      <div id={styles.ct}>
         {/* Banner inicial */}
         <BannerTopo
            titulo="Descubra os usuários mais determinados"
            descricao="Descubra o ranking dos usuários que mais dedicam tempo ao treinamento neste site"
            fotoModelo={fotoBanner}
         />
         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row>
               <Col>
                  <h2 className="fw-semibold mb-4">Tabela de classificação</h2>
                  <hr />
                  <Table>
                     <thead >
                        <tr>
                           <th>
                              <i className="bi bi-person-fill"></i> Usuário
                           </th>
                           <th>
                              <i className="bi bi-clock-fill"></i> Tempo de treino
                           </th>
                           <th>
                              <i className="bi bi-person-arms-up"></i> Treinos realizados
                           </th>
                           <th>
                              <i className="bi bi-calendar-check"></i> Cadastrado em
                           </th>
                        </tr>
                     </thead>
                     {/* TODO: Renderizar os usuário que mais dedicam o tempo */}
                     <tbody>
                        <tr>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                        </tr>
                     </tbody>
                  </Table>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default TabelaDeClassificacao;
