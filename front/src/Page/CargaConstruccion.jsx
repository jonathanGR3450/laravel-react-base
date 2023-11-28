import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useContext, useEffect } from "react";
import { TableContext } from "./Context/Context";
import { DataContext } from "./Context/DataContext";
import { LoadDataForm } from "./CargaDatos";
import UniConstruccionForm from "./Uniconstruccion";
import TerrenoForm from "./Terreno";
import ConstruccionForm from "./Construccion";
import {
  TerrenoResumeForm,
  UnidadConstruccionResumeForm,
  ConstruccionResumeForm,
} from "./ResumeData";
export const LoadDataConstruccion = () => {
  const uniConstruccionRef = useRef();
  const terrenoRef = useRef();
  const construccionRef = useRef();

  const { tableData } = useContext(TableContext);
  const [dataSelect, setDataSelect] = useState(0);
  const [dataTotal, setDataTotal] = useState("");
  const [estDataTotal, setEstDataTotal] = useState(false);

  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.]/g, "");
  }

  const TableForm = () => {
    const terrenoResumeForm = useRef();
    const unidadConstruccionResumeForm = useRef();
    const construccionResumeForm = useRef();
    //Aperturas
    const openterrenoResumeForm = () => {
      terrenoResumeForm.current.openModal();
    };
    const openunidadconstruccionResumeForm = () => {
      unidadConstruccionResumeForm.current.openModal();
    };
    const openconstruccionResumeForm = () => {
      construccionResumeForm.current.openModal();
    };

    const filas = Object.entries(tableData).map((items, index) => {
      let item = items[1];
      // console.log("Prueba", item);
      // onClick={openpredioResumeForm}  <PredioResumeForm ref={predioResumeForm} datos={item} />
      return (
        <tr key={index}>
          <td className="border-2 rounded-xl p-2">{index + 1}</td>
          <td className="border-2 rounded-xl p-2">
            {item.Dpto}-{item.Mpio}-{item.Zona}-{item.Sector}-{item.Comuna}-
            {item.Barrio}-{item.Manzana}-{item.Terreno}-{item.Condicion}-
            {item.Edificio}-{item.Piso}-{item.Unidad}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("terreno") ? (
              <div>
                <button onClick={openterrenoResumeForm}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <TerrenoResumeForm ref={terrenoResumeForm} datos={item} />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("construccion") ? (
              <div>
                <button onClick={openconstruccionResumeForm}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <ConstruccionResumeForm
                  ref={construccionResumeForm}
                  datos={item}
                />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("unidad_construccion") ? (
              <div>
                <button onClick={openunidadconstruccionResumeForm}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <UnidadConstruccionResumeForm
                  ref={unidadConstruccionResumeForm}
                  datos={item}
                />
              </div>
            ) : null}
          </td>
        </tr>
      );
    });

    return (
      <div className="w-full">
        <table className="w-full text-center">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl p-2">ID</th>
              <th className="border-2 rounded-xl p-2">Número Predial</th>
              <th className="border-2 rounded-xl p-2">Terreno</th>
              <th className="border-2 rounded-xl p-2">Construccion</th>
              <th className="border-2 rounded-xl p-2">Unidad Construccion</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </div>
    );
  };

  const ChangeData = () => {
    let validNumbers = [];
    const { updateIdArray } = useContext(DataContext);
    const [dataId, setDataId] = useState("");
    const [inputId, setInputId] = useState("");
    const [estBtt, setEstBtt] = useState(true);
    let [coma, setComa] = useState("");
    function validarid() {
      if (isNaN(dataId[0])) {
        setEstBtt(true);
      } else {
        setEstBtt(false);
      }
    }
    useEffect(() => {
      validarid();
    }, [dataId]);

    function NumComa(e) {
      let { value } = e.target;
      value = value.replace(/[^0-9,-]/g, "");
      // Elimina caracteres no numéricos
      if (value.includes("-")) {
        setComa(1);
        if (value.split("-").length <= 2) {
          //setTamaño(3);
          let aux = value.split("-");
          let numeros = aux.map((item) => {
            return parseInt(item);
          });
          validNumbers = numeros;
          setDataId(validNumbers);
        }
      } else {
        let aux = "";
        if (value.length === 0) {
          aux = 0;
        } else {
          aux = value.split(",");
        }
        if (value.includes(",")) {
          setComa(2);
          let numeros = aux.map((item) => {
            return parseInt(item);
          });

          validNumbers = numeros;
          setDataId(validNumbers);
        } else {
          setComa(3);
          validNumbers = [parseInt(value)];
          setDataId(validNumbers);
        }
      }
      setInputId(value);
    }
    function Selectdata(e) {
      setDataSelect(e.target.value);
    }

    const openUniConstruccionForm = () => {
      uniConstruccionRef.current.openModal(dataId);
    };
    const openTerrenoForm = () => {
      terrenoRef.current.openModal(dataId);
    };
    const openConstruccionForm = () => {
      construccionRef.current.openModal(dataId);
    };
    return (
      <div className="w-full flex flex-row border-2 p-2 mt-4 mb-4 rounded-xl">
        <div className="w-1/3 flex flex-col text-center ">
          <div className="w-full">
            <label className="font-semibold">Datos para Agregar</label>
          </div>
          <div className="w-full flex flex-col ">
            <select
              className="border-2 rounded-lg text-center m-1"
              onChange={Selectdata}
              value={dataSelect}
            >
              <option value={0}></option>
              <option value={1}>Terreno</option>
              <option value={2}>Construccion</option>
              <option value={3}>Unidad de Construccion</option>
            </select>
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <label className="font-semibold">SELECCIONAR ID</label>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              className="border-2 rounded-lg w-full p-1"
              onChange={NumComa}
              value={inputId}
            ></input>
          </div>
        </div>
        <div className="w-1/3 flex flex-col text-center">
          <label className="font-semibold">CARGA FORMULARIO</label>
          {dataSelect == 1 ? (
            <div className="w-full flex flex-col items-center">
              <button
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openTerrenoForm}
              >
                Carga
              </button>{" "}
              <TerrenoForm ref={terrenoRef} />
            </div>
          ) : null}
          {dataSelect == 2 ? (
            <div className="w-full flex flex-col items-center">
              <button
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openConstruccionForm}
              >
                Carga
              </button>{" "}
              <ConstruccionForm ref={construccionRef} />
            </div>
          ) : null}
          {dataSelect == 3 ? (
            <div className="w-full flex flex-col items-center">
              <button
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openUniConstruccionForm}
              >
                Carga
              </button>
              <UniConstruccionForm ref={uniConstruccionRef} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  async function Avaluo() {
    let año = 2023;
    let array = JSON.stringify(tableData);

    let keys = Object.keys(tableData);
    //Recorrer Numeros Prediales
    let ArrayTotal = [];
    for (let key in keys) {
      let currentItem = tableData[key];
      console.log("current item", currentItem);
      let ArrayTerreno = [];
      let ArrayUnidad = [];

      async function TerrenoCalculate() {
        let aux = "";
        let zonasData = currentItem.terreno.ZHG;
        let requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        for (const item of zonasData) {
          if (item.ZHG <= 9 && item.ZHG.toLocaleString().length < 2) {
            item.ZHG = "0" + item.ZHG;
          }
          let newobj = {
            zona: currentItem.Zona,
            area: item.area,
            zhg: item.ZHG,
            total: "",
          };

          let url = "";
          if (currentItem.Zona == "00") {
            url =
              import.meta.env.VITE_API_URL_FIRST +
              "avaluo-catastral/rural/valor-terreno?zona_economica=" +
              newobj.zhg +
              "&vigencia=" +
              2023;
          } else {
            url =
              import.meta.env.VITE_API_URL_FIRST +
              "avaluo-catastral/urbano/valor-terreno?zhg_no=" +
              item.ZHG +
              "&vigencia=" +
              2022;
          }
          console.log("Urla", url);
          try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
              aux = true;
              const result = await response.json();
              console.log(result);
              if (currentItem.Zona == "00") {
                newobj.total =
                  parseFloat(newobj.area) * parseFloat(result.data[0].valor_m2);
              } else {
                newobj.total =
                  parseFloat(newobj.area) * parseFloat(result.data[0].valor);
              }
              console.log(
                "data Area urbano " +
                  parseFloat(newobj.area) +
                  " dataValor " +
                  parseFloat(result.data[0].valor) +
                  " total " +
                  newobj.total
              );
              console.log(
                "data Area urbano " +
                  parseFloat(newobj.area) +
                  " dataValor " +
                  parseFloat(result.data[0].valor_m2) +
                  " total " +
                  newobj.total
              );
              ArrayTerreno.push(newobj);
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

      async function calcularAvaluo() {
        console.log("Inicia Avaluo");
        try {
          let boolterreno = await TerrenoCalculate();
          if (boolterreno) {
            let dataCorrect = [];
            //Rural
            if (currentItem.Zona == "00") {
              let año = 2023;
              console.log("uNIDADES", currentItem.unidad_construccion);
              for (const item of currentItem.unidad_construccion) {
                console.log("item Numero Predial", item);
                let destinacion = item.caracteristicas.tipo_construccion;
                let tipo_unidad = item.caracteristicas.tipo_unidad_construccion;
                //Data Convencional
                if (destinacion == 66) {
                  switch (parseInt(tipo_unidad)) {
                    //Residencial
                    case 539:
                      console.log("ENTRA RESIDENCIAL");
                      //Usar Endpoint Residencial o Vivienda
                      async function ResidenciaCalculate() {
                        let aux = "";
                        let puntos =
                          item.caracteristicas.calificacionconvencional[0]
                            .total_calificacion;
                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        let url = "";
                        if (currentItem.terreno.SantaMaria) {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/urbano/santa-maria?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año;
                        } else {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-viv?puntos=" +
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
                              destinacion: parseInt(item.caracteristicas.uso),
                              puntaje: parseFloat(result.data[0].puntos),
                              area: item.area_construida,
                              total: "",
                            };
                            newobj.total =
                              parseFloat(newobj.area) *
                              parseFloat(result.data[0].valor);
                            ArrayUnidad.push(newobj);
                            console.log(
                              "data Area " +
                                parseFloat(newobj.area) +
                                " dataValor " +
                                parseFloat(result.data[0].valor) +
                                " total " +
                                newobj.total
                            );
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

                      if (!est) {
                        console.log("Error en Residencial Urbana");
                      } else {
                        console.log("ese", est);
                      }
                      dataCorrect.push(est);
                      console.log("Data Correct", dataCorrect);

                      break;
                    //Comercial
                    case 540:
                      var uso = parseInt(item.caracteristicas.uso);

                      console.log("ENTRA COMERCIAL");

                      async function ComercialCalculate() {
                        console.log("Calculando");
                        let aux = "";
                        let puntos =
                          item.caracteristicas.calificacionconvencional[0]
                            .total_calificacion;

                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        //Rangos para que sean Comercial Gneral
                        async function ComGeneral(valor) {
                          let rangos = [
                            { inicio: 235, fin: 236 },
                            { inicio: 237, fin: 243 },
                            { inicio: 245, fin: 237 },
                            { inicio: 238, fin: 238 },
                          ];

                          let sum = 0;
                          for (const rango of rangos) {
                            if (valor >= rango.inicio && valor <= rango.fin) {
                              sum++;
                            }
                          }
                          console.log("sum", sum);
                          if (sum != 0) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                        let url = "";
                        //Varia URL para cada Condicional
                        console.log("Carga Url COmercial", url);
                        if (await ComGeneral(uso)) {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-com?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=RURAL";
                        } else {
                          if (uso >= 235 && uso <= 236) {
                            //bodega
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
                              console.log("Tabla sin Valores");
                            }
                          }
                        }

                        try {
                          const response = await fetch(url, requestOptions);
                          if (response.ok) {
                            aux = true;
                            const result = await response.json();
                            let newobj = {
                              destinacion: uso,
                              puntaje: parseFloat(result.data[0].puntos),
                              area: item.area_construida,
                              total: "",
                            };
                            newobj.total =
                              parseFloat(newobj.area) *
                              parseFloat(result.data[0].valor);
                            console.log(
                              "data Area " +
                                parseFloat(newobj.area) +
                                " dataValor " +
                                parseFloat(result.data[0].valor) +
                                " total " +
                                newobj.total
                            );
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
                        console.log("Carga Comercial", aux);
                        return aux;
                      }
                      let esta = await ComercialCalculate();
                      console.log("ese", esta);
                      dataCorrect.push(esta);
                      if (!esta) {
                        console.log("Error en Comercial General Urbana");
                      }
                      break;
                    //Industrial
                    case 541:
                      console.log("INDUSTRIAL");
                      let esti = await IndustrialCalculate();
                      async function IndustrialCalculate() {
                        let aux = "";
                        let puntos =
                          item.caracteristicas.calificacionconvencional[0]
                            .total_calificacion;

                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        let url = "";
                        //Varia URL para cada Condicional
                        if (uso >= 259 && uso <= 260) {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-bod?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=RURAL";
                        } else {
                        }
                        console.log("Carga Url Industrial", url);
                        try {
                          const response = await fetch(url, requestOptions);
                          if (response.ok) {
                            aux = true;
                            const result = await response.json();
                            let newobj = {
                              destinacion: uso,
                              puntaje: parseFloat(result.data[0].puntos),
                              area: item.area_construida,
                              total: "",
                            };
                            newobj.total =
                              parseFloat(newobj.area) *
                              parseFloat(result.data[0].valor);
                            console.log(
                              "data Area " +
                                parseFloat(newobj.area) +
                                " dataValor " +
                                parseFloat(result.data[0].valor) +
                                " total " +
                                newobj.total
                            );
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
                        console.log("Error en Comercial General Urbana");
                      }

                      break;
                    default:
                      console.log("Valor no Calculable");
                      break;
                  }
                } else {
                  //Anexos
                  if (destinacion == 67) {
                    console.log("eNTRA aNEXO", item);
                    let est = await asignarDestino(item);
                    async function asignarDestino(item) {
                      console.log("eNTRA asignar", item);
                      let aux =
                        item.caracteristicas.calificacionnoconvencional[0]
                          .tipo_anexo;
                      console.log("Entra Asignar", aux);
                      let destino = await obtenerDestino(aux);

                      if (destino != null) {
                        console.log("Destino", destino);
                        let puntos =
                          item.caracteristicas.calificacionnoconvencional[0]
                            .tipo_anexo;
                        switch (puntos) {
                          case 452:
                            puntos = 90;
                            break;
                          case 453:
                            puntos = 80;
                            break;
                          case 454:
                            puntos = 60;
                            break;
                          case 455:
                            puntos = 40;
                            break;
                          case 456:
                            puntos = 80;
                            break;
                          case 457:
                            puntos = 60;
                            break;
                          case 458:
                            puntos = 40;
                            break;
                          case 459:
                            puntos = 20;
                            break;
                          case 460:
                            puntos = 80;
                            break;
                          case 461:
                            puntos = 60;
                            break;
                          case 462:
                            puntos = 40;
                            break;
                          case 463:
                            puntos = 20;
                            break;
                          case 464:
                            puntos = 80;
                            break;
                          case 465:
                            puntos = 60;
                            break;
                          case 466:
                            puntos = 40;
                            break;
                          case 467:
                            puntos = 20;
                            break;
                          case 468:
                            puntos = 80;
                            break;
                          case 469:
                            puntos = 60;
                            break;
                          case 470:
                            puntos = 80;
                            break;
                          case 471:
                            puntos = 60;
                            break;
                          case 472:
                            puntos = 50;
                            break;
                          case 473:
                            puntos = 40;
                            break;
                          case 474:
                            puntos = 80;
                            break;
                          case 475:
                            puntos = 60;
                            break;
                          case 476:
                            puntos = 50;
                            break;
                          case 477:
                            puntos = 40;
                            break;
                          case 478:
                            puntos = 80;
                            break;
                          case 479:
                            puntos = 60;
                            break;
                          case 480:
                            puntos = 40;
                            break;
                          case 481:
                            puntos = 80;
                            break;
                          case 482:
                            puntos = 60;
                            break;
                          case 483:
                            puntos = 40;
                            break;
                          case 484:
                            puntos = 80;
                            break;
                          case 485:
                            puntos = 60;
                            break;
                          case 486:
                            puntos = 40;
                            break;
                          case 487:
                            puntos = 20;
                            break;
                          case 488:
                            puntos = 80;
                            break;
                          case 489:
                            puntos = 60;
                            break;
                          case 490:
                            puntos = 40;
                            break;
                          case 491:
                            puntos = 80;
                            break;
                          case 492:
                            puntos = 60;
                            break;
                          case 493:
                            puntos = 40;
                            break;
                          case 494:
                            puntos = 20;
                            break;
                          case 495:
                            puntos = 80;
                            break;
                          case 496:
                            puntos = 60;
                            break;
                          case 497:
                            puntos = 40;
                            break;
                          case 498:
                            puntos = 47; // No proporcionaste el valor para el caso 498
                            break;
                          case 499:
                            puntos = 80;
                            break;
                          case 500:
                            puntos = 60;
                            break;
                          case 501:
                            puntos = 40;
                            break;
                          case 502:
                            puntos = 20;
                            break;
                          case 503:
                            puntos = 10;
                            break;
                          case 504:
                            puntos = 80;
                            break;
                          case 505:
                            puntos = 60;
                            break;
                          case 506:
                            puntos = 50;
                            break;
                          case 507:
                            puntos = 40;
                            break;
                          case 508:
                            puntos = 80;
                            break;
                          case 509:
                            puntos = 60;
                            break;
                          case 510:
                            puntos = 40;
                            break;
                          case 511:
                            puntos = 20;
                            break;
                          case 512:
                            puntos = 80;
                            break;
                          case 513:
                            puntos = 60;
                            break;
                          case 514:
                            puntos = 40;
                            break;
                          case 515:
                            puntos = 80;
                            break;
                          case 516:
                            puntos = 20;
                            break;
                          case 517:
                            puntos = 80;
                            break;
                          case 518:
                            puntos = 60;
                            break;
                          case 519:
                            puntos = 60;
                            break;
                          case 520:
                            puntos = 40;
                            break;
                          case 521:
                            puntos = 80;
                            break;
                          case 522:
                            puntos = 60;
                            break;
                          case 523:
                            puntos = 40;
                            break;
                          case 524:
                            puntos = 20;
                            break;
                          case 525:
                            puntos = 80;
                            break;
                          case 526:
                            puntos = 60;
                            break;
                          case 527:
                            puntos = 40;
                            break;
                          case 528:
                            puntos = 20;
                            break;
                          default:
                            puntos = 0;
                        }

                        let resultado = await AnexoCalculate(
                          destino,
                          puntos,
                          item
                        );
                        console.log("resultado de calcular anexo", resultado);
                        return resultado;
                      } else {
                        console.log("Destino no hay");
                      }
                    }
                    async function obtenerDestino(aux) {
                      console.log("Entra Obtener Destino 2");

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
                      console.log("Entra METODO DESTINO Destino");
                      for (let i = 0; i < rangos.length; i++) {
                        if (aux >= rangos[i].inicio && aux <= rangos[i].fin) {
                          prueba = rangos[i].valor;
                        }
                      }
                      console.log("Slir DESTINO", prueba);
                      return prueba;
                    }
                    //Usar Tabla Anexo
                    async function AnexoCalculate(destino, puntos, item) {
                      console.log("datos 1", destino);
                      console.log("datos 2", puntos);
                      console.log("datos 3", item);
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
                      console.log("url rural", url);
                      try {
                        const response = await fetch(url, requestOptions);

                        if (response.ok) {
                          aux = true;
                          const result = await response.json();
                          console.log("Anexos Rurales", result);
                          let newobj = {
                            destinacion: item.caracteristicas.tipo_construccion,
                            puntaje: result.data[0].puntos,
                            area: item.area_construida,
                            total: "",
                          };
                          newobj.total =
                            parseFloat(newobj.area) *
                            parseFloat(result.data[0].valor);
                          console.log("resultado Anexo", result);
                          console.log(
                            "data Area " +
                              parseFloat(newobj.area) +
                              " dataValor " +
                              parseFloat(result.data[0].valor) +
                              " total " +
                              newobj.total
                          );
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

                    console.log("23232 ", est);
                    dataCorrect.push(est);
                    if (!est) {
                      console.log("Error en Anexos Rurales");
                    } else {
                      console.log("sale aNEXO");
                    }
                    //Algoritmo de Destino
                  }
                }
              }
            } else {
              //Resto Urbano
              let año = 2022;
              for (const item of currentItem.unidad_construccion) {
                console.log("item Numero Predial", item);
                let destinacion = item.caracteristicas.tipo_construccion;
                let tipo_unidad = item.caracteristicas.tipo_unidad_construccion;
                //Data Convencional
                if (destinacion == 66) {
                  switch (parseInt(tipo_unidad)) {
                    //Residencial
                    case 539:
                      console.log("ENTRA RESIDENCIAL");
                      //Usar Endpoint Residencial o Vivienda
                      async function ResidenciaCalculate() {
                        let aux = "";

                        let puntos =
                          item.caracteristicas.calificacionconvencional[0]
                            .total_calificacion;
                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        let url = "";
                        if (currentItem.terreno.SantaMaria) {
                          console.log("Usa URL santamaria");
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/urbano/santa-maria?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año;
                        } else {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-viv?puntos=" +
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
                              destinacion: parseInt(item.caracteristicas.uso),
                              puntaje: parseFloat(result.data[0].puntos),
                              area: item.area_construida,
                              total: "",
                            };
                            newobj.total =
                              parseFloat(newobj.area) *
                              parseFloat(result.data[0].valor);
                            ArrayUnidad.push(newobj);
                            console.log("resultado Residencia", result);
                            console.log(
                              "data Area " +
                                parseFloat(newobj.area) +
                                " dataValor " +
                                parseFloat(result.data[0].valor) +
                                " total " +
                                newobj.total
                            );
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

                      if (!est) {
                        console.log("Error en Residencial Urbana");
                      } else {
                        console.log("ese", est);
                      }
                      dataCorrect.push(est);
                      console.log("Data Correct", dataCorrect);

                      break;
                    //Comercial
                    case 540:
                      var uso = parseInt(item.caracteristicas.uso);

                      console.log("ENTRA COMERCIAL");

                      async function ComercialCalculate() {
                        console.log("Calculando");
                        let aux = "";
                        let puntos =
                          item.caracteristicas.calificacionconvencional[0]
                            .total_calificacion;

                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        //Rangos para que sean Comercial Gneral
                        async function ComGeneral(valor) {
                          let rangos = [
                            { inicio: 235, fin: 236 },
                            { inicio: 237, fin: 243 },
                            { inicio: 245, fin: 237 },
                            { inicio: 238, fin: 238 },
                          ];

                          let sum = 0;
                          for (const rango of rangos) {
                            if (valor >= rango.inicio && valor <= rango.fin) {
                              sum++;
                            }
                          }
                          console.log("sum", sum);
                          if (sum != 0) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                        let url = "";
                        //Varia URL para cada Condicional
                        console.log("Carga Url COmercial", url);
                        if (await ComGeneral(uso)) {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-com?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=URBANA";
                        } else {
                          if (uso >= 235 && uso <= 236) {
                            //bodega
                            url =
                              import.meta.env.VITE_API_URL_FIRST +
                              "avaluo-catastral/tipo/tab-bod?puntos=" +
                              puntos +
                              "&vigencia=" +
                              año +
                              "&tipo=URBANA";
                          } else {
                            if (uso >= 237 && uso <= 238) {
                              //Centro Comercial
                              url =
                                import.meta.env.VITE_API_URL_FIRST +
                                "avaluo-catastral/tipo/tab-cc-f03?puntos=" +
                                puntos +
                                "&vigencia" +
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
                                  "&tipo=URBANA";
                              } else {
                                console.log("Tabla sin Valores");
                              }
                            }
                          }
                        }

                        try {
                          const response = await fetch(url, requestOptions);
                          if (response.ok) {
                            aux = true;
                            const result = await response.json();
                            let newobj = {
                              destinacion: uso,
                              puntaje: parseFloat(result.data[0].puntos),
                              area: item.area_construida,
                              total: "",
                            };
                            newobj.total =
                              parseFloat(newobj.area) *
                              parseFloat(result.data[0].valor);
                            console.log(
                              "data Area " +
                                parseFloat(newobj.area) +
                                " dataValor " +
                                parseFloat(result.data[0].valor) +
                                " total " +
                                newobj.total
                            );
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
                        console.log("Carga Comercial", aux);
                        return aux;
                      }
                      let esta = await ComercialCalculate();
                      console.log("ese", esta);
                      dataCorrect.push(esta);
                      if (!esta) {
                        console.log("Error en Comercial General Urbana");
                      }
                      break;
                    //Industrial
                    case 541:
                      console.log("INDUSTRIAL");
                      let esti = await IndustrialCalculate();
                      async function IndustrialCalculate() {
                        let aux = "";
                        let puntos =
                          item.caracteristicas.calificacionconvencional[0]
                            .total_calificacion;

                        var requestOptions = {
                          method: "GET",
                          redirect: "follow",
                        };
                        let url = "";
                        //Varia URL para cada Condicional
                        if (uso >= 259 && uso <= 260) {
                          url =
                            import.meta.env.VITE_API_URL_FIRST +
                            "avaluo-catastral/tipo/tab-bod?puntos=" +
                            puntos +
                            "&vigencia=" +
                            año +
                            "&tipo=URBANA";
                        } else {
                        }
                        console.log("Carga Url Industrial", url);
                        try {
                          const response = await fetch(url, requestOptions);
                          if (response.ok) {
                            aux = true;
                            const result = await response.json();
                            let newobj = {
                              destinacion: uso,
                              puntaje: parseFloat(result.data[0].puntos),
                              area: item.area_construida,
                              total: "",
                            };
                            newobj.total =
                              parseFloat(newobj.area) *
                              parseFloat(result.data[0].valor);
                            console.log(
                              "data Area " +
                                parseFloat(newobj.area) +
                                " dataValor " +
                                parseFloat(result.data[0].valor) +
                                " total " +
                                newobj.total
                            );
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
                        console.log("Error en Comercial General Urbana");
                      }
                      break;
                    default:
                      console.log("Valor no Calculable");
                      break;
                  }
                } else {
                  //Anexos
                  if (destinacion == 67) {
                    console.log("eNTRA aNEXO");
                    let est = await asignarDestino(item);
                    async function asignarDestino(item) {
                      console.log("Entra Asignar Destino", item);
                      let aux =
                        item.caracteristicas.calificacionnoconvencional[0]
                          .tipo_anexo;
                      console.log("Entra Asignar", aux);

                      let destino = await obtenerDestino(aux);

                      if (destino != null) {
                        console.log("Destino", destino);
                        let puntos =
                          item.caracteristicas.calificacionnoconvencional[0]
                            .tipo_anexo;
                        switch (puntos) {
                          case 452:
                            puntos = 90;
                            break;
                          case 453:
                            puntos = 80;
                            break;
                          case 454:
                            puntos = 60;
                            break;
                          case 455:
                            puntos = 40;
                            break;
                          case 456:
                            puntos = 80;
                            break;
                          case 457:
                            puntos = 60;
                            break;
                          case 458:
                            puntos = 40;
                            break;
                          case 459:
                            puntos = 20;
                            break;
                          case 460:
                            puntos = 80;
                            break;
                          case 461:
                            puntos = 60;
                            break;
                          case 462:
                            puntos = 40;
                            break;
                          case 463:
                            puntos = 20;
                            break;
                          case 464:
                            puntos = 80;
                            break;
                          case 465:
                            puntos = 60;
                            break;
                          case 466:
                            puntos = 40;
                            break;
                          case 467:
                            puntos = 20;
                            break;
                          case 468:
                            puntos = 80;
                            break;
                          case 469:
                            puntos = 60;
                            break;
                          case 470:
                            puntos = 80;
                            break;
                          case 471:
                            puntos = 60;
                            break;
                          case 472:
                            puntos = 50;
                            break;
                          case 473:
                            puntos = 40;
                            break;
                          case 474:
                            puntos = 80;
                            break;
                          case 475:
                            puntos = 60;
                            break;
                          case 476:
                            puntos = 50;
                            break;
                          case 477:
                            puntos = 40;
                            break;
                          case 478:
                            puntos = 80;
                            break;
                          case 479:
                            puntos = 60;
                            break;
                          case 480:
                            puntos = 40;
                            break;
                          case 481:
                            puntos = 80;
                            break;
                          case 482:
                            puntos = 60;
                            break;
                          case 483:
                            puntos = 40;
                            break;
                          case 484:
                            puntos = 80;
                            break;
                          case 485:
                            puntos = 60;
                            break;
                          case 486:
                            puntos = 40;
                            break;
                          case 487:
                            puntos = 20;
                            break;
                          case 488:
                            puntos = 80;
                            break;
                          case 489:
                            puntos = 60;
                            break;
                          case 490:
                            puntos = 40;
                            break;
                          case 491:
                            puntos = 80;
                            break;
                          case 492:
                            puntos = 60;
                            break;
                          case 493:
                            puntos = 40;
                            break;
                          case 494:
                            puntos = 20;
                            break;
                          case 495:
                            puntos = 80;
                            break;
                          case 496:
                            puntos = 60;
                            break;
                          case 497:
                            puntos = 40;
                            break;
                          case 498:
                            puntos = 47; // No proporcionaste el valor para el caso 498
                            break;
                          case 499:
                            puntos = 80;
                            break;
                          case 500:
                            puntos = 60;
                            break;
                          case 501:
                            puntos = 40;
                            break;
                          case 502:
                            puntos = 20;
                            break;
                          case 503:
                            puntos = 10;
                            break;
                          case 504:
                            puntos = 80;
                            break;
                          case 505:
                            puntos = 60;
                            break;
                          case 506:
                            puntos = 50;
                            break;
                          case 507:
                            puntos = 40;
                            break;
                          case 508:
                            puntos = 80;
                            break;
                          case 509:
                            puntos = 60;
                            break;
                          case 510:
                            puntos = 40;
                            break;
                          case 511:
                            puntos = 20;
                            break;
                          case 512:
                            puntos = 80;
                            break;
                          case 513:
                            puntos = 60;
                            break;
                          case 514:
                            puntos = 40;
                            break;
                          case 515:
                            puntos = 80;
                            break;
                          case 516:
                            puntos = 20;
                            break;
                          case 517:
                            puntos = 80;
                            break;
                          case 518:
                            puntos = 60;
                            break;
                          case 519:
                            puntos = 60;
                            break;
                          case 520:
                            puntos = 40;
                            break;
                          case 521:
                            puntos = 80;
                            break;
                          case 522:
                            puntos = 60;
                            break;
                          case 523:
                            puntos = 40;
                            break;
                          case 524:
                            puntos = 20;
                            break;
                          case 525:
                            puntos = 80;
                            break;
                          case 526:
                            puntos = 60;
                            break;
                          case 527:
                            puntos = 40;
                            break;
                          case 528:
                            puntos = 20;
                            break;
                          default:
                            puntos = 0;
                        }

                        let resultado = await AnexoCalculate(
                          destino,
                          puntos,
                          item
                        );
                        console.log("resultado de calcular anexo", resultado);
                        return resultado;
                      } else {
                        console.log("Destino no hay");
                      }
                    }
                    async function obtenerDestino(aux) {
                      console.log("Entra Obtener Destino");
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
                      return prueba;
                    }
                    //Usar Tabla Anexo
                    async function AnexoCalculate(destino, puntos, item) {
                      console.log("datos 1", destino);
                      console.log("datos 2", puntos);
                      console.log("datos 2", item);
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
                      console.log("Anexos Rurales", url);
                      try {
                        const response = await fetch(url, requestOptions);
                        if (response.ok) {
                          aux = true;
                          const result = await response.json();

                          let newobj = {
                            destinacion: item.caracteristicas.tipo_construccion,
                            puntaje: result.data[0].puntos,
                            area: item.area_construida,
                            total: "",
                          };
                          newobj.total =
                            parseFloat(newobj.area) *
                            parseFloat(result.data[0].valor);
                          console.log(
                            "data Area " +
                              parseFloat(newobj.area) +
                              " dataValor " +
                              parseFloat(result.data[0].valor) +
                              " total " +
                              newobj.total
                          );
                          ArrayUnidad.push(newobj);
                          console.log("resultado Anexo", result);
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

                    console.log("23232 ", est);
                    dataCorrect.push(est);
                    if (!est) {
                      console.log("Error en Anexos Urbanos");
                    } else {
                      console.log("sale aNEXO");
                    }
                    //Algoritmo de Destino
                  }
                }
              }
            }

            console.log("datos Correctos", dataCorrect);
            if (dataCorrect[0]) {
              return true;
            } else {
              return false;
            }
          } else {
            console.log("error en boolean");
          }

          console.log("Terminar", boolterreno);
        } catch (error) {
          console.log("Error : ".error);
        }
      }

      let terminar = await calcularAvaluo();
      if (terminar) {
        console.log("terreno", ArrayTerreno);
        console.log("Unidad", ArrayUnidad);
        function calculateAreatotal() {
          let sum = 0;
          ArrayTerreno.map((item, index) => {
            sum += parseFloat(item.area);
          });
          return sum;
        }
        function calculateDestino() {
          let destino = "";
          ArrayUnidad.map((item, index) => {
            if (item.destinacion >= 220 && item.destinacion <= 234) {
              destino = "A";
            } else {
              if (item.destinacion >= 235 && item.destinacion <= 258) {
                destino = "C";
              } else {
                if (item.destinacion >= 259 && item.destinacion <= 263) {
                  destino = "B";
                } else {
                  if (
                    (item.destinacion >= 287 && item.destinacion <= 321) ||
                    item.destinacion == 273
                  ) {
                    destino = "";
                  }
                }
              }
            }
          });
          return destino;
        }
        function calculateConstruida() {
          let sum = 0;
          ArrayUnidad.map((item, index) => {
            console.log("item construido", item);
            sum += parseFloat(item.area);
          });
          return sum;
        }
        function calculateDireccion() {
          let direccion = "";
          if (currentItem.Direccion.tipo_direccion == 219) {
            direccion = currentItem.Direccion.nombre_predio;
          } else {
            if (currentItem.Direccion.tipo_direccion == 218) {
              let previa = currentItem.Direccion;
              let clase = "";
              let sectorciudad = "";
              let sectorpredio = "";
              switch (previa.clase_via_principal) {
                case "688":
                  clase = "Avenida calle";
                  break;
                case "689":
                  clase = "Avenida carrera";
                  break;
                case "690":
                  clase = "Avenida";
                  break;
                case "691":
                  clase = "Autopista";
                  break;
                case "692":
                  clase = "Circunvalar";
                  break;
                case "693":
                  clase = "Calle";
                  break;
                case "694":
                  clase = "Carrera";
                  break;
                case "695":
                  clase = "Diagonal";
                  break;
                case "696":
                  clase = "Transversal";
                  break;
                case "697":
                  clase = "Circular";
                  break;
              }
              switch (previa.sector_ciudad) {
                case "881":
                  sectorciudad = "Norte";
                  break;
                case "882":
                  sectorciudad = "Sur";
                  break;
                case "883":
                  sectorciudad = "Este";
                  break;
                case "884":
                  sectorciudad = "Oeste";
                  break;
              }
              switch (previa.sector_predio) {
                case "752":
                  sectorpredio = "Norte";
                  break;
                case "753":
                  sectorpredio = "Sur";
                  break;
                case "754":
                  sectorpredio = "Este";
                  break;
                case "755":
                  sectorpredio = "Oeste";
                  break;
              }
              direccion =
                clase +
                " " +
                previa.valor_via_principal +
                " " +
                previa.letra_via_principal +
                " " +
                sectorciudad +
                " " +
                previa.valor_via_generadora +
                " " +
                previa.letra_via_generadora +
                " " +
                previa.numero_predio +
                " " +
                sectorpredio +
                " " +
                previa.complemento;
            }
            console.log("Direccion", currentItem.Direccion);
          }
          return direccion;
        }
        function calculateAvaluo() {
          console.log("Arreglo Unidad", ArrayUnidad);
          let sum = 0;
          ArrayTerreno.map((item, index) => {
            sum += item.total;
          });
          ArrayUnidad.map((item, index) => {
            sum += item.total;
          });
          return sum;
        }
        function calculateZona() {
          let zona = "";
          ArrayTerreno.map((item, index) => {
            zona = item.zona;
          });
          return zona;
        }
        let num =
          currentItem.Dpto +
          currentItem.Mpio +
          currentItem.Zona +
          currentItem.Sector +
          currentItem.Comuna +
          currentItem.Barrio +
          currentItem.Manzana +
          currentItem.Terreno +
          currentItem.Condicion +
          currentItem.Edificio +
          currentItem.Piso +
          currentItem.Unidad;

        let newobj = {
          zona: calculateZona(),
          num_predial: num,
          matricula: 157 + " - " + currentItem.Matricula,
          direccion: calculateDireccion(),
          destinacion: calculateDestino(),
          area_terreno: calculateAreatotal(),
          area_construida: calculateConstruida(),
          avaluo: calculateAvaluo(),
          vigencia: "01/01/2023",
        };
        ArrayTotal.push(newobj);
      } else {
        console.log("terreno Error Unidades", ArrayTerreno);
        console.log("Unidad 1 1", ArrayUnidad);

        function calculateAreatotal() {
          let sum = 0;
          ArrayTerreno.map((item, index) => {
            sum += parseFloat(item.area);
          });
          return sum;
        }
        function calculateDireccion() {
          let direccion = "";
          if (currentItem.Direccion.tipo_direccion == 219) {
            direccion = currentItem.Direccion.nombre_predio;
          } else {
            if (currentItem.Direccion.tipo_direccion == 218) {
              let previa = currentItem.Direccion;
              let clase = "";
              let sectorciudad = "";
              let sectorpredio = "";
              switch (previa.clase_via_principal) {
                case "688":
                  clase = "Avenida calle";
                  break;
                case "689":
                  clase = "Avenida carrera";
                  break;
                case "690":
                  clase = "Avenida";
                  break;
                case "691":
                  clase = "Autopista";
                  break;
                case "692":
                  clase = "Circunvalar";
                  break;
                case "693":
                  clase = "Calle";
                  break;
                case "694":
                  clase = "Carrera";
                  break;
                case "695":
                  clase = "Diagonal";
                  break;
                case "696":
                  clase = "Transversal";
                  break;
                case "697":
                  clase = "Circular";
                  break;
              }
              switch (previa.sector_ciudad) {
                case "881":
                  sectorciudad = "Norte";
                  break;
                case "882":
                  sectorciudad = "Sur";
                  break;
                case "883":
                  sectorciudad = "Este";
                  break;
                case "884":
                  sectorciudad = "Oeste";
                  break;
              }
              switch (previa.sector_predio) {
                case "752":
                  sectorpredio = "Norte";
                  break;
                case "753":
                  sectorpredio = "Sur";
                  break;
                case "754":
                  sectorpredio = "Este";
                  break;
                case "755":
                  sectorpredio = "Oeste";
                  break;
              }
              direccion =
                clase +
                " " +
                previa.valor_via_principal +
                " " +
                previa.letra_via_principal +
                " " +
                sectorciudad +
                " " +
                previa.valor_via_generadora +
                " " +
                previa.letra_via_generadora +
                " " +
                previa.numero_predio +
                " " +
                sectorpredio +
                " " +
                previa.complemento;
            }
            console.log("Direccion", currentItem.Direccion);
          }
          return direccion;
        }
        function calculateDestino() {
          let destino = "";
          ArrayUnidad.map((item, index) => {
            if (item.destinacion >= 220 && item.destinacion <= 234) {
              destino = "A";
            } else {
              if (item.destinacion >= 235 && item.destinacion <= 258) {
                destino = "C";
              } else {
                if (item.destinacion >= 259 && item.destinacion <= 263) {
                  destino = "B";
                } else {
                  if (
                    (item.destinacion >= 287 && item.destinacion <= 321) ||
                    item.destinacion == 273
                  ) {
                    destino = "";
                  }
                }
              }
            }
          });
          return destino;
        }
        function calculateAvaluo() {
          console.log("Arreglo Unidad", ArrayUnidad);
          let sum = 0;
          ArrayTerreno.map((item, index) => {
            sum += item.total;
          });
          ArrayUnidad.map((item, index) => {
            sum += item.total;
          });
          return sum;
        }
        let num =
          currentItem.Dpto +
          currentItem.Mpio +
          currentItem.Zona +
          currentItem.Sector +
          currentItem.Comuna +
          currentItem.Barrio +
          currentItem.Manzana +
          currentItem.Terreno +
          currentItem.Condicion +
          currentItem.Edificio +
          currentItem.Piso +
          currentItem.Unidad;

        let newobj = {
          num_predial: num,
          matricula: 157 + " - " + currentItem.Matricula,
          direccion: calculateDireccion(),
          destinacion: calculateDestino(),
          area_terreno: calculateAreatotal(),
          area_construida: 0,
          avaluo: calculateAvaluo(),
          vigencia: "01/01/2023",
        };
        ArrayTotal.push(newobj);
      }

      //Recorrer Numeros Prediales DATA
    }

    setEstDataTotal(true);
    console.log("ArrayTotal", ArrayTotal);
    setDataTotal(ArrayTotal);
  }
  const AllTableForm = () => {
    console.log("Datos Totales", dataTotal);

    function redondearAvaluoTotal(data) {
      return Math.ceil(data / 1000) * 1000;
    }
    function redondear(numero) {
      console.log("Numero a Redondear", numero.toLocaleString());
      const resto = numero % 1000;
      console.log("asdasd", resto);
      const redondeo = resto >= 500 ? 1000 - resto : -resto;
      console.log("redondeo", redondeo);
      return numero + redondeo;
    }
    const Allfilas = Object.entries(dataTotal).map((items, index) => {
      console.log("items", items);
      let item = items[1];
      ////////////////////////////////////////////////////FUncion de Redondear Valor Final Avaluo
      console.log("Valor Avaluo redondeado");
      //redondearAvaluoTotal(item.avaluo)
      return (
        <tr key={index}>
          <td className="border-2 rounded-xl p-2">{index + 1}</td>
          <td className="border-2 rounded-xl p-2">{item.num_predial}</td>
          <td className="border-2 rounded-xl p-2">{item.matricula}</td>
          <td className="border-2 rounded-xl p-2">{item.direccion}</td>
          <td className="border-2 rounded-xl p-2">{item.destinacion}</td>
          <td className="border-2 rounded-xl p-2">{item.area_terreno}</td>
          <td className="border-2 rounded-xl p-2">{item.area_construida}</td>
          <td className="border-2 rounded-xl p-2">
            ${" "}
            {item.zona == "01"
              ? redondear(item.avaluo * 1.0431).toLocaleString()
              : redondear(item.avaluo).toLocaleString()}
          </td>
          <td className="border-2 rounded-xl p-2">{item.vigencia}</td>
        </tr>
      );
    });

    return (
      <div className="w-full">
        <table className="w-full text-center">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl w-1/12 p-2">ID</th>
              <th className="border-2 rounded-xl w-2/12 p-2">
                Número Catastral
              </th>
              <th className="border-2 rounded-xl w-1/12 p-2">
                Matricula Inmobiliaria
              </th>
              <th className="border-2 rounded-xl w-1/12 p-2">
                Direccion del Predio
              </th>
              <th className="border-2 rounded-xl w-1/12 p-2">Destinacion</th>
              <th className="border-2 rounded-xl w-1/12 p-2">
                Area Terreno (mt2)
              </th>
              <th className="border-2 rounded-xl w-1/12 p-2">
                Area Construida(mt2)
              </th>
              <th className="border-2 rounded-xl w-2/12 p-2">Avaluo</th>
              <th className="border-2 rounded-xl w-1/12 p-2">Vigencia</th>
            </tr>
          </thead>
          <tbody>{Allfilas}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl">Creacion de Predios</h1>
      <div className="mt-4 w-full">
        <ChangeData />
        <TableForm />
      </div>
      <div className="mt-4 w-full flex flex-row justify-center">
        <button
          onClick={Avaluo}
          className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
        >
          Calcular Avaluo
        </button>
      </div>
      {estDataTotal ? <AllTableForm /> : null}
    </div>
  );
};
