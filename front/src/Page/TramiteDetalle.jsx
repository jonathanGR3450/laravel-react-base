import { useEffect, useState, useContext, useRef } from "react";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
import Popup from "reactjs-popup";
import mutacionJson from "../Json/ricTramiteCatastralMutaciones.json";
import "reactjs-popup/dist/index.css";
import { useLocation } from "react-router-dom";
////acordeon
//import Accordion from '../../node_modules/react-bootstrap/Accordion/package.json';
//import {Accordion} from 'react-bootstrap/Accordion/package.json';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import tramites from "../Json/tramites.json";
import predioPrueba from "../Json/predioPrueba.json";
import inscribe from "../Json/predioPruebaInscribe.json";
//import cancela from "../Json/predioPruebaCancela.json";
import "../Styles/TramiteDetalle.css";
import "reactjs-popup/dist/index.css";
import JsonDesenglobe from "../Json/JsonPrueba.json";
//////////////////
import useAvaluo from "../hooks/useAvaluo";
import { Form } from "react-router-dom";
const TramiteDetalleForm = () => {
  //const { dataDesenglobe } = useAvaluo();
  let dataDesenglobe = JsonDesenglobe;
  console.log("Data Desenglobe OBJ", dataDesenglobe);
  const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"]);
  const [jsonValues, setJsonValues] = useState({
    clasificacion_mutacion: 153,
    numero_resolucion: "res 0002",
    fecha_resolucion: "2023-12-06",
    fecha_radicacion: "2023-11-06",
    ric_predio: 1,
  });
  const location = useLocation();
  const predioCancela2 = location.state.predio;
  console.log(location);
  //const test = predioGet(npn);
  console.log("aa");
  console.log(predioCancela2);
  var cancela = predioCancela2;

  /*const interesado = Array(
    Object(predioPrueba.data.Predio[0].derechos[0].interesado_lc_interesado)
  );*/ let interesado = []; //inscribe
  // dataDesenglobe[0].interesados.map((item, index) => {    interesado.push(item);  });
  for (let i = 0; i < dataDesenglobe.length; i++) {
    for (var j = 0; j < dataDesenglobe[i].interesados.length; j++) {
      interesado.push(dataDesenglobe[i].interesados[j]);
    }
  }
  console.log("desenglobe interesado", interesado);
  //Se convierte a array porque en Json no es array
  const interesadoCancela = [];
  for (let i = 0; i < cancela.data.Predio.length; i++) {
    for (var j = 0; j < cancela.data.Predio[i].derechos.length; j++) {
      interesadoCancela.push(
        cancela.data.Predio[i].derechos[j].interesado_lc_interesado
      );
    }
  }
  //const interesadoCancela = Array(    Object(cancela.data.Predio[0].derechos[0].interesado_lc_interesado)  );

  let predio = dataDesenglobe[0].predio;

  //const predio = Object(predioPrueba.data.Predio);
  console.log("desenglobe predio", predio);

  //const derecho = Object(predioPrueba.data.Predio[0].derechos);
  //let derecho = dataDesenglobe[0].derecho;//inscribe
  let derecho = [];
  for (let i = 0; i < dataDesenglobe.length; i++) {
    derecho.push(dataDesenglobe[i].derecho);
  }
  //  const derechoCancela = Object(cancela.data.Predio[0].derechos);
  const derechoCancela = [];
  for (let i = 0; i < cancela.data.Predio.length; i++) {
    for (var j = 0; j < cancela.data.Predio[i].derechos.length; j++) {
      derechoCancela.push(cancela.data.Predio[i].derechos[j]);
    }
  }
  /*const fuenteAdministrativa = Object(
    predioPrueba.data.Predio[0].derechos[0].fuenteadministrativa
  );*/
  //  let fuenteAdministrativa = dataDesenglobe[0].fuente_administrativa;
  let fuenteAdministrativa = [];
  for (let i = 0; i < dataDesenglobe.length; i++) {
    fuenteAdministrativa.push(dataDesenglobe[i].fuente_administrativa);
  }

  //const fuenteAdministrativaCancela = Object(    cancela.data.Predio[0].derechos[0].fuenteadministrativa  );
  const fuenteAdministrativaCancela = [];
  for (let i = 0; i < cancela.data.Predio.length; i++) {
    for (var j = 0; j < cancela.data.Predio[i].derechos.length; j++) {
      for (
        var k = 0;
        k < cancela.data.Predio[i].derechos[j].fuenteadministrativa.length;
        k++
      ) {
        fuenteAdministrativaCancela.push(
          cancela.data.Predio[i].derechos[j].fuenteadministrativa[k]
        );
      }
    }
  }
  //const terreno = Array(Object(predioPrueba.data.Predio[0].terreno));
  let terreno = dataDesenglobe[0].terreno;
  Object.entries(terreno).map((item, index) => {});
  //const data = Object(tramites.Tramites);//en este caso no se convierte a Array porque en Json ya esta en Array
  //console.log(data)
  console.log(interesado);

  let construccion = [];
  dataDesenglobe[0].construccion.map((item, index) => {
    construccion.push(item);
  });
  let unidadConst = [];
  dataDesenglobe[0].unidad_construccion.map((item, index) => {
    console.log("desenglobe item unidad", item);
    unidadConst.push(item);
  });

  //
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  function handleInput(e) {
    const { name, value } = e.target;
    jsonValues.clasificacion_mutacion = parseInt(value);
    console.log(value);
  }
  function handleInput1(e) {
    const { name, value } = e.target;
    jsonValues.numero_resolucion = value;
    console.log(value);
  }
  function handleInput2(e) {
    const { name, value } = e.target;
    jsonValues.fecha_resolucion = value;
    console.log(ref2.current.value);
    //console.log(value);
  }
  function handleInput3(e) {
    const { name, value } = e.target;
    jsonValues.fecha_radicacion = value;
    //console.log(value);
    console.log(ref3.current.value);
  }
  function handleInput4(e) {
    const { name, value } = e.target;
    jsonValues.ric_predio = parseInt(value);
    //console.log(value);
    console.log(ref4.current.value);
  }

  async function predioGet(data) {
    try {
      const response = await fetch(
        "http://localhost/api/v1/predio?numero_predial=" + npn,
        {
          method: "GET", // or 'PUT'
          headers: {
            //"Content-Type": "application/json",
          },
          //body: JSON.stringify(data),
          //body:data
        }
      );

      const result = await response.json();
      console.log("SuccessNpn:", result);
      cancela = result;
      return result;
    } catch (error) {
      console.error("ErrorNpn:", error);
    }
  }

  async function postJSON(data) {
    try {
      const response = await fetch(
        "http://localhost/api/v1/ric-tramite-catastral/local",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleEnviar(e) {
    if (
      !ref.current.value ||
      !ref1.current.value ||
      !ref2.current.value ||
      !ref3.current.value ||
      !ref4.current.value
    ) {
      alert("Por favor registre todos los datos");
      return false;
    } else {
      console.log("Enviando ...");
      const jsonEnviar = {
        clasificacion_mutacion: jsonValues.clasificacion_mutacion,
        numero_resolucion: jsonValues.numero_resolucion,
        fecha_resolucion: jsonValues.fecha_resolucion,
        ric_predio: jsonValues.ric_predio,
      };
      console.log(jsonEnviar);
      console.log(jsonValues);
      postJSON(jsonEnviar);
      return false;
    }
  }
  return (
    <>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-opacity-80 text-left">
        <h3> Detalles del Tramite </h3>

        <Accordion>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>Interesado</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <table className="w-full text-center ">
                <thead className="uppercase  bg-teal-500 text-base text-white">
                  <tr>
                    <th className=" rounded-l-lg p-2">Id</th>
                    <th className="border-x-2  p-2">Tipo de Tramite</th>
                    <th className="border-x-2  p-2">Tipo Documento</th>
                    <th className="border-x-2  p-2">Numero de Documento</th>
                    <th className="border-x-2  p-2">Primer Nombre</th>
                    <th className="border-x-2  p-2">Segundo Nombre</th>
                    <th className="border-x-2  p-2">Primer Apellido</th>
                    <th className="border-x-2  p-2">Segundo Apellido</th>
                    <th className="border-x-2  p-2">Genero</th>
                    <th className="border-x-2  p-2">Grupo Etnico</th>
                    <th className="border-x-2 p-2">Razon Social</th>
                    <th className="border-x-2  p-2">Estado Civil</th>
                    <th className="border-x-2 rounded-r-lg p-2">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {interesado.map((registro, key) => (
                    <tr className="border-2 " value={key}>
                      <td className="border-x-2  p-2">{registro.t_id}</td>
                      <td className="border-x-2  p-2">{registro.tipo}</td>
                      <td className="border-x-2  p-2">
                        {registro.tipo_documento}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.documento_identidad}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.primer_nombre}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.segundo_nombre}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.primer_apellido}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.segundo_apellido}
                      </td>
                      <td className="border-x-2  p-2">{registro.sexo}</td>
                      <td className="border-x-2  p-2">
                        {registro.grupo_etnico}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.razon_social}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.estado_civil}
                      </td>
                      <td className="border-x-2  p-2">Inscribe</td>
                    </tr>
                  ))}
                  {interesadoCancela.map((registro, key) => (
                    <tr className="border-2" value={key}>
                      <td className="border-x-2  p-2">{registro.t_id}</td>
                      <td className="border-x-2  p-2">{registro.tipo}</td>
                      <td className="border-x-2  p-2">
                        {registro.tipo_documento}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.documento_identidad}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.primer_nombre}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.segundo_nombre}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.primer_apellido}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.segundo_apellido}
                      </td>
                      <td className="border-x-2  p-2">{registro.sexo}</td>
                      <td className="border-x-2  p-2">
                        {registro.grupo_etnico}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.razon_social}
                      </td>
                      <td className="border-x-2  p-2">
                        {registro.estado_civil}
                      </td>
                      <td className="border-x-2  p-2">Cancela</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>Predio</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <table className="w-full min-w-max table-auto text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">Id</th>
                    <th className="border-2 rounded-xl p-2">Departamento</th>
                    <th className="border-2 rounded-xl p-2">Municipio</th>
                    <th className="border-2 rounded-xl p-2">Tiene FMI?</th>
                    <th className="border-2 rounded-xl p-2">Codigo Orip</th>
                    <th className="border-2 rounded-xl p-2">
                      Matricula Inmobiliaria
                    </th>
                    <th className="border-2 rounded-xl p-2">Numero Predial</th>
                    <th className="border-2 rounded-xl p-2">
                      Numero Predial Anterior
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr value={1}>
                    <td>{predio.t_id}</td>
                    <td>{predio.departamento}</td>
                    <td>{predio.municipio}</td>
                    <td>{predio.tiene_fmi + ""}</td>
                    <td>{predio.codigo_orip}</td>
                    <td>{predio.matricula_inmobiliaria}</td>
                    <td>{predio.numero_predial}</td>
                    <td>{predio.numero_predial_anterior}</td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full min-w-max table-auto text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">
                      Codigo Homologado
                    </th>
                    <th className="border-2 rounded-xl p-2">
                      Interrelacionado
                    </th>
                    <th className="border-2 rounded-xl p-2">
                      Interrelacionado FMI
                    </th>
                    <th className="border-2 rounded-xl p-2">NUPRE</th>
                    <th className="border-2 rounded-xl p-2">
                      Avaluo Catastral
                    </th>
                    <th className="border-2 rounded-xl p-2">Valor Catastral</th>
                    <th className="border-2 rounded-xl p-2">
                      Valor de Referencia
                    </th>
                    <th className="border-2 rounded-xl p-2">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr value={0}>
                    <td>{predio.codigo_homologado}</td>
                    <td>{predio.interrelacionado + ""}</td>
                    <td>{predio.codigo_homologado_fmi + ""}</td>
                    <td>{predio.nupre}</td>
                    <td>{predio.avaluo_catastral}</td>
                    <td>{predio.valor_catastral}</td>
                    <td>{predio.valor_referencia}</td>
                    <td>Na</td>
                  </tr>
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>Información Jurídica</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <h3>
                <b>Derecho</b>
              </h3>
              <table className="w-full text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">Id</th>
                    <th className="border-2 rounded-xl p-2">Tipo</th>
                    <th className="border-2 rounded-xl p-2">
                      Fraccion Derecho
                    </th>
                    <th className="border-2 rounded-xl p-2">
                      Fecha Inicio Tenencia
                    </th>

                    <th className="border-2 rounded-xl p-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {derecho.map((registro, key) => (
                    <tr value={key}>
                      <td>{registro.t_id}</td>
                      <td>{registro.tipo_derecho}</td>
                      <td>{registro.fraccion_derecho}</td>
                      <td>{registro.inicio_tenencia}</td>

                      <td>Inscribe</td>
                    </tr>
                  ))}
                  {derechoCancela.map((registro, key) => (
                    <tr value={key}>
                      <td>{registro.t_id}</td>
                      <td>{registro.tipo.dispname}</td>
                      <td>{registro.fraccion_derecho}</td>
                      <td>{registro.fecha_inicio_tenencia}</td>
                      <td>Cancela</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>
                <b>Fuente Administrativa</b>
              </h3>
              <table className="w-full text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">Id</th>
                    <th className="border-2 rounded-xl p-2">Tipo</th>
                    <th className="border-2 rounded-xl p-2">Ente Emisor</th>
                    <th className="border-2 rounded-xl p-2">Observación</th>
                    <th className="border-2 rounded-xl p-2">
                      Numero de Fuente
                    </th>
                    <th className="border-2 rounded-xl p-2">
                      Estado Disponibilidad
                    </th>
                    <th className="border-2 rounded-xl p-2">Tipo Principal</th>
                    <th className="border-2 rounded-xl p-2">
                      Fecha Documento Fuente
                    </th>
                    <th className="border-2 rounded-xl p-2">
                      Espacio de Nombres
                    </th>
                    <th className="border-2 rounded-xl p-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {fuenteAdministrativa.map((registro, key) => (
                    <tr value={key}>
                      <td>{registro.t_id}</td>
                      <td>{registro.tipo}</td>
                      <td>{registro.ente_emisor}</td>
                      <td>{registro.observacion}</td>
                      <td>{registro.numero_fuente}</td>
                      <td>{registro.estado_disponibilidad}</td>
                      <td>{registro.tipo_principal}</td>
                      <td>{registro.fecha_documento_fuente}</td>
                      <td>{registro.espacio_de_nombres}</td>
                      <td>Inscribe</td>
                    </tr>
                  ))}
                  {fuenteAdministrativaCancela.map((registro, key) => (
                    <tr value={key}>
                      <td>{registro.t_id}</td>
                      <td>{registro.tipo.dispname}</td>
                      <td>{registro.ente_emisor}</td>
                      <td>{registro.observacion}</td>
                      <td>{registro.numero_fuente}</td>
                      <td>{registro.estado_disponibilidad.dispname}</td>
                      <td>{registro.tipo_principal}</td>
                      <td>{registro.fecha_documento_fuente}</td>
                      <td>{registro.espacio_de_nombres}</td>
                      <td>Cancela</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>Construcciones</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <h3>
                <b>Construccion</b>
              </h3>
              <table className="w-full text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">Identificador</th>
                    <th className="border-2 rounded-xl p-2">
                      Tipo Construccion
                    </th>
                    <th className="border-2 rounded-xl p-2">Avaluo</th>
                    <th className="border-2 rounded-xl p-2">Area</th>
                    <th className="border-2 rounded-xl p-2">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {construccion.map((item, index) => {
                    return (
                      <tr value={0}>
                        <td>{item.identificador}</td>
                        <td>
                          {item.tipo_construccion == "66"
                            ? "Convencional"
                            : "No Convencional"}
                        </td>
                        <td>{item.avaluo}</td>
                        <td>{item.area}</td>
                        <td>"Modal"</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>
                Unidades de Construcciones
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <h3>
                <b> Unidades de Construcciones</b>
              </h3>
              <table className="w-full text-center">
                <thead className="uppercase   bg-teal-500 text-base text-white">
                  <tr>
                    <th className=" rounded-s-lg p-2">Construccion</th>
                    <th className="border-x-2  p-2">Identificador</th>
                    <th className="border-x-2  p-2">Tipo Unidad</th>
                    <th className="border-x-2  p-2">Area</th>
                    <th className=" rounded-e-lg p-2">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {unidadConst.map((item, index) => {
                    return (
                      <tr value={0}>
                        <td className="border-2">{item.identificador}</td>
                        <td className="border-2">
                          {
                            item.lc_caracteristicasunidadconstruccion
                              .identificador
                          }
                        </td>
                        <td className="border-2">
                          {
                            item.lc_caracteristicasunidadconstruccion
                              .tipo_unidad_construccion.dispname
                          }
                        </td>
                        <td className="border-2">{item.area_construida}</td>
                        <td className="border-2">"Modal"</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>Terreno</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <h3>
                <b>Terreno</b>
              </h3>
              <table className="w-full text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">Id</th>
                    <th className="border-2 rounded-xl p-2">Area de Terreno</th>
                    <th className="border-2 rounded-xl p-2">Avaluo Terreno</th>
                    <th className="border-2 rounded-xl p-2">
                      Codigo Manzana Vereda
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr value={0}>
                    <td>{terreno.t_id}</td>
                    <td>{terreno.area_terreno}</td>
                    <td>{terreno.avaluo_terreno}</td>
                    <td>{terreno.codigo_manzana}</td>
                  </tr>
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className="bg-transparent bg-white bg-opacity-80">
            <AccordionItemHeading>
              <AccordionItemButton>Ric Tramite Catastral</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <br />
              <form>
                <div className=" flex justify-center items-center w-full mb-3">
                  <div className="w-1/4 flex flex-col  ml-4 ">
                    <label className="w-mid font-semibold">
                      Clasificacion Mutacion :{" "}
                    </label>
                    <select
                      onChange={handleInput}
                      className="border-2 p-2 rounded-lg text-center w-full"
                      name="area1"
                      required
                      ref={ref}
                    >
                      {mutacionJson.mutacion.map((registro, key) => (
                        <option value={registro.t_id}>
                          {registro.dispname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/4 flex flex-col  ml-4 ">
                    <label className="w-mid font-semibold">
                      Numero de Resolucion :{" "}
                    </label>
                    <input
                      onChange={handleInput1}
                      type="text"
                      step="0.01"
                      className="border-2 p-2 rounded-lg text-center w-full"
                      name="area1"
                      required
                      ref={ref1}
                    ></input>
                  </div>
                </div>
                <div className=" flex justify-center items-center w-full mb-3">
                  <div className="w-1/4 flex flex-col  ml-4 ">
                    <label className="w-mid font-semibold">
                      Fecha Resolucion :{" "}
                    </label>
                    <input
                      onChange={handleInput2}
                      type="date"
                      step="0.01"
                      className="border-2 p-2 rounded-lg text-center w-full"
                      name="area1"
                      required
                      ref={ref2}
                    ></input>
                  </div>
                  <div className="w-1/4 flex flex-col  ml-4 ">
                    <label className="w-mid font-semibold">
                      Fecha Radicación :{" "}
                    </label>
                    <input
                      onChange={handleInput3}
                      type="date"
                      step="0.01"
                      className="border-2 p-2 rounded-lg text-center w-full"
                      name="area1"
                      required
                      ref={ref3}
                    ></input>
                  </div>
                  <div className="w-1/4 flex flex-col  ml-4 ">
                    <label className="w-mid font-semibold">Ric Predio : </label>
                    <input
                      onChange={handleInput4}
                      type="number"
                      step="1"
                      className="border-2 p-2 rounded-lg text-center w-full"
                      name="area1"
                      required
                      ref={ref4}
                      id="box"
                    ></input>
                  </div>
                </div>
                <br />
                <div className="w-full flex flex-col items-center justify-center mt-4">
                  <button
                    className="p-2 w-1/4 text-center  rounded-md  border-2  text-white bg-teal-500 "
                    type="button"
                    return
                    false
                    onClick={handleEnviar}
                  >
                    Guardar Tramite
                  </button>
                </div>
              </form>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
export default TramiteDetalleForm;
