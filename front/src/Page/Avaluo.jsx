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

  const [dataResponse, setDataResponse] = useState({
    SantaMaria: false,
  });
  const [dataTotal, setDataTotal] = useState({
    terreno: [],
    unidad: [],
  });

  const [numZonas, setNumZonas] = useState();
  const [zonas, setZonas] = useState([]);
  const [zonasData, setZonasData] = useState();

  const [msjAvaluo, setMsjAvaluo] = useState("");

  const [dataNumPredial, setDataNumPredial] = useState("");

  function handleNum(e) {
    let { value } = e.target;
    setNumPredial(value);
  }
  function validarArea() {
    let sum = 0;
    let sumZHG = 0;
    if (zonasData != undefined) {
      zonasData.map((item, index) => {
        sum += parseInt(item.area);
        if (isNaN(item.ZHG) || item.ZHG === "") {
          sumZHG++;
        }
      });
    }
    if (sum === areaTerreno && sumZHG === 0) {
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
        [name]: parseInt(value),
      }));
    }
    //parseFloat(cadenaConComa.replace(',', '.'))
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
    function generarFilasUnidad() {
      return dataTotal.unidad.map((item, index) => {
        return (
          <tr key={index}>
            <td className="border-2">{index + 1}</td>
            <td className="border-2">{item.destinacion}</td>
            <td className="border-2">{item.puntaje}</td>
            <td className="border-2">{item.area}</td>
            <td className="border-2">$ {item.total.toLocaleString()}</td>
          </tr>
        );
      });
    }
    function generarFilasTerreno() {
      return dataTotal.terreno.map((item, index) => {
        return (
          <tr>
            <td className="border-2">{index + 1}</td>
            <td className="border-2">{item.zhg}</td>
            <td className="border-2">{item.area}</td>
            <td className="border-2">$ {item.total.toLocaleString()}</td>
          </tr>
        );
      });
    }
    let sumTerreno = 0;
    let sumUnidad = 0;
    let sum = 0;
    function calcular() {
      dataTotal.terreno.map((item, index) => {
        sum += item.total;
        sumTerreno += item.total;
      });
      dataTotal.unidad.map((item, index) => {
        sum += item.total;
        sumUnidad += item.total;
      });
    }
    calcular();
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
              <th className="border-2 rounded-e-xl p-2">Avaluo 2023</th>
            </tr>
          </thead>
          <tbody>
            {generarFilasTerreno()}
            <tr>
              <td></td>
              <td></td>
              <td className="font-semibold bg-teal-500 rounded-s-lg text-white ">
                Total Terreno:{" "}
              </td>
              <td className="text-right pr-4 border-2 border-black bg-gray-300">
                $ {sumTerreno.toLocaleString()}
              </td>
            </tr>
          </tbody>
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
              <th className="border-2  p-2">Uso Unidad</th>
              <th className="border-2  p-2">Puntaje</th>
              <th className="border-2  p-2">Area</th>
              <th className="border-2 rounded-e-xl p-2">Avaluo 2023</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {generarFilasUnidad()}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="font-semibold bg-teal-500 rounded-s-lg text-white ">
                Total Unidad:{" "}
              </td>
              <td className="text-right pr-4 border-2 border-black  bg-gray-300">
                $ {sumUnidad.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-row text-center w-full justify-center mt-4">
          <label className="font-semibold text-2xl">Total Avaluo 2023: </label>
          <label className="font-semibold text-2xl ml-4">
            $ {sum.toLocaleString()}
          </label>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <button className="p-2 w-1/4 text-center  rounded-md  border-2  text-white bg-teal-500 ">
            Guardar Avaluo
          </button>
        </div>
      </div>
    );
  };

  ////////////////////////////////////////CalcularAvaluo
  ///252900002000000040803800000881
  async function Load_Data() {
    setLoading(true);
    setEstTable(false);
    setEstForm(false);
    setMsjAvaluo("Calculando");
    //Calcular Segun tablas
    console.log("Entraaaaaaaaaaaaaaaaaaaa");
    //Desglozar Numero Predial del response
    let ArrayPredial = numpredial.split("");
    let zona = "";
    //Extraer Zona
    await ArrayPredial.map((item, index) => {
      if (index >= 5 && index <= 6) {
        zona += item;
      }
      ///Ph Condominio si es 8-9 true sino false
    });
    //Arreglo de Terreno
    let arrayResponse = [];
    //Arreglo de Unidades
    let uni = [];

    async function calcularAvaluo() {
      let año = 2023;
      //Calcular Valores de Terreno
      try {
        let boolterreno = await TerrenoCalculate();
        async function TerrenoCalculate() {
          setMsjAvaluo("Calculando Terreno");
          let aux = "";
          let requestOptions = {
            method: "GET",
            redirect: "follow",
          };

          for (const item of zonasData) {
            if (item.ZHG <= 9 && item.ZHG.toLocaleString().length < 2) {
              console.log("Resul", item.ZHG);
              item.ZHG = "0" + item.ZHG;
            }
            let newobj = {
              area: item.area,
              zhg: item.ZHG,
              total: "",
            };
            let url = "";
            if (zona == "00") {
              url =
                import.meta.env.VITE_API_URL_FIRST +
                "avaluo-catastral/rural/valor-terreno?zona_economica=" +
                newobj.zhg +
                "&vigencia=" +
                año;
            } else {
              if (zona == "01") {
                url =
                  import.meta.env.VITE_API_URL_FIRST +
                  "avaluo-catastral/urbano/valor-terreno?zhg_no=" +
                  item.ZHG +
                  "&vigencia=2022";
              }
            }

            try {
              const response = await fetch(url, requestOptions);
              if (response.ok) {
                const result = await response.json();
                if (zona == "00") {
                  newobj.total =
                    parseFloat(newobj.area) *
                    parseFloat(result.data[0].valor_m2);
                } else {
                  if (zona == "01") {
                    newobj.total =
                      parseFloat(newobj.area) *
                      parseFloat(result.data[0].valor);
                  }
                }

                arrayResponse.push(newobj);
                aux = true;
              } else {
                aux = false;
                throw new Error("Error en la solicitud");
              }
            } catch (error) {
              aux = false;
              console.log("Error:", error);
            }
            //setDataTotal({ ...dataTotal, terreno: arrayResponse });
          }
          return aux;
        }
        console.log("Datos de Result", dataNumPredial);

        if (boolterreno) {
          console.log("Sigue Adelante");
          setMsjAvaluo("Calculando Unidades");
          let dataCorrect = [];
          ///Tablas Rurales
          if (zona == "00") {
            console.log("Datos Rurales");
            ///Preguntar Unidades de Construccion
            for (const item of dataNumPredial.unidad_construccion) {
              let destinacion =
                item.lc_caracteristicasunidadconstruccion.tipo_construccion.id;
              let tipo_unidad =
                item.lc_caracteristicasunidadconstruccion
                  .tipo_unidad_construccion.id;
              let uso = item.lc_caracteristicasunidadconstruccion.uso.id;
              if (destinacion === 66) {
                switch (tipo_unidad) {
                  //Residencial
                  case 539:
                    //Usar Endpoint Residencial o Vivienda
                    async function ResidenciaCalculate() {
                      let aux = "";
                      let puntos =
                        item.lc_caracteristicasunidadconstruccion
                          .calificacionconvencional.total_calificacion;
                      var requestOptions = {
                        method: "GET",
                        redirect: "follow",
                      };
                      let url =
                        import.meta.env.VITE_API_URL_FIRST +
                        "avaluo-catastral/tipo/tab-viv?puntos=" +
                        puntos +
                        "&vigencia=" +
                        año +
                        "&tipo=RURAL";

                      try {
                        const response = await fetch(url, requestOptions);
                        if (response.ok) {
                          aux = true;
                          const result = await response.json();
                          let newobj = {
                            destinacion:
                              item.lc_caracteristicasunidadconstruccion.uso
                                .dispname,
                            puntaje: parseFloat(result.data[0].puntos),
                            area: parseFloat(item.area_construida),
                            total: "",
                          };
                          newobj.total =
                            newobj.area * parseFloat(result.data[0].valor);

                          //newobj.area * puntaje total2023 - total2023 * 0.0431
                          uni.push(newobj);
                          console.log("resultado Residencia", result);
                        } else {
                          aux = false;
                          throw new Error("Error en la solicitud");
                        }
                      } catch (error) {
                        aux = false;
                        console.log("Error:", error);
                      }
                      return aux;
                    }
                    let est = await ResidenciaCalculate();
                    dataCorrect.push(est);
                    if (!est) {
                      console.log("Error en Residencial Rural");
                    }
                    break;
                  //Comercial
                  case 540:
                    async function ComercialCalculate() {
                      let aux = "";
                      let puntos =
                        item.lc_caracteristicasunidadconstruccion
                          .calificacionconvencional.total_calificacion;

                      var requestOptions = {
                        method: "GET",
                        redirect: "follow",
                      };
                      let url = "";
                      if (uso >= 235 && uso <= 236) {
                        //Bodega
                        url =
                          import.meta.env.VITE_API_URL_FIRST +
                          "avaluo-catastral/tipo/tab-bod?puntos=" +
                          puntos +
                          "&vigencia=" +
                          año +
                          "&tipo=RURAL";
                      } else {
                        if (uso >= 244 && uso <= 245) {
                          //Hotel
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-hot?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=RURAL";
                        } else {
                          //Comercial
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-com?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=RURAL";
                        }
                      }

                      try {
                        const response = await fetch(url, requestOptions);
                        if (response.ok) {
                          const result = await response.json();
                          aux = true;
                          let newobj = {
                            destinacion:
                              item.lc_caracteristicasunidadconstruccion.uso
                                .dispname,
                            puntaje: parseFloat(result.data[0].puntos),
                            area: parseFloat(item.area_construida),
                            total: "",
                          };
                          newobj.total =
                            newobj.area * parseFloat(result.data[0].valor);

                          //newobj.area * puntaje total2023 - total2023 * 0.0431
                          uni.push(newobj);
                          console.log("resultado Comercial", result);
                        } else {
                          aux = false;
                          throw new Error("Error en la solicitud");
                        }
                      } catch (error) {
                        aux = false;
                        console.log("Error:", error);
                      }
                      return aux;
                    }
                    let estc = await ComercialCalculate();
                    dataCorrect.push(estc);
                    if (!estc) {
                      console.log("Error en Comercial General Rural");
                    }
                    break;
                  //Industrial
                  case 541:
                    let esti = await IndustrialCalculate();
                    async function IndustrialCalculate() {
                      let aux = "";
                      let puntos =
                        item.lc_caracteristicasunidadconstruccion
                          .calificacionconvencional.total_calificacion;
                      var requestOptions = {
                        method: "GET",
                        redirect: "follow",
                      };
                      let url = "";
                      if (uso >= 259 && uso <= 260) {
                        url =
                          import.meta.env.VITE_API_URL_FIRST +
                          "avaluo-catastral/tipo/tab-bod?puntos=" +
                          puntos +
                          "&vigencia=" +
                          año +
                          "&tipo=RURAL";
                      }
                      try {
                        const response = await fetch(url, requestOptions);
                        if (response.ok) {
                          aux = true;
                          const result = await response.json();
                          let newobj = {
                            destinacion:
                              item.lc_caracteristicasunidadconstruccion.uso
                                .dispname,
                            puntaje: parseFloat(result.data[0].puntos),
                            area: parseFloat(item.area_construida),
                            total: "",
                          };
                          newobj.total =
                            newobj.area * parseFloat(result.data[0].valor);

                          //newobj.area * puntaje total2023 - total2023 * 0.0431
                          ArrayUnidad.push(newobj);
                        } else {
                          aux = false;
                          throw new Error("Error en la solicitud");
                        }
                      } catch (error) {
                        aux = false;
                        console.log("Error:", error);
                      }
                      return aux;
                    }
                    dataCorrect.push(esti);
                    if (!esti) {
                      console.log("Error en Industrial Rural");
                    }
                    break;
                  default:
                    console.log("Valor no Calculable");
                    break;
                }
              } else {
                ///Preguntar si es No Condicional == Anexo
                if (
                  item.lc_caracteristicasunidadconstruccion.tipo_construccion
                    .id === 67
                ) {
                  let est = await asignarDestino(item);

                  async function asignarDestino(item) {
                    console.log("iteeeeee", item);
                    let aux =
                      item.lc_caracteristicasunidadconstruccion
                        .calificacionnoconvencional.tipo_anexo;
                    console.log("tipo anexo", aux);

                    let destino = await obtenerDestino(aux);

                    if (destino != null) {
                      console.log("Destino", destino);
                      let puntos =
                        item.lc_caracteristicasunidadconstruccion
                          .calificacionnoconvencional.puntaje;
                      console.log("Puntos ANexos", puntos);
                      let resultado = await AnexoCalculate(
                        destino,
                        puntos,
                        item
                      );
                      return resultado;
                    }
                  }
                  async function obtenerDestino(aux) {
                    console.log("auxsss", aux);
                    let prueba = "";
                    const rangos = [
                      { inicio: 452, fin: 455, valor: 2 },
                      { inicio: 456, fin: 459, valor: 3 },
                      { inicio: 460, fin: 463, valor: 4 },
                      { inicio: 464, fin: 467, valor: 5 },
                      { inicio: 468, fin: 469, valor: 8 },
                      { inicio: 470, fin: 473, valor: 9 },
                      { inicio: 474, fin: 477, valor: 10 },
                      { inicio: 478, fin: 480, valor: 11 },
                      { inicio: 481, fin: 483, valor: 18 },
                      { inicio: 484, fin: 487, valor: 21 },
                      { inicio: 488, fin: 490, valor: 23 },
                      { inicio: 491, fin: 494, valor: 26 },
                      { inicio: 495, fin: 497, valor: 20 },
                      { inicio: 502, fin: 503, valor: 60 },
                      { inicio: 504, fin: 507, valor: 62 },
                      { inicio: 508, fin: 511, valor: 82 },
                      { inicio: 521, fin: 524, valor: 99 },
                    ];
                    for (let i = 0; i < rangos.length; i++) {
                      if (aux >= rangos[i].inicio && aux <= rangos[i].fin) {
                        prueba = rangos[i].valor;
                      }
                    }
                    console.log("Prueba", prueba);
                    return prueba;
                  }
                  //Usar Tabla Anexo
                  async function AnexoCalculate(destino, puntos, item) {
                    let aux = "";
                    var requestOptions = {
                      method: "GET",
                      redirect: "follow",
                    };
                    let url =
                      import.meta.env.VITE_API_URL_FIRST +
                      "avaluo-catastral/tipo/tab-anexos?puntos=" +
                      puntos +
                      "&vigencia=" +
                      año +
                      "&tipo=RURAL&destino=" +
                      destino;

                    try {
                      const response = await fetch(url, requestOptions);
                      if (response.ok) {
                        aux = true;
                        const result = await response.json();
                        console.log("resuto", result);
                        let newobj = {
                          destinacion:
                            item.lc_caracteristicasunidadconstruccion.uso
                              .dispname,
                          puntaje: result.data[0].puntos,
                          area: parseFloat(item.area_construida),
                          total: "",
                        };
                        newobj.total =
                          newobj.area * parseFloat(result.data[0].valor);
                        uni.push(newobj);
                        console.log("resultado Anexo", result);
                      } else {
                        aux = false;
                        throw new Error("Error en la solicitud");
                      }
                    } catch (error) {
                      aux = true;
                      console.log("Error:", error);
                    }
                    return aux;
                  }

                  console.log("Resultaddddooo", est);
                  dataCorrect.push(est);
                  if (!est) {
                    console.log("Error en Anexos Rurales");
                  }
                }
              }
            }
            function validar() {
              let cont = 0;
              for (const item of dataCorrect) {
                if (item) {
                  cont++;
                }
              }
              if (cont == dataCorrect.length) {
                return true;
              } else {
                return false;
              }
            }
            let est = validar();
            return est;
          } else {
            ///Tablas Urbanas
            console.log("Datos Urbano");
            if (zona == "01") {
              if (dataResponse.SantaMaria) {
                //Usar Tabla de Santa Maria cada Unidad de Construccion
                console.log("Tbla SantaMaria", item);
                console.log(true);
              } else {
                ///Preguntar Unidades de Construccion
                console.log("No Santamaria");
                for (const item of dataNumPredial.unidad_construccion) {
                  let destinacion =
                    item.lc_caracteristicasunidadconstruccion.tipo_construccion
                      .id;
                  let tipo_unidad =
                    item.lc_caracteristicasunidadconstruccion
                      .tipo_unidad_construccion.id;
                  let uso = item.lc_caracteristicasunidadconstruccion.uso.id;
                  if (destinacion === 66) {
                    switch (tipo_unidad) {
                      //Residencial
                      case 539:
                        //Usar Endpoint Residencial o Vivienda
                        async function ResidenciaCalculate() {
                          let aux = "";
                          let puntos =
                            item.lc_caracteristicasunidadconstruccion
                              .calificacionconvencional.total_calificacion;
                          var requestOptions = {
                            method: "GET",
                            redirect: "follow",
                          };
                          let url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-viv?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=URBANA";

                          try {
                            const response = await fetch(url, requestOptions);
                            if (response.ok) {
                              aux = true;
                              const result = await response.json();
                              let newobj = {
                                destinacion:
                                  item.lc_caracteristicasunidadconstruccion.uso
                                    .dispname,
                                puntaje: parseFloat(result.data[0].puntos),
                                area: parseFloat(item.area_construida),
                                total: "",
                              };
                              newobj.total =
                                newobj.area * parseFloat(result.data[0].valor);

                              //newobj.area * puntaje total2023 - total2023 * 0.0431
                              uni.push(newobj);
                              console.log("resultado Residencia", result);
                            } else {
                              aux = false;
                              throw new Error("Error en la solicitud");
                            }
                          } catch (error) {
                            aux = false;
                            console.log("Error:", error);
                          }
                          return aux;
                        }
                        let est = await ResidenciaCalculate();
                        dataCorrect.push(est);
                        if (!est) {
                          console.log("Error en Residencial Rural");
                        }
                        break;
                      //Comercial
                      case 540:
                        async function ComercialCalculate() {
                          let aux = "";
                          let puntos =
                            item.lc_caracteristicasunidadconstruccion
                              .calificacionconvencional.total_calificacion;

                          var requestOptions = {
                            method: "GET",
                            redirect: "follow",
                          };
                          let url = "";
                          if (uso >= 235 && uso <= 236) {
                            //Bodega
                            url =
                              import.meta.env.VITE_API_URL_FIRST +
                              "avaluo-catastral/tipo/tab-bod?puntos=" +
                              puntos +
                              "&vigencia=" +
                              año +
                              "&tipo=URBANA";
                          } else {
                            if (uso >= 244 && uso <= 245) {
                              //Hotel
                              url =
                                import.meta.env.VITE_API_URL_FIRST +
                                "avaluo-catastral/tipo/tab-hot?puntos=" +
                                puntos +
                                "&vigencia=" +
                                año +
                                "&tipo=RURAL";
                            } else {
                              //Comercial
                              url =
                                import.meta.env.VITE_API_URL_FIRST +
                                "avaluo-catastral/tipo/tab-com?puntos=" +
                                puntos +
                                "&vigencia=" +
                                año +
                                "&tipo=RURAL";
                            }
                          }

                          try {
                            const response = await fetch(url, requestOptions);
                            if (response.ok) {
                              const result = await response.json();
                              aux = true;
                              let newobj = {
                                destinacion:
                                  item.lc_caracteristicasunidadconstruccion.uso
                                    .dispname,
                                puntaje: parseFloat(result.data[0].puntos),
                                area: parseFloat(item.area_construida),
                                total: "",
                              };
                              newobj.total =
                                newobj.area * parseFloat(result.data[0].valor);

                              //newobj.area * puntaje total2023 - total2023 * 0.0431
                              uni.push(newobj);
                              console.log("resultado Comercial", result);
                            } else {
                              aux = false;
                              throw new Error("Error en la solicitud");
                            }
                          } catch (error) {
                            aux = false;
                            console.log("Error:", error);
                          }
                          return aux;
                        }
                        let estc = await ComercialCalculate();
                        dataCorrect.push(estc);
                        if (!estc) {
                          console.log("Error en Comercial General Rural");
                        }
                        break;
                      //Industrial
                      case 541:
                        let esti = await IndustrialCalculate();
                        async function IndustrialCalculate() {
                          let aux = "";
                          let puntos =
                            item.lc_caracteristicasunidadconstruccion
                              .calificacionconvencional.total_calificacion;
                          var requestOptions = {
                            method: "GET",
                            redirect: "follow",
                          };
                          let url = "";
                          if (uso >= 259 && uso <= 260) {
                            url =
                              import.meta.env.VITE_API_URL_FIRST +
                              "avaluo-catastral/tipo/tab-bod?puntos=" +
                              puntos +
                              "&vigencia=" +
                              año +
                              "&tipo=URBANA";
                          }
                          try {
                            const response = await fetch(url, requestOptions);
                            if (response.ok) {
                              aux = true;
                              const result = await response.json();
                              let newobj = {
                                destinacion:
                                  item.lc_caracteristicasunidadconstruccion.uso
                                    .dispname,
                                puntaje: parseFloat(result.data[0].puntos),
                                area: parseFloat(item.area_construida),
                                total: "",
                              };
                              newobj.total =
                                newobj.area * parseFloat(result.data[0].valor);

                              //newobj.area * puntaje total2023 - total2023 * 0.0431
                              ArrayUnidad.push(newobj);
                            } else {
                              aux = false;
                              throw new Error("Error en la solicitud");
                            }
                          } catch (error) {
                            aux = false;
                            console.log("Error:", error);
                          }
                          return aux;
                        }
                        dataCorrect.push(esti);
                        if (!esti) {
                          console.log("Error en Industrial Rural");
                        }
                        break;
                      default:
                        console.log("Valor no Calculable");
                        break;
                    }
                  } else {
                    ///Preguntar si es No Condicional == Anexo
                    if (
                      item.lc_caracteristicasunidadconstruccion
                        .tipo_construccion.id === 67
                    ) {
                      let est = await asignarDestino(item);
                      console.log("Resultaddddooo", est);

                      async function asignarDestino(item) {
                        console.log("iteeeeee", item);
                        let aux =
                          item.lc_caracteristicasunidadconstruccion
                            .calificacionnoconvencional.total_calificacion;
                        if (aux == null) {
                          aux = 0;
                        }
                        console.log("Puntaje Anexo", aux);
                        let destino = await obtenerDestino(aux);

                        if (destino != null) {
                          console.log("Destino", destino);
                          let puntos =
                            item.lc_caracteristicasunidadconstruccion
                              .calificacionnoconvencional.total_calificacion;
                          if (puntos == null) puntos = 0;
                          console.log("Puntos Urbano", puntos);
                          let resultado = await AnexoCalculate(
                            destino,
                            puntos,
                            item
                          );
                          return resultado;
                        }
                      }

                      async function obtenerDestino(aux) {
                        console.log("auxsss", aux);
                        let prueba = "";
                        const rangos = [
                          { inicio: 452, fin: 455, valor: 2 },
                          { inicio: 456, fin: 459, valor: 3 },
                          { inicio: 460, fin: 463, valor: 4 },
                          { inicio: 464, fin: 467, valor: 5 },
                          { inicio: 468, fin: 469, valor: 8 },
                          { inicio: 470, fin: 473, valor: 9 },
                          { inicio: 474, fin: 477, valor: 10 },
                          { inicio: 478, fin: 480, valor: 11 },
                          { inicio: 481, fin: 483, valor: 18 },
                          { inicio: 484, fin: 487, valor: 21 },
                          { inicio: 488, fin: 490, valor: 23 },
                          { inicio: 491, fin: 494, valor: 26 },
                          { inicio: 495, fin: 497, valor: 20 },
                          { inicio: 502, fin: 503, valor: 60 },
                          { inicio: 504, fin: 507, valor: 62 },
                          { inicio: 508, fin: 511, valor: 82 },
                          { inicio: 521, fin: 524, valor: 99 },
                        ];
                        for (let i = 0; i < rangos.length; i++) {
                          if (aux >= rangos[i].inicio && aux <= rangos[i].fin) {
                            prueba = rangos[i].valor;
                          }
                        }
                        if (prueba == "") {
                          prueba = 0;
                        }
                        console.log("Prueba", prueba);
                        return prueba;
                      }

                      //Usar Tabla Anexo
                      async function AnexoCalculate(destino, puntos, item) {
                        let aux = "";
                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        let url =
                          import.meta.env.VITE_API_URL_FIRST +
                          "avaluo-catastral/tipo/tab-anexos?puntos=" +
                          puntos +
                          "&vigencia=" +
                          año +
                          "&tipo=URBANA&destino=" +
                          destino;

                        try {
                          const response = await fetch(url, requestOptions);
                          if (response.ok) {
                            aux = true;
                            const result = await response.json();
                            console.log("resuto", result);
                            let newobj = {
                              destinacion:
                                item.lc_caracteristicasunidadconstruccion.uso
                                  .dispname,
                              puntaje: result.data[0].puntos,
                              area: parseFloat(item.area_construida),
                              total: "",
                            };
                            newobj.total =
                              newobj.area * parseFloat(result.data[0].valor);
                            uni.push(newobj);
                            console.log("resultado Anexo", result);
                          } else {
                            aux = false;
                            throw new Error("Error en la solicitud");
                          }
                        } catch (error) {
                          aux = true;
                          console.log("Error:", error);
                        }
                        return aux;
                      }

                      dataCorrect.push(est);
                      if (!est) {
                        console.log("Error en Anexos Rurales");
                      }
                    }
                  }
                }

                function validar() {
                  let cont = 0;
                  for (const item of dataCorrect) {
                    if (item) {
                      cont++;
                    }
                  }
                  if (cont == dataCorrect.length) {
                    return true;
                  } else {
                    return false;
                  }
                }
                let est = validar();
                return est;
              }
            }
          }
        } else {
          console.log("error en boolean");
        }
      } catch (error) {
        console.log("Error : ".error);
      }
    }
    ///////////////////Calcular Avaluo
    let terminar = await calcularAvaluo();

    if (terminar) {
      setLoading(false);
      setEstBttAvaluo(true);
      setEstTable(true);
      setDataTotal({ ...dataTotal, unidad: uni, terreno: arrayResponse });
    } else {
    }
    console.log("Motivo para Guardar");
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
    if (cont >= 1) {
      setEstBtt(true);
    } else {
      setEstBtt(false);
    }
  }

  async function load_numPredial() {
    setEstNumPredial(true);
    setEstTable(false);
    setEstForm(false);
    setZonas("");
    setNumZonas("");
    setEstBttAvaluo(true);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let url =
      import.meta.env.VITE_API_URL_FIRST +
      "predio/numero-predial?numero_predial=" +
      numpredial;

    //Buscar Numero Predial
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      setDataNumPredial(result.data);
      let num = result.data.area_terreno;

      if (num == null) {
        num = 0;
      }
      console.log("Valor Numero", num);
      //252900100000000020901900000064
      setAreaTerreno(parseFloat(num));
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
    setEstNumPredial(false);
    //Capturar valor de Area Terreno
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
              <label className="font-semibold">
                Area Terreno: {areaTerreno} mt2{" "}
              </label>
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
            <div className="flex flex-row w-full mt-4 items-center justify-center">
              <Loader />
              <label className="text-2xl ml-4 text-black font-bold transform inline-block animate-pulse">
                {msjAvaluo}
              </label>
            </div>
          ) : null}
          {estTable ? <TableForm /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default AvaluoForm;
