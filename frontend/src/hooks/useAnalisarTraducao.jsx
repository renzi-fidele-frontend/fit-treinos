import { useSelector } from "react-redux";

const useAnalisarTraducao = () => {
   const { partesDoCorpo, musculoAlvo, equipamentos } = useSelector((state) => state.configs);
   const { idioma } = useSelector((state) => state.idioma);

   function investigarParteDoCorpo(parteDoCorpo) {
      let parteDoCorpoDescoberta;
      partesDoCorpo.forEach((v) => {
         if (v?.en === parteDoCorpo) parteDoCorpoDescoberta = idioma?.includes("en") ? v?.en : v?.pt;
      });
      return parteDoCorpoDescoberta;
   }

   function investigarMusculoAlvo(musculo) {
      let musculoAlvoDescoberto;
      musculoAlvo.forEach((v) => {
         if (v?.en === musculo) musculoAlvoDescoberto = idioma?.includes("en") ? v?.en : v?.pt;
      });
      return musculoAlvoDescoberto;
   }

   function investigarEquipamento(equipamento) {
      let equipamentoDescoberto;
      equipamentos.forEach((v) => {
         if (v?.en === equipamento) equipamentoDescoberto = idioma?.includes("en") ? v?.en : v?.pt;
      });
      return equipamentoDescoberto;
   }

   return { investigarEquipamento, investigarMusculoAlvo, investigarParteDoCorpo };
};
export default useAnalisarTraducao;
