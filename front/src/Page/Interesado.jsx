import { Modal } from "./Modal";
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { InteresadoContext } from "./Context/InteresadoContext";
import { TableContext } from "./Context/Context";
import Loader from "./Loader";

const InteresadoForm = (props, ref) => {
  //const [groupInterest, setGroupInterest] = useState(false);  const { updateInteresadoData, updateDataFinal } =useContext(InteresadoContext);
  console.log("Props Interesados", props);
  let data = props.data ? props.data : {};
  let tableData = [];
  let updateTableData = () => {};
  let contextTableData, contextUpdateTableData;
  let auxDataForm = {};
  let [loading, setLoading] = useState(false);
  const [numInteresados, setNumInteresados] = useState();
  const [interesados, setInteresados] = useState([]);
  const [interesadosData, setInteresadosData] = useState();
  if (props.contexto) {
    ({ tableData: contextTableData, updateTableData: contextUpdateTableData } =
      useContext(TableContext));
  } else {
  }

  const [estBtt, setEstBtt] = useState(true);

  //Se Aceptan solo Letras

  const Load_Num = (e) => {
    const newValue = parseInt(e.target.value);
    setNumInteresados(newValue);
    const newInteresadosData = Array.from({ length: newValue }, () => ({
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
    }));
    setInteresadosData(newInteresadosData);
  };
  /////////////////////////////////////////////////////Enviar Datos
  async function LoadAgrupacionTipo() {
    let tipo = "";
    let agrupacioncivil = "";
    let agrupacionempresarial = "";
    for (const [index, item] of interesadosData.entries()) {
      agrupacioncivil = interesadosData.every((item) => item.tipo == 658);
      agrupacionempresarial = interesadosData.every((item) => item.tipo == 659);

      // Verificar el tipo de Agrupación
    }
    if (agrupacioncivil) {
      tipo = 34;
    } else {
      if (agrupacionempresarial) {
        console.log("Es empresarial ");
        tipo = 35;
      } else {
        console.log("Es Mixta");
        tipo = 37;
      }
    }
    return tipo;
  }
  async function createAgrupacion(data) {
    let json = {
      tipo: data,
      nombre: "Prueba",
      comienzo_vida_util_version: "",
      fin_vida_util_version: null,
      espacio_de_nombres: "Fusagasuga",
      local_id: "Preuba",
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(json);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let url =
      import.meta.env.VITE_API_URL_FIRST + "interesados/agrupacioninteresados";

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
    return result.data.t_id;
  }
  /////////////////////////////////////////////
  async function createInteresado() {
    try {
      let auxId = [];
      let est = "";
      console.log("Data ", interesadosData);
      for (const [index, item] of interesadosData.entries()) {
        if (item.t_id == 0) {
          console.log("Toca Crear");
          let json = {
            tipo: item.tipo,
            tipo_documento: item.tipo_documento,
            documento_identidad: item.documento_identidad,
            primer_nombre: item.primer_nombre,
            segundo_nombre: item.segundo_nombre,
            primer_apellido: item.primer_apellido,
            segundo_apellido: item.segundo_apellido,
            sexo: item.sexo,
            grupo_etnico: item.grupo_etnico,
            razon_social: item.razon_social,
            estado_civil: item.estado_civil,
            nombre: item.nombre,
            comienzo_vida_util_version: "",
            fin_vida_util_version: null,
            espacio_de_nombres: "Fusagasuga",
            local_id: "0",
          };
          console.log("Json", json);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          let raw = JSON.stringify(json);
          let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          let url =
            import.meta.env.VITE_API_URL_FIRST + "interesados/interesado";
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          console.log("Resultado interesado", result);
          item.t_id = result.data.interesado.t_id;
          item.isTemporal = true;
          auxId.push(result.data.interesado.t_id);
        } else {
          item.isTemporal = false;
          auxId.push(item.t_id);
          console.log("guardo id");
        }
      }

      return auxId;
    } catch (error) {
      console.log("error: " + error);
    }
  }
  async function createColMiembros(agrupacion, interesado) {
    console.log("interesado Entrando", interesado);
    for (const [index, item] of interesadosData.entries()) {
      let json = {
        interesado_lc_interesado: "",
        interesado_lc_interesado_conservacion: "",
        interesado_lc_agrupacioninteresados: agrupacion,
        agrupacion: agrupacion,
        participacion: item.participacion,
      };
      console.log("Es temporal", item.isTemporal);
      if (item.isTemporal) {
        json.interesado_lc_interesado = interesado[index];
        json.interesado_lc_interesado_conservacion = null;
      } else {
        json.interesado_lc_interesado_conservacion = interesado[index];
        json.interesado_lc_interesado = null;
      }

      console.log(json);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify(json);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("Json Col Interesado", raw);
      let url = import.meta.env.VITE_API_URL_FIRST + "interesados/miembros";

      const response = await fetch(url, requestOptions);
      const result = await response.json();
      console.log("Resul Col_Miembros", result);
    }
  }
  async function Send_Data() {
    ////////////////Capturar valores Tabledata para Datos Homologados
    ///////////////////////////////////////////////////////////////
    setLoading(true);
    try {
      let id_agrupacion = "";
      let id_interesado = "";
      ////Crear Agrupaciones
      id_interesado = await createInteresado();
      console.log("Idssss", id_interesado);
      ///////////////////////////////////////////
      if (interesadosData.length >= 2) {
        let tipoInteresado = await LoadAgrupacionTipo();
        id_agrupacion = await createAgrupacion(tipoInteresado);
        console.log("Id Agrupacion", id_agrupacion);
        createColMiembros(id_agrupacion, id_interesado);
      }
      if (props.contexto) {
        tableData = contextTableData;
        updateTableData = contextUpdateTableData;
        let dataId = props.dataid;
        tableData.map((item, index) => {
          dataId.map((items) => {
            if (items - 1 == index) {
              interesadosData.lc_agrupacion = id_agrupacion;
              item.interesados = interesadosData;
            }
          });
        });
        props.msj("Datos Interesado Guardado Correctamente");
        props.onClose();
        updateTableData(tableData);
      } else {
      }
      setLoading(false);
      console.log("Data interesado", interesadosData);
      //Guardar
    } catch (error) {
      props.msj("Error al Guardar Datos de Interesado");
    }
  }

  //Form de Interesados
  const agregarInteresados = () => {
    const nuevosInteresados = [];
    for (let i = 0; i < numInteresados; i++) {
      nuevosInteresados.push(
        <ValidarInteresado
          key={i}
          index={i}
          est={true}
          onDataChange={actualizarDatosInteresado}
          data={interesadosData}
        />
      );
    }
    setInteresados(nuevosInteresados);
  };
  const actualizarDatosInteresado = (index, newData) => {
    // Aquí puedes manejar los datos del Interesado individualmente
    setInteresadosData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };

  useEffect(() => {
    console.log("datos Array Completo actualizado", interesadosData);
  }, [interesadosData]);

  //Formulario

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start ">
      <h1 className="text-2xl">Datos Generales del Interesado</h1>
      <div className="w-full pt-4 flex flex-row text-left">
        <input
          type="number"
          placeholder="Número de interesados"
          className="border-2 p-1 rounded-md w-full"
          value={numInteresados}
          onChange={Load_Num}
          onInput={soloNumeros}
        />
        <button
          className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
          onClick={agregarInteresados}
        >
          Agregar Interesados
        </button>
      </div>
      <div className="w-full">{interesados}</div>
      <div className="w-full flex flex-col">
        <button
          onClick={Send_Data}
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-2"
        >
          Guardar
        </button>
        {loading ? <Loader /> : null}
      </div>
    </div>
  );
};
function soloLetras(event) {
  const input = event.target;
  input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
}
//Se Aceptan solo  Numeros
function soloNumeros(event) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9.]/g, "");
}
export const ValidarInteresado = (props) => {
  console.log("validadr", props);
  const [stateInput, setStateInput] = useState();
  const [dataState, setDataState] = useState(false);
  const [msjResult, setMsjResult] = useState();
  const [loading, setLoading] = useState(false);
  const [dataInteresado, setDataInteresado] = useState({
    t_id: 0,
    tipo: 0,
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
    participacion: "",
  });
  const [estFormData, setEstFormData] = useState(false);

  const handleReset = () => {
    console.log("reset");
    setDataInteresado((prevData) => ({
      ...prevData,
      t_id: 0,
      tipo: 0,
      tipo_documento: 0,
      primer_nombre: null,
      segundo_nombre: null,
      primer_apellido: null,
      segundo_apellido: null,
      sexo: null,
      grupo_etnico: null,
      razon_social: "",
      estado_civil: null,
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: "",
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
      participacion: "",
    }));
  };
  ///Consultar Datos
  const InteresadoConfirm = async () => {
    handleReset();
    setLoading(true);
    const url =
      import.meta.env.VITE_API_URL_FIRST +
      "interesados/" +
      dataInteresado.documento_identidad;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log("Resultado", result.data);
        setDataState(true);
        setStateInput(true);
        setEstFormData(true);
        if (
          result.data.interesado &&
          result.data.interesado.interesado_lc_interesado
        ) {
          setDataInteresado(result.data.interesado.interesado_lc_interesado);
        } else {
          setDataInteresado(result.data.interesado);
        }

        setMsjResult("Encontrado");
      } else {
        const error = await response.json();
        setDataState(true);
        setStateInput(false);
        console.log("Error en la solicitud:", error);
        setMsjResult("No Encontrado");
        setEstFormData(false);
      }
      setLoading(false);
    } catch (error) {
      setDataState(true);
      setStateInput(true);
      console.log("Error en la solicitud:  111", error);
      setMsjResult(error.message);
    }
  };
  ///////////Cambios Formulario de Data
  const Load_Data = (e) => {
    const { name, value } = e.target;
    if (name == "tipo") {
      setEstFormData(true);
      handleReset();
    }
    if (name == "razon_social") {
      console.log("carga Razon socual");
      let objNombre = value;
      setDataInteresado((prevData) => ({
        ...prevData,
        nombre: objNombre,
        [name]: value,
      }));
    } else {
      console.log(name);
      if (name != "participacion") {
        setDataInteresado((prevData) => ({
          ...prevData,
          nombre: `${prevData.primer_apellido ?? ""} ${
            prevData.segundo_apellido ?? ""
          } ${prevData.primer_nombre ?? ""} ${prevData.segundo_nombre ?? ""}`,
          [name]: value,
        }));
      } else {
        setDataInteresado((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    console.log("Value", value);
    console.log("Entra", name);

    // Notificar cambios al componente principal
  };
  //Actualizar data Arreglo
  useEffect(() => {
    if (props.est) {
      props.onDataChange(props.index, dataInteresado);
    }
    console.log("Actualizacion datos", dataInteresado);
  }, [dataInteresado]);
  function Send_Data() {
    console.log(dataInteresado);
    props.update(dataInteresado);
    props.onClose();
  }

  ////////////////////////////////////////////Form o mostrar valores
  ////////////////////////////////////////////Form Validar Interesado
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="m-2 w-full items-center justify-center font-semibold flex flex-col">
        <div className="m-2  w-full font-semibold flex flex-row">
          <label className="text-2xl">
            Validar Interesado {props.est ? "#" + props.index + 1 : null}
          </label>
        </div>
        <div className=" w-full font-semibold flex flex-row">
          <div className="w-2/5 flex flex-col">
            <label>Numero de Documento</label>
            <input
              name="documento_identidad"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloNumeros}
              value={dataInteresado.documento_identidad}
            ></input>
          </div>
          <div className="w-1/5 flex flex-col justify-center mr-4">
            <button
              onClick={InteresadoConfirm}
              className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
            >
              Validar
            </button>
          </div>
          {loading ? <Loader /> : null}
          <label>{msjResult}</label>
        </div>
      </div>
      <div className="w-full flex ">
        {dataState ? (
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <div className="w-2/4 ">
                <label className="font-semibold">Tipo de Interesado*:</label>
                <select
                  name="tipo"
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                  disabled={stateInput}
                  value={dataInteresado.tipo}
                >
                  <option></option>
                  <option value={658}>Persona Natural</option>
                  <option value={659}>Persona Juridica</option>
                </select>
              </div>{" "}
              {props.est ? (
                props.data.length >= 2 && estFormData ? (
                  <div className="w-2/4 ml-4">
                    <label className="font-semibold">Participacion*:</label>
                    <input
                      type="text"
                      onInput={soloNumeros}
                      name="participacion"
                      className="border-2 p-1 rounded-md w-full"
                      onChange={Load_Data}
                      value={dataInteresado.participacion}
                    ></input>
                  </div>
                ) : null
              ) : null}
            </div>
            {estFormData ? (
              <div>
                {dataInteresado.tipo != 659 ? (
                  <div className="w-full flex flex-row">
                    <div className="w-1/4">
                      <label className="font-semibold">Primer Nombre*:</label>
                      <input
                        name="primer_nombre"
                        type="text"
                        className="border-2 p-1 rounded-md w-full"
                        disabled={stateInput}
                        onChange={Load_Data}
                        onInput={soloLetras}
                        value={dataInteresado.primer_nombre}
                      ></input>
                    </div>
                    <div className="w-1/4 ml-4">
                      <label className="font-semibold">Segundo Nombre*:</label>
                      <input
                        name="segundo_nombre"
                        onChange={Load_Data}
                        disabled={stateInput}
                        onInput={soloLetras}
                        type="text"
                        className="border-2 p-1 rounded-md w-full"
                        value={dataInteresado.segundo_nombre}
                      ></input>
                    </div>
                    <div className="w-1/4 ml-4">
                      <label className="font-semibold">Primer Apellido*:</label>
                      <input
                        name="primer_apellido"
                        type="text"
                        className="border-2 p-1 rounded-md w-full"
                        onChange={Load_Data}
                        onInput={soloLetras}
                        disabled={stateInput}
                        value={dataInteresado.primer_apellido}
                      ></input>
                    </div>
                    <div className="w-1/4 ml-4">
                      <label className="font-semibold">Segundo Apellido:</label>
                      <input
                        name="segundo_apellido"
                        type="text"
                        className="border-2 p-1 rounded-md w-full"
                        onChange={Load_Data}
                        onInput={soloLetras}
                        disabled={stateInput}
                        value={dataInteresado.segundo_apellido}
                      ></input>
                    </div>
                  </div>
                ) : null}
                <div className="w-full flex flex-row">
                  <div className="w-1/4 ">
                    <label className="font-semibold">Tipo de Documento*:</label>
                    <select
                      type="text"
                      name="tipo_documento"
                      className="border-2 p-1 rounded-md w-full"
                      onChange={Load_Data}
                      disabled={stateInput}
                      value={dataInteresado.tipo_documento}
                    >
                      <option></option>
                      {dataInteresado.tipo != 659 ? (
                        <optgroup>
                          <option value={529}>Cedula de Ciudadania</option>
                          <option value={530}>
                            Cedula de Extranjeria
                          </option>{" "}
                          <option value={532}>Tarjeta Identidad</option>
                          <option value={533}>Registro Civil</option>
                          <option value={534}>Secuencial</option>
                          <option value={535}>Pasaporte</option>
                        </optgroup>
                      ) : (
                        <option value={531}>NIT</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/4 ml-4">
                    <label className="font-semibold">
                      Numero de Documento*:
                    </label>
                    <input
                      name="documento_identidad"
                      type="text"
                      className="border-2 p-1 rounded-md w-full"
                      minLength={8}
                      onChange={Load_Data}
                      disabled={true}
                      onInput={soloNumeros}
                      value={dataInteresado.documento_identidad}
                    ></input>
                  </div>
                  {dataInteresado.tipo != 659 ? (
                    <div className="w-1/4 ml-4">
                      <label className="font-semibold">Estado Civil*:</label>
                      <select
                        type="text"
                        name="estado_civil"
                        className="border-2 p-1 rounded-md w-full"
                        onChange={Load_Data}
                        disabled={stateInput}
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
                  ) : null}
                  {dataInteresado.tipo != 659 ? (
                    <div className="w-1/4 ml-4">
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
                  ) : null}
                </div>
                <div className="w-full flex flex-row">
                  {dataInteresado.tipo != 659 ? (
                    <div className="w-1/4">
                      <label className="font-semibold">Genero*:</label>
                      <select
                        name="sexo"
                        type="text"
                        disabled={stateInput}
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
                  ) : null}
                  {dataInteresado.tipo == 659 ? (
                    <div className="w-1/4 ">
                      <label className="font-semibold">Razon Social*:</label>
                      <input
                        name="razon_social"
                        type="text"
                        disabled={stateInput}
                        value={dataInteresado.razon_social}
                        className="border-2 p-1 rounded-md w-full"
                        onChange={Load_Data}
                      ></input>
                    </div>
                  ) : null}
                  <div
                    className={`${
                      dataInteresado.tipo != 659 ? " w-2/4 ml-4" : "w-3/4 ml-4"
                    } `}
                  >
                    <label className="font-semibold">Nombre*:</label>
                    <input
                      name="nombre"
                      type="text"
                      disabled
                      className="border-2 p-1 rounded-md w-full"
                      onChange={Load_Data}
                      value={dataInteresado.nombre}
                    ></input>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {!props.est ? (
        <button
          onClick={Send_Data}
          className="py-2 px-4 mt-4 text-center rounded-md text-white bg-teal-500"
        >
          Actualizar Interesado
        </button>
      ) : null}
    </div>
  );
};

export const ModalInteresadoForm = React.forwardRef((props, ref) => {
  let [dataId, setDataId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (aux) => {
    console.log("Aux", aux);
    setDataId(aux);
    setIsModalOpen(true);
    console.log("Data Id", dataId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <InteresadoForm
        contexto={true}
        dataid={dataId}
        onClose={closeModal}
        msj={props.msj}
      />
    </Modal>
  );
});

export const NormalInteresadoForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <InteresadoForm contexto={false} est={props.est} data={props.data} />
    </Modal>
  );
});
