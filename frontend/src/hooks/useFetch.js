import axios from "axios";
import { useEffect, useState } from "react";

// O dispatch deverá ser realizado no componente pai onde se for utilizar o hook

const useFetch = (url, opcoes, arrayNoRedux, modo = "automatico") => {
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

   async function apanharDadosComParam(url) {
      console.log(url);
      setLoading(true);
      try {
         const res = await axios.request({ ...opcoes, url });
         console.log("Aconteceu");
         setData(res.data);
         return res.data;
      } catch (error) {
         setError(error.message);
      }
      setLoading(false);
   }

   async function apanharNoBackend(endpoint, method, options) {
      setLoading(true);
      try {
         const res = await axios.request({ url: `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, method, ...options });
         console.log("Fetch ao servidor");
         return res.data;
      } catch (error) {
         return { error: error.response.data.message };
      } finally {
         setLoading(false);
      }
   }

   function refetch() {
      return apanharDados(true);
   }

   useEffect(() => {
      if (!arrayNoRedux && modo === "automatico") apanharDados();
   }, [url]);

   return { data, error, loading, refetch, apanharDadosComParam, apanharNoBackend };
};

export default useFetch;
