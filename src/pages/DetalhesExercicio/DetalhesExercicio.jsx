import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";

const DetalhesExercicio = () => {
   const { id } = useParams();

   const [exercicio, setExercicio] = useState(null);

   const apanharDetalhes = useFetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exercisesFetchOptions, exercicio);

   useEffect(() => {
      if (!exercicio) {
         setExercicio(apanharDetalhes.data);
      }
   }, [id, apanharDetalhes.data, exercicio]);

   return (
      <div>
         {/* TODO: Criar seção de detalhes do exercício */}
         {/* TODO: Criar seção de vídeos do youtube explicando o respectivo objectivo */}
         {/* TODO: Renderizar exercícios com o mesmo tipo de equipamento */}
      </div>
   );
};
export default DetalhesExercicio;
