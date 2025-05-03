import { Col, Container, Row } from "react-bootstrap";
import BannerTopo from "../../components/BannerTopo/BannerTopo";
import foto from "../../assets/privacyman.webp";
import { Trans, useTranslation } from "react-i18next";

const PoliticaDePrivacidade = () => {
   const { t } = useTranslation();
   const { tit, dados, subtit } = t("privacy");
   return (
      <div>
         <BannerTopo descricao={subtit} fotoModelo={foto} titulo={tit} />
         <Container>
            <Row className="py-4 py-sm-5">
               <Col>
                  {dados.map((v, k) => (
                     <div key={k}>
                        <h2 className="mt-5">
                           {k + 1}. {v.tit}
                        </h2>
                        <Trans i18nKey={v.subtit}></Trans>
                     </div>
                  ))}
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default PoliticaDePrivacidade;
