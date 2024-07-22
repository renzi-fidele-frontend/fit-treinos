import { Button, Col, Container, Form, Image, ListGroupItem, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import ftBanner from "../../assets/modelo.png";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { setCategorias, setEscolhida, setExercicios } from "../../state/exercicios/exerciciosSlice";
import Slider from "react-slick";

const Home = () => {
   const dispatch = useDispatch();
   const { categorias, escolhida, exercicios } = useSelector((state) => state.exercicios);

   const apanharCategorias = useFetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exercisesFetchOptions, categorias);

   // const apanharExercicios = useFetch("https://exercisedb.p.rapidapi.com/exercises", exercisesFetchOptions, exercicios);

   const apanharCategoriaSelecionada = useFetch(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${escolhida}`,
      exercisesFetchOptions,
      exercicios
   );

   useEffect(() => {
      if (!exercicios) dispatch(setExercicios(apanharCategoriaSelecionada.data));

      if (!categorias) {
         dispatch(setCategorias(apanharCategorias.data));
         dispatch(setEscolhida(apanharCategorias.data?.[0]));
      }
   }, [apanharCategorias.data, apanharCategoriaSelecionada.data]);

   // Controlador da mudança de categoria
   useEffect(() => {
      console.log("A nova categoria selecionada é: " + escolhida);

      apanharCategoriaSelecionada.refetch().then((v) => console.log(v));

      dispatch(setExercicios(apanharCategoriaSelecionada.data));
   }, [escolhida]);

   return (
      <Container fluid>
         {/*  Banner Inicial  */}
         <Row className="px-5">
            <Col md={6} className="d-flex flex-column justify-content-center ps-5 position-relative">
               <div className="ps-5 pe-2 ">
                  <h1 className="" id={styles.titulo}>
                     Transpire, sorria
                     <br /> e fique saudável
                  </h1>
                  <p className="mb-5 mt-5 fs-5">Descubra os exercícios que mais dão resultados, de maneira simples e organizada</p>
                  <Button variant="secondary" size="lg" className="align-self-baseline">
                     Descobrir Exercícios
                  </Button>
                  <span id={styles.textoOverflow}>Treine Pesado</span>
               </div>
            </Col>
            <Col id={styles.ctFoto} className="pt-5 text-center rounded-bottom-5 bg-secondary-subtle bg-gradient">
               <Image id={styles.fotoBanner} src={ftBanner} />
            </Col>
         </Row>

         {/*  Exercícios */}
         <Row className="mt-5 py-5">
            <Col className="text-center">
               <Titulo texto="Exercícios incríveis para você Treinar " />

               {/*  Pesquisa  */}
               <Form className="mb-5">
                  <Form.Group className="d-flex gap-2 w-25 mx-auto mt-4">
                     <Form.Control type="text" placeholder="Procure exercícios" />
                     <Button variant="secondary" type="submit">
                        Pesquisar
                     </Button>
                  </Form.Group>
               </Form>

               {/*  Filtragem */}
               <div className="container">
                  <Slider arrows={true} infinite={false} className="list-group" slidesToScroll={1} slidesToShow={4}>
                     {categorias?.map((v, k) => (
                        <ListGroupItem
                           className="py-5"
                           onClick={() => {
                              dispatch(setEscolhida(v));
                           }}
                           key={k}
                           action
                           active={escolhida === v}
                        >
                           {v}
                        </ListGroupItem>
                     ))}
                  </Slider>
               </div>
            </Col>
         </Row>
      </Container>
   );
};
export default Home;
