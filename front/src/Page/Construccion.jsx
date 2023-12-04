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
const ConstruccionForm = (props, ref) => {
  console.log(props);
  const { tableData, updateTableData } = useContext(TableContext);

  /**/
  const [numConstruccion, setNumConstruccion] = useState();
  const [construccion, setConstruccion] = useState([]);
  const [construccionData, setConstruccionData] = useState();

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
          onDataChange={actualizarDatosConstruccion}
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
  const CreateConstruction = (index) => {
    console.log(index);
    console.log("1231", String.fromCharCode(65 + index.index));
    let [estMsj, setEstMsj] = useState();
    const [construccionData, setConstruccionData] = useState({
      t_id: "",
      identificador: String.fromCharCode(65 + index.index),
      tipo_construccion: "",
      tipo_dominio: "",
      num_pisos: "",
      num_sotanos: "",
      num_semisotanos: "",
      num_mezanines: "",
      anio_cons: "",
      area: "",
      avaluo: "",
      valor_referencia: "",
      altura: "",
      observacion: "",
    });
    const Load_Data = (e) => {
      const { name, value } = e.target;

      if (name == "anio_cons") {
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
      index.onDataChange(index.index, construccionData);
      console.log("Actualizacion datos", construccionData);
    }, [construccionData]);

    return (
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
        {" "}
        <h1 className="text-3xl">
          Caracteristicas de Construccion #{index.index + 1}
        </h1>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/3   flex flex-col ">
            <label>Identificador</label>
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
            <label>Numero Pisos</label>
            <input
              name="num_pisos"
              value={construccionData.num_pisos}
              onChange={Load_Data}
              type="number"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3  ml-4 flex flex-col">
            <label>Numero Sotanos</label>
            <input
              name="num_sotanos"
              value={construccionData.num_sotanos}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 ml-4  flex flex-col">
            <label>Numero de Semisotanos</label>
            <input
              name="num_semisotanos"
              value={construccionData.num_semisotanos}
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
              name="num_mezanines"
              value={construccionData.num_mezanines}
              onChange={Load_Data}
              type="number"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 ml-4   flex flex-col">
            <label>Año de Construccion</label>
            <input
              name="anio_cons"
              value={construccionData.anio_cons}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
            {estMsj ? (
              <label className="text-red-600">
                "Año debe ser Mayor a 1600"
              </label>
            ) : null}
          </div>
          <div className="w-1/3 ml-4  flex flex-col">
            <label>Area de Construccion</label>
            <input
              name="area"
              value={construccionData.area}
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
              name="avaluo"
              value={construccionData.avaluo}
              disabled
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3  flex flex-col ml-4">
            <label>Valor Referencia</label>
            <input
              name="valor_referencia"
              value={construccionData.valor_referencia}
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
          <div className="w-full  flex flex-col">
            <label>Observaciones</label>
            <input
              name="observacion"
              value={construccionData.observacion}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
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

  const sendData = async () => {
    console.log("Construccion Data", construccionData);
    console.log("Construccion Data", props);
    if (props.contexto) {
      let dataId = props.dataid;
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
                  numero_pisos: parseInt(item.num_pisos),
                  numero_sotanos: parseInt(item.num_sotanos),
                  numero_mezanines: parseInt(item.num_mezanines),
                  numero_semisotanos: parseInt(item.num_semisotanos),
                  anio_construccion: parseInt(item.anio_cons),
                  avaluo_construccion: item.avaluo
                    ? parseFloat(item.avaluo)
                    : null,
                  valor_referencia_construccion: item.valor_referencia
                    ? parseFloat(item.valor_referencia)
                    : null,
                  area_construccion: parseFloat(item.area),
                  altura: parseFloat(item.altura),
                  observaciones: item.observacion,
                  dimension: null,
                  etiqueta: null,
                  relacion_superficie: null,
                  nivel: null,
                  comienzo_vida_util_version: "",
                  fin_vida_util_version: null,
                  espacio_de_nombres: item1.codigo_homologado,
                };

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
            }
          }
          item1.construccion = construccionData;
        }

        console.log("datos de tabla", tableData);
        //closeModal();
        updateTableData(tableData);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

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
      <div className="w-full  mt-4">
        <button
          onClick={sendData}
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
        >
          Guardar Todo
        </button>
      </div>
    </div>
  );
};
export const ModalConstruccionForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <ConstruccionForm contexto={true} dataid={dataId} />
    </Modal>
  );
});
export const NormalConstruccionForm = React.forwardRef((props, ref) => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <ConstruccionForm contexto={false} />
    </div>
  );
});
