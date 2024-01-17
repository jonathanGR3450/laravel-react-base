import { useRef, useState } from "react";
import useInfo from "../hooks/useInfo";
import { NormalDerechoForm } from "../Page/Derecho";
import { NormalFuenteForm } from "../Page/FuenteAdmin";

const InfoJuridica = () => {
  const { numPredial } = useInfo();
  console.log("Info Predial", numPredial.data);
  const { data: info } = numPredial;

  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  const { Predio } = info || {};
  const { tipo, fraccion_derecho, fecha_inicio_tenencia, descripcion } = Predio
    ? Predio[0].derechos[0]
    : {};

  const {
    tipo: tipoFuente,
    ente_emisor,
    observacion,
    numero_fuente,
    estado_disponibilidad,
    tipo_principal,
    fecha_documento_fuente,
  } = Predio ? Predio[0].derechos[0].fuenteadministrativa[0] : {};

  const [tipoDerecho, setTipoDerecho] = useState(tipo);
  console.log("tipo de derecho", tipoDerecho);
  const [fraccionDerecho, setFraccionDerecho] = useState(fraccion_derecho);
  const [fechaInicioTenencia, setFechaInicioTenencia] = useState(
    fecha_inicio_tenencia
  );
  const [descripcionDerecho, setDescripcionDerecho] = useState(descripcion);

  const [tipoFuenteAdmini, setTipoFuenteAdmini] = useState(tipoFuente);
  const [enteEmisor, setEnteEmisor] = useState(ente_emisor);
  const [observacionFuenteAdmini, setObservacionFuenteAdmini] =
    useState(observacion);
  const [numeroFuente, setNumeroFuente] = useState(numero_fuente);
  const [estadoDisponibilidad, setEstadoDisponibilidad] = useState(
    estado_disponibilidad
  );
  const [tipoPrincipal, setTipoPrincipal] = useState(tipo_principal);
  const [fechaDocumentoFuente, setFechaDocumentoFuente] = useState(
    fecha_documento_fuente
  );

  /////
  const derechoRef = useRef();
  const fuenteAdministrativaRef = useRef();
  const openDerecho = () => {
    derechoRef.current.openModal();
  };
  const openFuente = () => {
    fuenteAdministrativaRef.current.openModal();
  };
  const [estInput, setEstInput] = useState(true);

  const editToggle = (e) => {
    e.preventDefault();
    let { name } = e.target;
    console.log("Name Boton", name);
    if (name === "derecho") {
      openDerecho();
    }
    if (name === "fuente_administrativa") {
      openFuente();
    }
    //setEstInput((prevEstInput) => !prevEstInput);
  };

  function updateDerecho(newData) {
    console.log("Cambios Derecho", newData);
    let aux1 = newData;
    let auxtipo = "";
    switch (parseInt(newData.tipo)) {
      case 47:
        auxtipo = "Dominio";
        break;
      case 48:
        auxtipo = "Ocupacion";
        break;
      case 49:
        auxtipo = "Posesion";
        break;
      default:
        auxtipo = "";
        break;
    }

    let newTipo = {
      t_id: newData.tipo,
      dispname: auxtipo,
    };
    setTipoDerecho(newTipo);
    setFechaInicioTenencia(newData.fecha_inicio_tenencia);
    setFraccionDerecho(newData.fraccion_derecho);
    setDescripcionDerecho(newData.descripcion);
    let nuevoDerecho = { ...Predio[0].derechos[0] };
    nuevoDerecho.tipo = newTipo;
    nuevoDerecho.fecha_inicio_tenencia = newData.fecha_inicio_tenencia;
    nuevoDerecho.fraccion_derecho = newData.fraccion_derecho;
    nuevoDerecho.descripcion = newData.descripcion;
    Predio[0].derechos[0] = nuevoDerecho;
  }

  function updateFuente(newData) {
    console.log("Cambios Fuente", newData);
    let aux1 = newData;
    let tipo_fuente = 0;
    let texto_fuente = 0;
    let tipo_principal = 0;
    switch (aux1.tipo) {
      case 45:
        tipo_fuente = "Documento Publico";
        break;
      case 46:
        tipo_fuente = "Documento Privado";
        break;
      case 50:
        tipo_fuente = "Escritura Publica (Doc Publico)";
        break;
      case 51:
        tipo_fuente = "Sentencia Judicial (Doc Publico)";
        break;
      case 52:
        tipo_fuente = "Acto Administrativo (Doc Publico)";
        break;
      case 54:
        tipo_fuente = "Sin Documento";
        break;
      default:
        tipo_fuente = "";
    }
    switch (aux1.estado_disponibilidad) {
      case 885:
        texto_fuente = "Convertido";
        break;
      case 886:
        texto_fuente = "Desconocido";
        break;
      case 887:
        texto_fuente = "Disponible";
        break;
      default:
        texto_fuente = "";
    }
    switch (aux1.tipo_principal) {
      case "18":
        tipo_principal = "Imagen";
        break;
      case "19":
        tipo_principal = "Documento";
        break;
      case "20":
        tipo_principal = "Mapa";
        break;
      case "21":
        tipo_principal = "Video";
        break;
      case "22":
        tipo_principal = "Otro";
        break;
      default:
        tipo_principal = "";
    }
    console.log("cambios", tipo_principal);
    let newobj = {
      t_id: aux1.tipo,
      dispname: tipo_fuente,
    };
    setTipoFuenteAdmini(newobj);
    setEnteEmisor(newData.ente_emisor);
    setObservacionFuenteAdmini(newData.observacion);
    setNumeroFuente(newData.numero_fuente);
    let newEstado = {
      t_id: aux1.estado_disponibilidad,
      dispname: texto_fuente,
    };
    setEstadoDisponibilidad(newEstado);
    setTipoPrincipal(tipo_principal);
    setFechaDocumentoFuente(newData.fecha_documento_fuente);
    const nuevaFuente = {
      ...numPredial.data.Predio[0].derechos[0].fuenteadministrativa[0],
    };
    nuevaFuente.ente_emisor = newData.ente_emisor;
    nuevaFuente.estado_disponibilidad = newEstado;
    nuevaFuente.fecha_documento_fuente = newData.fecha_documento_fuente;
    nuevaFuente.numero_fuente = newData.numero_fuente;
    nuevaFuente.observacion = newData.observacion;
    nuevaFuente.t_id = aux1.t_id;
    nuevaFuente.tipo = newobj;
    nuevaFuente.tipo_principal = tipo_principal;

    numPredial.data.Predio[0].derechos[0].fuenteadministrativa[0] = nuevaFuente;
    console.log("cambios datos", nuevaFuente);
  }

  return (
    <>
      <div className=" text-center m-5 border ">Derecho</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="tipoDerecho">
              Tipo de Derecho
            </label>
            <input
              type="text"
              id="tipoDerecho"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoDerecho ? tipoDerecho.dispname : ""}
              onChange={(e) => setTipoDerecho(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="fraccionDerecho">
              Fracción del derecho
            </label>
            <input
              type="text"
              id="fraccionDerecho"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={fraccionDerecho ? fraccionDerecho : ""}
              onChange={(e) => setFraccionDerecho(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="fechaInicioTenencia">
              Fecha de documento fuente
            </label>
            <input
              type="text"
              id="fechaInicioTenencia"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={fechaInicioTenencia ? fechaInicioTenencia : ""}
              onChange={(e) => setFechaInicioTenencia(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="descripcionDerecho">
              Descripción
            </label>
            <input
              type="text"
              id="descripcionDerecho"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={descripcionDerecho ? descripcionDerecho : ""}
              onChange={(e) => setDescripcionDerecho(e.target.value)}
            />
          </div>
          <div className="flex flex-row w-2/3 ml-4 items-end justify-end">
            <button
              name="derecho"
              onClick={editToggle}
              className="p-2 text-center rounded-md text-white bg-orange-700"
            >
              Editar
            </button>

            <NormalDerechoForm
              data={Predio}
              ref={derechoRef}
              update={updateDerecho}
            />
          </div>
        </div>
      </form>
      <div className=" text-center m-5 border ">Fuente Administrativa</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="tipoFuenteAdmini">
              Tipo de fuente
            </label>
            <input
              type="text"
              id="tipoFuenteAdmini"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoFuenteAdmini ? tipoFuenteAdmini.dispname : ""}
              onChange={(e) => setTipoFuenteAdmini(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="enteEmisor">
              Ente emisor
            </label>
            <input
              type="text"
              id="enteEmisor"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={enteEmisor ? enteEmisor : ""}
              onChange={(e) => setEnteEmisor(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="observacionFuenteAdmini">
              Observaciónes
            </label>
            <input
              type="text"
              id="observacionFuenteAdmini"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={observacionFuenteAdmini ? observacionFuenteAdmini : ""}
              onChange={(e) => setObservacionFuenteAdmini(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="numeroFuente">
              Numero fuente
            </label>
            <input
              type="text"
              id="numeroFuente"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={numeroFuente ? numeroFuente : ""}
              onChange={(e) => setNumeroFuente(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="estadoDisponibilidad">
              Estado disponibilidad
            </label>
            <input
              type="text"
              id="estadoDisponibilidad"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={estadoDisponibilidad ? estadoDisponibilidad.dispname : ""}
              onChange={(e) => setEstadoDisponibilidad(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="tipoPrincipal">
              Tipo principal
            </label>
            <input
              type="text"
              id="tipoPrincipal"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoPrincipal ? tipoPrincipal : ""}
              onChange={(e) => setTipoPrincipal(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="fechaDocumentoFuente">
              Fecha de documento fuente
            </label>
            <input
              type="text"
              id="fechaDocumentoFuente"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={fechaDocumentoFuente ? fechaDocumentoFuente : ""}
              onChange={(e) => setFechaDocumentoFuente(e.target.value)}
            />
          </div>
          <div className="flex flex-row w-2/3 ml-4 items-end justify-end">
            <button
              name="fuente_administrativa"
              onClick={editToggle}
              className="p-2 text-center rounded-md text-white bg-orange-700"
            >
              Editar
            </button>

            <NormalFuenteForm
              data={Predio}
              ref={fuenteAdministrativaRef}
              update={updateFuente}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoJuridica;
