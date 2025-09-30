import BannerTopo from "../../components/BannerTopo/BannerTopo";
import foto from "../../assets/privacyman.webp";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Trans, useTranslation } from "react-i18next";

const TermosDeServico = () => {
   const { t } = useTranslation();
   const { tit, subtit, dados } = t("terms");

   return (
      <div>
         <BannerTopo fotoModelo={foto} titulo={tit} descricao={subtit} />
         <Container>
            <Row className="py-4 py-sm-5 mb-sm-5">
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
export default TermosDeServico;
