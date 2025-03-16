import { useDispatch, useSelector } from "react-redux";
import { setPaginaAtual } from "../state/configs/configsSlice";
import { setExerciciosFiltrados, setExerciciosPaginados } from "../state/exercicios/exerciciosSlice";
import { paginarArray } from "../utils/paginarArray";

const useFiltrarExercicios = () => {
   const { exercicios } = useSelector((state) => state.exercicios);

   const dispatch = useDispatch();
   function filtrarExercicios(filtros) {
      const dadosFiltrados = exercicios
         ?.filter((parteDoCorpo) => (filtros?.parteDoCorpo !== "todos" ? parteDoCorpo?.bodyPart?.includes(filtros?.parteDoCorpo) : true))
         ?.filter((equipamento) => (filtros?.equipamento !== "todos" ? equipamento?.equipment?.includes(filtros?.equipamento) : true))
         ?.filter((musculoAlvo) => (filtros?.musculoAlvo !== "todos" ? musculoAlvo?.target?.includes(filtros?.musculoAlvo) : true));

      dispatch(setPaginaAtual(1));
      dispatch(setExerciciosFiltrados(dadosFiltrados));
      dispatch(setExerciciosPaginados(paginarArray(dadosFiltrados, 1, 12)));
   }

   return { filtrarExercicios };
};
export default useFiltrarExercicios;
