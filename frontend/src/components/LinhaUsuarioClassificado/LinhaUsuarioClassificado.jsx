import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import styles from "./LinhaUsuarioClassificado.module.css";
import { useTranslation } from "react-i18next";
import moment from "moment";

const LinhaUsuarioClassificado = ({ chave, usuario }) => {
   const { t } = useTranslation();
   const { posicao } = t("leaderboard");

   function isEven(number) {
      return number % 2 !== 0 ? true : false;
   }

   return usuario ? (
      <tr>
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
