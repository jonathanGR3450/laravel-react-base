import { Modal } from "./Modal";
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { DataContext } from "./Context/DataContext";
import { TableContext } from "./Context/Context";
const DerechoForm = (props, ref) => {
  console.log(props);
  let tableData = [];
  let updateTableData = () => {};
  const {
    tableData: contextTableData,
    updateTableData: contextUpdateTableData,
  } = useContext(TableContext);

  const [objDerecho, setobjDerecho] = useState({
    tipo_derecho: "",
    tipo_restriccion: "",
    inicio_tenencia: "",
    fraccion_derecho: "",
    descripcion: "",
  });

  const [estBtt, setEstBtt] = useState(true);

  function Load_Data(e) {
    const { name, value } = e.target;
    setobjDerecho((prevValues) => ({ ...prevValues, [name]: value }));
  }

  const sendData = () => {
    if (props.contexto) {
      tableData = contextTableData;
      updateTableData = contextUpdateTableData;
      for (const [index, item] of tableData.entries()) {
        console.log("item", item);
        for (let i = 0; i < dataId.length; i++) {
          if (dataId[i] - 1 === index) {
            let json = {
              tipo: objDerecho.tipo_derecho,
              fraccion_derecho: objDerecho.fraccion_derecho,
              fecha_inicio_tenencia: objDerecho.inicio_tenencia,
              descripcion: objDerecho.descripcion,
              interesado_lc_interesado: 1,
              interesado_lc_agrupacioninteresados: 1,
              unidad: "",
              comienzo_vida_util_version: "2023-01-01",
              fin_vida_util_version: "2023-12-31",
              espacio_de_nombres: "Nombre del espacio",
            };
            tableData[index].derecho = objDerecho;
            console.log(tableData[index]);
          }
        }
      }
      updateTableData(tableData);
    }
  };

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="font-semibold text-3xl">Caracteristicas del Derecho</h1>
      <p>A Continuación se muestran las caracteristicas del Derecho:</p>
      <div className="flex flex-col w-full">
        <h2 className="font-semibold text-2xl">Datos Generales del Derecho</h2>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3">
            <label className="font-semibold">Tipo Derecho*:</label>
            <select
              name="tipo_derecho"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.tipo_derecho}
            >
              <option></option>
              <option value={47}>Dominio</option>
              <option value={48}>Ocupacion</option>
              <option value={49}>Posesion</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Tipo Restriccion:</label>
            <select
              name="tipo_restriccion"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.tipo_restriccion}
            >
              <option></option>
              <option value="799">(Servidumbre) Tránsito</option>
              <option value="800">(Servidumbre) Aguas negras</option>
              <option value="801">(Servidumbre) Aire</option>
              <option value="802">(Servidumbre) Energía eléctrica</option>
              <option value="803">(Servidumbre) Gasoducto</option>
              <option value="804">(Servidumbre) Luz</option>
              <option value="805">(Servidumbre) Oleoducto</option>
              <option value="806">(Servidumbre) Agua</option>
              <option value="807">(Servidumbre) Minera</option>
              <option value="808">(Servidumbre) Legal de hidrocarburos</option>
              <option value="809">(Servidumbre) Medianería</option>
              <option value="810">(Servidumbre) Alcantarillado</option>
              <option value="811">(Servidumbre) Acueducto</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Fecha Inicio de Tenencia *:</label>
            <input
              name="inicio_tenencia"
              type="date"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.inicio_tenencia}
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full ml-4"></div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3">
            <label className="font-semibold">Fraccion Derecho *:</label>
            <input
              name="fraccion_derecho"
              type="text"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.fraccion_derecho}
            ></input>
          </div>
          <div className="flex flex-col w-2/3 ml-4">
            <label className="font-semibold">Descripcion*:</label>
            <input
              name="descripcion"
              type="text"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.descripcion}
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full mt-2">
          <button
            onClick={sendData}
            className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalDerechoForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [dataId, setDataId] = useState();
  const openModal = (aux) => {
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
      <DerechoForm contexto={true} dataid={dataId} onClose={closeModal} />
    </Modal>
  );
});
export const NormalDerechoForm = React.forwardRef((props, ref) => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <DerechoForm contexto={false} />
    </div>
  );
});
