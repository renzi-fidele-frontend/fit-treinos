import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import styles from "./ModalFiltragem.module.css";
import { fotoDaParteDoCorpo } from "../../utils/fotoParteCorpo";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setFiltros } from "../../state/configs/configsSlice";
import { fotoEquipamento } from "../../utils/fotoEquipamento";
import { fotoMusculo } from "../../utils/fotoMusculo";
import useFiltrarExercicios from "../../hooks/useFiltrarExercicios";
import ImagePreloader from "./ImagePreloader";
import { useTranslation } from "react-i18next";

const ModalFiltragem = ({ mostrar, onClose, modo, array, escolhido }) => {
   const { t } = useTranslation();
   const { sectionFiltros } = t("exercicios");
   const { tit, aplicar, cancelar } = sectionFiltros;
   const dispatch = useDispatch();
   const { filtros } = useSelector((state) => state.configs);
   const { modoEscuro } = useSelector((state) => state.tema);
   const [selecionado, setSelecionado] = useState(verificarModo());
   const { filtrarExercicios } = useFiltrarExercicios();
   const { idioma } = useSelector((state) => state.idioma);

   function verificarModo() {
      switch (modo) {
         case "parteDoCorpo":
            return filtros.parteDoCorpo;
         case "equipamento":
            return filtros.equipamento;
         case "musculoAlvo":
            return filtros.musculoAlvo;
         default:
            return null;
      }
   }

   function atualizarFiltros() {
      let filtrosAtualizados;
      if (modo === "musculoAlvo") {
         filtrosAtualizados = { ...filtros, musculoAlvo: selecionado };
      } else if (modo === "equipamento") {
         filtrosAtualizados = { ...filtros, equipamento: selecionado };
      } else if (modo === "parteDoCorpo") {
         filtrosAtualizados = { ...filtros, parteDoCorpo: selecionado };
      }
      dispatch(setFiltros(filtrosAtualizados));
      filtrarExercicios(filtrosAtualizados);
      onClose();
   }

   function processarFoto(nome) {
      if (modo === "musculoAlvo") {
         return fotoMusculo(nome);
      } else if (modo === "equipamento") {
         return fotoEquipamento(nome);
      } else if (modo === "parteDoCorpo") {
         return fotoDaParteDoCorpo(nome);
      }
   }

   return (
      <Modal size="xl" className={styles.ct} centered show={mostrar} onHide={onClose}>
         <Modal.Header closeButton>
            <Modal.Title>
               {tit}
               <span className="text-danger">{escolhido}</span>
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className={styles.modalBd}>
            <ListGroup className="flex-row flex-wrap justify-content-center myList text-center" id={styles.grupo}>
               <ListGroup.Item onClick={() => setSelecionado("todos")} className="text-center" active={selecionado === "todos"} action>
                  <i className="bi bi-ban-fill text-danger mx-auto" id={styles.noFilterIco}></i>
               </ListGroup.Item>
               {array?.map(
                  (v, k) =>
                     processarFoto(v?.en) && (
                        <ListGroup.Item onClick={() => setSelecionado(v?.en)} active={selecionado === v?.en} key={k} action>
                           <div className={`d-flex justify-content-center flex-column ${modoEscuro ? "bg-secondary" : "bg-secondary-subtle"} `}>
                              <ImagePreloader src={processarFoto(v?.en)} />
                              <div className="w-100 text-bg-dark">
                                 <p className="mb-0 fw-bold text-capitalize">{idioma?.includes("en") ? v?.en : v?.pt}</p>
                              </div>
                           </div>
                        </ListGroup.Item>
                     )
               )}
            </ListGroup>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={atualizarFiltros}>{aplicar}</Button>
            <Button variant="secondary" onClick={onClose}>
               {cancelar}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalFiltragem;
