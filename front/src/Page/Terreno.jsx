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
    ZHG: "",
    SantaMaria: "",
  });
  const isAnyValueEmpty = () => {
    if (terrenoData.area_terreno !== "" && terrenoData.ZHG !== "") {
      setEstBtt(false);
    } else {
      setEstBtt(true);
    }
  };
  useEffect(() => {
    isAnyValueEmpty();
  }, [terrenoData]);

  const [estBtt, setEstBtt] = useState(true);
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
    let newData = {
      area_terreno: "",
      codigo_manzana: "",
      avaluo_terreno: "",
      ZHG: "",
      SantaMaria: "",
    };
    setTerrenoData(newData);
    aux.first = parseInt(aux.first);
    aux.second = parseInt(aux.second);
    setDataId(aux);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const sendData = () => {
    if (terrenoData.SantaMaria == "") {
      terrenoData.SantaMaria = false;
    }
    console.log(terrenoData);
    let response = createTerreno();
    console.log(response);
    if (response) {
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
        }
      });
      updateTableData(tableData);
    }
  };
  async function createTerreno() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let url = import.meta.env.VITE_API_URL_FIRST + "terreno/local";
    let aux = tableData[0];
    let newobj = {
      area_terreno: terrenoData.area_terreno,
      avaluo_terreno: terrenoData.avaluo_terreno,
      manzana_vereda_codigo:
        aux.Dpto +
        aux.Mpio +
        aux.Zona +
        aux.Sector +
        aux.Comuna +
        aux.Barrio +
        aux.Manzana,
      geometria: "POINT (10 20)",
      dimension: 685,
      etiqueta: "Terreno",
      relacion_superficie: 663,
      nivel: null,
      comienzo_vida_util_version: "2023-08-29 12:00:00",
      fin_vida_util_version: null,
      espacio_de_nombres: "Mi Espacio",
    };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newobj),
      redirect: "follow",
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        return "id", response;
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      return false;
      console.log("Error:", error);
    }
  }

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const Load_Data = (e) => {
    let { name, value } = e.target;
    if (name == "SantaMaria") {
      value = e.target.checked;
    }
    setTerrenoData((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("value", value);
  };
  console.log(terrenoData);
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 ">
        <h1 className="text-3xl ">Caracteristicas de Terreno</h1>
        <div className="w-full flex flex-row mt-4 mb-4">
          <label
            htmlFor="terreno-checkbox"
            className="flex items-center text-xl"
          >
            <input
              name="SantaMaria"
              onChange={Load_Data}
              type="checkbox"
              id="terreno-checkbox"
              className="mr-2"
            />
            El terreno pertenece a Santa Maria de los Angeles
          </label>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/3flex flex-col">
            <label>Area Terreno</label>
            <input
              name="area_terreno"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={terrenoData.area_terreno}
              onChange={Load_Data}
            ></input>
          </div>
          <div className="w-1/3 flex flex-col ml-4">
            <label>Zona GeoEconomica</label>
            <select
              name="ZHG"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={terrenoData.ZHG}
              onChange={Load_Data}
            >
              <option></option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
            </select>
          </div>
          <div className="w-1/3 ml-4 flex flex-col">
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
        <div className="w-full flex flex-row mt-4 justify-center items-center">
          <button
            onClick={sendData}
            className={`${
              estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
            } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
            disabled={estBtt}
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
