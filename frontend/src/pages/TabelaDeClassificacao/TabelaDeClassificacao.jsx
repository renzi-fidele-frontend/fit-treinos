import Col from "react-bootstrap/Col";
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

// TODO: Adicionar funcionalidade de filtragem
// TODO: Adicionar a seção do "Último treino"
// TODO: Adicionar uma descrição completa para cada seção da tabela de classificações

const TabelaDeClassificacao = () => {
   const { t } = useTranslation();
   const { tit, descricao, subtit, tableHeadings } = t("leaderboard");
   const [usuarios, setUsuarios] = useState(null);
   const { apanharNoBackend } = useFetch();
   const { modoEscuro } = useSelector((state) => state.tema);

   useEffect(() => {
      const apanhar = apanharNoBackend("actions/retornarUsuariosClassificados").then((v) => {
         setUsuarios(v.usuariosClassificados);
      });
   }, []);

   return (
      <div id={styles.ct}>
         {/* Banner inicial */}
         <BannerTopo titulo={tit} descricao={descricao} fotoModelo={fotoBanner} />
         <div className="py-4 py-md-5 px-sm-5 px-md-0 container-md">
            <Row className="pb-5">
               <Col>
                  <h2 className="fw-semibold mb-4">{subtit}</h2>
                  <hr />
                  <div id={styles.tableWrapper}>
                     <Table striped className="mt-3 mt-lg-4 mt-xxl-5" bordered>
                        <thead className="fst-italic">
                           <tr>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-trophy-fill me-2"></i> {tableHeadings[0]}{" "}
                                 <Tooltip
                                    conteudo={
                                       "Indica a posição do usuário no ranking geral, ordenada pelo tempo total de treino acumulado. Usuários com mais tempo de treino aparecem nas primeiras posições."
                                    }
                                 >
                                    <i className="bi bi-info-circle-fill ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-person-fill me-2"></i> {tableHeadings[1]}
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-clock-fill me-2"></i> {tableHeadings[2]}
                                 <Tooltip
                                    conteudo={
                                       "Mostra o tempo total, em horas e minutos, que o usuário dedicou aos treinos desde o cadastro na plataforma. Esse valor é atualizado conforme novos treinos são registrados."
                                    }
                                 >
                                    <i className="bi bi-info-circle-fill ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-person-arms-up me-2"></i> {tableHeadings[3]}
                                 <Tooltip
                                    conteudo={
                                       "Exibe a quantidade total de sessões de treino concluídas pelo usuário. Cada treino finalizado é contabilizado nesse campo, refletindo o engajamento e a frequência do usuário."
                                    }
                                 >
                                    <i className="bi bi-info-circle-fill ms-2"></i>
                                 </Tooltip>
                              </th>
                              <th className={modoEscuro ? "text-bg-secondary" : `text-bg-dark`}>
                                 <i className="bi bi-calendar-check me-2"></i> {tableHeadings[4]}
                                 <Tooltip
                                    conteudo={
                                       "Data em que o usuário se registrou na plataforma. Esse campo permite visualizar há quanto tempo cada participante faz parte da comunidade."
                                    }
                                 >
                                    <i className="bi bi-info-circle-fill ms-2"></i>
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
