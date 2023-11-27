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
    console.log("evento", input);
    console.log("Entra", input.value);
    input.value = input.value.replace(/[^0-9.]/g, "");
  }
  //     item.Dpto +  item.Mpio +  item.Zona +  item.Sector +  item.Comuna +  item.Barrio +  item.Manzana

  const sendData = async () => {
    if (terrenoData.SantaMaria == "") {
      terrenoData.SantaMaria = false;
    }
    console.log("Terreno Data", terrenoData);
    let response = await createTerreno();
    terrenoData.area_terreno = parseFloat(
      terrenoData.area_terreno.replace(",", ".")
    );
    console.log("terreno Data", terrenoData);
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
  ////ENDPOINT
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
  //Datos de Zona
  const [numZonas, setNumZonas] = useState("");
  const [zonas, setZonas] = useState([]);
  const [zonasData, setZonasData] = useState();
  //Cargar Tamaño de Zonas
  function load_tamaño(e) {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      newValue = 0;
    }
    setNumZonas(newValue);
    const newZonasData = Array.from({ length: newValue }, () => ({
      area: "",
      ZHG: "",
    }));
    setZonasData(newZonasData);
  }
  const agregarZonas = () => {
    //  setEstForm(true);
    const nuevasZonas = [];
    for (let i = 0; i < numZonas; i++) {
      nuevasZonas.push(
        <CreateZonaGeo key={i} index={i} onDataChange={actualizarDatosZona} />
      );
    }
    setZonas(nuevasZonas);
  };
  function validarArea() {
    let sum = 0;
    let sumZHG = 0;
    if (zonasData != undefined) {
      zonasData.map((item, index) => {
        console.log("Sumatoria", sum);
        sum += parseFloat(item.area);
        if (isNaN(item.ZHG) || item.ZHG === "") {
          sumZHG++;
        }
      });
    }
    if (sum === parseFloat(terrenoData.area_terreno) && sumZHG === 0) {
      let manzana = "";
      if (typeof tableData !== "undefined") {
        let item = tableData[0];
        manzana =
          item.Dpto +
          item.Mpio +
          item.Zona +
          item.Sector +
          item.Comuna +
          item.Barrio +
          item.Manzana;
      }
      setEstBtt(false);
      setTerrenoData({
        ...terrenoData,
        ZHG: zonasData,
        codigo_manzana: manzana,
      });
    } else {
      setEstBtt(true);
    }
  }
  useEffect(() => {
    console.log("aasas", zonasData);
    validarArea();
  }, [zonasData]);

  const actualizarDatosZona = (index, newData) => {
    setZonasData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };
  const CreateZonaGeo = (index) => {
    const [dataZonaGeo, setDataZonaGeo] = useState({
      area: "",
      ZHG: "",
    });
    useEffect(() => {
      index.onDataChange(index.index, dataZonaGeo);
    }, [dataZonaGeo]);

    function handleZona(e) {
      let { name, value } = e.target;
      setDataZonaGeo((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    return (
      <div className="w-full flex flex-col border  justify-center items-center text-center rounded-xl">
        <label className="w-full font-semibold text-2xl bg-teal-500 text-white p-2 rounded-xl">
          Zona GeoEconomica #{index.index + 1}
        </label>
        <div className="w-full flex flex-row p-2">
          <div className="w-1/2 flex flex-col  ml-4">
            <label className="w-full font-semibold">Area (mt2) : </label>
            <input
              onChange={handleZona}
              type="text"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area"
              onInput={soloNumeros}
              value={dataZonaGeo.area}
            ></input>
          </div>
          <div className="w-1/2 flex flex-col ml-4">
            <label className="w-full  font-semibold">
              Zona GeoEconomica *:{" "}
            </label>
            <select
              onChange={handleZona}
              type="number"
              className="border-2 p-2 w-full rounded-lg text-center "
              name="ZHG"
              value={dataZonaGeo.ZHG}
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
        </div>
      </div>
    );
  };
  const Load_Data = (e) => {
    let { name, value } = e.target;
    if (name == "SantaMaria") {
      value = e.target.checked;
    }
    if (name == "area_terreno") {
      console.log("Carga", value);
      // value = parseFloat(value.replace(",", "."));
    }
    setTerrenoData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  console.log(terrenoData);
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 ">
        <h1 className="text-3xl ">Caracteristicas de Terreno</h1>
        <div className="w-full flex flex-row mt-4 mb-4">
          <label
            htmlFor="terreno-checkbox"
            className="flex items-center text-xl w-2/3"
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
          <div className="w-1/3 flex flex-col ml-4">
            <label>Area Total Terreno (mt2)</label>
            <input
              name="area_terreno"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={terrenoData.area_terreno}
              onInput={soloNumeros}
              onChange={Load_Data}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-full ml-4 flex flex-row items-center ">
            <label className="w-2/4">
              Cuantas Zonas Geoeconomicas tiene este Terreno
            </label>
            <input
              name="avaluo_terreno"
              type="number"
              className="border-2 p-1 rounded-md w-1/4"
              value={numZonas}
              onChange={load_tamaño}
            ></input>
            <button
              onClick={agregarZonas}
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg ml-4 mr-2"
            >
              Cargar Zonas
            </button>
          </div>
        </div>
        {zonas}
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

export default forwardRef(TerrenoForm);
