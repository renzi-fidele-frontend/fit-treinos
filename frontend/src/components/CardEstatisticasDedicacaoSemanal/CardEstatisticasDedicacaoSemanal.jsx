import Placeholder from "react-bootstrap/Placeholder";
import { useTranslation } from "react-i18next";
import styles from "./CardEstatisticasDedicacaoSemanal.module.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { traduzirDiaDaSemana } from "../../utils/traduzirDiaDaSemana";
import { useSelector } from "react-redux";
Chart.register(CategoryScale);

const CardEstatisticasDedicacaoSemanal = ({ estatisticasDaSemana, diaMaisTreinado, ultimoTreino, centralizado }) => {
   const { idioma } = useSelector((state) => state.idioma);
   const { t } = useTranslation();
   const { card4 } = t("dashboard");

   return (
      <div>
         <h6 id={styles.tit} className={`mb-0 ${centralizado && "text-center"}`}>
            {card4.stat}
         </h6>
         <div className="my-3">
            {estatisticasDaSemana ? (
               <Line
                  data={{
                     labels: estatisticasDaSemana?.map((v) => (idioma?.includes("en") ? traduzirDiaDaSemana(v?.dia) : v?.dia)),
                     datasets: [
                        {
                           label: card4.chartLabel,
                           data: estatisticasDaSemana?.map((v) => v?.tempoTreinadoNoDia),
                           fill: true,
                           tension: 0.4,
                           borderColor: "rgb(135, 142, 163)",
                           backgroundColor: "rgba(116, 126, 211, 0.5)",
                           pointBackgroundColor: "#ffffff",
                        },
                     ],
                  }}
                  options={{ responsive: true }}
                  className={styles.chart}
               />
            ) : (
               <Placeholder animation="wave" className="d-flex align-items-center justify-content-center position-relative" xs={12}>
                  <Placeholder className={styles.chartLoad} />
                  <p className="mb-0 position-absolute">{card4.load}</p>
               </Placeholder>
            )}
         </div>
         <p className="text-secondary small">{card4.desc}</p>
         <hr className="mt-3" />
         <p className="text-secondary mb-0" id={styles.small}>
            <span className="fw-semibold">{card4.bestDay}</span> <i className="bi bi-calendar-day"></i>{" "}
            {idioma?.includes("en") ? traduzirDiaDaSemana(diaMaisTreinado) : diaMaisTreinado}
         </p>
         <p className="text-secondary mb-0" id={styles.small}>
            <span className="fw-semibold">{card4.last}</span> {ultimoTreino}
         </p>
         <div className="bg-secondary-subtle rounded px-2 py-1 d-flex gap-2 mt-3" id={styles.jumbo}>
            <i className="bi bi-info-circle mt-1"></i> <p className="mb-0">{card4.desc2}</p>
         </div>
      </div>
   );
};
export default CardEstatisticasDedicacaoSemanal;
