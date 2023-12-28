import React, { useRef, useState, useContext, useEffect } from "react";
import Loader from "./Loader";

const CreateTramite = () => {
  let [response, setResponse] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("");
  const [estBtt, setEstBtt] = useState(true);
  let fecha_actual = new Date();
  console.log(fecha_actual.getDay());
  let [tramite, setTramite] = useState({
    radicado: "",
    id: "",
    tipo_tramite: "",
    fecha_radicacion: "",
    tipo_predio: "",
    NPN: "",
    estado_tramite: "",
    fecha_notificacion: "",
    metodo: "",
  });
  console.log(tramite);

  useEffect(() => {
    loadTipo_Tramite();
  }, []);
  useEffect(() => {
    validar();
  }, [tramite]);
  function validar() {
    const algunCampoVacio = Object.values(tramite).some(
      (value) => value === ""
    );

    // Establecer el estado en true si algún campo está vacío, de lo contrario, en false.
    setEstBtt(algunCampoVacio);
    // Si no encuentra campos vacíos, devuelve true
    let camposVacios = [];
    for (const key in tramite) {
      if (tramite.hasOwnProperty(key) && tramite[key] === "") {
        console.error();
        camposVacios.push(`El campo ${key} no puede estar vacío.`);
      }
    }
    setMsjLoading(camposVacios);
  }
  async function loadTipo_Tramite() {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let url =
        import.meta.env.VITE_API_URL_FIRST + "document/list/tipo-tramite";
      let response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log("reso", result.data.data);
        setResponse(result.data.data);
      }
    } catch (error) {}
  }
  function handleInput(e) {
    const { name, value } = e.target;
    setTramite((prevValues) => ({ ...prevValues, [name]: value }));
  }
  async function sendData() {
    setLoading(true);
    setMsjLoading("Guardando Datos");
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = {
        radicado: tramite.radicado,
        id: tramite.id,
        tipo_tramite: tramite.tipo_tramite,
        fecha_radicado: tramite.fecha_radicacion,
        tipo_predio: tramite.tipo_predio,
        numero_predial: tramite.NPN,
        estado: tramite.estado_tramite,
        fecha_notificacion: tramite.fecha_notificacion,
        metodo_notificacion: tramite.metodo,
        observaciones: tramite.observaciones,
      };
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow",
      };
      console.log(JSON.stringify(raw));
      let url = import.meta.env.VITE_API_URL_FIRST + "tramite-radicado";
      const response = await fetch(url, requestOptions);
      setLoading(false);
      setMsjLoading("Datos Guardados");
    } catch (error) {
      console.log("error", error);
      setMsjLoading("error " + error);
    }
  }

  return (
    <div className="p-4 w-8/12 flex flex-col overflow-auto bg-transparent text-center h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl w-full">Crear Tramite</h1>
      <div className="mt-4 flex flex-col w-full items-center justify-center">
        <div className="flex-row flex  items-center justify-center w-full">
          <div className="flex flex-col  w-1/3">
            <label>Radicado</label>
            <input
              name="radicado"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
              onChange={handleInput}
              value={tramite.radicado}
            ></input>
          </div>
          <div className="flex flex-col  w-1/3">
            <label>ID</label>
            <input
              name="id"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
              onChange={handleInput}
              value={tramite.id}
            ></input>
          </div>
          <div className="flex flex-col w-1/3">
            <label>Tipo Tramite</label>
            <select
              name="tipo_tramite"
              onChange={handleInput}
              value={tramite.tipo_tramite}
              className="border-2 rounded-lg text-center m-1"
            >
              <option></option>
              {response != 0
                ? response.map((item, index) => {
                    return (
                      <option key={index} value={item.t_id}>
                        {item.nombre}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
        </div>
        <div className="flex-row flex  items-center justify-center w-full">
          <div className="flex flex-col w-1/3">
            <label>Fecha Radicacion</label>
            <input
              onChange={handleInput}
              name="fecha_radicacion"
              className="border-2 rounded-lg text-center m-1"
              type="date"
              value={tramite.fecha_radicacion}
            ></input>
          </div>
          <div className="flex flex-col w-1/3">
            <label>Tipo de Predio</label>
            <select
              name="tipo_predio"
              className="border-2 rounded-lg text-center m-1"
              type="text"
              onChange={handleInput}
              value={tramite.tipo_predio}
            >
              <option></option>
              <option>Urbano</option>
              <option>Rural</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3">
            <label>NPN</label>
            <input
              name="NPN"
              className="border-2 rounded-lg text-center m-1"
              type="text"
              onChange={handleInput}
              value={tramite.NPN}
            ></input>
          </div>
        </div>
        <div className="flex-row flex  items-center justify-center w-full">
          <div className="flex flex-col w-1/3">
            <label>Estado Tramite</label>
            <select
              name="estado_tramite"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
              onChange={handleInput}
              value={tramite.estado_tramite}
            >
              <option></option>
              <option value="1">En Revision</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3">
            <label>Fecha Notificación</label>
            <input
              name="fecha_notificacion"
              className="border-2 rounded-lg text-center m-1"
              type="date"
              onChange={handleInput}
              value={tramite.fecha_notificacion}
            ></input>
          </div>
          <div className="flex flex-col w-1/3">
            <label>Metodo de Notificacion</label>
            <select
              name="metodo"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
              onChange={handleInput}
              value={tramite.metodo}
            >
              <option></option>
              <option>Correo</option>
              <option>Direccion</option>
            </select>
          </div>
        </div>
        <button
          onClick={sendData}
          disabled={estBtt}
          className={`${
            estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mt-4`}
        >
          Crear
        </button>
        {loading ? <Loader /> : null}
        <div className="flex flex-col">
          {Array.isArray(msjLoading) ? (
            msjLoading.map((item, index) => {
              return <label>{item}</label>;
            })
          ) : (
            <label>{msjLoading}</label>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTramite;
