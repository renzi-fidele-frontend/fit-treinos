import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../state/auth/authSlice";
import { Dropdown, Image, NavLink } from "react-bootstrap";
import styles from "./DropDownBtn.module.css";
import { Link } from "react-router-dom";

const DropDownBtn = ({ customClass }) => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   function deslogar() {
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.clear();
   }

   return (
      <Dropdown drop="start" className={"d-flex align-items-center ms-4 " + customClass}>
         <Dropdown.Toggle id={styles.seta} as="a">
            <Image className="border border-secondary border-1 rounded-circle object-fit-cover " id={styles.fotoUsuario} src={user?.foto} />
         </Dropdown.Toggle>

         <Dropdown.Menu>
            <NavLink as={Link} to="editar_perfil">
               <Dropdown.Item>Editar perfil</Dropdown.Item>
            </NavLink>

            <Dropdown.Item onClick={deslogar} className="text-danger">
               Deslogar
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
export default DropDownBtn;
