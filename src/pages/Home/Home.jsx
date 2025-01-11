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
import thumb from "../../assets/thumb_temp.gif";

const vantagens = [
   {
      titulo: "Exercícios Detalhados",
      texto: "Encontre descrições claras e passo a passo de exercícios para todos os níveis. Seja iniciante ou avançado, temos o treino perfeito para você!",
   },
   {
      titulo: "Tutoriais em Vídeo",
      texto: "Acompanhe tutoriais no YouTube criados por profissionais. Aprenda a executar os movimentos com segurança e eficiência.",
   },
   {
      titulo: "Controle Personalizados",
      texto: "Filtre exercícios por categorias, como força, cardio ou alongamento. Economize tempo e encontre exatamente o que precisa!",
   },
   {
      titulo: "Rastreio do treinamento",
      texto: "Acompanhe seu progresso com facilidade! Registre seus treinos, visualize estatísticas e mantenha-se motivado enquanto atinge suas metas.",
   },
];

const testemunhos = [
   {
      foto: thumb,
      nome: "Ana Carolina",
      testemunho:
         "Nunca imaginei que pudesse me sentir tão confiante treinando em casa. Os tutoriais são incríveis, e os filtros me ajudam a encontrar exatamente o que preciso. Já perdi 5 kg e ganhei muito mais energia!",
   },
   {
      foto: thumb,
      nome: "Rafael Monteiro",
      testemunho:
         "Eu era completamente sedentário, mas o site tornou tudo tão simples e prático. Adoro acompanhar meu progresso com o rastreio de treinamento. Hoje, minha saúde é outra!",
   },
   {
      foto: thumb,
      nome: "Mariana Costa",
      testemunho:
         "Os vídeos são super didáticos e motivadores. Consigo fazer exercícios de forma segura, mesmo sem ir à academia. É como ter um personal trainer em casa!",
   },
   {
      foto: thumb,
      nome: "Felipe Almeida",
      testemunho:
         "Com a rotina corrida, eu precisava de algo rápido e eficiente. Encontrei tudo aqui! Os exercícios são fáceis de seguir, e a variedade é impressionante.",
   },
   {
      foto: thumb,
      nome: "Camila Rodrigues",
      testemunho:
         "A possibilidade de filtrar exercícios por categoria foi um divisor de águas para mim. Agora consigo alternar entre treinos de força e alongamento sem perder tempo!",
   },
   {
      foto: thumb,
      nome: "Pedro Henrique",
      testemunho:
         "As dicas e tendências me mantêm motivado. É como ter um guia fitness atualizado sempre à mão. Já recomendei para vários amigos!",
   },
];

const CardTestemunho = ({ foto, nome, testemunho }) => (
   <div className="border border-4 bg-light mx-2 p-3 rounded-5 shadow-sm d-flex flex-column gap-3 align-items-center">
      <Image className="border border-2" src={foto} roundedCircle width="100" height="100" />
      <h4>{nome}</h4>
      <p className="fst-italic">{testemunho}</p>
      
   </div>
);

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
                  Descubra o jeito mais divertido e prático de atingir seus objetivos fitness! Aqui você encontra uma plataforma completa com
                  exercícios detalhados
               </p>

               <Row className="mt-3 mb-4 g-3">
                  {vantagens.map(({ titulo, texto }, k) => (
                     <Col xs={6} key={k}>
                        <Card className="h-100 border-top  border-5">
                           <Card.Body>
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

         <Row id={styles.bg2} className="text-center ">
            <Col className="py-5 px-5">
               <h2 className="fw-semibold fs-1 mb-5 ">Testemunhos dos usuários do site</h2>
               <Slider
                  className="mb-5"
                  autoplay
                  slidesToShow={3}
                  responsive={[
                     { breakpoint: 1024, settings: { slidesToShow: 2 } },
                     { breakpoint: 480, settings: { slidesToShow: 1 } },
                  ]}
               >
                  {testemunhos.map(({ nome, foto, testemunho }, k) => (
                     <CardTestemunho nome={nome} foto={foto} testemunho={testemunho} key={k} />
                  ))}
               </Slider>
            </Col>
         </Row>
      </Container>
   );
};
export default Home;
