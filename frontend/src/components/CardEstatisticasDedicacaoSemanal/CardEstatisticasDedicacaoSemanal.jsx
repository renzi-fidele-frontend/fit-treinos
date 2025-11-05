import Placeholder from "react-bootstrap/Placeholder";
import FormSelect from "react-bootstrap/FormSelect";
import { useTranslation } from "react-i18next";
import styles from "./CardEstatisticasDedicacaoSemanal.module.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { traduzirDiaDaSemana } from "../../utils/traduzirDiaDaSemana";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { setPeriodo } from "../../state/configs/configsSlice";
Chart.register(CategoryScale);

const CardEstatisticasDedicacaoSemanal = ({ estatisticasDaSemana, diaMaisTreinado, ultimosExerciciosPraticados, centralizado }) => {
   const { idioma } = useSelector((state) => state.idioma);
   const { t } = useTranslation();
   const { card4, indisponivel } = t("dashboard");
   const dispatch = useDispatch();

   useEffect(() => {
      if (idioma?.includes("pt")) moment.locale("pt");
      if (idioma?.includes("en")) moment.locale("en");
   }, [idioma]);

   return (
      <div>
         <h6 id={styles.tit} className={`mb-4 ${centralizado && "text-center"}`}>
            {card4.stat}
         </h6>
         <div className="my-3">
            {/* Seleção do período de treino */}
            <FormSelect onChange={(e) => dispatch(setPeriodo(e.target.value))} defaultValue="semana" className="mb-2">
               <option value="semana">{card4.filters[0]}</option>
               <option value="mes">{card4.filters[1]}</option>
               <option value="ano">{card4.filters[2]}</option>
            </FormSelect>
            {estatisticasDaSemana ? (
               <div className="position-relative">
                  {/* Gráfico */}
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
                  {/* Overflow de gráfico indisponível */}
                  {estatisticasDaSemana?.length === 0 && (
                     <div className="bg-danger bg-opacity-25 position-absolute start-0 top-0 end-0 bottom-0 d-flex align-items-center justify-content-center">
                        <p>{card4.graficoMorto}</p>
                     </div>
                  )}
               </div>
            ) : (
               <Placeholder animation="wave" className="d-flex align-items-center justify-content-center position-relative" xs={12}>
                  <Placeholder className={styles.chartLoad} />
                  <p className="mb-0 position-absolute">{card4.load}</p>
               </Placeholder>
            )}
         </div>
         {/* Legenda do gráfico */}
         <p className="text-secondary" id={styles.desc}>
            {card4.desc}
         </p>
         <hr className="mt-3" />
         {/* Dia mais treinado da semana */}
         <p className="text-secondary mb-0" id={styles.small}>
            <>
               <span className="fw-semibold">{card4.bestDay}</span> <i className="bi bi-calendar-day"></i>{" "}
               {diaMaisTreinado ? (
                  idioma?.includes("en") ? (
                     traduzirDiaDaSemana(diaMaisTreinado)
                  ) : (
                     diaMaisTreinado
                  )
               ) : (
                  <span className="text-bg-secondary px-1 rounded">{indisponivel}</span>
               )}
            </>
         </p>
         {/* Última seção de treino */}
         <p className="text-secondary mb-0" id={styles.small}>
            <span className="fw-semibold">{card4.last}</span>{" "}
            {ultimosExerciciosPraticados?.length > 0 ? (
               moment(ultimosExerciciosPraticados?.slice(-1)[0]?.data).fromNow()
            ) : (
               <span className="text-bg-danger rounded px-1">{indisponivel}</span>
            )}
         </p>
         {/* Descrição da funcionalidade do gráfico */}

         {/* <div className="bg-secondary-subtle rounded px-2 py-1 d-flex gap-2 mt-3" id={styles.jumbo}>
            <i className="bi bi-info-circle mt-1"></i> <p className="mb-0">{card4.desc2}</p>
         </div> */}
      </div>
   );
};
export default CardEstatisticasDedicacaoSemanal;
