import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = ({ children }) => {
   const path = useLocation().pathname;
   // Scroll para o topo da página sempre que a rota mudar
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [path]);
   return <>{children}</>;
};
export default ScrollTop;
