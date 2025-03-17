import styles from "./Titulo.module.css"

const Titulo = ({ texto }) => {
   return <h2 id={styles.titulo} className="fs-1 fw-semibold">{texto}</h2>;
};
export default Titulo;
