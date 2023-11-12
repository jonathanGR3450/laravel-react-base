import { useEffect, useState } from "react";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
const AvaluoForm = () => {
  const [numpredial, setNumPredial] = useState();
  const [Loading, setLoading] = useState(false);
  const [estTable, setEstTable] = useState(false);
  const [estBtt, setEstBtt] = useState(true);
  const [estForm, setEstForm] = useState(false);
  const [estBttNum, setEstBttNum] = useState(true);
  const [estBttAvaluo, setEstBttAvaluo] = useState(true);

  const [estNumPredial, setEstNumPredial] = useState(true);
  const [areaTerreno, setAreaTerreno] = useState();

  const [numZonas, setNumZonas] = useState();
  const [zonas, setZonas] = useState([]);
  const [zonasData, setZonasData] = useState();

  const [dataTotal, setDataTotal] = useState({
    terreno: [],
    unidad: [],
  });
  const dataTablaCatastral = TablaCatastral.DataPredial;
  function handleNum(e) {
    let { value } = e.target;
    setNumPredial(value);
  }
  function validarArea() {
    console.log("area", zonasData);
    let sum = 0;
    if (zonasData != undefined) {
      zonasData.map((item, index) => {
        sum += parseInt(item.area);
      });
    }
    console.log("sum", areaTerreno);
    if (sum === areaTerreno) {
      setEstBttAvaluo(false);
    } else {
      setEstBttAvaluo(true);
    }
  }
  useEffect(() => {
    validarArea();
  }, [zonasData]);

  function load_tamaño(e) {
    let newValue = parseInt(e.target.value);
    setNumZonas(newValue);
    const newZonasData = Array.from({ length: newValue }, () => ({
      area: "",
      ZHG: "",
    }));
    setZonasData(newZonasData);
  }

  const agregarZonas = () => {
    setEstForm(true);
    const nuevasZonas = [];
    for (let i = 0; i < numZonas; i++) {
      nuevasZonas.push(
        <CreateZonaGeo key={i} index={i} onDataChange={actualizarDatosZona} />
      );
    }
    setZonas(nuevasZonas);
  };

  const actualizarDatosZona = (index, newData) => {
    setZonasData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };
  console.log("valor de Index externo", zonasData);
  const CreateZonaGeo = (index) => {
    const [dataZonaGeo, setDataZonaGeo] = useState({
      area: "",
      ZHG: "",
    });
    useEffect(() => {
      index.onDataChange(index.index, dataZonaGeo);
      //console.log("Datos Array ", zonasData);
    }, [dataZonaGeo]);

    function handleZona(e) {
      let { name, value } = e.target;
      console.log(
        "data " + index.index + " name: " + name + " value: " + value
      );
      setDataZonaGeo((prevValues) => ({
        ...prevValues,
        [name]: parseInt(value),
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
              type="number"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area"
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
  ///////////////////////////////////////////tabla
  const TableForm = () => {
    console.log("Datos Calculados", dataTotal);
    function generarFilasUnidad() {
      return dataTotal.unidad.map((item, index) => {
        console.log("valor unidad", item);
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.destino}</td>
            <td>{item.puntaje}</td>

            <td>{item.area}</td>
            <td>$ {item.total.toLocaleString()}</td>
            <td>$ {item.total23.toLocaleString()}</td>
          </tr>
        );
      });
    }
    function generarFilasTerreno() {
      return dataTotal.terreno.map((item, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.ZHG}</td>
            <td>{item.area}</td>
            <td>$ {item.total.toLocaleString()}</td>
            <td>$ {item.total23.toLocaleString()}</td>
          </tr>
        );
      });
    }
    function calcular() {
      let sum = 0;
      dataTotal.terreno.map((item, index) => {
        console.log("total,terreno", typeof item.total);
        sum += item.total23;
      });
      dataTotal.unidad.map((item, index) => {
        console.log("totalunidad", typeof item.total);
        sum += item.total23;
      });
      return sum.toLocaleString();
    }
    return (
      <div className="w-full">
        <div className="flex flex-col text-center">
          <label className="font-semibold text-2xl">
            Avaluo Terreno Parcial
          </label>
        </div>
        <table className="w-full mt-4 text-center">
          <thead className="uppercase border-2 w-full bg-teal-500 text-base text-white">
            <tr className="border-b-2 border-black">
              <th className="border-2  rounded-s-xl p-2">ID</th>
              <th className="border-2   p-2">Zona ZHG</th>
              <th className="border-2  p-2">Area</th>
              <th className="border-2  rounded-e-xl p-2">Avaluo 2022</th>
              <th className="border-2 rounded-e-xl p-2">Avaluo 2023</th>
            </tr>
          </thead>
          <tbody>{generarFilasTerreno()} </tbody>
        </table>
        <div className="flex flex-col text-center">
          <label className="font-semibold text-2xl">
            Avaluo Unidades Construccion Parcial
          </label>
        </div>
        <table className="w-full mt-4 text-center">
          <thead className="uppercase border-2 w-full bg-teal-500 text-base text-white">
            <tr className="border-b-2 border-black">
              <th className="border-2 rounded-s-xl p-2">ID</th>
              <th className="border-2  p-2">Destino</th>
              <th className="border-2  p-2">Puntaje</th>
              <th className="border-2  p-2">Area</th>
              <th className="border-2  p-2">Avaluo 2022</th>
              <th className="border-2 rounded-e-xl p-2">Avaluo 2023</th>
            </tr>
          </thead>
          <tbody> {generarFilasUnidad()}</tbody>
        </table>
        <div className="flex flex-row text-center w-full justify-center mt-4">
          <label className="font-semibold text-2xl">Total Avaluo 2023: </label>
          <label className="font-semibold text-2xl ml-4">$ {calcular()}</label>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <button className="p-2 w-1/4 text-center  rounded-md  border-2  text-white bg-teal-500 ">
            Guardar Avaluo
          </button>
        </div>
      </div>
    );
  };
  ////////////////////////////////////////Calcular
  function Load_Data() {
    setEstForm(false);
    setEstTable(true);
    setLoading(true);
    const dataZonaGeo = ZonaGeo.ZonasGeoceonomicas;

    const dataTablaVivienda = TablaVivienda.vivienda;
    const totalZona = Array.from({ length: zonasData.length });
    const totalUnidad = Array.from({
      length: dataTablaCatastral.calificacionconvencional.length,
    });

    ////Zona GeoEconomica///
    zonasData.map((data, index) => {
      dataZonaGeo.map((item, index1) => {
        if (data.ZHG == item.codigo) {
          let newObj = {
            area: data.area,
            ZHG: data.ZHG,
            total: data.area * item.valor,
            total23: data.area * item.valor + data.area * item.valor * 0.0431,
          };
          totalZona[index] = newObj;
        }
      });
    });
    //Zona Unidad//
    dataTablaCatastral.calificacionconvencional.map((data, index) => {
      dataTablaVivienda.map((item, index1) => {
        if (data.total_calificacion == parseInt(item.PUNTOS)) {
          let valor = parseFloat(item.VALOR);
          let newObj = {
            destino: dataTablaCatastral.tipo_unidad_construccion[0].dispname,
            puntaje: data.total_calificacion,
            area: data.area,
            total: data.area * valor,
            total23: data.area * valor + data.area * valor * 0.0431,
          };
          totalUnidad[index] = newObj;
        }
      });
    });
    setTimeout(() => {
      // This block will execute after 5 seconds
      setLoading(false);
      setDataTotal({ ...dataTotal, terreno: totalZona, unidad: totalUnidad });
    }, 5000);
  }

  function validateData() {
    let cont = 0;
    if (!numZonas || numZonas.length === 0) {
      cont++;
    }
    if (!numpredial || numpredial.trim() === "") {
      setEstBttNum(true);
      cont++;
    } else {
      setEstBttNum(false);
    }
    console.log("validando", cont);
    if (cont >= 1) {
      setEstBtt(true);
    } else {
      setEstBtt(false);
    }
  }
  function load_numPredial() {
    let num = dataTablaCatastral.area_terreno;
    setTimeout(() => {
      // This block will execute after 5 seconds

      setAreaTerreno(num);
      setEstNumPredial(false);
    }, 5000);
  }
  useEffect(() => {
    validateData();
  }, [numZonas, numpredial]);

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left">
      <h2 className="text-4xl">Avaluo de Predio</h2>
      <label> A continuacion se calculara el avaluo de los predios</label>
      <div className="w-full flex flex-row">
        <div className="w-full flex flex-col">
          <label className="font-semibold">Numero Predial</label>
          <input
            type="number"
            maxLength={30}
            onChange={handleNum}
            className="border-2 rounded-lg text-center "
            value={numpredial}
          ></input>
        </div>
        <button
          onClick={load_numPredial}
          disabled={estBttNum}
          className={`${
            estBttNum ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }
    p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 w-1/5 ml-4 h-12
   `}
        >
          Consultar{" "}
        </button>
      </div>
      {!estNumPredial ? (
        <div className="w-full flex flex-col">
          <label className="font-semibold">Datos Terreno</label>
          <div className="flex flex-row w-full mb-4">
            <div className="flex flex-col w-2/3 ">
              <label>¿ Cuantas Zonas GeoEconomicas tiene el Terreno ? </label>
              <input
                onChange={load_tamaño}
                type="number"
                className="border-2 rounded-lg text-center "
                value={numZonas}
              ></input>
            </div>
            <div className="flex flex-col w-2/3 ml-4">
              <button
                disabled={estBtt}
                onClick={agregarZonas}
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }
      p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 w-1/2 h-12
     `}
              >
                Cargar Zonas
              </button>
            </div>
          </div>
          {!estNumPredial ? (
            <div className="flex flex-row w-full mb-4">
              <label>Area Terreno: {areaTerreno} mt2 </label>
            </div>
          ) : null}

          {estForm ? zonas : null}
          <div className="flex flex-row w-full mt-4 justify-center">
            <button
              onClick={Load_Data}
              disabled={estBttAvaluo}
              className={`${
                estBttAvaluo ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }
    p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 w-1/2 h-12
   `}
            >
              Calcular Avaluo
            </button>
          </div>

          {Loading ? (
            <div className="flex flex-row w-full mt-4 justify-center">
              <Loader />
            </div>
          ) : null}
          {estTable ? <TableForm /> : null}
        </div>
      ) : null}
    </div>
  );
};
export default AvaluoForm;
