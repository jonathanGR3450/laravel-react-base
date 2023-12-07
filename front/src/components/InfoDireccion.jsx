import { useState } from "react";
import useInfo from "../hooks/useInfo";
const InfoDireccion = () => {
  const { numPredial } = useInfo();
  console.log(numPredial);
  const { data: info } = numPredial;

  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  const { Predio } = info || {};
  const {
    Clase_Via_Principal,
    Codigo_Postal,
    Complemento,
    Es_Direccion_Principal,
    Letra_Via_Principal,
    Nombre_Predio,
    Numero_Predio,
    Sector_Predio,
    Tipo_Direccion,
    Valor_Via_Principal,
  } = Predio ? Predio[0].Direccion[0] : {};

  const [claseViaPrincipal, setClaseViaPrincipal] = useState(Clase_Via_Principal);
  const [codigoPostal, setCodigoPostal] = useState(Codigo_Postal);
  const [complemento, setComplemento] = useState(Complemento);
  const [esDireccionPrincipal, setEsDireccionPrincipal] = useState(Es_Direccion_Principal); 
  const [letraViaPrincipal, setLetraViaPrincipal] = useState(Letra_Via_Principal);
  const [letraViaGeneradora, setLetraViaGeneradora] = useState("");
  const [nombrePredio, setNombrePredio] = useState(Nombre_Predio);
  const [numeroPredio, setNumeroPredio] = useState(Numero_Predio);
  const [sectorPredio, setSectorPredio] = useState(Sector_Predio);
  const [sectorCiudad, setSectorCiudad] = useState("");
  const [tipoDireccion, setTipoDireccion] = useState(Tipo_Direccion);
  const [valorViaPrincipal, setValorViaPrincipal] = useState(Valor_Via_Principal);
  const [valorViaGeneradora, setValorViaGeneradora] = useState("");
  

  return (
    <>
      <div className=" text-center m-5 border ">Dirección</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="tipoDireccion">
              Tipo de dirección
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
              Direccion Principal
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
              Código Postal
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
              Clase Via Principal
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
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="valorViaPrincipal">
              Valor Via Principal
            </label>
            <input
              type="text"
              id="valorViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={valorViaPrincipal ? valorViaPrincipal : ""}
              onChange={(e) => setValorViaPrincipal(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="letraViaPrincipal">
              Letra Via Principal
            </label>
            <input
              type="text"
              id="letraViaPrincipal"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={letraViaPrincipal ? letraViaPrincipal : ""}
              onChange={(e) => setLetraViaPrincipal(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="sectorCiudad">
              Sector Ciudad
            </label>
            <input
              type="text"
              id="sectorCiudad"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={sectorCiudad ? sectorCiudad : ""}
              onChange={(e) => setSectorCiudad(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="valorViaGeneradora">
              Valor Via Generadora
            </label>
            <input
              type="text"
              id="valorViaGeneradora"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={valorViaGeneradora ? valorViaGeneradora : ""}
              onChange={(e) => setValorViaGeneradora(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="letraViaGeneradora">
              Letra Via Generadora
            </label>
            <input
              type="text"
              id="letraViaGeneradora"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={letraViaGeneradora ? letraViaGeneradora : ""}
              onChange={(e) => setLetraViaGeneradora(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="numeroPredio">
              Número Predio
            </label>
            <input
              type="text"
              id="numeroPredio"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={numeroPredio ? numeroPredio : ""}
              onChange={(e) => setNumeroPredio(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="sectorPredio">
              Sector Predio
            </label>
            <input
              type="text"
              id="sectorPredio"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={sectorPredio ? sectorPredio : ""}
              onChange={(e) => setSectorPredio(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="complemento">
              Complemento
            </label>
            <input
              type="text"
              id="complemento"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={complemento ? complemento : ""}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="nombrePredio">
              Nombre Predio
            </label>
            <input
              type="text"
              id="nombrePredio"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={nombrePredio ? nombrePredio : ""}
              onChange={(e) => setNombrePredio(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoDireccion;
