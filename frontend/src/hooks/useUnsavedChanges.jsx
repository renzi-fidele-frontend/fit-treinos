import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

// TODO: Mais tarde descobrir porque mesmo após fazer o cleanup, o evento impede o roteamento
/** Este Hook confirma se o usuário tem a certeza que quer sair de uma página específica.
 */
const useUnsavedChanges = (progressoSalvo, mensagem) => {
   // Prevenindo o usuário de mudar de rota sem ter salvo o progresso
   const blocker = useBlocker(() => {
      if (!progressoSalvo) {
         console.log("Confirmando a saída!");
         const confirmarSaida = window.confirm(mensagem);
         return !confirmarSaida;
      }
      return false;
   });

   //  Prevenindo o usuário de fechar a aba
   useEffect(() => {
      function handleBeforeUnload(e) {
         if (!progressoSalvo) {
            e.preventDefault();
            e.returnValue = mensagem;
         }
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      if (progressoSalvo) {
         blocker?.proceed?.();
      }

      // Cleanup
      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [progressoSalvo, mensagem, blocker]);

   return blocker;
};
export default useUnsavedChanges;
