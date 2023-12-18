import { useEffect, useState, useContext } from "react";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
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
import "../Styles/TramiteDetalle.css";
import "reactjs-popup/dist/index.css";
import JsonDesenglobe from "../Json/JsonPrueba.json";
//////////////////
import useAvaluo from "../hooks/useAvaluo";
const TramiteDetalleForm = () => {
  //const { dataDesenglobe } = useAvaluo();
  let dataDesenglobe = JsonDesenglobe;
  console.log("Data Desenglobe OBJ", dataDesenglobe);
  const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"]);
  const [jsonValues, setJsonValues] = useState({
    incremento: 0,
    decreto: "Na",
    vigencia: "2023",
  });

  /*const interesado = Array(
    Object(predioPrueba.data.Predio[0].derechos[0].interesado_lc_interesado)
  );*/ let interesado = [];
  dataDesenglobe[0].interesados.map((item, index) => {
    interesado.push(item);
  });
  console.log("desenglobe interesado", interesado);
  //Se convierte a array porque en Json no es array
  const interesadoInscribe = Array(
    Object(inscribe.data.Predio[0].derechos[0].interesado_lc_interesado)
  );
  let predio = dataDesenglobe[0].predio;
  //const predio = Object(predioPrueba.data.Predio);
  console.log("desenglobe predio", predio);

  //const derecho = Object(predioPrueba.data.Predio[0].derechos);
  let derecho = dataDesenglobe[0].derecho;

  const derechoInscribe = Object(inscribe.data.Predio[0].derechos);
  /*const fuenteAdministrativa = Object(
    predioPrueba.data.Predio[0].derechos[0].fuenteadministrativa
  );*/
  let fuenteAdministrativa = dataDesenglobe[0].fuente_administrativa;

  const fuenteAdministrativaInscribe = Object(
    inscribe.data.Predio[0].derechos[0].fuenteadministrativa
  );
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
  function handleEnviar(e) {}
  function handleInput(e) {
    const { name, value } = e.target;
    jsonValues.incremento = value;
    console.log(value);
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
                      <td className="border-x-2  p-2">Cancela</td>
                    </tr>
                  ))}
                  {interesadoInscribe.map((registro, key) => (
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
                      <td className="border-x-2  p-2">Inscribe</td>
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
                  <tr value={0}>
                    <td>{derecho.t_id}</td>
                    <td>{derecho.tipo_derecho}</td>
                    <td>{derecho.fraccion_derecho}</td>
                    <td>{derecho.inicio_tenencia}</td>

                    <td>Cancela</td>
                  </tr>
                  <tr value={1}>
                    <td>{derechoInscribe[0].t_id}</td>
                    <td>{derechoInscribe[0].tipo}</td>
                    <td>{derechoInscribe[0].fraccion_derecho}</td>
                    <td>{derechoInscribe[0].fecha_inicio_tenencia}</td>

                    <td>Inscribe</td>
                  </tr>
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
                  <tr value={1}>
                    <td>{fuenteAdministrativa.t_id}</td>
                    <td>{fuenteAdministrativa.tipo}</td>
                    <td>{fuenteAdministrativa.ente_emisor}</td>
                    <td>{fuenteAdministrativa.observacion}</td>
                    <td>{fuenteAdministrativa.numero_fuente}</td>
                    <td>{fuenteAdministrativa.estado_disponibilidad}</td>
                    <td>{fuenteAdministrativa.tipo_principal}</td>
                    <td>{fuenteAdministrativa.fecha_documento_fuente}</td>
                    <td>{fuenteAdministrativa.espacio_de_nombres}</td>
                    <td>Cancela</td>
                  </tr>
                  {fuenteAdministrativaInscribe.map((registro, key) => (
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
              <AccordionItemButton>Detalles</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <table className="w-full text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                  <tr>
                    <th className="border-2 rounded-xl p-2">Radicado</th>
                    <th className="border-2 rounded-xl p-2">Id</th>
                    <th className="border-2 rounded-xl p-2">Tipo de Tramite</th>
                  </tr>
                </thead>
                <tbody>
                  {tramites.Tramites.map((tramite, key) => (
                    <tr value={key}>
                      <td>{tramite.Radicado}</td>
                      <td>{tramite.id}</td>
                      <td>
                        <div className="w-sm flex flex-col items-center justify-center mt-4">
                          <Popup
                            trigger={
                              <button className="p-2 w-1/8 text-center  rounded-md  border-2  text-white bg-teal-500 ">
                                {" "}
                                Detalles{" "}
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="modal">
                                <div className="content">Welcome to GFG!!!</div>
                                <div>
                                  <button onClick={() => close()}>
                                    Close modal
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </div>
                      </td>
                    </tr>
                  ))}
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
              <div className=" flex justify-center items-center w-full mb-3">
                <div className="w-1/4 flex flex-col  ml-4 ">
                  <label className="w-mid font-semibold">Id : </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    className="border-2 p-2 rounded-lg text-center w-full"
                    name="area1"
                  ></input>
                </div>
                <div className="w-1/4 flex flex-col  ml-4 ">
                  <label className="w-mid font-semibold">
                    Clasificacion Mutacion :{" "}
                  </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    step="0.01"
                    className="border-2 p-2 rounded-lg text-center w-full"
                    name="area1"
                  ></input>
                </div>
                <div className="w-1/4 flex flex-col  ml-4 ">
                  <label className="w-mid font-semibold">
                    Numero de Resolucion :{" "}
                  </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    step="0.01"
                    className="border-2 p-2 rounded-lg text-center w-full"
                    name="area1"
                  ></input>
                </div>
              </div>
              <div className=" flex justify-center items-center w-full mb-3">
                <div className="w-1/4 flex flex-col  ml-4 ">
                  <label className="w-mid font-semibold">
                    Fecha Resolucion :{" "}
                  </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    step="0.01"
                    className="border-2 p-2 rounded-lg text-center w-full"
                    name="area1"
                  ></input>
                </div>
                <div className="w-1/4 flex flex-col  ml-4 ">
                  <label className="w-mid font-semibold">
                    Fecha Radicación :{" "}
                  </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    step="0.01"
                    className="border-2 p-2 rounded-lg text-center w-full"
                    name="area1"
                  ></input>
                </div>
                <div className="w-1/4 flex flex-col  ml-4 ">
                  <label className="w-mid font-semibold">Ric Predio : </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    step="0.01"
                    className="border-2 p-2 rounded-lg text-center w-full"
                    name="area1"
                  ></input>
                </div>
              </div>
              <br />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
export default TramiteDetalleForm;
