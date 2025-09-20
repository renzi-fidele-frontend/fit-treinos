import { Image } from "react-bootstrap";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import styles from "LinhaUsuarioClassificado.module.css";

const LinhaUsuarioClassificado = ({ key, usuario }) => {
   return (
      <tr>
         <td className="fst-italic fw-medium">{key + 1} º lugar</td>
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
   );
};
export default LinhaUsuarioClassificado;
