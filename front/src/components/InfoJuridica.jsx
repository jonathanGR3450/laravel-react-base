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

            <NormalDerechoForm data={Predio} ref={derechoRef} />
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

            <NormalFuenteForm data={Predio} ref={fuenteAdministrativaRef} />
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoJuridica;
