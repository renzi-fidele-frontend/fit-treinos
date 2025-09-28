import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** Hook responsável por verificar se o usuário está logado para realizar uma ação sensível */
const useAuthAction = () => {
   const { user } = useSelector((state) => state.auth);
   const navegar = useNavigate();

   function verificarAuth(acaoSensivel) {
      if (user) {
         return acaoSensivel();
      } else {
         return navegar("/entrar");
      }
   }

   return { verificarAuth };
};
export default useAuthAction;
