import { useState } from "react";
import useInfo from "../hooks/useInfo";

const InfoJuridica = () => {
  const { numPredial } = useInfo();
  console.log(numPredial);
  const { data: info } = numPredial;

  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  const { Predio } = info || {};
  const {
    tipo,
    fraccion_derecho,
    fecha_inicio_tenencia,

  } = Predio ? Predio[0].derechos[0] : {};

  return (
    <>
      {/* <div className=" text-center m-5 border ">Derecho</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="tipoDireccion">
              Tipo de Derecho
            </label>
            <input
              type="text"
              id="tipoDireccion"
              disabled
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoDireccion ? tipoDireccion : ""}
              onChange={(e) => setTipoDireccion(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="esDireccionPrincipal">
              Fracción del derecho
            </label>
            <input
              type="text"
              id="esDireccionPrincipal"
              disabled
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={esDireccionPrincipal ? esDireccionPrincipal : ""}
              onChange={(e) => setEsDireccionPrincipal(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="codigoPostal">
              Fecha de documento fuente
            </label>
            <input
              type="text"
              id="codigoPostal"
              disabled
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={codigoPostal ? codigoPostal : ""}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="claseViaPrincipal">
              Descripción
            </label>
            <input
              type="text"
              id="claseViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={claseViaPrincipal ? claseViaPrincipal : ""}
              onChange={(e) => setClaseViaPrincipal(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className=" text-center m-5 border ">Fuente Administrativa</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="tipoDireccion">
              Tipo de fuente
            </label>
            <input
              type="text"
              id="tipoDireccion"
              disabled
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipoDireccion ? tipoDireccion : ""}
              onChange={(e) => setTipoDireccion(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="esDireccionPrincipal">
              Ente emisor
            </label>
            <input
              type="text"
              id="esDireccionPrincipal"
              disabled
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={esDireccionPrincipal ? esDireccionPrincipal : ""}
              onChange={(e) => setEsDireccionPrincipal(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="codigoPostal">
              Observaciónes
            </label>
            <input
              type="text"
              id="codigoPostal"
              disabled
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={codigoPostal ? codigoPostal : ""}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="claseViaPrincipal">
              Numero fuente
            </label>
            <input
              type="text"
              id="claseViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={claseViaPrincipal ? claseViaPrincipal : ""}
              onChange={(e) => setClaseViaPrincipal(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="claseViaPrincipal">
              Estado disponibilidad
            </label>
            <input
              type="text"
              id="claseViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={claseViaPrincipal ? claseViaPrincipal : ""}
              onChange={(e) => setClaseViaPrincipal(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="claseViaPrincipal">
              Tipo principal
            </label>
            <input
              type="text"
              id="claseViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={claseViaPrincipal ? claseViaPrincipal : ""}
              onChange={(e) => setClaseViaPrincipal(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="claseViaPrincipal">
              Fecha de documento fuente
            </label>
            <input
              type="text"
              id="claseViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={claseViaPrincipal ? claseViaPrincipal : ""}
              onChange={(e) => setClaseViaPrincipal(e.target.value)}
            />
          </div>
        </div>
      </form> */}
    </>
  );
};

export default InfoJuridica;
