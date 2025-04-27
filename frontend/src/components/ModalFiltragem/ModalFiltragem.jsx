import { Button, ListGroup, Modal } from "react-bootstrap";
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

const ModalFiltragem = ({ mostrar, onClose, modo, array }) => {
   const { t } = useTranslation();
   const { sectionFiltros } = t("exercicios");
   const { tit, aplicar, cancelar } = sectionFiltros;
   const dispatch = useDispatch();
   const { filtros } = useSelector((state) => state.configs);
   const { modoEscuro } = useSelector((state) => state.tema);
   const [selecionado, setSelecionado] = useState(verificarModo());
   const { filtrarExercicios } = useFiltrarExercicios();

   function verificarModo() {
      switch (modo) {
         case "Parte do corpo":
            return filtros.parteDoCorpo;
         case "Equipamento":
            return filtros.equipamento;
         case "Músculo a fortificar":
            return filtros.musculoAlvo;
         default:
            return null;
      }
   }

   function atualizarFiltros() {
      let filtrosAtualizados;
      if (modo === "Músculo a fortificar") {
         filtrosAtualizados = { ...filtros, musculoAlvo: selecionado };
      } else if (modo === "Equipamento") {
         filtrosAtualizados = { ...filtros, equipamento: selecionado };
      } else if (modo === "Parte do corpo") {
         filtrosAtualizados = { ...filtros, parteDoCorpo: selecionado };
      }
      console.log(filtrosAtualizados);
      dispatch(setFiltros(filtrosAtualizados));
      filtrarExercicios(filtrosAtualizados);
      onClose();
   }

   function processarFoto(nome) {
      if (modo === "Músculo a fortificar") {
         return fotoMusculo(nome);
      } else if (modo === "Equipamento") {
         return fotoEquipamento(nome);
      } else if (modo === "Parte do corpo") {
         return fotoDaParteDoCorpo(nome);
      }
   }

   return (
      <Modal size="xl" className={styles.ct} centered show={mostrar} onHide={onClose}>
         <Modal.Header closeButton>
            <Modal.Title>
               {tit}
               <span className="text-danger">{modo}</span>
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className={styles.modalBd}>
            <ListGroup className="flex-row flex-wrap justify-content-center myList text-center" id={styles.grupo}>
               <ListGroup.Item onClick={() => setSelecionado("todos")} className="text-center" active={selecionado === "todos"} action>
                  <i className="bi bi-ban-fill text-danger mx-auto" id={styles.noFilterIco}></i>
               </ListGroup.Item>
               {array?.map(
                  (v, k) =>
                     processarFoto(v) && (
                        <ListGroup.Item onClick={() => setSelecionado(v)} className="" active={selecionado === v} key={k} action>
                           <div
                              className={`position-relative d-flex align-items-end justify-content-center ${
                                 modoEscuro ? "bg-secondary" : "bg-secondary-subtle"
                              } `}
                           >
                              <ImagePreloader src={processarFoto(v)} />
                              <div className="z-1 w-100 position-absolute bg-black opacity-75" style={{ height: "30px" }}></div>
                              <p className="mb-0 fs-6 position-absolute z-2 shadow-lg text-light fw-bold text-capitalize mb-1" id={styles.txt}>
                                 {v}
                              </p>
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
