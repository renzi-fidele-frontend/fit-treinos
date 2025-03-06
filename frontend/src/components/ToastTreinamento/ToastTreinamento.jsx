import { Button, Image, OverlayTrigger, Toast, ToastContainer, Tooltip } from "react-bootstrap";
import gif from "../../assets/illustration.jpg";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/auth/authSlice";
import { formatarTempo } from "../../utils/formatarSegundos";

const ToastTreinamento = ({ mostrar, onClose, idExercicio }) => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   // Contabilizar o treino durante a sessão
   const [tempo, setTempo] = useState(0);
   const [ativo, setAtivo] = useState(false);
   const intervalRef = useRef(null);
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");
   const [tempoTotal, setTempoTotal] = useState(0);

   function iniciarTreino() {
      setAtivo(true);
      intervalRef.current = setInterval(() => {
         setTempo((prevTempo) => prevTempo + 1);
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
         data: { idExercicio, dataDoTreino: date.toDateString(), tempoDeTreino: tempo },
      }).then((v) => {
         dispatch(setUser({ ...user, progresso: v.progresso }));
         setTempo(0);
         setTempoTotal(v.tempoTotalDeTreino);
      });
   }

   useEffect(() => {
      return () => clearInterval(intervalRef.current);
   }, []);

   useEffect(() => {
      if (idExercicio) {
         const res = apanharNoBackendComAuth(`actions/retornarTempoTotalDeTreinoDeExercicio/${idExercicio}`, "GET").then((v) =>
            setTempoTotal(v.tempoTotalDeTreino)
         );
      }
   }, [idExercicio]);

   return (
      <ToastContainer position="bottom-end" className="position-fixed">
         <Toast show={mostrar} onClose={onClose} className="me-4 mb-4">
            <Toast.Header className="d-flex justify-content-between">
               <strong>
                  <i className="bi bi-alarm me-2"></i>Controle do treinamento
               </strong>
            </Toast.Header>
            <Toast.Body>
               <div className="position-relative w-auto">
                  <Image className="rounded" src={gif} />
                  <div className="w-100 position-absolute text-bg-dark bottom-0 rounded-bottom text-center py-1">
                     <span>
                        Tempo total: <span className="ms-1 text-bg-secondary rounded px-1">{formatarTempo(tempoTotal)}</span>
                     </span>
                  </div>
               </div>
               <p className="mt-2 mb-0">Siga as instruções de como praticar o exercício ou assista os vídeos de treinamento.</p>
               <hr className="my-2" />
               <div className="d-flex justify-content-between align-items-center">
                  <strong className="fw-medium">
                     Tempo de treino: <span className="ms-1 mb-0 p-1 rounded text-bg-success">{formatarTempo(tempo)}</span>
                  </strong>
                  {/* Ações */}
                  <div className="d-flex gap-2">
                     {ativo ? (
                        <Button size="sm" variant="dark" onClick={pausarTreino}>
                           <i className="bi bi-pause"></i> Pausar
                        </Button>
                     ) : (
                        // TODO: Mostrar loading da atualização do progresso do treinamento
                        <>
                           {tempo > 1 && (
                              <OverlayTrigger overlay={<Tooltip style={{ zIndex: 2000 }}>Salvar progresso</Tooltip>}>
                                 <Button size="sm" variant="warning" className="border border-black" onClick={atualizarProgresso}>
                                    <i className="bi bi-floppy"></i>
                                 </Button>
                              </OverlayTrigger>
                           )}
                           <Button size="sm" variant="dark" onClick={iniciarTreino}>
                              <i className="bi bi-play"></i> Iniciar
                           </Button>
                        </>
                     )}
                  </div>
               </div>
            </Toast.Body>
         </Toast>
      </ToastContainer>
   );
};
export default ToastTreinamento;
