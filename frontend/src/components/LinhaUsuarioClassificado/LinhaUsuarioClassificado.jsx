import Placeholder from "react-bootstrap/Placeholder";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import styles from "./LinhaUsuarioClassificado.module.css";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import CardExercicioMaisTreinado from "../CardExercicioMaisTreinado/CardExercicioMaisTreinado";
import CardEstatisticasDedicacaoSemanal from "../CardEstatisticasDedicacaoSemanal/CardEstatisticasDedicacaoSemanal";
import CardPartesDoCorpoMaisTreinadas from "../CardPartesDoCorpoMaisTreinadas/CardPartesDoCorpoMaisTreinadas";
import Slider from "react-slick";
import PreloadImage from "../ui/PreloadImage";
import errorFoto from "../../assets/noUser.webp";
import { verificarSufixoOrdinalEmIngles } from "../../utils/verificarSufixoOrdinalEmIngles";
import medalhaOuro from "../../assets/trofeus/gold.png";
import medalhaPrata from "../../assets/trofeus/silver.png";
import medalhaBronze from "../../assets/trofeus/bronze.png";

const LinhaUsuarioClassificado = ({ chave, usuario }) => {
   const { t } = useTranslation();
   const { posicao, indisponivel, viewProgress } = t("leaderboard");
   const [mostrar, setMostrar] = useState(false);
   const { apanharNoBackend } = useFetch();
   const { exercicios } = useSelector((state) => state.exercicios);
   const { idioma } = useSelector((state) => state.idioma);
   const [progressoTreinamento, setProgressoTreinamento] = useState(null);

   useEffect(() => {
      if (!progressoTreinamento && usuario?._id) {
         const apanhar = apanharNoBackend(`actions/retornarDadosTreinamento/${usuario?._id}`, "GET").then((res) => {
            setProgressoTreinamento(res);
         });
      }
   }, [usuario?._id, progressoTreinamento]);

   function isEven(number) {
      return number % 2 !== 0 ? true : false;
   }

   function verificarRank() {
      switch (chave + 1) {
         case 1:
            return medalhaOuro;
         case 2:
            return medalhaPrata;
         case 3:
            return medalhaBronze;
         default:
            return null;
      }
   }

   return usuario ? (
      <>
         <Tooltip conteudo={viewProgress}>
            <tr onClick={() => setMostrar(!mostrar)} role="button">
               {/* Rank */}
               <td className="fst-italic fw-medium">
                  {idioma?.includes("en") ? verificarSufixoOrdinalEmIngles(chave + 1) : `${chave + 1} º ${posicao}`}
               </td>
               {/* Usuário */}
               <td>
                  <div className="d-flex align-items-center gap-3">
                     <PreloadImage
                        src={usuario?.foto}
                        alt={"Foto de " + usuario?.nome}
                        className={styles.foto + " rounded p-0 object-fit-cover"}
                        errorSrc={errorFoto}
                        preloaderCn={styles.foto}
                     />
                     <span className="text-truncate">{usuario?.nome}</span>
                     {/* Troféus dos usuários mais dedicados */}
                     {chave < 3 && <Image src={verificarRank()} className={styles.trofeu} />}
                  </div>
               </td>
               {/* Tempo de treino */}
               <td>{segundosParaFormatoHumanizado(usuario?.tempoTotalAbsoluto)}</td>
               {/* Última sessão */}
               <td>
                  {usuario?.ultimosExerciciosPraticados?.length > 0 ? (
                     <span>{moment(usuario?.ultimosExerciciosPraticados?.slice(-1)[0]?.data).fromNow()}</span>
                  ) : (
                     <span className="text-bg-warning px-2 py-1 rounded border-black border small">{indisponivel}</span>
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
         <div style={{ display: "table-row" }} className={`${!mostrar && "border-0"}`} id={styles.textNormal}>
            <td className={!mostrar && "p-0 border-0"} colSpan={12}>
               <Collapse in={mostrar}>
                  <div className={`${styles.td} pb-2`}>
                     {/* Grid do Desktop */}
                     <Row className="mt-0 mb-3 g-4 d-none d-xl-flex">
                        {/* Estatísticas da dedicação Semanal */}
                        <Col xl={4} className="mt-2">
                           <CardEstatisticasDedicacaoSemanal
                              centralizado={true}
                              diaMaisTreinado={progressoTreinamento?.diaMaisTreinado}
                              estatisticasDaSemana={progressoTreinamento?.estatisticasDaSemana}
                              ultimosExerciciosPraticados={progressoTreinamento?.ultimosExerciciosPraticados}
                           />
                        </Col>
                        {/* Partes do corpo mais treinadas */}
                        <Col xl={4} className="border-start border-end border-3 mt-2">
                           <CardPartesDoCorpoMaisTreinadas centralizado partesDoCorpoTreinadas={progressoTreinamento?.partesDoCorpoTreinadas} />
                        </Col>
                        {/* Exercício mais praticado */}
                        <Col xl={4} className="mt-2">
                           <div>
                              <CardExercicioMaisTreinado
                                 exercicio={exercicios?.filter((v) => v.id === progressoTreinamento?.exercicioMaisTreinado?.id)?.[0]}
                                 tempoDeTreino={progressoTreinamento?.exercicioMaisTreinado?.tempoTotalDeTreinoMaisPraticado}
                              />
                           </div>
                        </Col>
                     </Row>
                     {/* Slider do mobile */}
                     <div id={styles.ctSlider} className="d-xl-none ps-1 pe-3 ps-sm-4 pe-sm-4">
                        <Slider>
                           {/* Estatísticas da dedicação Semanal */}
                           <div>
                              <CardEstatisticasDedicacaoSemanal
                                 centralizado={true}
                                 diaMaisTreinado={progressoTreinamento?.diaMaisTreinado}
                                 estatisticasDaSemana={progressoTreinamento?.estatisticasDaSemana}
                                 ultimosExerciciosPraticados={progressoTreinamento?.ultimosExerciciosPraticados}
                              />
                           </div>
                           {/* Partes do corpo mais treinadas */}
                           <div>
                              <CardPartesDoCorpoMaisTreinadas
                                 centralizado
                                 partesDoCorpoTreinadas={progressoTreinamento?.partesDoCorpoTreinadas}
                              />
                           </div>
                           {/* Exercício mais praticado */}
                           <div>
                              <CardExercicioMaisTreinado
                                 exercicio={exercicios?.filter((v) => v.id === progressoTreinamento?.exercicioMaisTreinado?.id)?.[0]}
                                 tempoDeTreino={progressoTreinamento?.exercicioMaisTreinado?.tempoTotalDeTreinoMaisPraticado}
                              />
                           </div>
                        </Slider>
                     </div>
                  </div>
               </Collapse>
            </td>
         </div>
      </>
   ) : (
      <tr>
         <td className="fst-italic fw-medium">
            {idioma?.includes("en") ? verificarSufixoOrdinalEmIngles(chave + 1) : `${chave + 1}º ${posicao}`}
         </td>
         <td>
            <Placeholder className="d-flex align-items-center gap-3" animation="wave">
               <Placeholder className={styles.foto} />
               <Placeholder xs={7} />
            </Placeholder>
         </td>
         <td>
            <Placeholder animation="wave">
               <Placeholder xs={6} />
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
