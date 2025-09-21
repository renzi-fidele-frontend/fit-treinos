import { Button, Image, OverlayTrigger, Spinner, Toast, ToastContainer, Tooltip } from "react-bootstrap";
import gif from "../../assets/illustration.jpg";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/auth/authSlice";
import { formatarTempo } from "../../utils/formatarSegundos";
import { useTranslation } from "react-i18next";

// TODO: Renderizar uma animação de confetti ao se treinar um exercício
const ToastTreinamento = ({ mostrar, onClose, idExercicio, parteDoCorpo, tempo, setTempo, ativo, setAtivo }) => {
   const { t } = useTranslation();
   const { controle } = t("exercicio");
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { modoEscuro } = useSelector((state) => state.tema);

   const intervalRef = useRef(null);
   const { apanharNoBackendComAuth, loading } = useFetch(null, null, null, "manual");
   const [tempoTotal, setTempoTotal] = useState(0);

   function iniciarTreino() {
      setAtivo(true);
      intervalRef.current = setInterval(() => {
         setTempo((prevState) => prevState + 1);
      }, 1000);
   }

   function pausarTreino() {
      clearInterval(intervalRef.current);
      setAtivo(false);
   }

   function atualizarProgresso() {
      const date = new Date();
      // Atualizar no array dos últimos exercícios praticados
      const res = apanharNoBackendComAuth("actions/atualizarProgresso", "PATCH", {
         data: { idExercicio, dataDoTreino: date.toDateString(), tempoDeTreino: tempo, parteDoCorpo },
      }).then((v) => {
         dispatch(setUser({ ...user, progresso: v.progresso, ultimosExerciciosPraticados: v.ultimosExerciciosPraticados }));
         setTempo(0);
         setTempoTotal(v.tempoTotalDeTreino);
      });
   }

   useEffect(() => {
      return () => clearInterval(intervalRef.current);
   }, []);

   useEffect(() => {
      if (idExercicio && user) {
         const res = apanharNoBackendComAuth(`actions/retornarTempoTotalDeTreinoDeExercicio/${idExercicio}`, "GET").then((v) =>
            setTempoTotal(v.tempoTotalDeTreino)
         );
      }
   }, [idExercicio]);

   const Acoes = () => (
      <div className={`d-flex gap-2 ${!mostrar && "justify-content-center mt-2"}`}>
         {ativo ? (
            <Button size="sm" variant={modoEscuro ? "secondary" : "dark"} onClick={pausarTreino}>
               <i className="bi bi-pause"></i> {controle.pause}
            </Button>
         ) : (
            <>
               {tempo > 1 && (
                  <OverlayTrigger overlay={<Tooltip style={{ zIndex: 2000 }}>{controle.save}</Tooltip>}>
                     <Button size="sm" variant="warning" className="border border-black " onClick={atualizarProgresso}>
                        {loading ? <Spinner size="sm" /> : <i className="bi bi-floppy"></i>}
                     </Button>
                  </OverlayTrigger>
               )}
               <Button size="sm" variant={modoEscuro ? "secondary" : "dark"} onClick={iniciarTreino}>
                  <i className="bi bi-play"></i> {controle.start}
               </Button>
            </>
         )}
      </div>
   );

   return (
      <div>
         {!mostrar && tempo > 0 && (
            <div className="position-fixed end-0 bottom-0 me-4 mb-4 text-center border shadow-lg p-2 rounded">
               <h6 className="border-bottom pb-1">
                  <i className="bi bi-alarm me-1"></i> {controle.current}
               </h6>
               <p className="mb-0 text-bg-success rounded">{formatarTempo(tempo)}</p>
               <Acoes />
            </div>
         )}

         <ToastContainer position="bottom-end" className="position-fixed">
            <Toast show={mostrar} onClose={onClose} className="me-4 mb-4">
               <Toast.Header className="d-flex justify-content-between">
                  <strong>
                     <i className="bi bi-alarm me-2"></i>
                     {controle.tit}
                  </strong>
               </Toast.Header>
               <Toast.Body>
                  <div className="position-relative w-auto">
                     <Image className="rounded" src={gif} />
                     <div
                        className={`w-100 position-absolute ${
                           modoEscuro ? "bg-black" : "text-bg-dark"
                        } bottom-0 rounded-bottom text-center py-1`}
                     >
                        <span>
                           {controle.time} <span className="ms-1 text-bg-secondary rounded px-1">{formatarTempo(tempoTotal)}</span>
                        </span>
                     </div>
                  </div>
                  <p className="mt-2 mb-0">{controle.info}</p>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between align-items-center">
                     <strong className="fw-medium">
                        {controle.current} <span className="ms-1 mb-0 p-1 rounded text-bg-success">{formatarTempo(tempo)}</span>
                     </strong>
                     <Acoes />
                  </div>
               </Toast.Body>
            </Toast>
         </ToastContainer>
      </div>
   );
};
export default ToastTreinamento;
