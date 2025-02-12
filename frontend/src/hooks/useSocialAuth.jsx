import { useEffect } from "react";
import useFetch from "./useFetch";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../state/auth/authSlice";

const useSocialAuth = () => {
   const { apanharNoBackend } = useFetch(null, null, null, "manual");
   const dispatch = useDispatch();

   useEffect(() => {
      //const rede_social = window.location.search.split("=")[0];
      const token = window.location.search.split("=")[1];
      if (token) {
         localStorage.setItem("token", token);

         const user = apanharNoBackend("auth/success/social", "GET", { headers: { Authorization: `Bearer ${token}` } }).then((v) => {
            dispatch(setUser(v.user));
            dispatch(setToken(token));
         });
      }

      // Apanhando usuário caso haja um token no localstorage
      const localToken = localStorage.getItem("token");
      if (localToken) {
         const user = apanharNoBackend("auth/success/social", "GET", { headers: { Authorization: `Bearer ${localToken}` } }).then((v) => {
            dispatch(setUser(v.user));
         });
      }
   }, []);

   return null;
};
export default useSocialAuth;
