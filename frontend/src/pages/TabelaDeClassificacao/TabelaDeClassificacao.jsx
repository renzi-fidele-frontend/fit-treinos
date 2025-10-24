import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import styles from "./TabelaDeClassificacao.module.css";
import fotoBanner from "../../assets/leaderWomen2.webp";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { gerarArray } from "../../utils/gerarArray";
import LinhaUsuarioClassificado from "../../components/LinhaUsuarioClassificado/LinhaUsuarioClassificado";
import { useTranslation } from "react-i18next";
import Tooltip from "../../components/Tooltip/Tooltip";
import moment from "moment";
import useExercisesApiAndDispatchOnStore from "../../hooks/useExercisesApiAndDispatchOnStore";
import Filtragem from "./Filtragem";

const TabelaDeClassificacao = () => {
   const { t } = useTranslation();
   const { tit, descricao, subtit, tableHeadings } = t("leaderboard");
   const [usuarios, setUsuarios] = useState([]);
   const { apanharNoBackend } = useFetch();
   const { modoEscuro } = useSelector((state) => state.tema);
   const { idioma } = useSelector((state) => state.idioma);
   useExercisesApiAndDispatchOnStore();
   const [mostrarModal, setMostrarModal] = useState(false);
   const { filtro, ordem } = useSelector((state) => state.leaderboard);

   // Apanhando os usuários classificados
   useEffect(() => {
      if (usuarios?.length === 0) {
         const apanhar = apanharNoBackend("actions/retornarUsuariosClassificados").then((v) => {
            setUsuarios(v.usuariosClassificados);
         });
      }
   }, [apanharNoBackend, usuarios]);

   // Controlador do idioma do momentJs
   useEffect(() => {
      if (idioma?.includes("pt")) moment.locale("pt");
      if (idioma?.includes("en")) moment.locale("en");
   }, [idioma]);

   // FIXME: O estado dos filtros não está sendo atualizado em tempo real
   // Controlador da mudança de filtros
   useEffect(() => {
      function aplicarFiltros() {
         let usuariosClassificados;
         if (ordem === "decrescente") {
            if (filtro === "tempo_de_treino") usuariosClassificados = usuarios?.sort((a, b) => b?.tempoTotalAbsoluto - a?.tempoTotalAbsoluto);
            else if (filtro === "treinos") usuariosClassificados = usuarios?.sort((a, b) => b?.nrTreinosRealizados - a?.nrTreinosRealizados);
            // TODO: Filtrar pela data de cadastro
         } else {
            if (filtro === "tempo_de_treino") usuariosClassificados = usuarios?.sort((a, b) => a?.tempoTotalAbsoluto - b?.tempoTotalAbsoluto);
            else if (filtro === "treinos") usuariosClassificados = usuarios?.sort((a, b) => a?.nrTreinosRealizados - b?.nrTreinosRealizados);
         }
         setUsuarios(usuariosClassificados);
      }
      aplicarFiltros();
   }, [filtro, ordem]);

   return (
      <div id={styles.ct}>
         {/* Banner inicial */}
         <BannerTopo titulo={tit} descricao={descricao} fotoModelo={fotoBanner} />
         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row className="pb-5">
               <Col>
                  <div className="d-flex align-items-center justify-content-between">
                     <h2 className="fw-semibold mb-0">{subtit}</h2>
                     {/* Filtragem */}
                     <div className="d-none d-xl-block">
                        <Filtragem />
                     </div>
                     <div className="d-xl-none">
                        <Button variant="secondary" onClick={() => setMostrarModal(true)}>
                           <i className="bi bi-funnel"></i>
                        </Button>
                        <Modal onHide={() => setMostrarModal(false)} show={mostrarModal} centered>
                           <Modal.Header closeButton>
                              <h6 className="mb-0 fs-3">Opções de filtragem</h6>
                           </Modal.Header>
                           <Modal.Body className="pb-4">
                              <Filtragem setMostrarModal={setMostrarModal} />
                           </Modal.Body>
                        </Modal>
                     </div>
                  </div>
                  <hr className="mt-3" />
                  <div id={styles.tableWrapper}>
                     <Table striped className="mt-3 mt-lg-4 mt-xxl-5" bordered hover>
                        <thead className="fst-italic">
                           <tr>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-trophy-fill me-2"></i> {tableHeadings[0].nome}{" "}
                                 <Tooltip conteudo={tableHeadings[0].descricao}>
                                    <i className="bi bi-info-circle ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-person-fill me-2"></i> {tableHeadings[1].nome}
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-clock-fill me-2"></i> {tableHeadings[2].nome}
                                 <Tooltip conteudo={tableHeadings[2].descricao}>
                                    <i className="bi bi-info-circle ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-stopwatch-fill me-2"></i> {tableHeadings[3].nome}
                                 <Tooltip conteudo={tableHeadings[3].descricao}>
                                    <i className="bi bi-info-circle ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-person-arms-up me-2"></i> {tableHeadings[4].nome}
                                 <Tooltip conteudo={tableHeadings[4].descricao}>
                                    <i className="bi bi-info-circle ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-calendar-check me-2"></i> {tableHeadings[5].nome}
                                 <Tooltip conteudo={tableHeadings[5].descricao}>
                                    <i className="bi bi-info-circle ms-2"></i>
                                 </Tooltip>
                              </th>
                           </tr>
                        </thead>
                        <tbody key={usuarios}>
                           {usuarios?.length > 0
                              ? usuarios?.map((v, k) => <LinhaUsuarioClassificado key={k} usuario={v} chave={k} />)
                              : gerarArray(10).map((v, k) => <LinhaUsuarioClassificado key={k} chave={k} />)}
                        </tbody>
                     </Table>
                  </div>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default TabelaDeClassificacao;
