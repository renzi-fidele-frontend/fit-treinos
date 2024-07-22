import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, opcoes) => {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   async function apanharDados() {
      setLoading(true);
      try {
         const res = await axios.request({ ...opcoes, url });
         setData(res.data);
      } catch (error) {
         setError(error.message);
      }
      setLoading(false);
   }

   useEffect(() => {
      apanharDados();
   }, [url]);

   return { data, error, loading };
};

export default useFetch;
