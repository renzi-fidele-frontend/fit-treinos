import { Col, Image, Row, Table } from "react-bootstrap";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import styles from "./TabelaDeClassificacao.module.css";
import fotoBanner from "../../assets/leaderWomen2.webp";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import { useSelector } from "react-redux";

const TabelaDeClassificacao = () => {
   const [usuarios, setUsuarios] = useState(null);
   const { apanharNoBackend } = useFetch();
   const { modoEscuro } = useSelector((state) => state.tema);

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
            descricao="Seja consistente com o treino para poder chegar ao topo"
            fotoModelo={fotoBanner}
         />
         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row className="pb-5">
               <Col>
                  <h2 className="fw-semibold mb-4">Tabela de classificação</h2>
                  <hr />
                  <div id={styles.tableWrapper}>
                     <Table striped className="mt-3 mt-lg-4 mt-xxl-5" bordered>
                        <thead className="fst-italic">
                           <tr>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-trophy-fill me-2"></i> Rank
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-person-fill me-2"></i> Usuário
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-clock-fill me-2"></i> Tempo de treino
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-person-arms-up me-2"></i> Treinos realizados
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-calendar-check me-2"></i> Cadastrado em
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {usuarios?.map((v, k) => (
                              <tr key={k}>
                                 <td className="fst-italic fw-medium">{k + 1} º lugar</td>
                                 <td>
                                    <div className="d-flex align-items-center gap-3">
                                       <Image id={styles.foto} className="rounded p-0" thumbnail src={v?.foto} />
                                       <span className="text-truncate">{v?.nome}</span>
                                    </div>
                                 </td>
                                 <td>{segundosParaFormatoHumanizado(v?.tempoTotalAbsoluto)}</td>
                                 <td>
                                    <span className={`text-bg-${v?.nrTreinosRealizados > 0 ? "success" : "danger"} px-3 py-1 rounded`}>
                                       {v?.nrTreinosRealizados}
                                    </span>{" "}
                                 </td>
                                 <td>
                                    <i className="bi bi-calendar2-date text-secondary me-1"></i> {new Date(v?.criadoEm).toLocaleDateString()}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default TabelaDeClassificacao;
