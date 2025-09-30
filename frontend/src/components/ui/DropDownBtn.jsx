import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import Dropdown from "react-bootstrap/Dropdown"
import Image from "react-bootstrap/Image"
import styles from "./DropDownBtn.module.css";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserDropdown = ({ customClass }) => {
   const { t } = useTranslation();
   const { editar, sair } = t("header");
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);

   function deslogar() {
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.clear();
   }

   const location = useLocation();

   return (
      <Dropdown drop="start" className={"d-flex align-items-center ms-sm-4 " + customClass}>
         <Dropdown.Toggle id={styles.seta} as="a">
            <Image className="border border-secondary border-1 rounded-circle object-fit-cover " id={styles.fotoUsuario} src={user?.foto} />
         </Dropdown.Toggle>

         <Dropdown.Menu>
            <Dropdown.Item active={location.pathname === "/usuario/editar_perfil"} as={Link} to="/usuario/editar_perfil">
               {editar}
            </Dropdown.Item>

            <Dropdown.Item onClick={deslogar} className="text-danger">
               <i className="bi bi-box-arrow-in-left"></i> {sair}
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
export default UserDropdown;
