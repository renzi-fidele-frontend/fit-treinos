import { Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Exercicios.module.css";
import fotoBanner from "../../assets/bannerEx.png";
import bg from "../../assets/bg1.jpg";
import Titulo from "../../components/ui/Titulo";
import { useDispatch, useSelector } from "react-redux";
import { exercisesFetchOptions } from "../../services/ExercicesApi";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { setCategorias, setEquipamentos } from "../../state/exercicios/exerciciosSlice";

const Exercicios = () => {
   const { categorias: partesCorpo, equipamentos, filtragemExercicios } = useSelector((state) => state.exercicios);
   const dispatch = useDispatch();

   // A filtragem deverá ser armazenada no estado global do Redux
   const apanharPartesCorpo = useFetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exercisesFetchOptions, partesCorpo);

   const apanharEquipamentos = useFetch("https://exercisedb.p.rapidapi.com/exercises/equipmentList", exercisesFetchOptions, equipamentos);

   useEffect(() => {
      if (!partesCorpo) dispatch(setCategorias(apanharPartesCorpo.data));
      if (!equipamentos) dispatch(setEquipamentos(apanharEquipamentos.data));
   }, [apanharPartesCorpo.data, apanharEquipamentos.data]);

   return (
      <div>
         {/*  Banner inicial */}
         <div
            id={styles.banner}
            className="position-relative overflow-hidden bg-secondary
bg-gradient pt-5  pb-0"
         >
            <Image src={bg} id={styles.bg} className="position-absolute top-0 start-0 end-0 h-auto" />
            <Container>
               <Row className="position-relative">
                  <Col sm={7} className="justify-content-center flex-column gap-3 d-flex">
                     <h2 id={styles.titBanner}>Está na hora de dar aquela melhorada no seu físico</h2>
                     <p className="fs-4">Mais de 1000 exercícios foram preparados para você</p>
                  </Col>
                  <Col className="text-end pe-5">
                     <Image src={fotoBanner} />
                  </Col>
               </Row>
            </Container>
         </div>
         <Container fluid>
            <Row className="py-5">
               <Col className="text-center">
                  <Titulo texto="Encontre todos os exercícios" />
                  {/*  Filtragem  */}
                  <Form className="mb-5 mt-4 px-5 container">
                     <Row className="px-5 g-5">
                        <Col>
                           <Form.Group className="">
                              <Form.Label className="fs-4 fw-semibold mb-3">Parte do corpo</Form.Label>
                              <Form.Select className="text-capitalize">
                                 <option value="todos">Todos</option>
                                 {partesCorpo?.map((v, k) => (
                                    <option key={k} className="" value={v}>
                                       {v}
                                    </option>
                                 ))}
                              </Form.Select>
                           </Form.Group>
                        </Col>
                        <Col>
                           <Form.Group className="">
                              <Form.Label className="fs-4 fw-semibold mb-3">Equipamento</Form.Label>
                              <Form.Select className="text-capitalize">
                                 <option value="todos">Todos</option>
                                 {equipamentos?.map((v, k) => (
                                    <option value={v} key={k}>
                                       {v}
                                    </option>
                                 ))}
                              </Form.Select>
                           </Form.Group>
                        </Col>
                     </Row>
                  </Form>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Exercicios;
