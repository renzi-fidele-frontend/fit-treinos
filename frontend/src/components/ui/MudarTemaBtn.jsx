import { useDispatch, useSelector } from "react-redux";
import { setModoEscuro } from "../../state/theme/themeSlice";

const MudarTemaBtn = () => {
   const dispatch = useDispatch();
   const { modoEscuro } = useSelector((state) => state.tema);

   function alternarTema() {
      dispatch(setModoEscuro(!modoEscuro));
      let tema = modoEscuro ? "light" : "dark";
      document.documentElement.setAttribute("data-bs-theme", tema);
   }

   return (
      <div
         role="button"
         style={{ height: "fit-content", lineHeight: "0" }}
         onClick={alternarTema}
         className="ms-4 rounded-circle d-flex align-items-center border p-2"
      >
         {!modoEscuro ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
      </div>
   );
};
export default MudarTemaBtn;
