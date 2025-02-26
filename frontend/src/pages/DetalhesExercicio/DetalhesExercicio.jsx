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
      <Container className="py-5">
         {/* Seção inicial */}
         <Row>
            <Col lg={4} className="ps-4 pt-4 me-3 align-items-stretch rounded-start" id={styles.left}>
               <Image className="" src={exercicio?.gifUrl} alt={exercicio?.name} fluid />
            </Col>
            <Col>
               <h1 className="fw-bold mb-4 pt-3">
                  Como praticar o: <span className="text-capitalize text-secondary">{exercicio?.name}</span>
               </h1>
               {/* Instruções */}
               <ListGroup>
                  {exercicio?.instructions?.map((v, key) => (
                     <ListGroupItem key={key}>
                        <span className="fw-bold text-secondary">{key + 1}</span> - {v}
                     </ListGroupItem>
                  ))}
               </ListGroup>

               {/* Ações */}
               <div className="d-flex gap-3 mt-4">
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
         <div className="my-5 border border-4 border-bottom rounded-2 shadow-lg dashed"></div>

         {/* Seção de baixo */}
         <Row className="mt-5 text-center">
            <Col md={7}>
               <h2 className="fw-medium mb-4 fs-3">
                  Parte do corpo que irá se desenvolver: <span className="text-secondary text-capitalize">{exercicio?.bodyPart}</span>
               </h2>
               <Image
                  className="border-3 shadow-lg border rounded-2"
                  src={fotoDaParteDoCorpo(exercicio?.bodyPart)}
                  alt={exercicio?.bodyPart}
                  fluid
               />
            </Col>
            <div className="vr px-1 bg-gradient mx-4 rounded"></div>
            <Col>
               <h2 className="fw-medium mb-4 fs-3">
                  Equipamento necessário: <span className="text-secondary text-capitalize">{exercicio?.equipment}</span>
               </h2>
               <Image className={styles.equipamento} src={fotoEquipamento(exercicio?.equipment)} />
            </Col>
         </Row>
         <Row className="pt-5">
            <Col className="text-center" md={5}>
               <h4 className=" fw-semibold mb-4">Principal músculo que será afectado:</h4>
               <div
                  style={{ width: "fit-content" }}
                  className="d-flex flex-column text-capitalize fs-5 p-1 text-bg-danger shadow-sm rounded-3 mx-auto"
               >
                  <Image className={styles.musculo + " border rounded-2"} src={fotoMusculo(exercicio?.target)} />
                  <span>{exercicio?.target}</span>
               </div>
            </Col>
            <div className="vr px-1 bg-gradient mx-4 rounded"></div>
            <Col className="text-center">
               <h4 className="fw-semibold mb-4">Músculos secundários que serão afetados:</h4>
               <div className="d-flex gap-5 justify-content-center">
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
         <div className="my-5 border border-4 border-bottom rounded-2 shadow-lg dashed"></div>

         {/* Seção de vídeos do youtube */}
         <Row>
            <Col>
               <h1 className="mb-4">
                  Assista vídeos de treinamento do: <span className="text-secondary fw-semibold text-capitalize">{exercicio?.name}</span>
               </h1>

               <Slider swipeToSlide rows={2} slidesToShow={3} infinite={false} dots>
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
               <div className="my-5 border border-4 border-bottom rounded-2 shadow-lg dashed"></div>
            </Col>
         </Row>

         {/* Seção de exercícios relacionados */}
         <Row className="mt-2 pb-5 mb-3">
            <Col>
               <h1 className="mb-4">
                  Exercícios que fortalecem o músculo alvo:{" "}
                  <span className="text-capitalize text-secondary fw-bold text-decoration-underline">{exercicio?.target}</span>
               </h1>
               <Row>
                  <Slider swipeToSlide slidesToShow={3} infinite={false} dots>
                     {exerciciosFiltrados?.map((v, k) => (
                        <CardExercicio
                           customClass=" me-3"
                           titulo={v?.name}
                           id={v?.id}
                           foto={v?.gifUrl}
                           categoria={v?.secondaryMuscles}
                           key={k}
                        />
                     ))}
                  </Slider>
               </Row>
            </Col>
         </Row>

         <ToastTreinamento mostrar={mostrar} onClose={() => setMostrar(false)} />
      </Container>
   );
};
export default DetalhesExercicio;
