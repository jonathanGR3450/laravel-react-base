import { useState } from "react";
import useInfo from "../hooks/useInfo";

const InfoPredio = () => {
  const { numPredial } = useInfo();
  console.log(numPredial);
  const { data: info } = numPredial;

  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  const { Predio } = info || {};
  console.log(Predio ? Predio[0] : null);
  const {
    Departamento,
    Municipio,
    Id_Operacion,
    Valor_Referencia,
    Codigo_ORIP,
    Matricula_Inmobiliaria,
    Numero_Predial,
    Numero_Predial_Anterior,
    Codigo_Homologado,
    NUPRE,
    Avaluo_Catastral,
    Tiene_FMI,
    Codigo_Homologado_FMI,
  } = Predio ? Predio[0] : {};

  const { dispname: Tipo } = Predio ? Predio[0].Tipo[0] : {};
  const { dispname: CondicionPredio } = Predio
    ? Predio[0].Condicion_Predio[0]
    : {};
  const { dispname: DestinacionEconomica } = Predio
    ? Predio[0].Destinacion_Economica[0]
    : {};
  const { dispname: ClaseSuelo } = Predio ? Predio[0].Clase_Suelo[0] : {};
  const { dispname: CategoriaSuelo } = Predio
    ? Predio[0].Categoria_Suelo[0]
    : {};

  const [departamento, setDepartamento] = useState(Departamento);
  const [municipio, setMunicipio] = useState(Municipio);
  const [idOperacion, setIdOperacion] = useState(Id_Operacion);
  const [valorReferencia, setValorReferencia] = useState(Valor_Referencia);
  const [codigoOrip, setCodigoOrip] = useState(Codigo_ORIP);
  const [matriculaInmobiliaria, setMatriculaInmobiliaria] = useState(
    Matricula_Inmobiliaria
  );
  const [numeroPredial, setNumeroPredial] = useState(Numero_Predial);
  const [numeroPredialAnterior, setNumeroPredialAnterior] = useState(
    Numero_Predial_Anterior
  );
  const [codigoHomologado, setCodigoHomologado] = useState(Codigo_Homologado);
  const [nupre, setNupre] = useState(NUPRE);
  const [avaluoCatastral, setAvaluoCatastral] = useState(Avaluo_Catastral);
  const [tieneFMI, setTieneFMI] = useState(Tiene_FMI);
  const [tipo, setTipo] = useState(Tipo);
  const [condicionPredio, setCondicionPredio] = useState(CondicionPredio);
  const [interrelacionado, setInterrelacionado] = useState(
    Codigo_Homologado_FMI
  );
  const [codigoHomologadoFMI, setCodigoHomologadoFMI] = useState(
    Codigo_Homologado_FMI
  );
  const [destinacionEconomica, setDestinacionEconomica] =
    useState(DestinacionEconomica);
  const [claseSuelo, setClaseSuelo] = useState(ClaseSuelo);
  const [categoriaSuelo, setCategoriaSuelo] = useState(CategoriaSuelo);
  return (
    <>
      <div className=" text-center m-5 border ">Predio</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="departamento">
              Departamento
            </label>
            <input
              type="text"
              id="departamento"
              disabled
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={departamento ? departamento : ""}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="municipio">
              Municipio
            </label>
            <input
              type="text"
              id="municipio"
              disabled
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={municipio ? municipio : ""}
              onChange={(e) => setMunicipio(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="idOperacion">
              Id Operacion
            </label>
            <input
              type="text"
              id="idOperacion"
              disabled
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={idOperacion ? idOperacion : ""}
              onChange={(e) => setIdOperacion(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="valorReferencia">
              Valor Referencia
            </label>
            <input
              type="text"
              id="valorReferencia"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={valorReferencia ? valorReferencia : ""}
              onChange={(e) => setValorReferencia(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="codigoOrip">
              Codigo ORIP
            </label>
            <input
              type="text"
              id="codigoOrip"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={codigoOrip ? codigoOrip : ""}
              onChange={(e) => setCodigoOrip(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="matriculaInmobiliaria">
              Matricula Inmobiliaria
            </label>
            <input
              type="text"
              id="matriculaInmobiliaria"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={matriculaInmobiliaria ? matriculaInmobiliaria : ""}
              onChange={(e) => setMatriculaInmobiliaria(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="numeroPredial">
              Numero predial
            </label>
            <input
              type="text"
              id="numeroPredial"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={numeroPredial ? numeroPredial : ""}
              onChange={(e) => setNumeroPredial(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="numeroPredialAnterior">
              Numero predial anterior
            </label>
            <input
              type="text"
              id="numeroPredialAnterior"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={numeroPredialAnterior ? numeroPredialAnterior : ""}
              onChange={(e) => setNumeroPredialAnterior(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="codigoHomologado">
              Codigo Homologado
            </label>
            <input
              type="text"
              id="codigoHomologado"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={codigoHomologado ? codigoHomologado : ""}
              onChange={(e) => setCodigoHomologado(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="nupre">
              Nupre
            </label>
            <input
              type="text"
              id="nupre"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={nupre ? nupre : ""}
              onChange={(e) => setNupre(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="avaluoCatastral">
              Avaluo Catastral
            </label>
            <input
              type="text"
              id="avaluoCatastral"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={avaluoCatastral ? avaluoCatastral : ""}
              onChange={(e) => setAvaluoCatastral(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="tieneFMI">
              Folio de matricula inmobiliaria
            </label>
            <div className="flex justify-center items-center">
              <input
                id="tieneFMI"
                type="checkbox"
                className=" border-2 checked:bg-blue-500 h-5 w-5 rounded-md mr-2 "
                disabled
                checked={tieneFMI}
              />
              <label>¿Tiene fmi?</label>
              {/* <input
              type="text"
              id="tieneFMI"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={tieneFMI ? tieneFMI : ""}
              onChange={(e) => setTieneFMI(e.target.value)}
            /> */}
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="tipo">
              Tipo
            </label>
            <input
              type="text"
              id="tipo"
              disabled
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={tipo ? tipo : ""}
              onChange={(e) => setTipo(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="condicionPredio">
              Condición del predio
            </label>
            <input
              type="text"
              id="condicionPredio"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={condicionPredio ? condicionPredio : ""}
              onChange={(e) => setCondicionPredio(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="interrelacionado">
              Interrelacionado
            </label>
            <div className="flex justify-center items-center">
              <input
                id="interrelacionado"
                type="checkbox"
                className=" border-2 checked:bg-blue-500 h-5 w-5 rounded-md mr-2 "
                disabled
                checked={interrelacionado}
              />
              <label>¿Es interrelacionado?</label>
            </div>
            {/* <input
              type="text"
              id="interrelacionado"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={interrelacionado ? interrelacionado : ""}
              onChange={(e) => setInterrelacionado(e.target.value)}
            /> */}
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="codigoHomologadoFMI">
              Codigo Homologado FMI
            </label>
            <div className="flex justify-center items-center">
              <input
                id="codigoHomologadoFMI"
                type="checkbox"
                className=" border-2 checked:bg-blue-500 h-5 w-5 rounded-md mr-2 "
                disabled
                checked={codigoHomologadoFMI}
              />
              <label>¿Tiene codigo homologado fmi?</label>
            </div>
            {/* <input
              type="text"
              id="codigoHomologadoFMI"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={codigoHomologadoFMI ? codigoHomologadoFMI : ""}
              onChange={(e) => setCodigoHomologadoFMI(e.target.value)}
            /> */}
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="destinacionEconomica">
              Destinación economica
            </label>
            <input
              type="text"
              id="destinacionEconomica"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={destinacionEconomica ? destinacionEconomica : ""}
              onChange={(e) => setDestinacionEconomica(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="claseSuelo">
              Clase suelo
            </label>
            <input
              type="text"
              id="claseSuelo"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={claseSuelo ? claseSuelo : ""}
              onChange={(e) => setClaseSuelo(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="categoriaSuelo">
              Categoria suelo
            </label>
            <input
              type="text"
              id="categoriaSuelo"
              disabled
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={categoriaSuelo ? categoriaSuelo : ""}
              onChange={(e) => setCategoriaSuelo(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoPredio;
