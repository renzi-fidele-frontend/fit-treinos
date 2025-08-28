import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/** Este Hook confirma se o usuário tem a certeza que quer sair de uma página específica. */
const useUnsavedChanges = (progressoSalvo, mensagem) => {
   // Prevenindo o usuário de mudar de rota sem ter salvo o progresso
   useBlocker(() => {
      if (!progressoSalvo) {
         const confirmarSaida = window.confirm(mensagem);
         return !confirmarSaida;
      }
      return false;
   });

   //  Prevenindo o usuário de fechar a aba
   useEffect(() => {
      const handleBeforeUnload = (e) => {
         e.preventDefault();
         e.returnValue = mensagem;
      };

      if (!progressoSalvo) {
         window.addEventListener("beforeunload", handleBeforeUnload);
      }

      // Clean UP
      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [progressoSalvo, mensagem]);
};
export default useUnsavedChanges;
