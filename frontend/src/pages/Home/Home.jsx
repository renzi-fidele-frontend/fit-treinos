import { Button, Card, Col, Container, Image, ListGroupItem, Placeholder, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import ftBanner from "../../assets/modelo.png";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setParteDoCorpoEscolhida } from "../../state/configs/configsSlice";
import Slider from "react-slick";
import bg1 from "../../assets/bg1.jpg";
import fotoAtleta from "../../assets/atleta.png";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import { Link } from "react-router-dom";
import { fotoDaParteDoCorpo } from "../../utils/fotoParteCorpo";
import useSocialAuth from "../../hooks/useSocialAuth";
import { setExerciciosDeCategoria } from "../../state/exercicios/exerciciosSlice";
import { gerarArray } from "../../utils/gerarArray";
import { useTranslation } from "react-i18next";
import useExercisesApiAndDispatchOnStore from "../../hooks/useExercisesApiAndDispatchOnStore";
import useAnalisarTraducao from "../../hooks/useAnalisarTraducao";

const CardTestemunho = ({ nome, testemunho }) => {
   const { modoEscuro } = useSelector((state) => state.tema);
   return (
      <div
         className={`border border-4 ${
            modoEscuro ? "bg-dark" : "bg-light"
         } mx-2 p-3 rounded-5 shadow-sm d-flex flex-column gap-3 align-items-center`}
      >
         <h4>{nome}</h4>
         <p className="fst-italic">{testemunho}</p>
      </div>
   );
};

