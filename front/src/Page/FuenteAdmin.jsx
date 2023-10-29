import { Modal } from "./Modal";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { DataContext } from "./Context/DataContext";
import { TableContext } from "./Context/Context";
const FuenteAdminForm = (props, ref) => {
  //const { updateDataAll } = useContext(DataContext);
  const { tableData, updateTableData } = useContext(TableContext);
  const [objFuente, setObjFuente] = useState({
    tipo_fuente: "",
    ente_emisor: "",
    numero_fuente: "",
    estado_disponibilidad: "",
    tipo_principal: "",
    fecha_documento_fuente: "",
  });
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
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const sendData = () => {
    console.log("entra", dataId);
    tableData.map((item, index) => {
      if (index >= dataId.first - 1 && index <= dataId.second - 1) {
        item.fuente_administrativa = objFuente;
        console.log(item);
      }
    });
    updateTableData(tableData);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  function Load_Data(e) {
    const { name, value } = e.target;
    console.log("nombre", name);
    console.log("Valor", value);
    setObjFuente((prevValues) => ({ ...prevValues, [name]: value }));
  }
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
        <h1 className="text-2xl">Fuente Administrativa</h1>
        <p>A continuación se muestran las caracteristicas del predio:</p>
        <div className="w-full pt-4 flex flex-col">
          <h2 className="text-xl">Datos Generales del Predio</h2>
          <div id="Clase" className="w-full flex flex-row">
            <div className="w-1/2 flex flex-col m-4">
              <h3 className="font-semibold">
                Tipo de Fuente Administrativa* :{" "}
              </h3>
              <select
                onChange={Load_Data}
                value={objFuente.tipo_fuente}
                name="tipo_fuente"
                className="border-2 p-2 rounded-md w-full"
              >
                <option></option>
                <option value={45}>Documento Publico</option>
                <option value={46}>Documento Privado </option>
                <option value={50}>Escritura Publica (Doc Publico)</option>
                <option value={51}>Sentencia Judicial (Doc Publico) </option>
                <option value={52}>Acto Administrativo (Doc Publico) </option>
                <option value={54}>Sin Documento</option>
              </select>
            </div>
            <div className="w-1/2 flex flex-col m-4">
              <h3 className="font-semibold">Ente Emisor* :</h3>
              <input
                onChange={Load_Data}
                value={objFuente.ente_emisor}
                name="ente_emisor"
                type="text"
                className="border-2 p-2 rounded-md w-full"
              ></input>
            </div>
          </div>
          <div id="NumFuente" className="w-full flex flex-row">
            <div className="w-1/2 flex flex-col m-4">
              <h3 className="font-semibold">Numero Fuente* : </h3>
              <input
                onChange={Load_Data}
                value={objFuente.numero_fuente}
                name="numero_fuente"
                type="text"
                className="border-2 p-2 rounded-md w-full"
                onInput={soloNumeros}
              ></input>
            </div>
            <div className="w-1/2 flex flex-col m-4">
              <h3 className="font-semibold">Estado Disponibilidad* :</h3>
              <select
                className="border-2 p-2 rounded-md w-full"
                name="estado_disponibilidad"
                onChange={Load_Data}
                value={objFuente.estado_disponibilidad}
              >
                <option></option>
                <option value={885}>Convertido</option>
                <option value={886}>Desconocido</option>
                <option value={887}>Disponible</option>
              </select>
            </div>
          </div>
          <div id="Tipo_Principal" className="w-full flex flex-row">
            <div className="w-1/2 flex flex-col m-4">
              <h3 className="font-semibold">Tipo Principal* : </h3>
              <select
                name="tipo_principal"
                type="text"
                className="border-2 p-2 rounded-md w-full"
                onChange={Load_Data}
                value={objFuente.tipo_principal}
              >
                <option></option>
                <option value={18}>Imagen</option>
                <option value={19}>Documento</option>
                <option value={20}>Mapa</option>
                <option value={21}>Video</option>
                <option value={22}>Otro</option>
              </select>
            </div>
            <div className="w-1/2 flex flex-col m-4">
              <h3 className="font-semibold">Fecha Documento Fuente* :</h3>
              <input
                name="fecha_documento_fuente"
                type="date"
                className="border-2 p-2 rounded-md w-full"
                onChange={Load_Data}
                value={objFuente.fecha_documento_fuente}
              ></input>
            </div>
          </div>
          <div id="Button" className="w-full flex flex-row">
            <button
              onClick={sendData}
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg m-4"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default forwardRef(FuenteAdminForm);
