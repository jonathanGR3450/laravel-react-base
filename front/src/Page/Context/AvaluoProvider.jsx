import { useNavigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import useInfo from "../../hooks/useInfo";

const AvaluoContext = createContext();

const AvaluoProvider = ({ children }) => {
  const { updateJsonInscribir } = useInfo();
  console.log("Informacion de Info", updateJsonInscribir);

  const [avaluo, setAvaluo] = useState();
  const fechaActual = new Date();

  let añoActual = fechaActual.getFullYear();
  function redondear(numero) {
    console.log("Numero a Redondear", numero.toLocaleString());
    const resto = numero % 1000;
    console.log("asdasd", resto);
    const redondeo = resto >= 500 ? 1000 - resto : -resto;
    console.log("redondeo", redondeo);
    return numero + redondeo;
  }
  const createAvaluo = async (dataAño, data) => {
    console.log("entra a Contexto", dataAño);
    let año = dataAño;
    let tableData = data;
    console.log("data AÑo", dataAño);
    let keys = Object.keys(tableData);
    console.log("data tABLA", tableData);
    //Recorrer Numeros Prediales
    let ArrayTotal = [];
    for (let key in keys) {
      let currentItem = tableData[key];
      console.log("current item", currentItem);
      let ArrayTerreno = [];
      let ArrayUnidad = [];
      let ArrayInteresado = [];
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
              año;
          } else {
            url =
              import.meta.env.VITE_API_URL_FIRST +
              "avaluo-catastral/urbano/valor-terreno?zhg_no=" +
              item.ZHG +
              "&vigencia=" +
              año;
          }
          console.log("Urla", url);
          try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
              aux = true;
              const result = await response.json();
              console.log("123", result);
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
        console.log("Inicia Avaluo", año);
        try {
          ArrayInteresado.push(currentItem.interesados);
          let boolterreno = await TerrenoCalculate();
          if (boolterreno) {
            let dataCorrect = []; //Rural

            if (currentItem.Zona == "00") {
              console.log("terreno Rural", currentItem);
              console.log("uNIDADES", currentItem.unidad_construccion);
              for (const item of currentItem.unidad_construccion) {
                console.log("item Numero Predial", item);
                let destinacion =
                  item.caracteristicas.caracteristicas.tipo_construccion;
                let tipo_unidad =
                  item.caracteristicas.caracteristicas.tipo_unidad_construccion;
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
                          item.caracteristicas.caracteristicas
                            .calificacionconvencional[0].total_calificacion;
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
                              destinacion: parseInt(
                                item.caracteristicas.caracteristicas.uso
                              ),
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
                      var uso = parseInt(
                        item.caracteristicas.caracteristicas.uso
                      );

                      console.log("ENTRA COMERCIAL");

                      async function ComercialCalculate() {
                        console.log("Calculando");
                        let aux = "";
                        let puntos =
                          item.caracteristicas.caracteristicas
                            .calificacionconvencional[0].total_calificacion;

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
                          item.caracteristicas.caracteristicas
                            .calificacionconvencional[0].total_calificacion;

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
                        item.caracteristicas.caracteristicas
                          .calificacionnoconvencional[0].tipo_anexo;
                      console.log("Entra Asignar", aux);
                      let destino = await obtenerDestino(aux);

                      if (destino != null) {
                        console.log("Destino", destino);
                        let puntos =
                          item.caracteristicas.caracteristicas
                            .calificacionnoconvencional[0].tipo_anexo;
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
                            destinacion:
                              item.caracteristicas.caracteristicas
                                .tipo_construccion,
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
              console.log("terreno Urbano", currentItem.unidad_construccion);
              for (const item of currentItem.unidad_construccion) {
                console.log("item Numero Predial", item);
                let destinacion =
                  item.caracteristicas.caracteristicas.tipo_construccion;
                let tipo_unidad =
                  item.caracteristicas.caracteristicas.tipo_unidad_construccion;
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
                          item.caracteristicas.caracteristicas
                            .calificacionconvencional[0].total_calificacion;
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
                              destinacion: parseInt(
                                item.caracteristicas.caracteristicas.uso
                              ),
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
                      var uso = parseInt(
                        item.caracteristicas.caracteristicas.uso
                      );

                      console.log("ENTRA COMERCIAL");

                      async function ComercialCalculate() {
                        console.log("Calculando");
                        let aux = "";
                        let puntos =
                          item.caracteristicas.caracteristicas
                            .calificacionconvencional[0].total_calificacion;

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
                          item.caracteristicas.caracteristicas
                            .calificacionconvencional[0].total_calificacion;

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
                        item.caracteristicas.caracteristicas
                          .calificacionnoconvencional[0].tipo_anexo;
                      console.log("Entra Asignar", aux);

                      let destino = await obtenerDestino(aux);

                      if (destino != null) {
                        console.log("Destino", destino);
                        let puntos =
                          item.caracteristicas.caracteristicas
                            .calificacionnoconvencional[0].tipo_anexo;
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
                            destinacion:
                              item.caracteristicas.caracteristicas
                                .tipo_construccion,
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
      console.log("Terminar", terminar);
      if (terminar) {
        console.log("terreno 123", ArrayTerreno);
        console.log("Unidad", ArrayUnidad);
        console.log("Interesados", ArrayInteresado);
        function calculateAreatotal() {
          let sum = 0;
          ArrayTerreno.map((item, index) => {
            sum += parseFloat(item.area);
          });
          return sum;
        }
        function calculateDestino() {
          let destino = "";
          console.log("Entra Destino", tableData);
          tableData.map((item, index) => {
            switch (parseInt(item.predio.destinacion_economica)) {
              case 162:
                destino = "M (PECUARIO) -ACUICOLA";
                break;
              case 163:
                destino = "L (AGRICOLA)";
                break;
              case 164:
                destino = "N (AGROINDUSTRIAL)";
                break;
              case 165:
                destino = "D (AGROPECUARIO)";
                break;
              case 166:
                destino =
                  "L - O - M (AGRICOLA O PECUARIO, FORESTAL) - AGROFORESTAL";
                break;
              case 167:
                destino = "C (COMERCIAL)";
                break;
              case 168:
                destino = "F (CULTURAL)";
                break;
              case 169:
                destino = "J (EDUCATIVO)";
                break;
              case 170:
                destino = "O (FORESTAL)";
                break;
              case 171:
                destino = "A (HABITACIONAL)";
                break;
              case 172:
                destino = "B (INDUSTRIAL)";
                break;
              case 173:
                destino =
                  "N (Infraestructura asociada a producción agropecuaria) AGROINDUSTRIAL";
                break;
              case 174:
                destino = "Infraestructura hidráulica ";
                break;
              case 175:
                destino = "Infraestructura de saneamiento básico";
                break;
              case 176:
                destino = "Infraestructura seguridad";
                break;
              case 177:
                destino = "Infraestructura transporte";
                break;
              case 178:
                destino = "I (INSTITUCIONAL)";
                break;
              case 179:
                destino = "E (MINERO)";
                break;
              case 180:
                destino = "Q (LOTE NO URBANIZABLE NO URBANIZADO)";
                break;
              case 181:
                destino = "R (LOTE URBANIZADO NO CONSTRUIDO)";
                break;
              case 182:
                destino = "S (LOTE NO RUBANIZABLE)";
                break;
              case 183:
                destino = "M (PECUARIO)";
                break;
              case 184:
                destino = "G (RECREACIONAL)";
                break;
              case 185:
                destino = "K (RELIGIOSO)";
                break;
              case 186:
                destino = "H (SALUBRIDAD)";
                break;
              case 187:
                destino = "T (SERVICIOS ESPECIALES) Servicios funerarios";
                break;
              case 188:
                destino = "P (USO PUBLICO)";
                break;
              default:
                destino = ""; // O cualquier valor por defecto
                break;
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
          vigencia: "01/01/" + año,
          interesados: ArrayInteresado,
        };
        console.log("entra valores", newobj);
        ArrayTotal.push(newobj);
      } else {
        console.log("terreno SIn Unidades", ArrayTerreno);
        console.log("Unidad 1 1", ArrayUnidad);
        console.log("Interesados 11", ArrayInteresado);
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
          console.log("Entra Destino", tableData);
          tableData.map((item, index) => {
            switch (parseInt(item.predio.destinacion_economica)) {
              case 162:
                destino = "M (PECUARIO) -ACUICOLA";
                break;
              case 163:
                destino = "L (AGRICOLA)";
                break;
              case 164:
                destino = "N (AGROINDUSTRIAL)";
                break;
              case 165:
                destino = "D (AGROPECUARIO)";
                break;
              case 166:
                destino =
                  "L - O - M (AGRICOLA O PECUARIO, FORESTAL) - AGROFORESTAL";
                break;
              case 167:
                destino = "C (COMERCIAL)";
                break;
              case 168:
                destino = "F (CULTURAL)";
                break;
              case 169:
                destino = "J (EDUCATIVO)";
                break;
              case 170:
                destino = "O (FORESTAL)";
                break;
              case 171:
                destino = "A (HABITACIONAL)";
                break;
              case 172:
                destino = "B (INDUSTRIAL)";
                break;
              case 173:
                destino =
                  "N (Infraestructura asociada a producción agropecuaria) AGROINDUSTRIAL";
                break;
              case 174:
                destino = "Infraestructura hidráulica ";
                break;
              case 175:
                destino = "Infraestructura de saneamiento básico";
                break;
              case 176:
                destino = "Infraestructura seguridad";
                break;
              case 177:
                destino = "Infraestructura transporte";
                break;
              case 178:
                destino = "I (INSTITUCIONAL)";
                break;
              case 179:
                destino = "E (MINERO)";
                break;
              case 180:
                destino = "Q (LOTE NO URBANIZABLE NO URBANIZADO)";
                break;
              case 181:
                destino = "R (LOTE URBANIZADO NO CONSTRUIDO)";
                break;
              case 182:
                destino = "S (LOTE NO RUBANIZABLE)";
                break;
              case 183:
                destino = "M (PECUARIO)";
                break;
              case 184:
                destino = "G (RECREACIONAL)";
                break;
              case 185:
                destino = "K (RELIGIOSO)";
                break;
              case 186:
                destino = "H (SALUBRIDAD)";
                break;
              case 187:
                destino = "T (SERVICIOS ESPECIALES) Servicios funerarios";
                break;
              case 188:
                destino = "P (USO PUBLICO)";
                break;
              default:
                destino = ""; // O cualquier valor por defecto
                break;
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
          zona: currentItem.Zona,
          matricula: 157 + " - " + currentItem.Matricula,
          direccion: calculateDireccion(),
          destinacion: calculateDestino(),
          area_terreno: calculateAreatotal(),
          area_construida: 0,
          avaluo: calculateAvaluo(),
          vigencia: "01/01/" + año,
          interesados: ArrayInteresado,
        };
        ArrayTotal.push(newobj);
      }

      //Recorrer Numeros Prediales DATA
    }
    ///Mostrar valores base
    console.log("ArrayTotal", ArrayTotal);

    let dataTotal = [];

    let arrayResult = "";
    ///Datos donde se guardaran las liquidaciones
    let dataLiquid = [];
    let dataPredio = [];
    let dataInteresado = [];
    //Preguntar valores de incrementos
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let url =
      import.meta.env.VITE_API_URL_FIRST +
      "avaluo-catastral/list/incrementos?limit=1500";
    console.log("Url", url);
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      arrayResult = result.data.data;
      //let dataBase = {};

      ArrayTotal.map((items, index) => {
        let newdata = { ...items };

        console.log("neuva data", newdata);
        if (items.zona != "00") {
          if (items.vigencia == "01/01/2022") {
            console.log("Entra uRBANO");
            newdata.concepto = "ACTUALIZACION CATASTRAL";
            newdata.avaluo = redondear(newdata.avaluo);
            dataLiquid.push({ ...newdata });
          }
        }
        let avaluoBase = items.avaluo;
        arrayResult.sort((a, b) => a.vigencia - b.vigencia);

        for (const item of arrayResult) {
          let newDataCopy = { ...newdata };
          let valor_nuevo = avaluoBase * (1 + parseFloat(item.incremento));
          newDataCopy.avaluo = redondear(valor_nuevo);
          newDataCopy.concepto = item.concepto;
          avaluoBase = valor_nuevo;
          newDataCopy.vigencia = "01/01/" + item.vigencia;

          dataLiquid.push(newDataCopy);
        }
        console.log("Info de Interesados", items.interesados);
        items.interesados[0].map((item, index) => {
          console.log("item de interesado", item);
          let nombre = "";
          if (item.tipo == 659) {
            nombre = item.razon_social;
          } else {
            nombre = item.nombre;
          }
          let nom_documento = "";

          switch (item.tipo_documento) {
            case 529:
              nom_documento = "C.C.";
              break;
            case 530:
              nom_documento = "C.E.";
              break;
            case 531:
              nom_documento = "NIT";
              break;
            case 532:
              nom_documento = "T.I.";
              break;
            case 533:
              nom_documento = "Registro Civil";
              break;
            case 534:
              nom_documento = "Secuencial";
              break;
            case 535:
              nom_documento = "Pasaporte";
              break;
            default:
              nom_documento = "Vacio";
              break;
          }
          let interesado = {
            inscribe_propietarios_nmero_catastral: items.num_predial,
            inscribe_propietarios_numero_propietario: index + 1,
            inscribe_propietarios_nombre_propietario: nombre,
            inscribe_propietarios_tipo_documento: nom_documento,
            inscribe_propietarios_numero_documento: item.documento_identidad,
          };
          dataInteresado.push(interesado);
        });
      });
      dataLiquid.map((item, index) => {
        if (item.vigencia == "01/01/" + añoActual) {
          console.log("Vigencias", item.vigencia);
          console.log("Año ACTUAL", añoActual);
          dataPredio.push(item);
        }
      });
      console.log("Datos del Año Actual", dataPredio);
      console.log("datos Final liquidacion", dataLiquid);
      console.log("datos final de Interesados", dataInteresado);

      let jsonInfoProvider = {
        inscribe_datos_predio_nmero_catastral: [],
        inscribe_propietarios_nmero_catastral: dataInteresado,
        inscribe_liquidacion_nmero_catastral: [],
      };

      dataPredio.map((item, index) => {
        let newData = {
          inscribe_datos_predio_nmero_catastral: item.num_predial,
          inscribe_datos_predio_matricula_inmobiliaria: item.matricula,
          inscribe_datos_predio_Direccion: item.direccion,
          inscribe_datos_predio_destino_económico: item.destinacion,
          inscribe_datos_predio_area_terreno: item.area_terreno,
          inscribe_datos_predio_area_construida: item.area_construida,
          inscribe_datos_predio_avaluo: "$ " + item.avaluo.toLocaleString(),
          inscribe_datos_predio_vigencia: item.vigencia,
        };
        jsonInfoProvider.inscribe_datos_predio_nmero_catastral.push(newData);
      });
      dataLiquid.map((item, index) => {
        let newData = {
          inscribe_liquidacion_nmero_catastral: item.num_predial,
          inscribe_liquidacion_concepto: item.concepto,
          inscribe_liquidacion_fecha: item.vigencia,
          inscribe_liquidacion_avaluo: "$ " + item.avaluo.toLocaleString(),
        };
        jsonInfoProvider.inscribe_liquidacion_nmero_catastral.push(newData);
      });

      console.log("Json Inscripcion", JSON.stringify(jsonInfoProvider));
      updateJsonInscribir(jsonInfoProvider);

      /*dataLiquid.sort((a, b) => {
        // Primero, ordena por "inscribe_liquidacion_nmero_catastral"
        const comparacionCatastral =
          a.inscribe_liquidacion_nmero_catastral.localeCompare(
            b.inscribe_liquidacion_nmero_catastral
          );

        // Si los "inscribe_liquidacion_nmero_catastral" son iguales, ordena por "inscribe_liquidacion_fecha"
        if (comparacionCatastral === 0) {
          return (
            new Date(a.inscribe_liquidacion_fecha) -
            new Date(b.inscribe_liquidacion_fecha)
          );
        }

        return comparacionCatastral;
      });*/
    } catch (error) {
      console.log("Error:", error);
    }

    return dataPredio;
  };

  return (
    <AvaluoContext.Provider value={{ createAvaluo, avaluo }}>
      {children}
    </AvaluoContext.Provider>
  );
};

export { AvaluoProvider };
export default AvaluoContext;
