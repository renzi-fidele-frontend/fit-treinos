import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/Home";
import DetalhesExercicio from "../pages/DetalhesExercicio/DetalhesExercicio";
import Exercicios from "../pages/Exercicios/Exercicios";
import Cadastro from "../pages/Cadastro/Cadastro";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard/Dashboard";
import Favoritos from "../pages/Favoritos/Favoritos";
import PoliticaDePrivacidade from "../pages/PoliticaDePrivacidade/PoliticaDePrivacidade";
import EditarPerfil from "../pages/EditarPerfil/EditarPerfil";
import EditarPerfilSocial from "../pages/EditarPerfil/EditarPerfilSocial";
import App from "../App";
import TabelaDeClassificacao from "../pages/TabelaDeClassificacao/TabelaDeClassificacao";
import TermosDeServico from "../pages/TermosDeServico/TermosDeServico";

const Router = ({ children }) => {
   const { user } = useSelector((state) => state.auth);

   const router = createBrowserRouter([
      {
         path: "/",
         element: <App />,
         children: [
            { path: "/", element: <Home /> },
            {
               path: "/exercicio/:id",
               element: <DetalhesExercicio />,
            },
            {
               path: "/exercicios",
               element: <Exercicios />,
            },
            {
               path: "/cadastro",
               element: !user ? <Cadastro /> : <Navigate to="/" />,
            },
            {
               path: "/entrar",
               element: !user ? <Login /> : <Navigate to="/" />,
            },
            {
               path: "/dashboard",
               element: user ? <Dashboard /> : <Navigate to="/entrar" />,
            },
            {
               path: "/favoritos",
               element: user ? <Favoritos /> : <Navigate to="/entrar" />,
            },
            {
               path: "/leaderboard",
               element: <TabelaDeClassificacao />,
            },
            {
               path: "/usuario/editar_perfil",
               element: user ? user?.facebookId || user?.googleId ? <EditarPerfilSocial /> : <EditarPerfil /> : <Navigate to="/entrar" />,
            },
            {
               path: "/privacy",
               element: <PoliticaDePrivacidade />,
            },
            {
               path: "/terms_and_conditions",
               element: <TermosDeServico />,
            },
         ],
      },
   ]);

   return <RouterProvider router={router}>{children}</RouterProvider>;
};
export default Router;
