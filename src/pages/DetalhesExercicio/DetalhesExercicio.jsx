import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import { Col, Container, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import styles from "./DetalhesExercicio.module.css";
import { fotoDaParteDoCorpo } from "../../utils/fotoParteCorpo";
import { YoutubeVideosApiOptions } from "../../services/YoutubeVideosApi";
import VideoCard from "../../components/VideoCard/VideoCard";

const DetalhesExercicio = () => {
   const { id } = useParams();

   const [exercicio, setExercicio] = useState(null);
   const [videos, setVideos] = useState(null);

   const apanharDetalhes = useFetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exercisesFetchOptions, exercicio);

   const apanharVideos = useFetch(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercicio?.name}%20exercise&hl=pt&type=video`,
      YoutubeVideosApiOptions,
      videos
   );

   useEffect(() => {
      if (!exercicio) {
         setExercicio(apanharDetalhes.data);
      }
      if (!videos) {
         setVideos(apanharVideos.data?.contents);
      }
   }, [id, apanharDetalhes.data, exercicio, apanharVideos.data, videos]);

   return (
      <Container className="pt-5">
         {/* Seção inicial */}
         <Row>
            <Col lg={4} className="ps-4 pt-4 me-3 align-items-stretch" id={styles.left}>
               <Image className="" src={exercicio?.gifUrl} alt={exercicio?.name} fluid />
            </Col>
            <Col>
               <h1 className="fw-bold mb-4 pt-3">
                  Como praticar o: <span className="text-capitalize text-secondary">{exercicio?.name}</span>
               </h1>
               <ListGroup>
                  {exercicio?.instructions?.map((v, key) => (
                     // TODO: Renderizar as imagens da parte do corpo na lista
                     <ListGroupItem key={key}>{v}</ListGroupItem>
                  ))}
               </ListGroup>
               <p> {exercicio?.description}</p>
            </Col>
         </Row>

         {/* Seção de baixo */}
         <Row className="mt-5 text-center">
            <Col>
               <h2 className="fw-bold mb-4">
                  Parte do corpo que irá se desenvolver: <span className="text-secondary text-capitalize">{exercicio?.bodyPart}</span>
               </h2>
               <Image
                  className="border-3 shadow-lg border rounded-2"
                  src={fotoDaParteDoCorpo(exercicio?.bodyPart)}
                  alt={exercicio?.bodyPart}
                  fluid
               />
               <h4 className="mt-5 fw-semibold">Músculos secundários que serão afectados:</h4>
               <ul className="d-flex gap-5 justify-content-center mt-3">
                  {exercicio?.secondaryMuscles?.map((v, key) => (
                     <li className="text-capitalize fs-5 px-3 py-1 text-bg-secondary shadow-sm rounded-3" key={key}>
                        {v}
                     </li>
                  ))}
               </ul>

               {/* Separador */}
               <div className="my-5 border border-4 border-bottom rounded-2 shadow-lg dashed"></div>
            </Col>
         </Row>
         
         {/* Seção de vídeos do youtube */}
         <Row>
            <Col>
               <h1 className="mb-4">
                  Assista vídeos de treinamento do: <span className="text-secondary fw-semibold">{exercicio?.name}</span>
                  <Row className="mt-5 gy-3">
                     {videos?.map(
                        ({ video }, k) =>
                           video?.thumbnails?.[1]?.url && (
                              <Col md={4} key={k}>
                                 <VideoCard
                                    visualizacoes={video?.viewCountText}
                                    canal={video?.channelName}
                                    thumbnail={video?.thumbnails?.[1]?.url}
                                    titulo={video?.title}
                                 />
                              </Col>
                           )
                     )}
                  </Row>
               </h1>
            </Col>
         </Row>
         {/* TODO: Renderizar exercícios com o mesmo tipo de equipamento */}
      </Container>
   );
};
export default DetalhesExercicio;
