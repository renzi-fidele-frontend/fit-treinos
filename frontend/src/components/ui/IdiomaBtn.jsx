import { Dropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIdioma } from "../../state/language/languageSlice";
import i18n from "../../i18n/i18n";
import pt from "../../assets/pt.webp";
import en from "../../assets/usa.webp";
import { useEffect } from "react";

const IdiomaBtn = () => {
   const { idioma } = useSelector((state) => state.idioma);
   const { modoEscuro } = useSelector((state) => state.tema);

   const dispatch = useDispatch();

   // Atualizando o idioma detectado pelo browser
   useEffect(() => {
      dispatch(setIdioma(i18n.language));
   }, []);

   // Mudando de idioma
   i18n.on("languageChanged", (lng) => dispatch(setIdioma(lng)));
   function mudarIdioma(novoIdioma) {
      i18n.changeLanguage(novoIdioma);
   }

   return (
      <Dropdown align={{ xl: "start" }}>
         <Dropdown.Toggle className="py-1 px-2 border-secondary" variant={modoEscuro ? "outline-light" : "outline-dark"}>
            <i className="bi bi-globe"></i>
         </Dropdown.Toggle>

         <Dropdown.Menu>
            <Dropdown.Item
               active={idioma?.includes("en")}
               onClick={() => {
                  mudarIdioma("en");
               }}
               className="d-flex align-items-center gap-2"
            >
               <Image width={23} src={en} /> English
            </Dropdown.Item>
            <Dropdown.Item
               active={idioma?.includes("pt")}
               onClick={() => {
                  mudarIdioma("pt");
               }}
               className="d-flex align-items-center gap-2"
            >
               <Image width={23} src={pt} /> Português
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
export default IdiomaBtn;
