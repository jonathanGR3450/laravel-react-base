import { useState, useRef } from "react";
import useInfo from "../hooks/useInfo";
import { NormalPredioForm } from "../Page/Predio";

const InfoPredio = () => {
  const { numPredial, updateNumPredial } = useInfo();
  const { data: info } = numPredial;
  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  let { Predio } = info || {};
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
  console.log("123 act", Predio);
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
  ///////
  const [estInput, setEstInput] = useState(true);
  const predioRef = useRef();
  const openPredio = () => {
    predioRef.current.openModal();
  };
  const editToggle = (e) => {
    e.preventDefault();
    //setEstInput((prevEstInput) => !prevEstInput);
    openPredio();
  };
  function updateData(newData) {
    console.log("nueva Data", newData);
    let data = newData;
    let aux1 = data;
    let tipo_predio = "";
    let condicion = "";
    let destinacion_economica = "";
    let clase_suelo = "";
    let categoria_suelo = "";
    //Tipo Predio
    switch (aux1.tipo) {
      case "888":
        tipo_predio = "(Predio) (Público) Baldío";
        break;
      case "889":
        tipo_predio = "(Predio) (Público) Fiscal";
        break;
      case "890":
        tipo_predio = "(Predio) (Público) Patrimonial";
        break;
      case "891":
        tipo_predio = "(Predio) (Público) Uso público";
        break;
      case "892":
        tipo_predio = "(Predio) (Público) Ejido";
        break;
      case "893":
        tipo_predio = "(Predio) Privado";
        break;
      case "894":
        tipo_predio = "(Predio) Territorio colectivo";
        break;
      case "895":
        tipo_predio = "(Predio) Vacante";
        break;
      case "896":
        tipo_predio = "Ordenamiento territorial";
        break;
      case "897":
        tipo_predio = "Servicios públicos";
        break;
      case "898":
        tipo_predio = "Reservas naturales";
        break;
      case "899":
        tipo_predio = "Parques naturales";
        break;
      case "900":
        tipo_predio = "Amenazas de riesgos";
        break;
      case "901":
        tipo_predio = "Servidumbre";
        break;
      case "902":
        tipo_predio = "Superficies de agua";
        break;
      case "903":
        tipo_predio = "Transporte";
        break;
      default:
        tipo_predio = "Valor no reconocido";
    }
    //Condicion Predio
    switch (aux1.condicion_predio) {
      case "442":
        condicion = "No propiedad horizontal";
        break;
      case "443":
        condicion = "(Propiedad horizontal) Matriz";
        break;
      case "444":
        condicion = "(Propiedad horizontal) Unidad Predial";
        break;
      case "445":
        condicion = "(Condominio) Matriz";
        break;
      case "446":
        condicion = "(Condominio) Unidad predial";
        break;
      case "447":
        condicion = "(Parque cementerio) Matriz";
        break;
      case "448":
        condicion = "(Parque Cementerio) Unidad predial";
        break;
      case "449":
        condicion = "Vía";
        break;
      case "450":
        condicion = "Informal";
        break;
      case "451":
        condicion = "Bien de uso público";
        break;
      case "903":
        condicion = "Mejora";
        break;
      default:
        condicion = "Valor no reconocido";
    }
    switch (aux1.clase_suelo) {
      case "84":
        clase_suelo = "Urbano";
        break;
      case "85":
        clase_suelo = "Rural";
        break;
      case "86":
        clase_suelo = "Expansión urbana";
        break;
      default:
        clase_suelo = "Valor no reconocido";
    }
    switch (aux1.categoria_suelo) {
      case "777":
        categoria_suelo = "Suburbano";
        break;
      case "778":
        categoria_suelo = "Protección";
        break;
      default:
        categoria_suelo = "Valor no reconocido";
    }
    switch (aux1.destinacion_economica) {
      case "162":
        destinacion_economica = "Acuícola";
        break;
      case "163":
        destinacion_economica = "Agrícola";
        break;
      case "164":
        destinacion_economica = "Agroindustrial";
        break;
      case "165":
        destinacion_economica = "Agropecuario";
        break;
      case "166":
        destinacion_economica = "Agroforestal";
        break;
      case "167":
        destinacion_economica = "Comercial";
        break;
      case "168":
        destinacion_economica = "Cultural";
        break;
      case "169":
        destinacion_economica = "Educativo";
        break;
      case "170":
        destinacion_economica = "Forestal";
        break;
      case "171":
        destinacion_economica = "Habitacional";
        break;
      case "172":
        destinacion_economica = "Industrial";
        break;
      case "173":
        destinacion_economica =
          "Infraestructura asociada a producción agropecuaria";
        break;
      case "174":
        destinacion_economica = "Infraestructura hidráulica";
        break;
      case "175":
        destinacion_economica = "Infraestructura de saneamiento básico";
        break;
      case "176":
        destinacion_economica = "Infraestructura seguridad";
        break;
      case "177":
        destinacion_economica = "Infraestructura transporte";
        break;
      case "178":
        destinacion_economica = "Institucional";
        break;
      case "179":
        destinacion_economica = "Minería e hidrocarburos";
        break;
      case "180":
        destinacion_economica = "Lote urbanizable no urbanizado";
        break;
      case "181":
        destinacion_economica = "Lote urbanizado no construido";
        break;
      case "182":
        destinacion_economica = "Lote no urbanizable";
        break;
      case "183":
        destinacion_economica = "Pecuario";
        break;
      case "184":
        destinacion_economica = "Recreacional";
        break;
      case "185":
        destinacion_economica = "Religioso";
        break;
      case "186":
        destinacion_economica = "Salubridad";
        break;
      case "187":
        destinacion_economica = "Servicios funerarios";
        break;
      case "188":
        destinacion_economica = "Uso público";
        break;
      default:
        destinacion_economica = "Valor no reconocido";
    }
    setDepartamento(data.departamento);
    setMunicipio(data.municipio);
    setIdOperacion(data.id_operacion);
    setValorReferencia(data.valor_referencia);
    setCodigoOrip(data.codigo_orip);
    setMatriculaInmobiliaria(data.matricula_inmobiliaria);
    setNumeroPredial(data.numero_predial);
    setNumeroPredialAnterior(data.numero_predial_anterior);
    setCodigoHomologado(data.codigo_homologado);
    setNupre(data.nupre);
    setAvaluoCatastral(data.avaluo_catastral);
    setTieneFMI(data.tiene_fmi);
    setTipo(tipo_predio);
    setCondicionPredio(condicion);
    setInterrelacionado(data.interrelacionado);
    setCodigoHomologadoFMI(data.codigo_homologado_fmi);
    setDestinacionEconomica(destinacion_economica);
    setClaseSuelo(clase_suelo);
    setCategoriaSuelo(categoria_suelo);
    const nuevoPredio = { ...numPredial.data.Predio[0] };
    // Modificando los datos deseados
    nuevoPredio.Departamento = departamento;
    nuevoPredio.Municipio = municipio;
    nuevoPredio.Id_Operacion = idOperacion;
    nuevoPredio.Valor_Referencia = valorReferencia;
    nuevoPredio.Codigo_ORIP = codigoOrip;
    nuevoPredio.Matricula_Inmobiliaria = matriculaInmobiliaria;
    nuevoPredio.Numero_Predial = numeroPredial;
    nuevoPredio.Numero_Predial_Anterior = numeroPredialAnterior;
    nuevoPredio.Codigo_Homologado = codigoHomologado;
    nuevoPredio.NUPRE = nupre;
    nuevoPredio.Avaluo_Catastral = avaluoCatastral;
    nuevoPredio.Tiene_FMI = tieneFMI;
    nuevoPredio.Codigo_Homologado_FMI = codigoHomologadoFMI;

    // Actualizando el array Tipo
    nuevoPredio.Tipo = [
      {
        t_id: aux1.tipo,
        dispname: tipo_predio,
      },
    ];
    // Actualizando el array Condicion_Predio
    nuevoPredio.Condicion_Predio = [
      {
        t_id: aux1.condicion_predio,
        dispname: condicion,
      },
    ];
    // Actualizando el array Destinacion_Economica
    nuevoPredio.Destinacion_Economica = [
      {
        t_id: aux1.destinacion_economica,
        dispname: destinacion_economica,
      },
    ];
    nuevoPredio.Clase_Suelo = [
      {
        t_id: aux1.clase_suelo,
        dispname: clase_suelo,
      },
    ];
    // Actualizando el array Categoria_Suelo
    nuevoPredio.Categoria_Suelo = [
      {
        t_id: aux1.categoria_suelo,
        dispname: categoria_suelo,
      },
    ];
    // Modificando el objeto original
    numPredial.data.Predio[0] = nuevoPredio;
    updateNumPredial(numPredial);
  }
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
                disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
                disabled={estInput}
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
                disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={categoriaSuelo ? categoriaSuelo : ""}
              onChange={(e) => setCategoriaSuelo(e.target.value)}
            />
          </div>
          <div className="flex flex-row w-2/3 ml-4">
            <button
              onClick={editToggle}
              className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
            >
              Editar
            </button>
            <NormalPredioForm
              data={Predio}
              ref={predioRef}
              update={updateData}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoPredio;
