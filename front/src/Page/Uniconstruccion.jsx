import { Modal } from "./Modal";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { InteresadoContext } from "./Context/InteresadoContext";
import { TableContext } from "./Context/Context";
const UniConstruccionForm = (props, ref) => {
  const { tableData, updateTableData } = useContext(TableContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [dataId, setDataId] = useState({
    first: "",
    second: "",
  });
  const openModal = (aux) => {
    aux.first = parseInt(aux.first);
    aux.second = parseInt(aux.second);
    setDataId(aux);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }

  const sendData = () => {
    tableData.map((item, index) => {
      if (index >= dataId.first - 1 && index <= dataId.second - 1) {
        item.unidad_construccion = unidadData;
        console.log(item);
      }
    });
    updateTableData(tableData);
  };

  const [numUnidad, setNumUnidad] = useState();
  const [unidad, setUnidad] = useState([]);
  const [unidadData, setUnidadData] = useState();
  const Load_Num = (e) => {
    const newValue = parseInt(e.target.value);
    console.log(newValue);
    setNumUnidad(newValue);
    const newUnidadData = Array.from({ length: newValue }, () => ({
      planta_ubicacion: "",
      altura: "",
      area_construida: "",
    }));
    setUnidadData(newUnidadData);
  };
  const agregarUnidad = () => {
    const nuevaUnidad = [];
    for (let i = 0; i < numUnidad; i++) {
      nuevaUnidad.push(
        <CreateUnidad key={i} index={i} onDataChange={actualizarDatosUnidad} />
      );
    }
    setUnidad(nuevaUnidad);
  };
  const actualizarDatosUnidad = (index, newData) => {
    // Aquí puedes manejar los datos del Interesado individualmente
    setUnidadData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };

  const CreateUnidad = (index) => {
    const { tableData, updateTableData } = useContext(TableContext);
    const [dataUnidad, setDataUnidad] = useState({
      planta_ubicacion: "",
      altura: "",
      area_construida: "",
      etiqueta: "",
      construccion: "",
    });
    const Load_Data = (e) => {
      const { name, value } = e.target;
      setDataUnidad((prevValues) => ({ ...prevValues, [name]: value }));
      console.log("name", dataUnidad);
      console.log("value", value);
    };
    useEffect(() => {
      index.onDataChange(index.index, dataUnidad);
      console.log("Actualizacion datos", dataUnidad);
    }, [dataUnidad]);
    return (
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
        <h1 className="text-3xl">
          Caracteristicas de Unidad de Construccion #{index.index + 1}
        </h1>
        <div className="w-full flex flex-row mt-4">
          <div className="w-1/3 flex flex-col">
            <label>Relacion Construccion</label>
            <select className="border-2 p-1 rounded-md w-full">
              <option></option>
              {tableData.map((item, index) => {
                if (index >= dataId.first - 1 && index <= dataId.second - 1) {
                  if (item.construccion) {
                    return item.construccion.map((items, index) => {
                      console.log("Carga0", items);
                      return (
                        <option value={index}>Construccion #{index + 1}</option>
                      );
                    });
                  }
                }
              })}
            </select>
          </div>
          <div className="w-1/3 ml-4 flex flex-col">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg">
              Carga Puntuacion
            </button>
          </div>
          <div className="w-1/3 ml-4 flex flex-col">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg">
              Crear Puntuacion
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/4 flex flex-col">
            <label>Planta Ubicacion</label>
            <input
              name="planta_ubicacion"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={dataUnidad.planta_ubicacion}
              onChange={Load_Data}
              onInput={soloNumeros}
            ></input>
          </div>
          <div className="w-1/4 flex flex-col ml-4">
            <label>Altura</label>
            <input
              name="altura"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={dataUnidad.altura}
              onChange={Load_Data}
              onInput={soloNumeros}
            ></input>
          </div>
          <div className="w-1/4 ml-4 flex flex-col">
            <label>Area Construida</label>
            <input
              name="area_construida"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={dataUnidad.area_construida}
              onChange={Load_Data}
              onInput={soloNumeros}
            ></input>
          </div>
          <div className="w-1/4 ml-4 flex flex-col">
            <label>Etiqueta</label>
            <input
              name="etiqueta"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={dataUnidad.etiqueta}
              onChange={Load_Data}
            ></input>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h1 className="text-2xl">Datos Generales de Unidad de Construccion</h1>
      <div className="w-full pt-4 flex flex-row text-left">
        <input
          type="number"
          placeholder="Número de Unidades de Construccion"
          className="border-2 p-1 rounded-md w-full"
          value={numUnidad}
          onChange={Load_Num}
          onInput={soloNumeros}
        />
        <button
          className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
          onClick={agregarUnidad}
        >
          Crear Unidades
        </button>
      </div>
      <div className="w-full">{unidad}</div>
      <div className="w-full mt-4">
        <button
          onClick={sendData}
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
        >
          Guardar Todo
        </button>
      </div>
    </Modal>
  );
};
export default forwardRef(UniConstruccionForm);
