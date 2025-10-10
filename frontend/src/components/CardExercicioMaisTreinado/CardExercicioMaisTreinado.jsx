import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";
import styles from "./CardExercicioMaisTreinado.module.css";
import useAnalisarTraducao from "../../hooks/useAnalisarTraducao";
import { segundosParaFormatoHumanizado } from "../../utils/segundosParaFormatoHumanizado";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { traduzirTexto } from "../../utils/traduzirTexto";
import noBestTrain from "../../assets/noBestTrain.png";

const CardExercicioMaisTreinado = ({ exercicio, tempoDeTreino }) => {
   const { idioma } = useSelector((state) => state.idioma);
   const { exercicios } = useSelector((state) => state.exercicios);
   const { investigarMusculoAlvo, investigarParteDoCorpo } = useAnalisarTraducao();
   const { t } = useTranslation();
   const { card4, card5, card6 } = t("dashboard");
   const [titulo, setTitulo] = useState(null);

   useEffect(() => {
      if (exercicio && idioma?.includes("pt")) {
         traduzirTexto(exercicios?.filter((v) => v.id === exercicio?.id)?.[0]?.name).then((v) => setTitulo(v));
      }
   }, [idioma, exercicio, exercicios]);

   return (
      <div>
         <h6 id={styles.tit}>
            {card6.stat}
         </h6>
         <div className="mt-3">
            {exercicio && (
               <div>
                  <Link to={`/exercicio/${exercicio?.id}`} className="position-relative h-100 d-flex justify-content-end align-items-end">
                     <Image className={styles.foto + " border rounded-1"} src={exercicio?.gifUrl} />
                     {/* Tag mobile */}
                     <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 position-absolute d-xxl-none me-1 mb-1 shadow-lg">
                        {investigarMusculoAlvo(exercicio?.secondaryMuscles?.slice(0, 1)[0]) ||
                           investigarParteDoCorpo(exercicio?.secondaryMuscles?.slice(0, 1)[0]) ||
                           exercicio?.secondaryMuscles?.slice(0, 1)[0]}
                     </p>
                  </Link>
                  <div className="d-flex align-items-center mt-2">
                     <div className="d-flex gap-2">
                        {/* Tag desktop */}
                        <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 d-none d-xxl-block ">
                           {investigarMusculoAlvo(exercicio?.secondaryMuscles?.slice(0, 1)[0]) ||
                              investigarParteDoCorpo(exercicio?.secondaryMuscles?.slice(0, 1)[0]) ||
                              exercicio?.secondaryMuscles?.slice(0, 1)[0]}
                        </p>
                     </div>
                     <div className="vr mx-2 d-none d-xxl-block"></div>
                     <p className="mb-0">
                        {card4.tempo}{" "}
                        <span className="fw-medium fst-italic border rounded px-1 shadow-sm">
                           {segundosParaFormatoHumanizado(tempoDeTreino)}
                        </span>
                     </p>
                  </div>
                  <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{idioma?.includes("en") ? exercicio?.name : titulo}</p>
               </div>
            )}
            {exercicio === null && (
               <div>
                  <div to={`/exercicio/${exercicio?.id}`} className="position-relative h-100 d-flex justify-content-end align-items-end">
                     <Placeholder animation="wave" xs={12}>
                        <Placeholder className={styles.fotoLoad + " border rounded-1"} />
                     </Placeholder>
                     {/* Tag mobile */}
                     <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 position-absolute d-xxl-none me-1 mb-1 shadow-lg">
                        <Placeholder>......</Placeholder>
                     </p>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                     <div className="d-flex gap-2">
                        {/* Tag desktop */}
                        <p className="text-capitalize text-bg-secondary px-2 py-1 rounded small mb-0 d-none d-xxl-block ">
                           <Placeholder>......</Placeholder>
                        </p>
                     </div>
                     <div className="vr mx-2 d-none d-xxl-block"></div>
                     <p className="mb-0">
                        {card4.tempo} <span className="fw-medium fst-italic border rounded px-1 shadow-sm">Carregando...</span>
                     </p>
                  </div>
                  <p className="fs-5 fw-semibold text-capitalize mt-2 text-truncate mb-0">{exercicio?.name}</p>
               </div>
            )}
            {exercicio === undefined && (
               <div className="d-flex flex-column gap-3 align-items-center justify-content-center h-100">
                  <Image src={noBestTrain} className={styles.noBestTrain} />
                  <p className="mb-0 tex-light bg-secondary-subtle px-3 py-1 rounded">{card5.noTrain}</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default CardExercicioMaisTreinado;
