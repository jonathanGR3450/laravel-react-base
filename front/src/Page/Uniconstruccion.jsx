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
  const [dataUnidad, setDataUnidad] = useState({
    planta_ubicacion: "",
    altura: "",
    area_construida: "",
  });
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }
  const Load_Data = (e) => {
    const { name, value } = e.target;
    setDataUnidad((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("name", dataUnidad);
    console.log("value", value);
  };
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
  const sendData = () => {
    tableData.map((item, index) => {
      if (index >= dataId.first - 1 && index <= dataId.second - 1) {
        item.unidad_construccion = dataUnidad;
        console.log(item);
      }
    });
    updateTableData(tableData);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
        <h1 className="text-3xl">Caracteristicas de Unidad de Construccion</h1>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/3 flex flex-col">
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
          <div className="w-1/3 flex flex-col ml-4">
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
          <div className="w-1/3 ml-4 flex flex-col">
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
        </div>
        <div className="w-full flex flex-row mt-4">
          <button
            onClick={sendData}
            className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default forwardRef(UniConstruccionForm);
