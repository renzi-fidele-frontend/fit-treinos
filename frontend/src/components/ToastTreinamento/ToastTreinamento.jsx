import { Button, Image, Toast, ToastContainer } from "react-bootstrap";
import gif from "../../assets/illustration.jpg";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";

const ToastTreinamento = ({ mostrar, onClose, idExercicio }) => {
   // Contabilizar o treino durante a sessão
   const [tempo, setTempo] = useState(0);
   const [ativo, setAtivo] = useState(false);
   const intervalRef = useRef(null);
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");

   function iniciarTreino() {
      setAtivo(true);
      intervalRef.current = setInterval(() => {
         setTempo((prevTempo) => prevTempo + 1);
      }, 1000);
   }

   function pausarTreino() {
      clearInterval(intervalRef.current);
      setAtivo(false);

      // Ao pausar enviar os dados pra API
      // Adicionar ao progresso do usuário o seguinte: {dataDoTreino: Date, treinos: [{tempoDeTreino: 0, idExercicio: 123}]}

      const date = new Date();
      console.log();

      // Atualizar no array dos últimos exercícios praticados
      const atualizar = apanharNoBackendComAuth("actions/atualizarProgresso", "PATCH", {
         data: { idExercicio: idExercicio, dataDoTreino: date.toDateString(), tempoDeTreino: tempo },
      }).then((v) => console.log(v));
   }

   // Converter segundos para formato humano
   const formatarTempo = (segundos) => {
      const minutos = Math.floor(segundos / 60);
      const segundosRestantes = segundos % 60;
      return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
   };

   useEffect(() => {
      return () => clearInterval(intervalRef.current);
   }, []);

   return (
      <ToastContainer position="bottom-end" className="position-fixed">
         <Toast show={mostrar} onClose={onClose} className="me-4 mb-4">
            <Toast.Header className="d-flex justify-content-between">
               <strong>
                  <i className="bi bi-alarm me-2"></i>Controle do treinamento
               </strong>
            </Toast.Header>
            <Toast.Body>
               <Image src={gif} />
               <p className="mt-2 mb-0">Siga as instruções de como praticar o exercício ou assista os vídeos de treinamento.</p>
               <hr className="my-2" />
               <div className="d-flex justify-content-between align-items-center">
                  <strong className="fw-medium">
                     Tempo de treino: <span className="ms-1 mb-0 p-1 rounded text-bg-secondary">{formatarTempo(tempo)}</span>
                  </strong>
                  {/* Ações */}
                  {ativo ? (
                     <Button size="sm" variant="dark" onClick={pausarTreino}>
                        <i className="bi bi-pause"></i> Pausar
                     </Button>
                  ) : (
                     <Button size="sm" variant="dark" onClick={iniciarTreino}>
                        <i className="bi bi-play"></i> Iniciar
                     </Button>
                  )}
               </div>
            </Toast.Body>
         </Toast>
      </ToastContainer>
   );
};
export default ToastTreinamento;
