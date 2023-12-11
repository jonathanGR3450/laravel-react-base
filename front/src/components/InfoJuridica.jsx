import { useState } from "react";
import useInfo from "../hooks/useInfo";

const InfoJuridica = () => {
  const { numPredial } = useInfo();
  console.log(numPredial);
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
  const [fraccionDerecho, setFraccionDerecho] = useState(fraccion_derecho);
  const [fechaInicioTenencia, setFechaInicioTenencia] = useState(
    fecha_inicio_tenencia
  );const [descripcionDerecho, setDescripcionDerecho] = useState(descripcion);

  const [tipoFuenteAdmini, setTipoFuenteAdmini] = useState(tipoFuente);
  const [enteEmisor, setEnteEmisor] = useState(ente_emisor);
  const [observacionFuenteAdmini, setObservacionFuenteAdmini] = useState(observacion);
  const [numeroFuente, setNumeroFuente] = useState(numero_fuente);
  const [estadoDisponibilidad, setEstadoDisponibilidad] = useState(estado_disponibilidad);
  const [tipoPrincipal, setTipoPrincipal] = useState(tipo_principal);
  const [fechaDocumentoFuente, setFechaDocumentoFuente] = useState(fecha_documento_fuente);
  

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
              disabled
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoDerecho ? tipoDerecho : ""}
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
              disabled
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
              disabled
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
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={descripcionDerecho ? descripcionDerecho : ""}
              onChange={(e) => setDescripcionDerecho(e.target.value)}
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
              disabled
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoFuenteAdmini ? tipoFuenteAdmini : ""}
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
              disabled
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
              disabled
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
              disabled
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
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={estadoDisponibilidad ? estadoDisponibilidad : ""}
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
              disabled
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
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={fechaDocumentoFuente ? fechaDocumentoFuente : ""}
              onChange={(e) => setFechaDocumentoFuente(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoJuridica;