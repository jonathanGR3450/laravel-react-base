export const FuenteAdminForm = () => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl">Fuente Administrativa</h1>
      <p>A continuación se muestran las caracteristicas del predio:</p>
      <div className="w-full pt-4 flex flex-col">
        <h2 className="text-xl">Datos Generales del Predio</h2>
        <div id="Id" className="w-full flex flex-row">
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">T_ID* : </h3>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Id Predio* :</h3>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div id="Clase" className="w-full flex flex-row">
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Tipo de Fuente Administrativa* : </h3>
            <select className="border-2 p-2 rounded-md w-full">
              <option></option>
              <option name={45}>Documento Publico</option>
              <option name={46}>Documento Privado </option>
              <option name={50}>Escritura Publica (Doc Publico)</option>
              <option name={51}>Sentencia Judicial (Doc Publico) </option>
              <option name={52}>Acto Administrativo (Doc Publico) </option>
              <option name={54}>Sin Documento</option>
            </select>
          </div>
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Ente Emisor* :</h3>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div id="NumFuente" className="w-full flex flex-row">
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Numero Fuente* : </h3>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Estado Disponibilidad* :</h3>
            <select className="border-2 p-2 rounded-md w-full">
              <option></option>
              <option name={885}>Convertido</option>
              <option name={886}>Desconocido</option>
              <option name={887}>Disponible</option>
            </select>
          </div>
        </div>
        <div id="Tipo_Principal" className="w-full flex flex-row">
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Tipo Principal* : </h3>
            <select type="text" className="border-2 p-2 rounded-md w-full">
              <option></option>
              <option value={18}>Imagen</option>
              <option value={19}>Documento</option>
              <option value={20}>Mapa</option>
              <option value={21}>Video</option>
              <option value={22}>Otro</option>
            </select>
          </div>
          <div className="w-1/2 flex flex-col m-4">
            <h3 className="font-semibold">Fecha Documento Fuente* :</h3>
            <input
              type="date"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div id="Button" className="w-full flex flex-row">
          <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg m-4">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
