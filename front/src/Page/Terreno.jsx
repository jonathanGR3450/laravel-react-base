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
const TerrenoForm = (props, ref) => {
  console.log(props);
  let tableData = [];
  let updateTableData = () => {};
  let contextTableData, contextUpdateTableData;
  let auxDataForm = {};
  let [loading, setLoading] = useState(false);
  if (props.contexto) {
    auxDataForm = {
      t_id: "",
      area_terreno: "",
      codigo_manzana: "",
      avaluo_terreno: "",
      ZHG: [],
      SantaMaria: "",
    };
    ({ tableData: contextTableData, updateTableData: contextUpdateTableData } =
      useContext(TableContext));
  } else {
    let terrenoData = props.data ? props.data[0].terreno : "";
    console.log("TerrenoData", terrenoData);
    auxDataForm = {
      t_id: terrenoData.t_id,
      area_terreno: terrenoData.area_terreno,
      codigo_manzana: terrenoData.manzana_vereda_codigo,
      avaluo_terreno: terrenoData.avaluo_terreno,
      ZHG: [],
      SantaMaria: "",
    };
  }

  let [terrenoData, setTerrenoData] = useState(auxDataForm);
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

  const sendData = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (terrenoData.SantaMaria == "") {
      terrenoData.SantaMaria = false;
    }
    console.log("Terreno Data", terrenoData);
    console.log("terreno Data", props);
    console.log("terreno Data");

    if (props.contexto) {
      tableData = contextTableData;
      updateTableData = contextUpdateTableData;
      let dataId = props.dataid;

      const entries = Object.entries(tableData);
      for (const [index, [key, item1]] of entries.entries()) {
        for (const items of dataId) {
          if (items - 1 === index) {
            console.log("Data Index", item1);
            let response = await createTerreno(item1);
            console.log(response);
            terrenoData.t_id = response.t_id;
            terrenoData.area_terreno = response.area_terreno;
            terrenoData.codigo_manzana = response.manzana_vereda_codigo;
            item1.terreno = terrenoData;
          }
        }
      }

      updateTableData(tableData);
      props.onClose();
    } else {
    }
    setLoading(false);
  };
  ////ENDPOINT
  async function createTerreno(data) {
    console.log("data 123 ", data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let url = import.meta.env.VITE_API_URL_FIRST + "terreno/local";
    let aux = data;
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
      relacion_superficie: null,
      nivel: "",
      comienzo_vida_util_version: null,
      fin_vida_util_version: null,
      espacio_de_nombres: "Fusagasuga",
      local_id: aux.codigo_homologado,
    };
    console.log("Nuevo Ojbeto", JSON.stringify(newobj));
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
        console.log("Dataaaaa", result);
        props.msj("Datos Terrenos Guardados Correctamente");
        return result.data;
      } else {
        props.msj("Error al guardar Datos Terreno");
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log("Error:", error);
      return error;
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
  const agregarZonas = (e) => {
    //  setEstForm(true);
    e.preventDefault();
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
      setEstBtt(false);
      setTerrenoData({
        ...terrenoData,
        ZHG: zonasData,
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
      <div className="w-full flex flex-col mt-4 justify-center items-center">
        <button
          onClick={sendData}
          className={`${
            estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
          } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          disabled={estBtt}
        >
          Guardar
        </button>
        {loading ? <Loader /> : null}
      </div>
    </div>
  );
};

export const ModalTerrenoForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [dataId, setDataId] = useState();

  const openModal = (aux) => {
    let newData = {
      area_terreno: "",
      codigo_manzana: "",
      avaluo_terreno: "",
      ZHG: [],
      SantaMaria: "",
    };
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
      <TerrenoForm
        contexto={true}
        dataid={dataId}
        onClose={closeModal}
        msj={props.msj}
      />
    </Modal>
  );
});
export const NormalTerrenoForm = React.forwardRef((props, ref) => {
  console.log("Props de Normal Derecho", props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
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
      <TerrenoForm contexto={false} data={props.data} />
    </Modal>
  );
});
