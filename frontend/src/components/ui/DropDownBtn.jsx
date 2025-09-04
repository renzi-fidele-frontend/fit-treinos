import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import { Dropdown, Image } from "react-bootstrap";
import styles from "./DropDownBtn.module.css";
import { Link, useLocation } from "react-router-dom";

const UserDropdown = ({ customClass }) => {
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
               Editar perfil
            </Dropdown.Item>

            <Dropdown.Item onClick={deslogar} className="text-danger">
               <i className="bi bi-box-arrow-in-left"></i> Deslogar
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
export default UserDropdown;
