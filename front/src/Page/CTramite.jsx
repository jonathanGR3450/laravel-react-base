import React, { useRef, useState, useContext, useEffect } from "react";

const CreateTramite = () => {
  let [response, setResponse] = useState(0);
  let fecha_actual = new Date();
  console.log(fecha_actual.getDay());
  let [tramite, setTramite] = useState({
    radicado: 0,
    id: 0,
    tipo_tramite: 0,
    fecha_radicacion:
      fecha_actual.getFullYear() +
      "- " +
      (fecha_actual.getMonth() + 1) +
      "- " +
      fecha_actual.getDate(),
    tipo_predio: 0,
    NPN: 0,
    estado_tramite: "",
    fecha_notificacion: "",
    metodo: "",
  });
  console.log(tramite);

  useEffect(() => {
    loadTipo_Tramite();
  }, []);
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
                    return <option value={item.t_id}>{item.nombre}</option>;
                  })
                : null}
            </select>
          </div>
        </div>
        <div className="flex-row flex  items-center justify-center w-full">
          <div className="flex flex-col w-1/3">
            <label>Fecha Radicacion</label>
            <input
              disabled
              onChange={handleInput}
              name="fecha_radicacion"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
              value={tramite.fecha_radicacion}
            ></input>
          </div>
          <div className="flex flex-col w-1/3">
            <label>Tipo de Predio</label>
            <select
              name="tipo_predio"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
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
              type=" text"
              onChange={handleInput}
              value={tramite.NPN}
            ></input>
          </div>
        </div>
        <div className="flex-row flex  items-center justify-center w-full">
          <div className="flex flex-col w-1/3">
            <label>Estado Tramite</label>
            <select
              disabled
              name="estado_tramite"
              className="border-2 rounded-lg text-center m-1"
              type=" text"
              onChange={handleInput}
              value={tramite.estado_tramite}
            >
              <option>En Revision</option>
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
        <button className="w-1/3 p-2 mt-4 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
          Crear
        </button>
      </div>
    </div>
  );
};
export default CreateTramite;
