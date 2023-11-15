import { useState } from "react";
const FormularioResolucion = () => {
  const [serialResolucion, setSerialResolucion] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [ciudadCedula, setCiudadCedula] = useState("");
  const [numeroRadicado, setNumeroRadicado] = useState("");
  const [idAasociado, setIdAasociado] = useState("");
  const [numeroPredial, setNumeroPredial] = useState("");
  const [matriculaMatriz, setMatriculaMatriz] = useState("");
  const [zona, setZona] = useState("");
  const [numeroEscritura, setNumeroEscritura] = useState("");
  const [fechaEscritutra, setFechaEscritutra] = useState("");
  const [notaria, setNotaria] = useState("");
  const [ciudadNotaria, setCiudadNotaria] = useState("");
  const [matriSegregadoInicial, setMatriSegregadoInicial] = useState("");
  const [matriSegregadoFinal, setMatriSegregadoFinal] = useState("");
  const [diaNotificacionLetra, setDiaNotificacionLetra] = useState("");
  const [diaNotificacion, setDiaNotificacion] = useState("");
  const [mesNotificacionLetra, setMesNotificacionLetra] = useState("");
  const [anioNotificacionLetra, setAnioNotificacionLetra] = useState("");
  const [anioNotificacion, setAnioNotificacion] = useState("");
  const [nombreDirector, setnombreDirector] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col  py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="  mb-3">
        <label className="font-semibold m-2" htmlFor="serialResolucion">
          Serial Resolución
        </label>
        <input
          type="text"
          id="serialResolucion"
          className="w-full border-2 rounded-lg text-center "
          placeholder="03-0038-2023"
          value={serialResolucion}
          onChange={(e) => setSerialResolucion(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="dia">
          Día
        </label>
        <input
          type="text"
          id="dia"
          className="w-full border-2 rounded-lg text-center "
          placeholder="12"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />
      </div>
      <div className=" mb-3">
        <label className="font-semibold m-2 " htmlFor="mes">
          Mes
        </label>
        <input
          type="text"
          id="mes"
          className="w-full border-2 rounded-lg text-center "
          placeholder="Noviembre"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
      </div>
      <div className=" mb-3">
        <label className="font-semibold m-2 " htmlFor="anio">
          Año
        </label>
        <input
          type="text"
          id="anio"
          className="w-full border-2 rounded-lg text-center "
          placeholder="2023"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="nombre">
          Nombre Completo Propietario
        </label>
        <input
          type="text"
          id="nombre"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Miguel Angel Duran Díaz"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="cedula">
          Cedula Propietario
        </label>
        <input
          type="text"
          id="cedula"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="12345678"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="ciudadCedula">
          Ciudad Expedicion Cedula Propietario
        </label>
        <input
          type="text"
          id="ciudadCedula"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Fusagasuga"
          value={ciudadCedula}
          onChange={(e) => setCiudadCedula(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="numeroRadicado">
          Numero de Radicado
        </label>
        <input
          type="text"
          id="numeroRadicado"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="R-2022-27434"
          value={numeroRadicado}
          onChange={(e) => setNumeroRadicado(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="idAasociado">
          ID Asociado
        </label>
        <input
          type="text"
          id="idAasociado"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="ID-163237"
          value={idAasociado}
          onChange={(e) => setIdAasociado(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="numeroEscritura">
          Numero Escritura
        </label>
        <input
          type="text"
          id="numeroEscritura"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="7434"
          value={numeroEscritura}
          onChange={(e) => setNumeroEscritura(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="fechaEscritutra">
          Fecha Escritura
        </label>
        <input
          type="date"
          id="fechaEscritutra"
          className=" w-full border-2 rounded-lg text-center "
          value={fechaEscritutra}
          onChange={(e) => setFechaEscritutra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="notaria">
          Notaria
        </label>
        <input
          type="text"
          id="notaria"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Primera"
          value={notaria}
          onChange={(e) => setFechaEscritutra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="ciudadNotaria">
          Ciudad Notaria
        </label>
        <input
          type="text"
          id="ciudadNotaria"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Fusagasuga"
          value={ciudadNotaria}
          onChange={(e) => setCiudadNotaria(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="diaNotificacionLetra">
          Dia Notificacion en Letra
        </label>
        <input
          type="text"
          id="diaNotificacionLetra"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Doce"
          value={diaNotificacionLetra}
          onChange={(e) => setDiaNotificacionLetra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="diaNotificacion">
          Dia Notificacion
        </label>
        <input
          type="text"
          id="diaNotificacion"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="12"
          value={diaNotificacion}
          onChange={(e) => setDiaNotificacion(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="mesNotificacionLetra">
          Mes Notificacion Letra
        </label>
        <input
          type="text"
          id="mesNotificacionLetra"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Noviembre"
          value={mesNotificacionLetra}
          onChange={(e) => setMesNotificacionLetra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="anioNotificacionLetra">
          Año Notificacion Letra
        </label>
        <input
          type="text"
          id="anioNotificacionLetra"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="dos mil veintitrés"
          value={anioNotificacionLetra}
          onChange={(e) => setAnioNotificacionLetra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="anioNotificacion">
          Año Notificacion
        </label>
        <input
          type="text"
          id="anioNotificacion"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="2023"
          value={anioNotificacion}
          onChange={(e) => setAnioNotificacion(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="nombreDirector">
          Nombre Director
        </label>
        <input
          type="text"
          id="nombreDirector"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="JIM NIXON DÍAZ HENAO"
          value={nombreDirector}
          onChange={(e) => setnombreDirector(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Crear Resolucion"
        className="
      p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 cursor-pointer
      hover:bg-teal-700 transition-colors "
      />
    </form>
  );
};

export default FormularioResolucion;
