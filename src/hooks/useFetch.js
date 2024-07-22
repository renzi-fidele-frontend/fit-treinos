import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, opcoes, arrayNoRedux) => {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   async function apanharDados() {
      setLoading(true);
      try {
         const res = await axios.request({ ...opcoes, url });
         console.log("Aconteceu");
         setData(res.data);
      } catch (error) {
         setError(error.message);
      }
      setLoading(false);
   }

   useEffect(() => {
      if (!arrayNoRedux) apanharDados();
   }, [url]);

   return { data, error, loading };
};

export default useFetch;
