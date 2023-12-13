import { useState } from "react";
import useInfo from "../hooks/useInfo";
import Alerta from "../components/Alerta";
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

  const { mostrarAlerta, alerta, submitInfoResolucion } = useInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        serialResolucion,
        dia,
        mes,
        anio,
        nombre,
        cedula,
        ciudadCedula,
        numeroRadicado,
        idAasociado,
        numeroEscritura,
        fechaEscritutra,
        notaria,
        ciudadNotaria,
        diaNotificacionLetra,
        diaNotificacion,
        mesNotificacionLetra,
        anioNotificacionLetra,
        anioNotificacion,
        nombreDirector,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }
    await submitInfoResolucion({
      tramite_id: "001", //asociado al tipo de tramite ejem cambio de propietario
      no_resolucion: serialResolucion,
      dia: dia,
      mes: mes,
      vigencia: anio,
      nombre_gestor: nombre,
      cedula_numero_gestor: cedula,
      cedula_cuidad_gestor: ciudadCedula,
      calidad_gestor: "PROPIETARIO", //posible select para cambiar entre propietario o apoderado
      no_radicado: numeroRadicado,
      asociado_id: idAasociado,
      numero_predial: "252900001000000010007000000000",
      matricula_inmobiliaria: "1212212112",
      zona_ubicacion: "Rural",
      escritura_publica: numeroEscritura,
      fecha_now: fechaEscritutra,
      no_notaria: notaria,
      ciudad: ciudadNotaria,
      extension_desde: "157-00000",
      extension_hasta: "157-99999",
      ingrese_imagen: "INGRESAR IMÁGEN LEGIBLE Y CENTRADA",
      dia_now_letra: diaNotificacionLetra,
      dia_now_numero: diaNotificacion,
      mes_now_letra: mesNotificacionLetra,
      annio_letra: anioNotificacionLetra,
      annio_numero: anioNotificacion,
      nombre_director_ordenamiento: nombreDirector,
      cargo_director_ordenamiento:
        "Directora de Ordenamiento Territorial y Gestión Catastral",
      nombre_proyecto_abogado: "Luis Carlos",
      nombre_reviso_contratista: "Diego",
      reviso_aprobo_nombre: "Oscar Rivera Aguilar",
      reviso_aprobo_cargo: "Aux. Administrativo",
      cancela_datos_predio_nmero_catastral: [
        {
          cancela_datos_predio_nmero_catastral:
            "252900100000002150187000000000",
          cancela_datos_predio_matricula_inmobiliaria: "157-75298",
          cancela_datos_predio_direccion: "Lo No 6",
          cancela_datos_predio_destino_economico: "R",
          cancela_datos_predio_area_terreno: 748,
          cancela_datos_predio_area_construida: 0,
          cancela_datos_predio_avaluo: "$ 336,600,000",
          cancela_datos_predio_vigencia: "01012023",
        },
      ],
      cancela_propietarios_nmero_catastral: [
        {
          cancela_propietarios_nmero_catastral:
            "252900100000002150187000000000",
          cancela_propietarios_numero_propietario: "1",
          cancela_propietarios_nombre_propietario: nombre,
          cancela_propietarios_tipo_documento: "CC",
          cancela_propietarios_numero_documento: "9005943878",
        },
      ],
      inscribe_datos_predio_nmero_catastral: [
        {
          inscribe_datos_predio_nmero_catastral:
            "252900100000002150187000000000",
          inscribe_datos_predio_matricula_inmobiliaria: "157-75298",
          inscribe_datos_predio_Direccion: "Lo No 6",
          inscribe_datos_predio_destino_económico: "R",
          inscribe_datos_predio_area_terreno: 748,
          inscribe_datos_predio_area_construida: 0,
          inscribe_datos_predio_avaluo: "$ 336,600,000",
          inscribe_datos_predio_vigencia: "01012023",
        },
      ],
      inscribe_propietarios_nmero_catastral: [
        {
          inscribe_propietarios_nmero_catastral:
            "252900100000002150187000000000",
          inscribe_propietarios_numero_propietario: "1",
          inscribe_propietarios_nombre_propietario:
            "LA SOCIEDAD BERESNAJE COLOMBIA S",
          inscribe_propietarios_tipo_documento: "N",
          inscribe_propietarios_numero_documento: "9005943878",
        },
      ],
      inscribe_liquidacion_nmero_catastral: [
        {
          inscribe_liquidacion_nmero_catastral:
            "252900100000002150187000000000",
          inscribe_liquidacion_concepto: "ACTUALIZACION CATASTRAL",
          inscribe_liquidacion_avaluo: "$ 321,683,000",
          inscribe_liquidacion_fecha: "1/1/2022",
        },
        {
          inscribe_liquidacion_nmero_catastral:
            "252900100000002150187000000000",
          inscribe_liquidacion_concepto: "DECRETO 2653 /2022",
          inscribe_liquidacion_avaluo: "$ 335,548,000",
          inscribe_liquidacion_fecha: "1/1/2023",
        },
      ],
    });
    setSerialResolucion("");
    setDia("");
    setMes("");
    setAnio("");
    setNombre("");
    setCedula("");
    setCiudadCedula("");
    setNumeroRadicado("");
    setIdAasociado("");
    setZona("");
    setNumeroEscritura("");
    setFechaEscritutra("");
    setNotaria("");
    setCiudadNotaria("");
    setDiaNotificacionLetra("");
    setDiaNotificacion("");
    setMesNotificacionLetra("");
    setAnioNotificacionLetra("");
    setAnioNotificacion("");
    setnombreDirector("");
  };

  const { msg } = alerta;

  return (
    <form
      className="flex flex-col  py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
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
          onChange={(e) => setNotaria(e.target.value)}
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
      {msg && <Alerta alerta={alerta} />}
      <input
        type="submit"
        value="Crear Resolucion"
        className="
      p-2 text-center rounded text-white bg-teal-500 text-lg mr-2 cursor-pointer
      hover:bg-teal-700 transition-colors uppercase "
      />
    </form>
  );
};

export default FormularioResolucion;
