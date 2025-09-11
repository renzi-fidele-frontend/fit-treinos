import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExercicios } from "../state/exercicios/exerciciosSlice";
import { traduzirTexto } from "../utils/traduzirTexto";
import { setEquipamentos, setMusculoAlvo, setPartesDoCorpo } from "../state/configs/configsSlice";
import useFetch from "./useFetch";
import { exercisesFetchOptions } from "../services/ExercicesApi";

const useExercisesApiAndDispatchOnStore = () => {
   const { exercicios } = useSelector((state) => state.exercicios);
   const { partesDoCorpo, equipamentos, musculoAlvo } = useSelector((state) => state.configs);
   const dispatch = useDispatch();

   // Requisições
   const apanharExercicios = useFetch("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exercisesFetchOptions, exercicios);
   const apanharPartesDoCorpo = useFetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exercisesFetchOptions, partesDoCorpo);
   const apanharEquipamentos = useFetch("https://exercisedb.p.rapidapi.com/exercises/equipmentList", exercisesFetchOptions, equipamentos);
   const apanharMusculoAlvo = useFetch("https://exercisedb.p.rapidapi.com/exercises/targetList", exercisesFetchOptions, musculoAlvo);

   // Armazenando os dados da api
   useEffect(() => {
      if (!exercicios) dispatch(setExercicios(apanharExercicios.data));

      if (!partesDoCorpo) {
         traduzirTexto(apanharPartesDoCorpo.data?.join(" * ")).then((res) => {
            dispatch(setPartesDoCorpo(res.split(" * ").map((v, k) => ({ pt: v, en: apanharPartesDoCorpo.data[k] }))));
         });
      }

      if (!equipamentos) {
         traduzirTexto(apanharEquipamentos.data?.join(" * ")).then((res) => {
            dispatch(setEquipamentos(res.split(" * ").map((v, k) => ({ pt: v, en: apanharEquipamentos.data[k] }))));
         });
      }

      if (!musculoAlvo) {
         traduzirTexto(apanharMusculoAlvo.data?.join(" * ")).then((res) => {
            dispatch(setMusculoAlvo(res.split(" * ").map((v, k) => ({ pt: v, en: apanharMusculoAlvo.data[k] }))));
         });
      }
   }, [
      exercicios,
      equipamentos,
      musculoAlvo,
      partesDoCorpo,
      apanharPartesDoCorpo.data,
      apanharEquipamentos.data,
      apanharMusculoAlvo.data,
      apanharExercicios.data,
      dispatch,
   ]);
};
export default useExercisesApiAndDispatchOnStore;
