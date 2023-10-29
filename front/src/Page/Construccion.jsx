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
const ConstruccionForm = (props, ref) => {
  const { tableData, updateTableData } = useContext(TableContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [dataId, setDataId] = useState({
    first: "",
    second: "",
  });
  const [construccionData, setConstruccionData] = useState({
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
  });

  const Load_Data = (e) => {
    const { name, value } = e.target;
    setConstruccionData((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("name", construccionData);
    console.log("value", value);
  };
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
        item.construccion = construccionData;
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
        <h1 className="text-3xl">Caracteristicas de Construcciones</h1>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/3 flex flex-col">
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
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 ml-4  flex flex-col">
            <label>Numero de Mezanines</label>
            <input
              name="num_mezanines"
              value={construccionData.num_mezanines}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/3   flex flex-col">
            <label>Año de Construccion</label>
            <input
              name="anio_cons"
              value={construccionData.anio_cons}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 ml-4  flex flex-col">
            <label>Area de Construccion</label>
            <input
              name="area"
              value={construccionData.area}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 ml-4  flex flex-col">
            <label>Avaluo Construccion</label>
            <input
              name="avaluo"
              value={construccionData.avaluo}
              disabled
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/3  flex flex-col">
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
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 ml-4  flex flex-col">
            <label>Observaciones</label>
            <input
              name="observacion"
              value={construccionData.observaciones}
              onChange={Load_Data}
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row items-start mt-2">
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
export default forwardRef(ConstruccionForm);
