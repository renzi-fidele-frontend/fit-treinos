import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import styles from "./LinhaUsuarioClassificado.module.css";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";
import { CategoryScale } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { traduzirDiaDaSemana } from "../../utils/traduzirDiaDaSemana";
import useAnalisarTraducao from "../../hooks/useAnalisarTraducao";
Chart.register(CategoryScale);

const LinhaUsuarioClassificado = ({ chave, usuario }) => {
   const { t } = useTranslation();
   const { posicao } = t("leaderboard");
   const { card4, card5, card6 } = t("dashboard");
   const [mostrar, setMostrar] = useState(false);
   const { apanharNoBackend } = useFetch();
   const { idioma } = useSelector((state) => state.idioma);
   const [progressoTreinamento, setProgressoTreinamento] = useState(null);
   const { investigarParteDoCorpo } = useAnalisarTraducao();

   useEffect(() => {
      if (!progressoTreinamento && usuario?._id) {
         const apanhar = apanharNoBackend(`actions/retornarDadosTreinamento/${usuario?._id}`, "GET").then((res) => {
            setProgressoTreinamento(res);
            console.log(res?.partesDoCorpoTreinadas?.map((v) => (idioma?.includes("en") ? v?.nome : investigarParteDoCorpo(v?.nome))));
            console.log(res?.partesDoCorpoTreinadas?.map((v) => v?.tempoDeTreino));
         });
      }
   }, [usuario?._id, progressoTreinamento]);

   function isEven(number) {
      return number % 2 !== 0 ? true : false;
   }

   return usuario ? (
      <>
         <Tooltip conteudo="Visualizar progresso">
            <tr onClick={() => setMostrar(!mostrar)} role="button">
               {/* Rank */}
               <td className="fst-italic fw-medium">
                  {chave + 1} º {posicao}
               </td>
               {/* Usuário */}
               <td>
                  <div className="d-flex align-items-center gap-3">
                     <Image id={styles.foto} className="rounded p-0" thumbnail src={usuario?.foto} />
                     <span className="text-truncate">{usuario?.nome}</span>
                  </div>
               </td>
               {/* Tempo de treino */}
               <td>{segundosParaFormatoHumanizado(usuario?.tempoTotalAbsoluto)}</td>
               {/* Última sessão */}
               <td>
                  {usuario?.ultimosExerciciosPraticados?.length > 0 ? (
                     <span>{moment(usuario?.ultimosExerciciosPraticados?.slice(-1)[0]?.data).fromNow()}</span>
                  ) : (
                     <span className="text-bg-warning px-2 py-1 rounded border-black border small">Indisponível</span>
                  )}
               </td>
               {/* Treinos realizados */}
               <td>
                  <span className={`text-bg-${usuario?.nrTreinosRealizados > 0 ? "success" : "danger"} px-3 py-1 rounded`}>
                     {usuario?.nrTreinosRealizados}
                  </span>{" "}
               </td>
               {/* Cadastrado em */}
               <td>
                  <i className="bi bi-calendar2-date text-secondary me-1"></i> {new Date(usuario?.criadoEm).toLocaleDateString()}
               </td>
            </tr>
         </Tooltip>
         {/*  Escondido  */}
         <div style={{ display: "table-row" }} className={`${!mostrar && "border-0"}`}>
            <td className={!mostrar && "p-0 border-0"} colSpan={12}>
               <Collapse in={mostrar}>
                  <div className={`${styles.td} pb-2`}>
                     {/* Grid do Desktop */}
                     <Row className="mt-0 mb-3 g-3 g-xl-4">
                        {/* Estatísticas da Dedicação Semanal */}
                        <Col sm={6} xl={4} className="mt-2">
                           <h6 className="text-center text-primary mb-3">{card4.stat}</h6>
                           <div>
                              <Line
                                 data={{
                                    labels: progressoTreinamento?.estatisticasDaSemana?.map((v) =>
                                       idioma?.includes("en") ? traduzirDiaDaSemana(v?.dia) : v?.dia
                                    ),
                                    datasets: [
                                       {
                                          label: card4.chartLabel,
                                          data: progressoTreinamento?.estatisticasDaSemana?.map((v) => v?.tempoTreinadoNoDia),
                                          fill: true,
                                          tension: 0.4,
                                          borderColor: "rgb(135, 142, 163)",
                                          backgroundColor: "rgba(116, 126, 211, 0.5)",
                                          pointBackgroundColor: "#ffffff",
                                       },
                                    ],
                                 }}
                                 className={styles.chart}
                                 options={{ responsive: true }}
                              />
                              <p className="text-secondary ms-2 mt-3" id={styles.small}>
                                 {card4.desc}
                              </p>
                              <hr className="mt-4" />
                              <p className="text-secondary mb-0" id={styles.small}>
                                 <span className="fw-semibold">{card4.bestDay}</span> <i className="bi bi-calendar-day"></i>{" "}
                                 {idioma?.includes("en")
                                    ? traduzirDiaDaSemana(progressoTreinamento?.diaMaisTreinado)
                                    : progressoTreinamento?.diaMaisTreinado}
                              </p>
                              <p className="text-secondary mb-0" id={styles.small}>
                                 <span className="fw-semibold">{card4.last}</span>{" "}
                                 {moment(progressoTreinamento?.ultimosExerciciosPraticados?.slice(-1)[0]?.data).fromNow()}
                              </p>
                           </div>
                        </Col>
                        <Col sm={6} xl={4} className="border-start border-end border-3 mt-2">
                           <h6 className="text-center text-primary">{card5.stat}</h6>
                           <div>
                              {progressoTreinamento?.partesDoCorpoTreinadas?.length > 0 && (
                                 <Pie
                                    data={{
                                       labels: progressoTreinamento?.partesDoCorpoTreinadas?.map((v) =>
                                          idioma?.includes("en") ? v?.nome : investigarParteDoCorpo(v?.nome)
                                       ),
                                       datasets: [{ data: progressoTreinamento?.partesDoCorpoTreinadas?.map((v) => v?.tempoDeTreino) }],
                                    }}
                                 />
                              )}
                           </div>
                        </Col>
                        {/* TODO: Renderizar o exercícios mais praticado do usuário */}
                        <Col sm={6} xl={4} className="mt-2">
                           <h6 className="text-center text-primary">{card6.stat}</h6>
                        </Col>
                     </Row>
                     {/* Slider do mobile */}
                  </div>
               </Collapse>
            </td>
         </div>
      </>
   ) : (
      <tr>
         <td className="fst-italic fw-medium">
            {chave + 1}º {posicao}
         </td>
         <td>
            <Placeholder className="d-flex align-items-center gap-3" animation="wave">
               <Placeholder id={styles.foto} />
               <Placeholder xs={7} />
            </Placeholder>
         </td>
         <td>
            <Placeholder animation="wave">
               <Placeholder xs={6} />
            </Placeholder>
         </td>
         <td>
            <span className={`text-bg-${isEven(chave) ? "success" : "danger"} px-3 pt-1 pb-2 rounded`}>
               <Placeholder animation="wave">
                  <Placeholder className="rounded" xs={2} />
               </Placeholder>
            </span>
         </td>
         <td>
            <div className="d-flex align-items-center">
               <i className="bi bi-calendar2-date text-secondary me-1"></i>
               <Placeholder xs={12} animation="wave" className="d-flex gap-1 ms-2">
                  <Placeholder size="sm" xs={1} />/
                  <Placeholder size="sm" xs={1} />/
                  <Placeholder size="sm" xs={1} />
               </Placeholder>
            </div>
         </td>
      </tr>
   );
};
export default LinhaUsuarioClassificado;
