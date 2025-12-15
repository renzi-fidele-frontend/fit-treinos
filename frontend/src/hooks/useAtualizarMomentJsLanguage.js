import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Hook personalizado para atualizar a linguagem do moment.js com base na configuração de idioma da aplicação.
 *
 * Este hook monitora o estado de idioma do Redux e sincroniza automaticamente a localização
 * do moment.js sempre que o idioma é alterado. Suporta idiomas em português e inglês.
 */
const useAtualizarMomentJsLanguage = () => {
   const { idioma } = useSelector((state) => state.idioma);
   useEffect(() => {
      if (idioma?.includes("pt")) moment.locale("pt");
      if (idioma?.includes("en")) moment.locale("en");
   }, [idioma]);
};
export default useAtualizarMomentJsLanguage;
