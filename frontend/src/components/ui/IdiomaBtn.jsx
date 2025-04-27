import { Dropdown } from "react-bootstrap";
import { ContextValue } from "../../context/Provider";

const IdiomaBtn = () => {
   const { idioma, dispatch } = ContextValue();

   function mudarIdioma(lng) {

   }

   return (
      <Dropdown>
         <Dropdown.Toggle variant="outline-light">
            <i className="bi bi-globe"></i>
         </Dropdown.Toggle>

         <Dropdown.Menu>
            <Dropdown.Item
               active={idioma === "en"}
               onClick={() => {
                  mudarIdioma("en");
               }}
            >
               🇬🇧 English
            </Dropdown.Item>
            <Dropdown.Item
               active={idioma === "pt"}
               onClick={() => {
                  mudarIdioma("de");
               }}
            >
               🇵🇹 Português
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
export default IdiomaBtn;
