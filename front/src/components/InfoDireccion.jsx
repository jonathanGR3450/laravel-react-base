import { useEffect, useState } from "react";
import useInfo from "../hooks/useInfo";
import Loader from "../Page/Loader";
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
    Valor_Via_Principal,
    valor_via_generadora,
  } = Predio ? Predio[0].Direccion[0] : {};
  const { t_id: Tipo_Direccion } = Predio
    ? Predio[0].Direccion[0].Tipo_Direccion
    : {};

  const [claseViaPrincipal, setClaseViaPrincipal] = useState(
    Clase_Via_Principal == null ? "" : Clase_Via_Principal
  );
  const [codigoPostal, setCodigoPostal] = useState(Codigo_Postal);
  const [complemento, setComplemento] = useState(Complemento);
  const [esDireccionPrincipal, setEsDireccionPrincipal] = useState(
    Es_Direccion_Principal
  );
  const [letraViaPrincipal, setLetraViaPrincipal] =
    useState(Letra_Via_Principal);
  const [letraViaGeneradora, setLetraViaGeneradora] = useState("");
  let [nombrePredio, setNombrePredio] = useState(Nombre_Predio);
  const [numeroPredio, setNumeroPredio] = useState(
    Numero_Predio == null ? "" : Numero_Predio
  );
  const [sectorPredio, setSectorPredio] = useState(Sector_Predio);
  const [sectorCiudad, setSectorCiudad] = useState("");
  const [tipoDireccion, setTipoDireccion] = useState(Tipo_Direccion);
  const [valorViaPrincipal, setValorViaPrincipal] = useState(
    Valor_Via_Principal == null ? "" : Valor_Via_Principal
  );
  const [valorViaGeneradora, setValorViaGeneradora] = useState(
    valor_via_generadora == null ? "" : valor_via_generadora
  );
  const [estInput, setEstInput] = useState(true);
  const [estSave, setEstSave] = useState(true);
  const [estLoad, setEstLoad] = useState(false);

  const editToggle = (e) => {
    e.preventDefault();
    console.log("entnndnn", estInput);
    setEstInput((prevEstInput) => !prevEstInput);
  };
  async function sendData(e) {
    e.preventDefault();
    setEstLoad(true);
    let clase = "";
    let sectorciudad = "";
    let sectorpredio = "";
    switch (claseViaPrincipal) {
      case "688":
        clase = "Avenida calle";
        break;
      case "689":
        clase = "Avenida carrera";
        break;
      case "690":
        clase = "Avenida";
        break;
      case "691":
        clase = "Autopista";
        break;
      case "692":
        clase = "Circunvalar";
        break;
      case "693":
        clase = "Calle";
        break;
      case "694":
        clase = "Carrera";
        break;
      case "695":
        clase = "Diagonal";
        break;
      case "696":
        clase = "Transversal";
        break;
      case "697":
        clase = "Circular";
        break;
    }
    switch (sectorCiudad) {
      case "881":
        sectorciudad = "Norte";
        break;
      case "882":
        sectorciudad = "Sur";
        break;
      case "883":
        sectorciudad = "Este";
        break;
      case "884":
        sectorciudad = "Oeste";
        break;
    }
    switch (sectorPredio) {
      case "752":
        sectorpredio = "Norte";
        break;
      case "753":
        sectorpredio = "Sur";
        break;
      case "754":
        sectorpredio = "Este";
        break;
      case "755":
        sectorpredio = "Oeste";
        break;
    }

    let newnom =
      clase +
      " " +
      (valorViaPrincipal == null ? "" : valorViaPrincipal) +
      " " +
      (letraViaPrincipal == null ? "" : letraViaPrincipal) +
      " " +
      (sectorciudad == null ? "" : sectorciudad) +
      " # " +
      (valorViaGeneradora == null ? "" : valorViaGeneradora) +
      " " +
      (letraViaGeneradora == null ? "" : letraViaGeneradora) +
      " - " +
      (numeroPredio == null ? "" : numeroPredio) +
      " " +
      (sectorpredio == null ? "" : sectorpredio) +
      " " +
      (complemento == null ? "" : complemento);

    setNombrePredio(newnom);

    let t_id_conservacion = Predio[0].Direccion[0].t_id;
    let json = {
      t_seq: "",
      tipo_direccion: Tipo_Direccion,
      es_direccion_principal: false,
      codigo_postal: codigoPostal,
      clase_via_principal: claseViaPrincipal,
      valor_via_principal: valorViaPrincipal,
      letra_via_principal: letraViaPrincipal,
      sector_ciudad: sectorCiudad,
      valor_via_generadora: valorViaGeneradora,
      letra_via_generadora: letraViaGeneradora,
      numero_predio: numeroPredio,
      sector_predio: sectorPredio,
      complemento: "",
      nombre_predio: newnom,
      extunidadedificcnfsica_ext_direccion_id: "",
      extinteresado_ext_direccion_id: "",
      lc_construccion_ext_direccion_id: "",
      lc_nu_spcjrdcrdsrvcios_ext_direccion_id: "",
      lc_n_spcjrdcndddfccion_ext_direccion_id: "",
      lc_terreno_ext_direccion_id: "",
      lc_unidadconstruccion_ext_direccion_id: "",
      lc_predio_direccion: Predio ? Predio[0].t_id : "",
      lc_servidumbretransito_ext_direccion_id: "",
      t_id_conservacion: t_id_conservacion,
    };
    console.log("123", JSON.stringify(json));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(json);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let url = import.meta.env.VITE_API_URL_FIRST + "extdireccion";
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      console.log("Resultado Data", result);
      console.log("Resultado Data", Predio);

      let nuevaDireccion = { ...Predio[0].Direccion[0] };
      let res = result.data;
      nuevaDireccion.Clase_Via_Principal = res.clase_via_principal;
      nuevaDireccion.Codigo_Postal = res.codigo_postal;
      nuevaDireccion.Complemento = res.complemento;
      nuevaDireccion.Es_Direccion_Principal = res.es_direccion_principal;
      nuevaDireccion.Letra_Via_Principal = res.letra_via_principal;
      nuevaDireccion.Nombre_Predio = res.nombre_predio;
      nuevaDireccion.Numero_Predio = res.numero_predio;
      nuevaDireccion.Sector_Predio = res.sector_predio;
      nuevaDireccion.Tipo_Direccion.t_id = res.tipo_direccion;
      nuevaDireccion.Valor_Via_Principal = res.valor_via_principal;
      nuevaDireccion.letra_via_principal = res.letra_via_generadora;
      nuevaDireccion.sector_ciudad = res.sector_ciudad;
      nuevaDireccion.valor_via_generadora = res.valor_via_generadora;
      nuevaDireccion.Nombre_Predio = res.nombre_predio;
      Predio[0].Direccion[0] = nuevaDireccion;
      setEstLoad(false);
    } catch (error) {
      console.log("Error en Creacion:", error);
    }
  }

  useEffect(() => {
    console.log("entnndnn1", claseViaPrincipal);
    console.log("entnndnn", valorViaPrincipal);
    console.log("entnndnn", valorViaGeneradora);
    console.log("entnndnn", numeroPredio);
    console.log("entnndnn", estInput);
    if (
      claseViaPrincipal !== "" &&
      valorViaPrincipal !== "" &&
      valorViaGeneradora !== "" &&
      numeroPredio !== "" &&
      !estInput
    ) {
      setEstSave(false);
    } else {
      setEstSave(true);
    }
  }, [
    claseViaPrincipal,
    valorViaPrincipal,
    valorViaGeneradora,
    numeroPredio,
    estInput,
  ]);

  return (
    <>
      <div className=" text-center m-5 border ">Dirección</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="tipoDireccion">
              Tipo de dirección
            </label>
            <select
              id="tipoDireccion"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full uppercase"
              placeholder=""
              value={tipoDireccion ? tipoDireccion : ""}
              onChange={(e) => setTipoDireccion(e.target.value)}
            >
              <option></option>
              <option value={218}>Estructurada</option>
              <option value={219}>No Estructurada</option>
            </select>
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="esDireccionPrincipal">
              Direccion Principal
            </label>
            <select
              id="esDireccionPrincipal"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full uppercase"
              placeholder=""
              value={esDireccionPrincipal ? esDireccionPrincipal : ""}
              onChange={(e) => setEsDireccionPrincipal(e.target.value)}
            >
              <option value=""></option>
              <option value={true}>Verdadero</option>
              <option value={false}>Falso</option>
            </select>
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="codigoPostal">
              Código Postal
            </label>
            <input
              type="text"
              id="codigoPostal"
              disabled={estInput}
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
            <select
              id="claseViaPrincipal"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full uppercase"
              placeholder=""
              value={claseViaPrincipal ? claseViaPrincipal : ""}
              onChange={(e) => setClaseViaPrincipal(e.target.value)}
            >
              <option value=""></option>
              <option value={688}>Avenida calle</option>
              <option value={689}>Avenida carrera</option>
              <option value={690}>Avenida</option>
              <option value={691}>Autopista</option>
              <option value={692}>Circunvalar</option>
              <option value={693}>Calle</option>
              <option value={694}>Carrera</option>
              <option value={695}>Diagonal</option>
              <option value={696}>Transversal</option>
              <option value={697}>Circular</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="valorViaPrincipal">
              Valor Via Principal
            </label>
            <input
              type="text"
              id="valorViaPrincipal"
              disabled={estInput}
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
              disabled={estInput}
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

            <select
              id="sectorCiudad"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full uppercase"
              placeholder=""
              value={sectorCiudad ? sectorCiudad : ""}
              onChange={(e) => setSectorCiudad(e.target.value)}
            >
              <option value=" "></option>
              <option value={881}>Norte</option>
              <option value={882}>Sur</option>
              <option value={883}>Este</option>
              <option value={884}>Oeste</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="valorViaGeneradora">
              Valor Via Generadora
            </label>
            <input
              type="text"
              id="valorViaGeneradora"
              disabled={estInput}
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
              disabled={estInput}
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
              disabled={estInput}
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

            <select
              id="sectorPredio"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full uppercase"
              placeholder=""
              value={sectorPredio ? sectorPredio : ""}
              onChange={(e) => setSectorPredio(e.target.value)}
            >
              <option value="1"></option>
              <option value="752">Norte</option>
              <option value="753">Sur</option>
              <option value="754">Este</option>
              <option value="755">Oeste</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="complemento">
              Complemento
            </label>
            <input
              type="text"
              id="complemento"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={complemento ? complemento : ""}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex-row flex ">
          <div className=" w-2/3">
            <label className="font-light m-2" htmlFor="nombrePredio">
              Nombre Predio
            </label>
            <input
              type="text"
              id="nombrePredio"
              disabled={estInput}
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={nombrePredio ? nombrePredio : ""}
              onChange={(e) => setNombrePredio(e.target.value)}
            />
          </div>
          <div className="flex flex-row w-1/3 ml-4 items-end">
            <button
              onClick={editToggle}
              className="p-2 text-center rounded-md text-white bg-orange-700"
            >
              Editar
            </button>
            <button
              disabled={estSave}
              className={`${
                estSave ? "opacity-50 cursor-not-allowed" : "opacity-100"
              } p-2 text-center rounded-md text-white bg-teal-500 ml-4 mr-4`}
              onClick={sendData}
            >
              Guardar
            </button>
            {estLoad ? <Loader /> : null}
          </div>
        </div>
      </form>
    </>
  );
};

export default InfoDireccion;
