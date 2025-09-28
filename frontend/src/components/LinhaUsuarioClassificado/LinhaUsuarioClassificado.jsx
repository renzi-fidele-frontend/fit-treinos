import { Image, Placeholder } from "react-bootstrap";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import styles from "./LinhaUsuarioClassificado.module.css";
import { useTranslation } from "react-i18next";

const LinhaUsuarioClassificado = ({ chave, usuario }) => {
   const { t } = useTranslation();
   const { posicao } = t("leaderboard");

   function isEven(number) {
      return number % 2 !== 0 ? true : false;
   }

   return usuario ? (
      <tr>
         <td className="fst-italic fw-medium">
            {chave + 1} º {posicao}
         </td>
         <td>
            <div className="d-flex align-items-center gap-3">
               <Image id={styles.foto} className="rounded p-0" thumbnail src={usuario?.foto} />
               <span className="text-truncate">{usuario?.nome}</span>
            </div>
         </td>
         <td>{segundosParaFormatoHumanizado(usuario?.tempoTotalAbsoluto)}</td>
         <td>
            <span className={`text-bg-${usuario?.nrTreinosRealizados > 0 ? "success" : "danger"} px-3 py-1 rounded`}>
               {usuario?.nrTreinosRealizados}
            </span>{" "}
         </td>
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
