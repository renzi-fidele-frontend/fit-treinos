import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { Button, Col, Container, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import styles from "./DetalhesExercicio.module.css";
import { fotoDaParteDoCorpo } from "../../utils/fotoParteCorpo";
import { YoutubeVideosApiOptions } from "../../services/YoutubeVideosApi";
import VideoCard from "../../components/VideoCard/VideoCard";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import CardExercicio from "../../components/CardExercicio/CardExercicio";
import { fotoEquipamento } from "../../utils/fotoEquipamento";
import { fotoMusculo } from "../../utils/fotoMusculo";
import noPhoto from "../../assets/musculos/noPhoto.jpg";
import { setExercicios } from "../../state/exercicios/exerciciosSlice";
import { setUser } from "../../state/auth/authSlice";
import ToastTreinamento from "../../components/ToastTreinamento/ToastTreinamento";

// FIXME: A requisição está sendo feita duas vezes

const DetalhesExercicio = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { exercicios } = useSelector((state) => state.exercicios);
   const { user } = useSelector((state) => state.auth);
   const [exercicio, setExercicio] = useState(null);
   const [videos, setVideos] = useState(null);
   const [exerciciosFiltrados, setExerciciosFiltrados] = useState(null);
   const [favorito, setFavorito] = useState(user?.favoritos?.includes(exercicio?.id));
   const [mostrar, setMostrar] = useState(false);

   const apanharVideos = useFetch(null, YoutubeVideosApiOptions, videos, "manual");
   const apanharExercicios = useFetch(null, exercisesFetchOptions, exercicios, "manual");
   const { apanharNoBackendComAuth } = useFetch(null, null, null, "manual");

   useEffect(() => {
      if (exercicio) filtrarPorMusculoAlvo(exercicios);
      if (!videos && exercicio) {
         apanharVideos
            .apanharDadosComParam(
               `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercicio?.name}%20exercise&hl=pt&type=video`
            )
            .then((v) => setVideos(v.contents));
      }
      if (user.favoritos.includes(exercicio?.id)) setFavorito(true);
   }, [exercicio]);

   useEffect(() => {
      if (!exercicios) {
         apanharExercicios.apanharDadosComParam("https://exercisedb.p.rapidapi.com/exercises?limit=1000").then((v) => {
            dispatch(setExercicios(v));
            filtrarPorMusculoAlvo(v);
         });
      } else if (exercicios) {
         setExercicio(exercicios?.filter((v) => v.id === id)[0]);
      } else if (exercicio) {
         filtrarPorMusculoAlvo(exercicios);
      }
   }, [exercicios, id]);

   function filtrarPorMusculoAlvo(array) {
      const dadosFiltrados = array?.filter((musculoAlvo) => musculoAlvo?.target?.includes(exercicio?.target));
      setExerciciosFiltrados(dadosFiltrados?.slice(0, 6));
   }

   function iniciarTreino() {
      setMostrar(true);
   }

   function adicionarAosFavoritos() {
      const res = apanharNoBackendComAuth("actions/adicionarAosFavoritos", "POST", {
         data: { idExercicio: exercicio?.id },
      }).then((v) => {
         dispatch(setUser({ ...user, favoritos: v.favoritos }));
         setFavorito(true);
      });
   }

   function removerDosFavoritos() {
      const res = apanharNoBackendComAuth("actions/removerDosFavoritos", "DELETE", {
         data: { idExercicio: exercicio?.id },
      }).then((v) => {
         dispatch(setUser({ ...user, favoritos: v.favoritos }));
         setFavorito(false);
      });
   }

   return (
      <Container className="py-3 py-xl-5">
         {/* Seção inicial */}
         <Row>
            <Col xl={4} className="d-none d-xl-flex ps-4 pt-4 me-3 align-items-stretch rounded-start" id={styles.left}>
               {/* Foto de desktop */}
               <Image className="d-none d-xl-block" src={exercicio?.gifUrl} alt={exercicio?.name} fluid />
            </Col>
            <Col>
               <h1 className="fw-bold mb-2 mb-xl-4 pt-3">
                  Como praticar o: <span className="text-capitalize text-secondary">{exercicio?.name}</span>
               </h1>
               {/* Foto do mobile */}
               <Image className="d-xl-none mb-3" src={exercicio?.gifUrl} alt={exercicio?.name} fluid />
               {/* Instruções */}
               <ListGroup>
                  {exercicio?.instructions?.map((v, key) => (
                     <ListGroupItem key={key}>
                        <span className="fw-bold text-secondary">{key + 1}</span> - {v}
                     </ListGroupItem>
                  ))}
               </ListGroup>

               {/* Ações */}
               <div className="d-flex gap-3 mt-4 flex-wrap flex-sm-row justify-content-center justify-content-md-start">
                  <Button variant="warning" onClick={iniciarTreino}>
                     <i className="bi bi-person-arms-up me-1"></i> Iniciar exercício
                  </Button>
                  {!favorito ? (
                     <Button variant="secondary" onClick={adicionarAosFavoritos}>
                        <i className="bi bi-heart me-1"></i> Adicionar aos favoritos
                     </Button>
                  ) : (
                     <Button variant="danger" onClick={removerDosFavoritos}>
                        <i className="bi bi-trash me-1"></i> Remover dos favoritos
                     </Button>
                  )}
                  <Button variant="dark" className="bg-gradient">
                     <i className="bi bi-plus-circle me-1"></i> Adicionar a sessão de treino
                  </Button>
               </div>
            </Col>
         </Row>

         {/* Separador */}
         <div className="my-5 border border-4 border-bottom rounded-2 shadow-lg"></div>

         {/* Seção das informações sobre a parte do corpo que será beneficiada ao treinar o exercício  */}
         <Row className="mt-5 text-center">
            <Col sm={7}>
               <h2 className="fw-medium mb-3 mb-sm-4 fs-3" id={styles.labelDetalhes}>
                  Parte do corpo que irá se desenvolver: <span className="text-secondary text-capitalize">{exercicio?.bodyPart}</span>
               </h2>
               <Image
                  className="border-3 shadow-lg border rounded-2 mb-5 mb-sm-0"
                  src={fotoDaParteDoCorpo(exercicio?.bodyPart)}
                  alt={exercicio?.bodyPart}
                  fluid
               />
            </Col>
            <div className="vr px-1 bg-gradient mx-4 rounded d-none d-sm-block"></div>
            <Col>
               <h2 className="fw-medium mb-3 mb-sm-4 fs-3" id={styles.labelDetalhes}>
                  Equipamento necessário: <span className="text-secondary text-capitalize">{exercicio?.equipment}</span>
               </h2>
               <Image className={styles.equipamento} src={fotoEquipamento(exercicio?.equipment)} />
            </Col>
         </Row>
         {/* Separador do Mobile */}
         <div className="d-sm-none border mt-4" id={styles.sepMobile}></div>
         <Row className="pt-4 pt-sm-5">
            <Col className="text-center" xl={5}>
               <h4 className=" fw-semibold mb-4">Principal músculo que será afectado:</h4>
               <div
                  style={{ width: "fit-content" }}
                  className="d-flex flex-column text-capitalize fs-5 p-1 text-bg-danger shadow-sm rounded-3 mx-auto"
               >
                  <Image className={styles.musculo + " border rounded-2"} src={fotoMusculo(exercicio?.target)} />
                  <span>{exercicio?.target}</span>
               </div>
            </Col>
            {/* Separador vertical do desktop */}
            <div className="vr px-1 bg-gradient mx-4 rounded d-none d-xl-block"></div>
            <Col className="text-center">
               <h4 className="fw-semibold mb-4 mt-4 mt-xl-0">Músculos secundários que serão afetados:</h4>
               <div className="d-flex gap-2  gap-lg-5 justify-content-center flex-wrap flex-md-nowrap">
                  {exercicio?.secondaryMuscles?.map((v, key) =>
                     fotoMusculo(v) || fotoDaParteDoCorpo(v) ? (
                        <div className="d-flex flex-column text-capitalize fs-5 p-1 text-bg-secondary shadow-sm rounded-3" key={key}>
                           <Image className={styles.musculo + " border rounded-2"} src={fotoMusculo(v) || fotoDaParteDoCorpo(v)} />
                           <span>{v}</span>
                        </div>
                     ) : (
                        <div
                           className="d-flex flex-column text-capitalize fs-5 p-1 text-bg-secondary shadow-sm rounded-3 position-relative"
                           key={key}
                        >
                           <Image className={styles.musculo + " border rounded-2"} src={noPhoto} />

                           <span>{v}</span>
                        </div>
                     )
                  )}
               </div>
            </Col>
         </Row>

         {/* Separador */}
         <div className="my-4 my-md-5 border border-4 border-bottom rounded-2 shadow-lg"></div>

         {/* Seção de vídeos do youtube */}
         <Row className="px-2">
            <Col>
               <h1 className="mb-4" id={styles.tit2}>
                  Assista vídeos de treinamento do: <span className="text-secondary fw-semibold text-capitalize">{exercicio?.name}</span>
               </h1>
               <Slider
                  swipeToSlide
                  rows={2}
                  className="videos"
                  slidesToShow={3}
                  responsive={[
                     { breakpoint: 992, settings: { slidesToShow: 2 } },
                     { breakpoint: 576, settings: { slidesToShow: 1, rows: 1 } },
                  ]}
                  infinite={false}
                  dots
               >
                  {videos?.map(
                     ({ video }, k) =>
                        video?.thumbnails?.[1]?.url && (
                           <VideoCard
                              key={k}
                              visualizacoes={video?.viewCountText}
                              canal={video?.channelName}
                              thumbnail={video?.thumbnails?.[1]?.url}
                              titulo={video?.title}
                              videoId={video?.videoId}
                              descricao={video?.description}
                           />
                        )
                  )}
               </Slider>

               <div className="pt-5"></div>
               {/* Separador */}
               <div className="my-4 my-md-5 border border-4 border-bottom rounded-2 shadow-lg"></div>
            </Col>
         </Row>

         {/* Seção de exercícios relacionados */}
         <Row className="mt-2 pb-5 mb-3">
            <Col>
               <h1 className="mb-4" id={styles.tit2}>
                  Exercícios que fortalecem o músculo alvo:{" "}
                  <span className="text-capitalize text-secondary fw-bold text-decoration-underline">{exercicio?.target}</span>
               </h1>
               <Row className="px-4 px-sm-0">
                  <Col>
                     <Slider
                        responsive={[
                           { breakpoint: 992, settings: { slidesToShow: 2 } },
                           { breakpoint: 576, settings: { slidesToShow: 1 } },
                        ]}
                        swipeToSlide
                        slidesToShow={3}
                        infinite={false}
                        dots
                     >
                        {exerciciosFiltrados?.map((v, k) => (
                           <CardExercicio
                              customClass=" me-sm-3"
                              titulo={v?.name}
                              id={v?.id}
                              foto={v?.gifUrl}
                              categoria={v?.secondaryMuscles}
                              key={k}
                           />
                        ))}
                     </Slider>
                  </Col>
               </Row>
            </Col>
         </Row>
         <ToastTreinamento mostrar={mostrar} onClose={() => setMostrar(false)} parteDoCorpo={exercicio?.bodyPart} idExercicio={exercicio?.id} />
      </Container>
   );
};
export default DetalhesExercicio;
