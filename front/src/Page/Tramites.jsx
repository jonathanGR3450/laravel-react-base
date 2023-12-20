import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
import tramites from "../Json/tramites.json";
import JsonDesenglobe from "../Json/JsonPrueba.json";
import useAvaluo from "../hooks/useAvaluo";
import Observaciones from "./Observaciones";
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

  //console.log(tramites.Tramites[0].id)
  const data = Object(tramites.Tramites);
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
  });

  function handleEnviar(e) {
    navigate("/TramiteDetalle");
  }
  function toggleEditar() {
    setEstEstado((prevEstEstado) => !prevEstEstado);
  }
  function changeData(e) {
    data.map((item, index) => {
      if (index == e.target.name) {
        let nom = "";
        switch (parseInt(e.target.value)) {
          case 1:
            nom = "En Revision";
            break;
          case 2:
            nom = "Aprobado";
            break;
          case 3:
            nom = "Devuelto";
            break;
          default:
            break;
        }
        item.Estado = nom;
      }
    });
  }

  const observacionFormRef = useRef();
  const openObservacion = (e) => {
    observacionFormRef.current.openModal(e.target.name);
  };
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
            {tramites.Tramites.map((tramite, key) => (
              <tr value={key}>
                <td>{tramite.Radicado}</td>
                <td>{tramite.id}</td>
                <td>{tramite.tramiteTipo}</td>
                <td>{tramite.radicacionFecha}</td>
                <td>{tramite.predioTipo}</td>
                <td>{tramite.npn}</td>
                <td>
                  {estEstado ? (
                    <select
                      className="border-2 p-2 rounded-md w-full"
                      name={key}
                      onChange={(e) => changeData(e, key)}
                    >
                      <option value={0}></option>
                      <option value={1}>En Revision</option>
                      <option value={2}>Aprobado</option>
                      <option value={3}>Devuelto</option>
                    </select>
                  ) : (
                    tramite.Estado
                  )}
                </td>
                <td>{tramite.notificacionFecha}</td>
                <td>{tramite.notificacionMetodo}</td>
                <td>
                  {estEstado ? (
                    <div>
                      <button
                        name={key}
                        onClick={openObservacion}
                        className="p-2 mt-4 text-center rounded-md text-white bg-teal-500 text-lg mr-2"
                      >
                        Agregar Observacion
                      </button>
                      <Observaciones
                        ref={observacionFormRef}
                        data={data}
                        index={key}
                      />
                    </div>
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
