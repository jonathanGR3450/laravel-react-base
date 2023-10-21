import { useState, useContext, useEffect } from "react";
import { InteresadoContext } from "./Context/InteresadoContext";

export const AddInteresadoForm = () => {
  //const [groupInterest, setGroupInterest] = useState(false);
  const { updateInteresadoData, updateDataFinal } =
    useContext(InteresadoContext);
  const [isChecked, setIsChecked] = useState(false);
  const [dataInteresado, setDataInteresado] = useState({
    tipo: 0,
  });
  console.log("actualizo");
  const [estForm, setEstForm] = useState(0);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  function Load_Data(e) {
    const { name, value } = e.target;
    console.log("nombre", name);
    console.log("Valor", value);
    setDataInteresado((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  //Se Aceptan solo  Numeros
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }
  //Se Aceptan solo Letras
  function soloLetras(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
  }
  const PersonNaturalForm = () => {
    const [dataInteresado, setDataInteresado] = useState({
      tipo: 658,
      tipo_documento: 0,
      documento_identidad: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      sexo: 0,
      grupo_etnico: 0,
      razon_social: "",
      estado_civil: 0,
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: "",
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    });
    const updateNom = () => {
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
      } = dataInteresado;
      const nombreCompleto = `${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`;
      setDataInteresado({ ...dataInteresado, nombre: nombreCompleto });
    };
    useEffect(() => {
      updateNom();
      console.log("Entra");
    }, [
      dataInteresado.primer_nombre,
      dataInteresado.segundo_nombre,
      dataInteresado.primer_apellido,
      dataInteresado.segundo_apellido,
    ]);
    function SendData() {
      updateInteresadoData((prevValues) => ({
        ...prevValues,
        interesado_lc_interesado: dataInteresado,
      }));
      updateDataFinal();
    }
    function Load_Data(e) {
      const { name, value } = e.target;
      console.log("nombre", name);
      console.log("Valor", value);
      setDataInteresado((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    return (
      <div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Primer Nombre*:</label>
            <input
              name="primer_nombre"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloLetras}
              value={dataInteresado.primer_nombre}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Segundo Nombre*:</label>
            <input
              name="segundo_nombre"
              onChange={Load_Data}
              onInput={soloLetras}
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={dataInteresado.segundo_nombre}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Primer Apellido*:</label>
            <input
              name="primer_apellido"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloLetras}
              value={dataInteresado.primer_apellido}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Segundo Apellido:</label>
            <input
              name="segundo_apellido"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloLetras}
              value={dataInteresado.segundo_apellido}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Tipo de Documento*:</label>
            <select
              type="text"
              name="tipo_documento"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={dataInteresado.tipo_documento}
            >
              <option></option>
              <option value={529}>Cedula de Ciudadania</option>
              <option value={530}>Cedula de Extranjeria</option>
              <option value={531}>NIT</option>
              <option value={532}>Tarjeta Identidad</option>
              <option value={533}>Registro Civil</option>
              <option value={534}>Secuencial</option>
              <option value={535}>Pasaporte</option>
            </select>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Numero de Documento*:</label>
            <input
              name="documento_identidad"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              minLength={8}
              onChange={Load_Data}
              onInput={soloNumeros}
              value={dataInteresado.documento_identidad}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Estado Civil*:</label>
            <select
              type="text"
              name="estado_civil"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={dataInteresado.estado_civil}
            >
              <option></option>
              <option value={812}>
                No Casado/a vive en pareja menos 2 años
              </option>
              <option value={813}>
                No Casado/a vive en pareja 2 años o mas
              </option>
              <option value={814}>Casado/a</option>
              <option value={815}>Separado/a - Divorciado/a</option>
              <option value={816}>Viudo/a</option>
              <option value={817}>Soltero/a</option>
            </select>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Grupo Etnico*:</label>
            <select
              type="text"
              name="grupo_etnico"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={dataInteresado.grupo_etnico}
            >
              <option></option>
              <option value={866}>Indigena</option>
              <option value={867}>Rrom</option>
              <option value={868}>Raizal</option>
              <option value={869}>Palenquero</option>
              <option value={870}>Negro Afrocolombiano</option>
              <option value={871}>Ninguno</option>
            </select>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Genero*:</label>
            <select
              name="sexo"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={dataInteresado.sexo}
            >
              <option></option>
              <option value={737}> Masculino</option>
              <option value={737}> Femenino</option>
              <option value={739}> Sin Determinar</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Nombre*:</label>
            <input
              name="nombre"
              type="text"
              disabled
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={
                dataInteresado.primer_apellido +
                " " +
                dataInteresado.segundo_apellido +
                " " +
                dataInteresado.primer_nombre +
                " " +
                dataInteresado.segundo_nombre
              }
            ></input>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-1/3 flex flex-col items-center">
            <button
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4"
              onClick={SendData}
            >
              Guardar
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4">
              Ver Resumen
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4">
              Terminar Proceso
            </button>
          </div>
        </div>
      </div>
    );
  };
  const PersonJuridicForm = () => {
    const [dataInteresado, setDataInteresado] = useState({
      tipo: 659,
      tipo_documento: 0,
      documento_identidad: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      sexo: 0,
      grupo_etnico: 0,
      razon_social: "",
      estado_civil: 0,
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: "",
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    });

    function SendData() {
      let newData = {
        interesado_lc_interesado: dataInteresado,
      };
      updateInteresadoData(newData, 1);
      updateDataFinal();
    }
    function Load_Data(e) {
      const { name, value } = e.target;
      setDataInteresado((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    const updateNom = () => {
      const { razon_social } = dataInteresado;
      console.log("asdas", razon_social);
      setDataInteresado({ ...dataInteresado, nombre: razon_social });
    };
    useEffect(() => {
      updateNom();
    }, [dataInteresado.razon_social]);
    return (
      <div>
        <div className="flex flex-row w-full">
          <div className="w-1/3">
            <label className="font-semibold">Tipo de Documento*:</label>
            <select
              type="text"
              name="tipo_documento"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={dataInteresado.tipo_documento}
            >
              <option></option>
              <option value={529}>Cedula de Ciudadania</option>
              <option value={530}>Cedula de Extranjeria</option>
              <option value={531}>NIT</option>
              <option value={532}>Tarjeta Identidad</option>
              <option value={533}>Registro Civil</option>
              <option value={534}>Secuencial</option>
              <option value={535}>Pasaporte</option>
            </select>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Numero de Documento*:</label>
            <input
              name="documento_identidad"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              minLength={8}
              value={dataInteresado.documento_identidad}
              onChange={Load_Data}
              onInput={soloNumeros}
            ></input>
          </div>
          <div className="w-1/3 ml-4"></div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Razon Social*:</label>
            <input
              name="razon_social"
              type="text"
              value={dataInteresado.razon_social}
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Nombre*:</label>
            <input
              name="nombre"
              type="text"
              value={dataInteresado.nombre}
              disabled
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-col items-center">
            <button
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4"
              onClick={SendData}
            >
              Guardar
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4">
              Ver Resumen
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4">
              Terminar Proceso
            </button>
          </div>
        </div>
      </div>
    );
  };

  const GroupInterestForm = () => {
    const { updateInteresadoData } = useContext(InteresadoContext);
    const [parti, setParti] = useState("");
    const [bttgroup, setBttGroup] = useState(true);
    const [agrupData, setAgrupData] = useState({
      tipo: "",
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: null,
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    });
    function Load_Agrup(e) {
      const { name, value } = e.target;
      setAgrupData((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      if (parti !== "" && agrupData.tipo !== "") {
        setBttGroup(false);
      } else {
        setBttGroup(true);
      }
    }

    function Load_Participacion(e) {
      let { value } = e.target;
      setParti(value);
      if (parti !== "" && agrupData.tipo !== "") {
        setBttGroup(false);
      } else {
        setBttGroup(true);
      }
    }
    function sendAgrupacion() {
      updateInteresadoData((prevValues) => ({
        ...prevValues,
        interesado_lc_agrupacioninteresados: agrupData,
        participacion: parti,
      }));
    }

    return (
      <div className="w-full  flex flex-row">
        <div className="w-1/3 ">
          <label className="font-semibold">Tipo de Agrupacion* :</label>
          <select
            name="tipo"
            className="border-2 p-1 rounded-md w-full"
            onChange={Load_Agrup}
            value={agrupData.tipo}
          >
            <option></option>
            <option value={34}>Grupo Civil</option>
            <option value={35}>Grupo Empresarial</option>
            <option value={36}>Grupo Etnico</option>
            <option value={37}>Grupo Mixto</option>
          </select>
        </div>
        <div className="w-1/3 flex flex-col ml-4">
          <label className="font-semibold">Porcentaje Participacion* :</label>
          <input
            type="text"
            className="border-2 p-1 rounded-md w-full"
            onChange={Load_Participacion}
            value={parti}
            onInput={soloNumeros}
          ></input>
        </div>
        <div className="w-1/3 ml-4 flex flex-col">
          <label className="font-semibold text-white">jasdhjaksd </label>
          <button
            className={`${
              bttgroup ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }
           p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
           `}
            onClick={sendAgrupacion}
            disabled={bttgroup}
          >
            Cargar Agrupacion
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl">Caracteristicas del Interesado</h1>
      <p>A continuación se muestran las caracteristicas del Interesado:</p>
      <div className="w-full pt-4 flex flex-col">
        <h2 className="font-semibold">Datos Generales del Interesado</h2>
        <div className="m-2 font-semibold">
          <input
            type="checkbox"
            value="Grupo de Interesados ?"
            checked={isChecked}
            onChange={handleOnChange}
          ></input>
          <label> Grupo de Interesados ?</label>
        </div>
        {isChecked ? <GroupInterestForm /> : null}

        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row">
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Tipo Interesado*:</label>
              <select
                name="tipo"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                onChange={Load_Data}
              >
                <option></option>
                <option value={658}>Persona Natural</option>
                <option value={659}>Persona Juridica</option>
              </select>
            </div>
          </div>
        </div>
        {dataInteresado.tipo === "658" ? <PersonNaturalForm /> : null}
        {dataInteresado.tipo === "659" ? <PersonJuridicForm /> : null}
      </div>
    </div>
  );
};
/*  <div className="w-1/3 ml-4">
              <label className="font-semibold">Derecho Id*:</label>
              <input
                name="local_id"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                onChange={Load_Data}
              ></input>
            </div>
            <div className="w-1/3 ml-4">
              <label className="font-semibold">
                Coeficiente de Copropiedad* :
              </label>
              <input
                type="text"
                className="border-2 p-1 rounded-md w-full"
                onInput={soloNumeros}
              ></input>
            </div>*/
