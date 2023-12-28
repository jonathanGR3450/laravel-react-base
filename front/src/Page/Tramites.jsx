import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
import tramites from "../Json/tramites.json";
import JsonDesenglobe from "../Json/JsonPrueba.json";
import useAvaluo from "../hooks/useAvaluo";
var a = 0;
const TramitesForm = () => {
  //const { dataDesenglobe } = useAvaluo();
  let dataDesenglobe = JsonDesenglobe;
  console.log("Data Desenglobe OBJ", dataDesenglobe);
  //console.log("Data Desenglobe OBJ", JSON.stringify(dataDesenglobe));
  const navigate = useNavigate();
  const [estEstado, setEstEstado] = useState(false);
  const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"]);
  const [jsonValues, setJsonValues] = useState({
    incremento: 0,
    decreto: "Na",
    vigencia: "2023",
  });
  var tramiteList=tramites.Tramites;

  //console.log(tramites.Tramites[0].id)
  /*const data = Object(tramites.Tramites);
  console.log("Desenglobe data", data);
  let texto = "";
  if (dataDesenglobe[0].predio.tipo == "889") {
    texto = "Rural";
  } else {
    texto = "Urbano";
  }
  data.map((item, index) => {
    item.predioTipo = texto;
    item.npn = dataDesenglobe[0].predio.numero_predial;
  });*/
  var npn="252900100000012120038000000000";
  function handleEnviar(e) {
    predioGet(npn);
  }
  function toggleEditar() {
    setEstEstado((prevEstEstado) => !prevEstEstado);
  }
var ab;
const [tramitesU, setTramitesU] = useState(tramites);
console.log(tramitesU);
  async function tramitesGet(data) {
    console.log("Consultando ...");
    
    setTimeout("alert('Consultando Informacion de tramites ...');", 1);    
      console.log("antes de")
      const promise = fetch("http://localhost/api/v1/tramite-radicado", {
      //  const promise =  fetch("http://localhost:81/FusaCatastro/codigosHomologados/php/tramite.php?fnpn=12340", {
        method: "GET", // or 'PUT'
        headers: {
          //"Content-Type": "application/json",
        },
        //body: JSON.stringify(data),
        //body:data        
      });
      var ac;
      await promise.then((response)=>response.json())
      .then((responseJson)=>{ac= responseJson});
      console.log("despues de");
      return ac;
  }

  async function tramitesGetSync(){
    const json =  await tramitesGet();
    ab = Object(json);
    setTramitesU(ab);
    console.log(ab);
  }
  //console.log(a);
  if(a<=0){
  tramitesGetSync();
  a++;  
  }  

  async function predioGet(data) {
    console.log("Consultando ...");
    
    setTimeout("alert('Consultando Informacion del predio ...');", 1);    
    try {
      const response = await fetch("http://localhost/api/v1/predio?numero_predial="+npn, {
        method: "GET", // or 'PUT'
        headers: {
          //"Content-Type": "application/json",
        },
        //body: JSON.stringify(data),
        //body:data        
      });
  
      const result = await response.json();
      navigate("/TramiteDetalle",{state:{predio:result}});//tiene que ser state
      console.log("SuccessNpn:", result);
      return result;
    } catch (error) {
      setTimeout("alert('Error de red');", 1);
      console.error("ErrorNpn:", error);

    }
  }  
  function changeData(e) {}
  return (
    <>

      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left">
        <pre> </pre>
        <table className="w-full text-center">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl p-2">Radicado</th>
              <th className="border-2 rounded-xl p-2">Id</th>
              <th className="border-2 rounded-xl p-2">Tipo de Tramite</th>
              <th className="border-2 rounded-xl p-2">Fecha Radicaion</th>
              <th className="border-2 rounded-xl p-2">Tipo de Predio</th>
              <th className="border-2 rounded-xl p-2">NPN</th>
              <th className="border-2 rounded-xl p-2">Estado</th>
              <th className="border-2 rounded-xl p-2">Fecha Notificación</th>
              <th className="border-2 rounded-xl p-2">Metodo Notificación</th>
              <th className="border-2 rounded-xl p-2">Observaciones</th>
              <th className="border-2 rounded-xl p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tramitesU.data.data.map((tramite, key) => (
              <tr value={key}>
                <td>{tramite.radicado}</td>
                <td>{tramite.id}</td>
                <td>{tramite.tipo_tramite}</td>
                <td>{tramite.fecha_radicado}</td>
                <td>{tramite.tipo_predio}</td>
                <td>{tramite.numero_predial}</td>
                <td>{tramite.estado}</td>
                <td>{tramite.fecha_notificacion}</td>
                <td>{tramite.metodo_notificacion}</td>
                <td>
                  {estEstado ? (
                    <button className="p-2 mt-4 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
                      Agregar Observacion
                    </button>
                  ) : (
                    tramite.observaciones
                  )}
                </td>
                <td>
                  <div className="w-sm flex flex-col items-center justify-center mt-4">
                    <button
                      className="p-2 w-1/8 text-center  rounded-md  border-2  text-white bg-teal-500 "
                      onClick={handleEnviar}
                    >
                      Detalles
                    </button>
                  </div>
                  <div className="w-sm flex flex-col items-center justify-center mt-4">
                    <button
                      className="p-2 w-1/8 text-center  rounded-md  border-2  text-white bg-teal-500 "
                      onClick={toggleEditar}
                    >
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

    </>
  );
};
export default TramitesForm;