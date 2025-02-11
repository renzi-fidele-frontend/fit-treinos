import { useEffect } from "react";
import useFetch from "./useFetch";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../state/auth/authSlice";

const useGoogleAuth = () => {
   const { apanharNoBackend } = useFetch(null, null, null, "manual");
   const dispatch = useDispatch();

   useEffect(() => {
      const token = window.location.search.split("=")[1];
      if (token) {
         localStorage.setItem("token", token);

         const user = apanharNoBackend("auth/success/google", "GET", { headers: { Authorization: `Bearer ${token}` } }).then((v) => {
            dispatch(setUser(...v.user));
            dispatch(setToken(token));
         });
      }
   }, []);

   return null;
};
export default useGoogleAuth;
