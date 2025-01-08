import { Button, Card, Col, Container, Image, ListGroupItem, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import ftBanner from "../../assets/modelo.png";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { setCategorias, setCategoriaEscolhida, setExercicios, setExerciciosDeCategoria } from "../../state/exercicios/exerciciosSlice";
import Slider from "react-slick";
import bg1 from "../../assets/bg1.jpg";
import fotoAtleta from "../../assets/atleta.png";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import { Link } from "react-router-dom";
import { fotoDaParteDoCorpo } from "../../utils/fotoParteCorpo";

const Home = () => {
   const dispatch = useDispatch();
   const { categorias, categoriaEscolhida, exerciciosDeCategoria, exercicios } = useSelector((state) => state.exercicios);

   const apanharCategorias = useFetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exercisesFetchOptions, categorias);

   const apanharExercicios = useFetch("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exercisesFetchOptions, exercicios);

   function alterarCategoriaSelecionada(categoria) {
      dispatch(setExerciciosDeCategoria(exercicios?.filter((v) => v?.bodyPart?.includes(categoria))));
   }
   // Controlador da mudança de categoria escolhida
   useEffect(() => {
      if (categoriaEscolhida) {
         alterarCategoriaSelecionada(categoriaEscolhida);
      }
   }, [categoriaEscolhida]);

   function definirCategorias() {
      if (!categorias) {
         dispatch(setCategorias(apanharCategorias.data));
         dispatch(setCategoriaEscolhida(apanharCategorias.data?.[0]));
      }
      // Ao se chegar da página de exercícios será recapturada a categoria escolhida
      if (!categoriaEscolhida && categorias) {
         dispatch(setCategoriaEscolhida(categorias?.[0]));
      }
   }

   useEffect(() => {
      definirCategorias();
      if (!exercicios) {
         dispatch(setExercicios(apanharExercicios.data));
         dispatch(setExerciciosDeCategoria(apanharExercicios.data?.filter((v) => v?.bodyPart?.includes(categoriaEscolhida))));
      }
   }, [apanharCategorias.data, apanharExercicios.data, exercicios]);

   return (
      <Container fluid>
         {/*  Banner Inicial  */}
         <Row className="px-5">
            <Col sm={6} className="d-flex flex-column justify-content-center ps-5 position-relative">
               <div className="ps-5 pe-2">
                  <h1 className="" id={styles.titulo}>
                     Transpire, sorria
                     <br /> e fique saudável
                  </h1>
                  <p className="mb-5 mt-5 fs-5">Descubra os exercícios que mais dão resultados, de maneira simples e organizada</p>
                  <Button as={Link} to="/exercicios" variant="secondary" size="lg" className="align-self-baseline">
                     Descobrir Exercícios
                  </Button>
                  <div id={styles.animacao}>
                     <span id={styles.textoOverflow}>
                        Treine Pesado <b>·</b> Tenha consistência <b>·</b> Tenha determinação
                     </span>
                  </div>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-bottom-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>

         <Row className="mt-5 py-5">
            <Col className="text-center">
               <Titulo texto="Exercícios incríveis para você Treinar " />

               {/*  Filtragem */}
               {/* TODO: Traduzir as partes do corpo */}
               <Container className="mt-5">
                  <Slider draggable={false} arrows={true} infinite={false} className="list-group" slidesToScroll={1} slidesToShow={4}>
                     {categorias?.map((v, k) => (
                        <ListGroupItem
                           className="py-1 d-flex gap-2 align-items-center flex-column position-relative"
                           onClick={() => {
                              dispatch(setCategoriaEscolhida(v));
                           }}
                           key={k}
                           action
                           active={categoriaEscolhida === v}
                        >
                           <Image src={fotoDaParteDoCorpo(v)} />
                           <div style={{ opacity: "15%" }} className="position-absolute bg-dark h-100 w-100"></div>
                           <span id={styles.textOverlay} className=" fs-6 fw-bold text-uppercase position-absolute">
                              {v}
                           </span>
                        </ListGroupItem>
                     ))}
                  </Slider>
               </Container>

               {/*  Exercícios  */}
               <Container fluid className="mt-5 px-5">
                  <hr className="mx-5" />
                  <Row className="mt-2 mx-5 mb-5 px-5 g-4 justify-content-center flex-content-stretch">
                     {exerciciosDeCategoria?.map(
                        (v, k) =>
                           k < 7 && (
                              <Col key={k} xs={3}>
                                 <CardExercicio titulo={v?.name} id={v?.id} foto={v?.gifUrl} categoria={v?.secondaryMuscles} />
                              </Col>
                           )
                     )}
                  </Row>
                  <Button as={Link} to="/exercicios" variant="secondary" size="lg">
                     Ver todos
                  </Button>
               </Container>
            </Col>
         </Row>

         {/*  Seção 3  */}
         <Row className="mt-5 pe-5 py-5 bg-black text-light position-relative bg-gradient overflow-hidden">
            <Image src={bg1} id={styles.bg1} className="position-absolute end-0 start-0 top-0 h-auto p-0" />
            <Col style={{ zIndex: "2" }} className="ps-0">
               <Image id={styles.fotoAtleta} src={fotoAtleta} alt="Atleta que alcançou o melhor resultado" />
            </Col>
            <Col style={{ zIndex: "2" }} md={7} className="pe-5 justify-content-center gap-3 d-flex flex-column">
               <h3 id={styles.titbanner}>O melhor lugar para você ficar em forma</h3>
               <p className="fs-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum nobis, dolorum necessitatibus eius quae earum facere velit
                  inventore assumenda at, maxime obcaecati sint odit
               </p>

               <Row className="mt-3 g-3">
                  <Col xs={6}>
                     <Card>
                        <Card.Body>
                           <i className="fs-1 bi bi-1-circle"></i>
                           <Card.Title>Titulo1</Card.Title>
                           <Card.Text>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum nobis, dolorum necessitatibus eius quae earum
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col xs={6}>
                     <Card>
                        <Card.Body>
                           <i className="fs-1 bi bi-2-circle"></i>
                           <Card.Title>Titulo1</Card.Title>
                           <Card.Text>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum nobis, dolorum necessitatibus eius quae earum
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col xs={6}>
                     <Card>
                        <Card.Body>
                           <i className="fs-1 bi bi-3-circle"></i>
                           <Card.Title>Titulo1</Card.Title>
                           <Card.Text>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum nobis, dolorum necessitatibus eius quae earum
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col xs={6}>
                     <Card>
                        <Card.Body>
                           <i className="fs-1 bi bi-4-circle"></i>
                           <Card.Title>Titulo1</Card.Title>
                           <Card.Text>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum nobis, dolorum necessitatibus eius quae earum
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Col>
         </Row>

         {/* TODO: Criar seção dos testemunhos */}
      </Container>
   );
};
export default Home;
