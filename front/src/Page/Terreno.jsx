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
const TerrenoForm = (props, ref) => {
  const { tableData, updateTableData } = useContext(TableContext);
  console.log("Datos Tabla", tableData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [terrenoData, setTerrenoData] = useState({
    area_terreno: "",
    codigo_manzana: "",
    avaluo_terreno: "",
  });
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }
  //     item.Dpto +  item.Mpio +  item.Zona +  item.Sector +  item.Comuna +  item.Barrio +  item.Manzana
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
        terrenoData.codigo_manzana =
          item.Dpto +
          item.Mpio +
          item.Zona +
          item.Sector +
          item.Comuna +
          item.Barrio +
          item.Manzana;
        item.terreno = terrenoData;
        console.log(item);
      }
    });
    updateTableData(tableData);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const Load_Data = (e) => {
    const { name, value } = e.target;
    setTerrenoData((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("value", value);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 ">
        <h1 className="text-3xl">Caracteristicas de Terreno</h1>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/2 flex flex-col">
            <label>Area Terreno</label>
            <input
              name="area_terreno"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={terrenoData.area_terreno}
              onChange={Load_Data}
            ></input>
          </div>

          <div className="w-1/2 ml-4 flex flex-col">
            <label>Avaluo Terreno</label>
            <input
              disabled
              name="avaluo_terreno"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={terrenoData.avaluo_terreno}
              onChange={Load_Data}
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
/*<Modal isOpen={isModalOpen} onClose={closeModal}></Modal>


    <div className="w-1/3 ml-4 flex flex-col">
            <label>Codigo Manzana</label>
            <input
              name="codigo_manzana"
              disabled
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={terrenoData.codigo_manzana}
            ></input>
          </div>*/
export default forwardRef(TerrenoForm);
