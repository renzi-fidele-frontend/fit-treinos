import { Pie } from "react-chartjs-2";
import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";
import { gerarArray } from "../../utils/gerarArray";
import noProgress from "../../assets/noProgress.png";
import styles from "./CardPartesDoCorpoMaisTreinadas.module.css";
import useAnalisarTraducao from "../../hooks/useAnalisarTraducao";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CardPartesDoCorpoMaisTreinadas = ({ partesDoCorpoTreinadas, centralizado }) => {
   const { t } = useTranslation();
   const { card4, card5 } = t("dashboard");
   const { idioma } = useSelector((state) => state.idioma);
   const { investigarParteDoCorpo } = useAnalisarTraducao();

   return (
      <div>
         <h6 id={styles.tit} className={`mb-0 ${centralizado && "text-center"}`}>
            {card5.stat}
         </h6>
         <div className="mt-3">
            {partesDoCorpoTreinadas ? (
               partesDoCorpoTreinadas?.length > 0 ? (
                  <Pie
                     data={{
                        labels: partesDoCorpoTreinadas?.map((v) => (idioma?.includes("en") ? v?.nome : investigarParteDoCorpo(v?.nome))),
                        datasets: [{ data: partesDoCorpoTreinadas?.map((v) => v?.tempoDeTreino) }],
                     }}
                  />
               ) : (
                  <div className={styles.noProgress + " d-flex flex-column align-items-center w-100 gap-3 "}>
                     <Image src={noProgress} />
                     <p className="mb-0 tex-light bg-secondary-subtle px-3 py-1 rounded">{card5.noTrain}</p>
                  </div>
               )
            ) : (
               <Placeholder animation="wave" className="" xs={12}>
                  <div className="mb-4 d-flex gap-2 justify-content-center flex-wrap">
                     {gerarArray(10).map((v, k) => (
                        <Placeholder xs={2} key={k} />
                     ))}
                  </div>
                  <div className="d-flex align-items-center justify-content-center position-relative">
                     <Placeholder className={styles.pieChartLoad} />
                     <p className="mb-0 position-absolute">{card4.load}</p>
                  </div>
               </Placeholder>
            )}
         </div>
      </div>
   );
};
export default CardPartesDoCorpoMaisTreinadas;
