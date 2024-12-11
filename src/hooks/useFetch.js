import axios from "axios";
import { useEffect, useState } from "react";

// O dispatch deverá ser realizado no componente pai onde se for utilizar o hook

const useFetch = (url, opcoes, arrayNoRedux) => {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   async function apanharDados(retornar = false) {
      console.log(url);
      setLoading(true);
      try {
         const res = await axios.request({ ...opcoes, url });
         console.log("Aconteceu");
         setData(res.data);
         if (retornar) return res.data;
      } catch (error) {
         setError(error.message);
      }
      setLoading(false);
   }

   function refetch() {
      return apanharDados(true);
   }

   useEffect(() => {
      if (!arrayNoRedux) apanharDados();
   }, [url]);

   return { data, error, loading, refetch };
};

export default useFetch;