const Home = () => {
   const { t } = useTranslation();
   const { secaoInicial, vantagens, testemunhos, titExercicios, ctaExercicios } = t("home");
   const dispatch = useDispatch();
   const { partesDoCorpo, parteDoCorpoEscolhida } = useSelector((state) => state.configs);
   const { exerciciosDeCategoria, exercicios } = useSelector((state) => state.exercicios);
   const { modoEscuro } = useSelector((state) => state.tema);
   const { idioma } = useSelector((state) => state.idioma);
   const { investigarParteDoCorpo } = useAnalisarTraducao();
   useSocialAuth();
   useExercisesApiAndDispatchOnStore();

   function alterarParteDoCorpoSelecionada(categoria) {
      dispatch(setExerciciosDeCategoria(exercicios?.filter((v) => v?.bodyPart?.includes(categoria))));
   }
   // Controlador da mudança de categoria escolhida
   useEffect(() => {
      if (parteDoCorpoEscolhida) {
         alterarParteDoCorpoSelecionada(parteDoCorpoEscolhida);
      }
   }, [parteDoCorpoEscolhida]);

   useEffect(() => {
      function definirCategorias() {
         // Ao se chegar da página de exercícios será recapturada a categoria escolhida
         if (!parteDoCorpoEscolhida && partesDoCorpo) {
            dispatch(setParteDoCorpoEscolhida(partesDoCorpo?.[0]?.en));
         }
      }
      definirCategorias();
      if (exercicios) {
         dispatch(setExerciciosDeCategoria(exercicios?.filter((v) => v?.bodyPart?.includes(parteDoCorpoEscolhida))));
      }
   }, [partesDoCorpo, exercicios]);

   return (
      <Container fluid>
         {/*  Banner Inicial  */}
         <Row id={styles.banInicial} className="px-sm-5 flex-column-reverse flex-lg-row position-relative">
            {/* Opacidade */}
            <section
               className={`position-absolute w-100 h-100 start-0 end-0 bottom-0 top-0 z-0 opacity-75 ${modoEscuro ? "bg-dark" : "bg-light"}`}
            ></section>
            <Col
               lg={6}
               className="d-flex flex-column justify-content-center ps-2 ps-xxl-5 position-relative text-center text-lg-start pb-5 pb-lg-0 pt-4 pt-lg-0"
            >
               <div className="ps-lg-3 ps-xxl-5 pe-lg-4">
                  <h1 id={styles.titulo}>
                     {secaoInicial.tit1}
                     <br className="d-none d-lg-block" /> {secaoInicial.tit2}
                  </h1>
                  <p className="mb-4 mb-sm-5 mt-4 mt-lg-5 fs-5">{secaoInicial.descricao}</p>
                  <Button as={Link} to="/exercicios" variant="secondary" size="lg" className="align-self-baseline mb-5 mb-lg-0">
                     {secaoInicial.cta}
                  </Button>
                  <div className="mb-5 mb-lg-0"></div>
                  <div id={styles.animacao} className="mb-xxl-3">
                     <span id={styles.textoOverflow}>
                        {secaoInicial.animacao.map((v, k) => (
                           <>
                              {" "}
                              {v}
                              {k - 1 < secaoInicial.animacao.length && <b> .</b>}
                           </>
                        ))}
                     </span>
                  </div>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-bottom-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>

         <Row className="mt-0 mt-md-5 py-5">
            <Col className="text-center">
               <Titulo texto={titExercicios} />
               {
                  /*  Filtragem */
                  <Container className="mt-5">
                     <Slider
                        draggable={false}
                        responsive={[
                           { breakpoint: 1200, settings: { slidesToShow: 3 } },
                           { breakpoint: 992, settings: { slidesToShow: 2 } },
                           { breakpoint: 480, settings: { slidesToShow: 1 } },
                        ]}
                        arrows={true}
                        infinite={false}
                        className="list-group"
                        slidesToScroll={1}
                        slidesToShow={4}
                     >
                        {partesDoCorpo
                           ? partesDoCorpo?.map((v, k) => (
                                <ListGroupItem
                                   className="py-1 d-flex gap-2 align-items-center flex-column position-relative"
                                   onClick={() => dispatch(setParteDoCorpoEscolhida(v.en))}
                                   key={k}
                                   action
                                   active={parteDoCorpoEscolhida === v.en}
                                >
                                   <Image src={fotoDaParteDoCorpo(v.en)} />
                                   <div style={{ opacity: "15%" }} className="position-absolute bg-dark h-100 w-100"></div>
                                   <span id={styles.textOverlay} className=" fs-6 fw-bold text-uppercase position-absolute">
                                      {idioma?.includes("en") ? v.en : v.pt}
                                   </span>
                                </ListGroupItem>
                             ))
                           : gerarArray(6).map((v, k) => (
                                <ListGroupItem key={k} className="py-1 d-flex gap-2 align-items-center flex-column position-relative">
                                   <Placeholder animation="wave" xs={12}>
                                      <Placeholder xs={12} className={styles.loadCateg} />
                                   </Placeholder>
                                </ListGroupItem>
                             ))}
                     </Slider>
                     <p className="mt-3 fs-5">
                        Parte do corpo selecionada:{" "}
                        <span className={`px-2 text-capitalize rounded ${modoEscuro ? "text-bg-light" : "text-bg-dark"}`}>
                           {idioma?.includes("en") ? parteDoCorpoEscolhida : investigarParteDoCorpo(parteDoCorpoEscolhida)}
                        </span>
                     </p>
                  </Container>
               }
               {/*  Exercícios  */}
               <Container fluid className="mt-5 px-xl-5">
                  <hr className="mx-5" />
                  <Row className="mt-2 mx-xxl-5 mb-5 px-xl-5 g-4 justify-content-center flex-content-stretch">
                     {exerciciosDeCategoria
                        ? exerciciosDeCategoria?.map(
                             (v, k) =>
                                k < 7 && (
                                   <Col key={k} sm={6} lg={4} xxl={3}>
                                      <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                                   </Col>
                                )
                          )
                        : gerarArray(7).map((v, k) => (
                             <Col key={k} sm={6} lg={4} xxl={3}>
                                <CardExercicio />
                             </Col>
                          ))}
                  </Row>
                  <Button as={Link} to="/exercicios" variant="secondary" size="lg">
                     {ctaExercicios}
                  </Button>
               </Container>
            </Col>
         </Row>

         {/*  Seção das vantagens do App  */}
         <Row
            className={"mt-5 pe-xxl-5 py-5 bg-black text-light position-relative bg-gradient overflow-hidden flex-column-reverse flex-xxl-row"}
         >
            <Image src={bg1} id={styles.bg1} className="position-absolute end-0 start-0 top-0 p-0 h-100" />
            <Col style={{ zIndex: "2" }} className="ps-0">
               <div className="d-flex align-items-center h-100">
                  <Image id={styles.fotoAtleta} className="d-none d-xxl-block" src={fotoAtleta} alt="Atleta que alcançou o melhor resultado" />
               </div>
            </Col>
            <Col style={{ zIndex: "2" }} xxl={7} className="pe-xxl-5 px-3 px-sm-5 px-xxl-0 justify-content-center gap-3 d-flex flex-column">
               <h3 className="me-sm-5" id={styles.titbanner}>
                  {vantagens.tit}
               </h3>
               <p id={styles.subBanner} className={"fs-5 "}>
                  {vantagens.descricao}
               </p>

               <Row className="mt-lg-3 mb-4 g-3">
                  {vantagens.items.map(({ titulo, texto }, k) => (
                     <Col sm={6} key={k}>
                        <Card className="h-100 border-top pt-0 border-5">
                           <Card.Body className="pt-2">
                              <i className={`fs-${k + 1} bi bi-${k + 1}-circle`}></i>
                              <Card.Title className="fw-semibold">{titulo}</Card.Title>
                              <Card.Text>{texto}</Card.Text>
                           </Card.Body>
                        </Card>
                     </Col>
                  ))}
               </Row>
            </Col>
         </Row>

         {/*  Seção dos testemunhos  */}
         <Row id={styles.bg2} className="text-center position-relative ">
            <Col className="py-5 px-5" id={modoEscuro && styles.bgdark}>
               <h2 className="fw-semibold fs-1 mb-5 ">{testemunhos.tit}</h2>
               <Slider
                  className="mb-5"
                  autoplay
                  slidesToShow={3}
                  responsive={[
                     { breakpoint: 1024, settings: { slidesToShow: 2 } },
                     { breakpoint: 600, settings: { slidesToShow: 1 } },
                  ]}
               >
                  {testemunhos.items.map(({ nome, testemunho }, k) => (
                     <CardTestemunho nome={nome} testemunho={testemunho} key={k} />
                  ))}
               </Slider>
            </Col>
         </Row>
      </Container>
   );
};
export default Home;
