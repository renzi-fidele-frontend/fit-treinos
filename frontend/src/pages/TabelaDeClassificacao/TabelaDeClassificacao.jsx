import { Col, Image, Row, Table } from "react-bootstrap";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import styles from "./TabelaDeClassificacao.module.css";
import fotoBanner from "../../assets/leaderWomen2.webp";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";

const TabelaDeClassificacao = () => {
   const [usuarios, setUsuarios] = useState(null);
   const { apanharNoBackend } = useFetch();

   useEffect(() => {
      const apanhar = apanharNoBackend("actions/retornarUsuariosClassificados").then((v) => {
         setUsuarios(v.usuariosClassificados);
      });
   }, []);

   return (
      <div id={styles.ct}>
         {/* Banner inicial */}
         <BannerTopo
            titulo="Descubra os usuários mais determinados"
            descricao="Descubra o ranking dos usuários que mais dedicam tempo ao treinamento neste site"
            fotoModelo={fotoBanner}
         />
         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row className="pb-5">
               <Col>
                  <h2 className="fw-semibold mb-4">Tabela de classificação</h2>
                  <hr />
                  <Table className="mt-5 fs-5" bordered>
                     <thead className="fs-5 fst-italic">
                        <tr>
                           <th>
                              <i className="bi bi-trophy-fill me-2"></i> Rank
                           </th>
                           <th>
                              <i className="bi bi-person-fill me-2"></i> Usuário
                           </th>
                           <th>
                              <i className="bi bi-clock-fill me-2"></i> Tempo de treino
                           </th>
                           <th>
                              <i className="bi bi-person-arms-up me-2"></i> Treinos realizados
                           </th>
                           <th>
                              <i className="bi bi-calendar-check me-2"></i> Cadastrado em
                           </th>
                        </tr>
                     </thead>
                     {/* TODO: Renderizar os usuário que mais dedicam o tempo */}
                     <tbody>
                        {usuarios?.map((v, k) => (
                           <tr key={k}>
                              <td>{k + 1}º lugar </td>
                              <td>
                                 <div className="d-flex align-items-center gap-3">
                                    <Image className="rounded" style={{ width: 50, height: 50 }} thumbnail src={v?.foto} />
                                    <span>{v?.nome}</span>
                                 </div>
                              </td>
                              <td>{segundosParaFormatoHumanizado(v?.tempoTotalAbsoluto)}</td>
                              <td></td>
                              <td></td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default TabelaDeClassificacao;
