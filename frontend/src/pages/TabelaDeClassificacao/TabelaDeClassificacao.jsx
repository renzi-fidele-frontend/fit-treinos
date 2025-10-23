import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
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

const TabelaDeClassificacao = () => {
   const { t } = useTranslation();
   const { tit, descricao, subtit, tableHeadings } = t("leaderboard");
   const [usuarios, setUsuarios] = useState(null);
   const { apanharNoBackend } = useFetch();
   const { modoEscuro } = useSelector((state) => state.tema);
   const { idioma } = useSelector((state) => state.idioma);
   useExercisesApiAndDispatchOnStore();

   useEffect(() => {
      const apanhar = apanharNoBackend("actions/retornarUsuariosClassificados").then((v) => {
         setUsuarios(v.usuariosClassificados);
      });

      if (idioma?.includes("pt")) moment.locale("pt");
      if (idioma?.includes("en")) moment.locale("en");
   }, [idioma]);

   const Filtragem = () => {
      const [filtros, setFiltros] = useState({
         filtro: "rank",
         ordem: "decrescente",
      });
   };

   return (
      <div id={styles.ct}>
         {/* Banner inicial */}
         <BannerTopo titulo={tit} descricao={descricao} fotoModelo={fotoBanner} />
         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row className="pb-5">
               <Col>
                  <div className="d-flex align-items-center justify-content-between">
                     <h2 className="fw-semibold">{subtit}</h2>
                     {/* TODO: Adicionar funcionalidade de filtragem */}
                     {/* Filtragem */}
                     <div className="d-flex gap-3 align-items-center">
                        <h5>Filtrar por: </h5>
                        <Nav variant="pills" defaultActiveKey="rank">
                           <Nav.Item className="border rounded">
                              <Nav.Link eventKey="rank">Rank</Nav.Link>
                           </Nav.Item>
                           <Nav.Item className="border rounded">
                              <Nav.Link eventKey="tempo_de_treino">Tempo de treino</Nav.Link>
                           </Nav.Item>
                           <Nav.Item className="border rounded">
                              <Nav.Link eventKey="treinos">Treinos realizados</Nav.Link>
                           </Nav.Item>
                        </Nav>
                        <div className="vr"></div>
                        <Nav className="ordem" variant="pills" defaultActiveKey="decrescente">
                           <Nav.Item className="border rounded">
                              <Nav.Link eventKey="decrescente">
                                 <i className="bi bi-sort-down"></i>
                              </Nav.Link>
                           </Nav.Item>
                           <Nav.Item className="border rounded">
                              <Nav.Link eventKey="crescente">
                                 <i className="bi bi-sort-up"></i>
                              </Nav.Link>
                           </Nav.Item>
                        </Nav>
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
                        <tbody>
                           {usuarios
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
