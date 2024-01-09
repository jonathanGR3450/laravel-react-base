import { Modal } from "./Modal";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { InteresadoContext } from "./Context/InteresadoContext";
import { TableContext } from "./Context/Context";
import Loader from "./Loader";
import useInfo from "../hooks/useInfo";

const ConstruccionForm = (props, ref) => {
  console.log("Props Construccion", props);
  let tableData = [];
  let updateTableData = () => {};
  let contextTableData, contextUpdateTableData;
  let [loading, setLoading] = useState(false);
  let [estBtt, setEstBtt] = useState(true);
  let auxDataForm = {};
  if (props.contexto) {
    ({ tableData: contextTableData, updateTableData: contextUpdateTableData } =
      useContext(TableContext));
  } else {
  }
  /**/
  const [numConstruccion, setNumConstruccion] = useState();
  const [construccion, setConstruccion] = useState([]);
  const [construccionData, setConstruccionData] = useState([]);

  const Load_Num = (e) => {
    const newValue = parseInt(e.target.value);
    console.log(newValue);
    setNumConstruccion(newValue);

    const newConstruccionData = Array.from({ length: newValue }, () => ({
      identificador: "",
      tipo_construccion: "",
      tipo_dominio: "",
      num_pisos: "",
      num_semisotanos: "",
      num_mezanines: "",
      anio_cons: "",
      area: "",
      avaluo: "",
      valor_referencia: "",
      altura: "",
      observacion: "",
    }));
    setConstruccionData(newConstruccionData);
  };

  const agregarConstruccion = () => {
    console.log(numConstruccion);
    const nuevaConstruccion = [];
    for (let i = 0; i < numConstruccion; i++) {
      nuevaConstruccion.push(
        <CreateConstruction
          key={i}
          index={i}
          est={true}
          onDataChange={actualizarDatosConstruccion}
          data={construccionData}
        />
      );
    }
    setConstruccion(nuevaConstruccion);
  };
  const actualizarDatosConstruccion = (index, newData) => {
    console.log("caergadasdasd");
    // Aquí puedes manejar los datos del Interesado individualmente
    setConstruccionData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };

  const sendData = async () => {
    setLoading(true);
    console.log("Construccion Data", construccionData);
    console.log("Construccion Data", props);
    if (props.contexto) {
      let dataId = props.dataid;
      tableData = contextTableData;
      updateTableData = contextUpdateTableData;
      try {
        const entries = Object.entries(tableData);
        for (const [index, [key, item1]] of entries.entries()) {
          for (const items of dataId) {
            if (items - 1 === index) {
              console.log("Construccion Data123 ", items);
              for (const [currentIndex, item] of construccionData.entries()) {
                console.log("itessss", item);
                let newobj = {
                  identificador: item.identificador,
                  tipo_construccion: parseInt(item.tipo_construccion),
                  tipo_dominio: item.tipo_dominio,
                  numero_pisos: parseInt(item.numero_pisos),
                  numero_sotanos: parseInt(item.numero_sotanos),
                  numero_mezanines: parseInt(item.numero_mezanines),
                  numero_semisotanos: parseInt(item.numero_semisotanos),
                  anio_construccion: parseInt(item.anio_construccion),
                  avaluo_construccion: item.avaluo_construccion
                    ? parseFloat(item.avaluo_construccion)
                    : null,
                  valor_referencia_construccion:
                    item.valor_referencia_construccion
                      ? parseFloat(item.valor_referencia_construccion)
                      : null,
                  area_construccion: parseFloat(item.area_construccion),
                  altura: parseFloat(item.altura),
                  observaciones: item.observaciones,
                  dimension: null,
                  etiqueta: null,
                  relacion_superficie: null,
                  nivel: null,
                  comienzo_vida_util_version: "",
                  fin_vida_util_version: null,
                  espacio_de_nombres: "Fusagasuga",
                  local_id: item1.codigo_homologado,
                };
                console.log("Data Json contex", newobj);
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                let raw = JSON.stringify(newobj);
                console.log(raw);
                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };
                let url =
                  import.meta.env.VITE_API_URL_FIRST + "construccion/local";
                const response = await fetch(url, requestOptions);

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                construccionData[currentIndex].t_id = result.data.t_id;

                console.log(result);
              }
              item1.construccion = construccionData;
            }
          }
        }

        console.log("datos de tabla", tableData);
        //closeModal();

        updateTableData(tableData);
        console.log("props construccion", props);
        props.msj(Math.random());
        props.onClose();
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  function validarData() {
    console.log("123 Validar", construccionData);
    let cont = 0;
    construccionData.map((item, index) => {
      if (item.numero_pisos == "" || item.area_construccion == "") {
        cont++;
      }
    });
    if (cont >= 1) {
      setEstBtt(true);
    } else {
      setEstBtt(false);
    }
  }
  useEffect(() => {
    validarData();
  }, [construccionData]);
  return (
    <div>
      <h1 className="text-2xl">Datos Generales del Construcciones</h1>
      <div className="w-full pt-4 flex flex-row text-left">
        <input
          type="number"
          placeholder="Número de Construcciones"
          className="border-2 p-1 rounded-md w-full"
          value={numConstruccion}
          onChange={Load_Num}
          onInput={soloNumeros}
        />
        <button
          className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
          onClick={agregarConstruccion}
        >
          Crear Construcciones
        </button>
      </div>
      <div className="w-full">{construccion}</div>
      <div className="w-full flex flex-col  mt-4">
        <button
          onClick={sendData}
          className={`${
            estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
          } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          disabled={estBtt}
        >
          Guardar Todo
        </button>
        {loading ? <Loader /> : null}
      </div>
    </div>
  );
};
//Se Aceptan solo  Numeros
function soloNumeros(event) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9.]/g, "");
}
//Se Aceptan solo Letras
function soloLetras(event) {
  const input = event.target;
  input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
}
export const CreateConstruction = (props) => {
  console.log("create props", props);
  const { updateNumPredial } = useInfo();
  let [estMsj, setEstMsj] = useState();
  let aux = "";
  let cod_homo = "";
  let dataNoNull = [];
  if (props.est) {
    console.log("entra");
    aux = {
      t_id: "",
      identificador: String.fromCharCode(65 + props.index),
      tipo_construccion: 0,
      tipo_dominio: "",
      numero_pisos: "",
      numero_sotanos: "",
      numero_mezanines: "",
      numero_semisotanos: "",
      anio_construccion: "",
      avaluo_construccion: "",
      valor_referencia_construccion: "",
      area_construccion: "",
      altura: "",
      observaciones: "",
      dimension: "",
      etiqueta: "",
      relacion_superficie: "",
      nivel: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: "null",
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    };
  } else {
    props.data.construccion.map((item, index) => {
      if (item.t_id != null) {
        dataNoNull.push(item);
      }
    });
    cod_homo = props.data.Codigo_Homologado;
    let data = dataNoNull[props.id];
    aux = {
      t_id: data.t_id,
      identificador: data.identificador,
      tipo_construccion: data.tipo_construccion.t_id
        ? data.tipo_construccion.t_id
        : data.tipo_construccion,
      tipo_dominio: data.tipo_dominio.t_id
        ? data.tipo_dominio.t_id
        : data.tipo_dominio,
      numero_pisos: data.numero_pisos,
      numero_sotanos: data.numero_sotanos,
      num_semisotanos: data.numero_semisotanos,
      num_mezanines: data.numero_mezanines,
      anio_construccion: data.anio_construccion,
      area_construccion: data.area_construccion,
      avaluo_construccion: data.avaluo_construccion,
      valor_referencia_construccion: data.valor_referencia_construccion,
      altura: data.altura,
      etiqueta: data.etiqueta,
      nivel: data.nivel ? data.nivel.dispname : data.nivel,
      dimension: data.dimension ? data.dimension.dispname : data.dimension,
      relacion_superficie: data.relacion_superficie
        ? data.relacion_superficie.dispname
        : data.relacion_superficie,
      observaciones: data.observaciones,
      local_id: cod_homo,
    };
    console.log("Llegan datos", aux);
  }
  const [construccionData, setConstruccionData] = useState(aux);
  const Load_Data = (e) => {
    const { name, value } = e.target;
    if (name == "anio_construccion") {
      if (parseInt(value) < 1600) {
        setEstMsj(true);
      } else {
        setEstMsj(false);
      }
    }
    setConstruccionData((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("name", construccionData);
    console.log("value", value);
  };
  useEffect(() => {
    if (props.est) {
      props.onDataChange(props.index, construccionData);
    }
    console.log("Actualizacion datos", construccionData);
  }, [construccionData]);

  async function send_data() {
    try {
      let item = construccionData;
      console.log("data 123", item);
      let json = {
        identificador: item.identificador,
        tipo_construccion: isNaN(parseInt(item.tipo_construccion))
          ? 0
          : parseInt(item.tipo_construccion),
        tipo_dominio: item.tipo_dominio,
        numero_pisos: isNaN(parseInt(item.numero_pisos))
          ? 0
          : parseInt(item.numero_pisos),
        numero_sotanos: isNaN(parseInt(item.numero_sotanos))
          ? 0
          : parseInt(item.numero_sotanos),
        numero_mezanines: isNaN(parseInt(item.numero_mezanines))
          ? 0
          : parseInt(item.numero_mezanines),
        numero_semisotanos: isNaN(parseInt(item.numero_semisotanos))
          ? 0
          : parseInt(item.numero_semisotanos),
        anio_construccion: isNaN(parseInt(item.anio_construccion))
          ? " "
          : parseInt(item.anio_construccion),
        avaluo_construccion: item.avaluo
          ? isNaN(parseFloat(item.avaluo))
            ? 0
            : parseFloat(item.avaluo)
          : null,
        valor_referencia_construccion: item.valor_referencia_construccion
          ? isNaN(parseFloat(item.valor_referencia_construccion))
            ? 0
            : parseFloat(item.valor_referencia_construccion)
          : null,
        area_construccion: isNaN(parseFloat(item.area_construccion))
          ? 0
          : parseFloat(item.area_construccion),
        altura: isNaN(parseFloat(item.altura)) ? 0 : parseFloat(item.altura),
        observaciones: item.observaciones,
        dimension: null,
        etiqueta: null,
        relacion_superficie: null,
        nivel: null,
        espacio_de_nombres: "Fusagasuga",
        local_id: item.local_id,
      };
      console.log("12asd3555", json);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(json),
        redirect: "follow",
      };
      let url = import.meta.env.VITE_API_URL_FIRST + "construccion/local";
      //let url = "";
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log("Data result", result.data);
        dataNoNull[props.id] = result.data;
        props.data.construccion = dataNoNull;
        props.update(dataNoNull);
        props.onClose();
        updateNumPredial(props.data);
        console.log(props.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
      {" "}
      <h1 className="text-3xl">
        Caracteristicas de Construccion{" "}
        {props.est ? "#" + props.index + 1 : null}
      </h1>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="w-1/3   flex flex-col ">
          <label>Identificador*</label>
          <input
            name="identificador"
            value={construccionData.identificador}
            onChange={Load_Data}
            type="text"
            disabled
            className="border-2 p-1 rounded-md w-full text-center"
          ></input>
        </div>
        <div className="w-1/3 flex flex-col ml-4">
          <label>Tipo de Construccion</label>
          <select
            name="tipo_construccion"
            value={construccionData.tipo_construccion}
            onChange={Load_Data}
            className="border-2 p-1 rounded-md w-full"
          >
            <option></option>
            <option value={66}>Convencional</option>
            <option value={67}>No Convencional</option>
          </select>
        </div>
        <div className="w-1/3 ml-4  flex flex-col">
          <label>Tipo de Dominio</label>
          <select
            name="tipo_dominio"
            value={construccionData.tipo_dominio}
            onChange={Load_Data}
            className="border-2 p-1 rounded-md w-full"
          >
            <option></option>
            <option value={322}>Común</option>
            <option value={323}>Privado</option>
          </select>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="w-1/3   flex flex-col">
          <label>Numero Pisos*</label>
          <input
            name="numero_pisos"
            value={construccionData.numero_pisos}
            onChange={Load_Data}
            type="number"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
        <div className="w-1/3  ml-4 flex flex-col">
          <label>Numero Sotanos</label>
          <input
            name="numero_sotanos"
            value={construccionData.numero_sotanos}
            onChange={Load_Data}
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
        <div className="w-1/3 ml-4  flex flex-col">
          <label>Numero de Semisotanos</label>
          <input
            name="numero_semisotanos"
            value={construccionData.numero_semisotanos}
            onChange={Load_Data}
            type="number"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="w-1/3  flex flex-col">
          <label>Numero de Mezanines</label>
          <input
            name="numero_mezanines"
            value={construccionData.numero_mezanines}
            onChange={Load_Data}
            type="number"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
        <div className="w-1/3 ml-4   flex flex-col">
          <label>Año de Construccion</label>
          <input
            name="anio_construccion"
            value={construccionData.anio_construccion}
            onChange={Load_Data}
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
          {estMsj ? (
            <label className="text-red-600">"Año debe ser Mayor a 1600"</label>
          ) : null}
        </div>
        <div className="w-1/3 ml-4  flex flex-col">
          <label>Area de Construccion*</label>
          <input
            name="area_construccion"
            value={construccionData.area_construccion}
            onInput={soloNumeros}
            onChange={Load_Data}
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="w-1/3   flex flex-col">
          <label>Avaluo Construccion</label>
          <input
            name="avaluo_construccion"
            value={construccionData.avaluo_construccion}
            disabled
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
        <div className="w-1/3  flex flex-col ml-4">
          <label>Valor Referencia</label>
          <input
            name="valor_referencia_construccion"
            value={construccionData.valor_referencia_construccion}
            onChange={Load_Data}
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
        <div className="w-1/3 ml-4   flex flex-col">
          <label>Altura</label>
          <input
            name="altura"
            value={construccionData.altura}
            onInput={soloNumeros}
            onChange={Load_Data}
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="w-full  flex flex-col items-center justify-center text-center">
          <label>Observaciones</label>
          <input
            name="observaciones"
            value={construccionData.observaciones}
            onChange={Load_Data}
            type="text"
            className="border-2 p-1 rounded-md w-full"
          ></input>
          {!props.est ? (
            <button
              onClick={send_data}
              className=" w-1/5 p-2 text-center font-normal rounded-md text-white bg-teal-500 text-lg mt-4"
            >
              Actualizar Datos
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const ModalConstruccionForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("props modal construccion", props);
  let [dataId, setDataId] = useState({});

  const openModal = (aux) => {
    console.log(aux);
    setDataId(aux);
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
      <ConstruccionForm
        contexto={true}
        dataid={dataId}
        onClose={closeModal}
        msj={props.msj}
      />
    </Modal>
  );
});
export const NormalConstruccionForm = React.forwardRef((props, ref) => {
  console.log("props normal construccion", props);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (aux) => {
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
      <ConstruccionForm contexto={false} data={props.data} />
    </Modal>
  );
});
