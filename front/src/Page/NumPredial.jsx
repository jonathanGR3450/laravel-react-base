import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import DataJson from "../Json/numeros.json";
import Loader from "./Loader";
import { Modal_Load } from "./Modal_Load";
import {
  ArrayFinalContext,
  NumPreContext,
  NumPreProvider,
  TableContext,
} from "./Context/Context";
import { ModalData } from "./ModalData";
//Objetos base con los datos que se necesitan
let PredioMatriz = {
  Dpto: "",
  Mpio: "",
  Zona: "",
  Sector: "",
  Comuna: "",
  Barrio: "",
  Manzana: "",
  Terreno: "",
  Condicion: "",
  Edificio: "",
  Piso: "",
  Unidad: "",
  Matricula: "",
  Direccion: [],
  codigo_homologado: "",
};
//Tamaño de predios segregados
let tamaño = 0;
//Array Final
//252900400000000030000000000000
//Array de datos Generados
let ArrayPredial = [];
//Array de los datos
let ArrayJsonBack = [];
//ID iNICIAL Y FINAL
let iniID = 0;
let finID = 0;
let numID = 500;
let validNumbers = [];
let numeroId = "";
let coma = "";
//Terrenos y unidades mayores en bd
let mayorTerrenobd = 0;
let mayorTerreno8bd = 0;
let mayorUnidadbd = 0;

export const NumPredialForm = () => {
  //Estados
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(true);

  //Captura de datos para generar numeros prediales
  // 1 Estado para Cargar el valor de Tamaño0
  const [inputValue, setInputValue] = useState("");
  // 2 Estado cambio de Valor de Tipo de predio
  const [itemchange, setItemChange] = useState(0);
  // 3 Estado del valor que se guarda al seleccionar el tipo de predio
  const [tpredio, setTpredio] = useState("50");
  //Activar y desactivar componentes BOOLEAN
  //4 Estado del Select de tipo de predio
  const [select, setSelect] = useState(false);
  // 5 Estado para Mostar la Tabla
  const [table, setTable] = useState(false);
  //Estado para activar y desactivar el boton de generar
  const [bttgen, setBttgen] = useState(true);
  //Estado para activar y desactivar el boton de cargar
  const [bttload, setBttload] = useState(true);
  //Estado despues de agregar
  const [bttchange, setBttChange] = useState();
  // estado Boton terminaro
  const [bttfin, setBttfin] = useState(true);
  //Data de Numero Predial
  const [nomNumPredial, setNumPredial] = useState("");
  //const [bact, setBact] = useState(true);
  const { updateTableData } = useContext(TableContext);
  //
  const { ArrayFinal, updateArrayFinal } = useContext(ArrayFinalContext);
  const [allData, setAllData] = useState([]);
  //Eventos o Funciones
  //GENERACION DE NUMEROS PREDIALES

  //0.1 CARGAR VALOR de input
  // 1 Funcion para cargar el input del tamaño
  function inputLength(e) {
    setInputValue(e.target.value);
  }
  // 2 Funcion para la seleccion del tipo de predio
  function ItemSelect(e) {
    setItemChange(Math.random());
    let value = e.target.value;
    if (value != "A" && inputValue.length != 0) {
      setBttgen(false);
    }
    setTpredio(value);
  }
  // 3 Funcion para generar los datos y mostrar la tabla button Generar No Prediales
  async function ShowData() {
    setBttgen(true);
    setBttChange(false);
    //Aux = Arreglo Actual o Data de DataBase
    let aux = "";
    if (ArrayFinal.length == 0) {
      //DataJson.numeros_prediales Valor del Envio de Datos
      aux = allData;
      JSONtoObject(aux);
    } else {
      aux = ArrayFinal;
    }
    switch (tpredio) {
      case "A":
        setSelect(false);
        setTable(false);
        break;
      default:
        //Buscar en Terreno el ultimo valor
        lastTerreno(tpredio);
        break;
    }
    PredioMatriz.Condicion = tpredio;
    setSelect(true);
    setTable(true);
    //Creo los Objetos con los valores del ultimo valor de terreno y unidad
    CreateObject(PredioMatriz, tpredio);
    //Actualizo loa valores que se van a mostrar en la tabla
    updateTableData(ArrayPredial);
  }
  // 4 Funcion para Crear los objetos de los numeros prediales carga  ArrayJsonBack
  function JSONtoObject(aux) {
    let sum = "";

    aux.map((item) => {
      let ObjectPredio = {
        Dpto: "",
        Mpio: "",
        Zona: "",
        Sector: "",
        Comuna: "",
        Barrio: "",
        Manzana: "",
        Terreno: "",
        Condicion: "",
        Edificio: "",
        Piso: "",
        Unidad: "",
        Direccion: [],
      };
      var cont = 0;
      //capturar los datos del numero predial
      for (let i = 0; i < item.length; i++) {
        //Departamento
        if (i <= 1) {
          sum += item[i];
          ObjectPredio.Dpto = sum;
          if (cont == 1) {
            cont = 0;
            sum = "";
          } else {
            cont++;
          }
        }
        //Municipio
        if (i >= 2 && i <= 4) {
          if (cont <= 2) {
            sum += item[i];
            ObjectPredio.Mpio = sum;
            if (cont == 2) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Zona
        if (i >= 5 && i <= 6) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Zona = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Sector
        if (i >= 7 && i <= 8) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Sector = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Comuna
        if (i >= 9 && i <= 10) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Comuna = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Barrio
        if (i >= 11 && i <= 12) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Barrio = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Manzana o Vereda
        if (i >= 13 && i <= 16) {
          if (cont <= 3) {
            sum += item[i];
            ObjectPredio.Manzana = sum;
            if (cont == 3) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Terreno
        if (i >= 17 && i <= 20) {
          if (cont <= 3) {
            sum += item[i];
            ObjectPredio.Terreno = sum;
            if (cont == 3) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Condicion
        if (i == 21) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Condicion = sum;
            if (cont == 0) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Edificio o torre
        if (i >= 22 && i <= 23) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Edificio = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Piso
        if (i >= 24 && i <= 25) {
          if (cont <= 1) {
            sum += item[i];
            ObjectPredio.Piso = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
        //Unidad
        if (i >= 26 && i <= 29) {
          if (cont <= 3) {
            sum += item[i];
            ObjectPredio.Unidad = sum;
            if (cont == 3) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
          }
        }
      }
      ArrayJsonBack.push(ObjectPredio);
    });
  }
  // 5 Buscar Ultimo Terreno mayor y modificar la posicion de terreno y unidad segun se necesite
  //Llena PredioMatriz
  function lastTerreno(aux) {
    //aux= value del select de tipo de predio
    //Llena Predio Matriz
    //Mayor Terreno
    let mayorTerreno = 0;
    //Mayor Unidad
    let mayorUnidad = 0;
    //si no se han agregado buscar en datos de bd
    if (ArrayFinal.length == 0) {
      ArrayJsonBack.map((item) => {
        PredioMatriz.Dpto = item.Dpto;
        PredioMatriz.Mpio = item.Mpio;
        PredioMatriz.Zona = item.Zona;
        PredioMatriz.Sector = item.Sector;
        PredioMatriz.Comuna = item.Comuna;
        PredioMatriz.Barrio = item.Barrio;
        PredioMatriz.Manzana = item.Manzana;
        PredioMatriz.Edificio = item.Edificio;
        PredioMatriz.Piso = item.Piso;
        //Num = item de terreno
        let numTerreno = parseInt(item.Terreno);

        //Num = item de Unidad
        let numUnidad = parseInt(item.Unidad);

        for (let p = 0; p < item.Terreno.length; p++) {
          if (p == 1 && item.Terreno[p] == 9) {
            if (numTerreno > mayorTerrenobd) {
              mayorTerrenobd = numTerreno;
            }
          } else {
            if (p == 1 && item.Terreno[p] == 8) {
              if (numTerreno > mayorTerreno8bd) {
                mayorTerreno8bd = numTerreno;
              }
            }
          }
        }
        //Si Tipo de Predio es 9
        if (aux == "9") {
          for (let i = 0; i <= item.Terreno.length; i++) {
            if (i == 1 && item.Terreno[i] == 9) {
              if (numTerreno > mayorTerreno) {
                mayorTerreno = numTerreno;
              }
              if (numUnidad > mayorUnidad) {
                mayorUnidad = numUnidad;
              }
            } else {
              if (i == 1 && item.Terreno[1] != 9) {
                if (item.Terreno[1] != 8) {
                  if (numTerreno > mayorUnidad) {
                    mayorUnidad = numTerreno;
                  }
                } else {
                  if (numUnidad > mayorUnidad) {
                    mayorUnidad = numUnidad;
                  }
                }
              }
            }
          }
          //PredioMatriz.Unidad = item.Terreno;
          let datoTerreno = mayorTerreno + 1;
          PredioMatriz.Terreno = datoTerreno.toString().padStart(4, "09");
          PredioMatriz.Unidad = mayorUnidad.toString().padStart(4, "0");
        } else {
          //Si Tipo de Predio es 8
          if (aux == "8") {
            for (let i = 0; i <= item.Terreno.length; i++) {
              if (i == 1 && item.Terreno[i] == 8) {
                if (numTerreno > mayorTerreno) {
                  mayorTerreno = numTerreno;
                }
                if (numUnidad > mayorUnidad) {
                  mayorUnidad = numUnidad;
                }
                mayorTerrenobd = mayorTerreno;
              } else {
                if (i == 1 && item.Terreno[1] != 8) {
                  if (item.Terreno[1] != 9) {
                    if (numTerreno > mayorUnidad) {
                      mayorUnidad = numTerreno;
                    }
                  } else {
                    if (numUnidad > mayorUnidad) {
                      mayorUnidad = numUnidad;
                    }
                  }
                }
              }
            }
            //PredioMatriz.Unidad = item.Terreno;
            let datoTerreno = mayorTerreno + 1;
            PredioMatriz.Terreno = datoTerreno.toString().padStart(4, "08");
            PredioMatriz.Unidad = mayorUnidad.toString().padStart(4, "0");
          } else {
            //Diferente a esos Valores
            for (let i = 0; i <= item.Terreno.length; i++) {
              if (i == 1 && item.Terreno[1] != 9 && item.Terreno[1] != 8) {
                if (numTerreno > mayorTerreno) {
                  mayorTerreno = numTerreno;
                }
                PredioMatriz.Unidad = mayorUnidad.toString().padStart(4, "0");
              } else {
                if (numUnidad > mayorUnidad) {
                  mayorUnidad = numUnidad;
                }
              }
            }
            PredioMatriz.Terreno = mayorTerreno.toString().padStart(4, "0");
            PredioMatriz.Unidad = "0000";
          }
        }
      });
      mayorUnidadbd = mayorUnidad;
    } else {
      setBttfin(false);
      //Sino hacerlo con el array Final para buscar el ultimo terreno
      ArrayFinal.map((item, index) => {
        //Num = item de terreno
        let numTerreno = parseInt(item.Terreno);
        //Num = item de Unidad
        let numUnidad = parseInt(item.Unidad);
        //Si Tipo de Predio es 9
        //Numero mayores a 900 valores del PH
        if (aux == "9") {
          mayorTerreno = mayorTerrenobd;

          for (let i = 0; i <= item.Terreno.length; i++) {
            if (i == 1 && item.Terreno[i] == 9) {
              if (numTerreno > mayorTerreno) {
                mayorTerreno = numTerreno;
              }
              if (numUnidad > mayorUnidad) {
                mayorUnidad = numUnidad;
              }
            } else {
              if (i == 1 && item.Terreno[1] != 9) {
                if (item.Terreno[1] != 8) {
                  if (numTerreno > mayorUnidad) {
                    mayorUnidad = numTerreno;
                  }
                } else {
                  if (numUnidad > mayorUnidad) {
                    mayorUnidad = numUnidad;
                  }
                }
              }
            }
          }

          /* if (numTerreno > mayorTerrenobd) {
                      numTerreno = mayorTerrenobd;
                    }*/
          //PredioMatriz.Unidad = item.Terreno;
          let datoTerreno = mayorTerreno + 1;
          PredioMatriz.Terreno = datoTerreno.toString().padStart(4, "09");
          PredioMatriz.Unidad = mayorUnidad.toString().padStart(4, "0");
        } else {
          //Si Tipo de Predio es 8
          if (aux == "8") {
            mayorTerreno = mayorTerreno8bd;
            for (let i = 0; i <= item.Terreno.length; i++) {
              if (i == 1 && item.Terreno[i] == 8) {
                if (numTerreno > mayorTerreno) {
                  mayorTerreno = numTerreno;
                }
                if (numUnidad > mayorUnidad) {
                  mayorUnidad = numUnidad;
                }
              } else {
                if (i == 1 && item.Terreno[1] != 8) {
                  if (item.Terreno[1] != 9) {
                    if (numTerreno > mayorUnidad) {
                      mayorUnidad = numTerreno;
                    }
                  } else {
                    if (numUnidad > mayorUnidad) {
                      mayorUnidad = numUnidad;
                    }
                  }
                }
              }
            }
            //PredioMatriz.Unidad = item.Terreno;
            let datoTerreno = mayorTerreno + 1;
            PredioMatriz.Terreno = datoTerreno.toString().padStart(4, "08");
            PredioMatriz.Unidad = mayorUnidad.toString().padStart(4, "0");
          } else {
            if (numTerreno < 800) {
              mayorUnidad = mayorUnidadbd;

              //mayorUnidad = 0;
              //mayorUnidad = numUnidad;
              //mayorUnidad = mayorUnidad + parseInt(inputValue);
            }

            //Diferente a esos Valores
            for (let i = 0; i <= item.Terreno.length; i++) {
              if (i == 1 && item.Terreno[1] != 9 && item.Terreno[1] != 8) {
                if (numTerreno > mayorTerreno) {
                  mayorTerreno = numTerreno;
                }
                PredioMatriz.Unidad = mayorUnidad.toString().padStart(4, "0");
              } else {
                if (numUnidad > mayorUnidad) {
                  mayorUnidad = numUnidad;
                } else {
                  numUnidad = mayorUnidad;
                }
              }
            }

            PredioMatriz.Terreno = mayorUnidad.toString().padStart(4, "0");
            PredioMatriz.Unidad = "0000";
            mayorUnidadbd = mayorTerreno + 1;
          }
        }
      });

      //mayorUnidad = mayorUnidad;
    }
  }

  // 6 Funcion para Llenar el arreglo con los datos del predio Matriz
  //Llena ArregloPredial Arreglo de los numeros generados
  function CreateObject(aux, valueaux) {
    //Aux= PredioMatriz
    //valueaux=Tipo de Predio elegido
    let valorUnidad = parseInt(aux.Unidad);
    let valorTerreno = parseInt(aux.Terreno);
    tamaño = parseInt(inputValue);
    //Reset Array Predial
    if (ArrayPredial.length >= tamaño) {
      ArrayPredial = [];
    }
    //Carga el valor que esta en el input de pregunta la cantidad de predios
    tamaño = inputValue;
    //Crea los Numeros Prediales
    for (let i = 0; i < tamaño; i++) {
      //Propiedades de Predio Matriz y creacion de objeto
      let nuevoaux = { ...aux };
      if (valueaux == 8 || valueaux == 9) {
        valorUnidad++;
        nuevoaux.Unidad = valorUnidad.toString().padStart(4, "0");
      } else {
        valorTerreno++;
        nuevoaux.Terreno = valorTerreno.toString().padStart(4, "0");
      }
      //Llena Arreglo Predial con los numeros Prediales
      ArrayPredial.push(nuevoaux);
    }
  }
  //Se Aceptan solo  Numeros
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
  }
  //Se Aceptan solo Letras
  function soloLetras(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
  }

  /////////////////////////////Formularios/////////////////////////////

  //Llenar Data
  const DataMatrizForm = () => {
    //0 Cargar data de bd
    //const [allData, setAllData] = useState([]);
    const [msjCadena, setMsjCadena] = useState("");
    const [estCadena, setEstCadena] = useState(false);
    //0 CAPTURA DE DATA MATRIZ
    const [dataMatriz, setDataMatriz] = useState("");
    const [bttCadena, setBttCadena] = useState(true);

    const datos = async () => {
      const data = await fetchData();

      let dataLength = data.last_page;
      let tempData = [];
      for (let currentPage = 1; currentPage <= dataLength; currentPage++) {
        const currentPageData = await fetchData(currentPage);
        currentPageData.data.map((item, index) => {
          tempData.push(item.numero_predial);
        });
      }
      ///////////////////////////////////////////Poner la Consulta de Local y agregar Tempdata
      setLoading(false);
      setFormState(false);
      setAllData(tempData);
      setNumPredial(dataMatriz);
    };

    const fetchData = async (currentPage) => {
      try {
        const response = await fetch(
          `http://localhost/api/v1/predio/list/numeros-prediales/${dataMatriz}?page=${currentPage}&limit=2000`,
          {
            method: "GET",
            redirect: "follow",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
    const dataDB = async () => {
      setLoading(true);
      try {
        await datos();
      } catch (error) {
        console.error("Error en dataDB:", error);
      }
    };

    //Tamaño Minimo
    function validarCadena(e) {
      soloNumeros(e);
      let { value } = e.target;
      setDataMatriz(value);
      if (value.length < 30) {
        setEstCadena(true);
        setMsjCadena(
          "Digitalizar maximo 30 Digitos van " + value.length + " Digitos"
        );
        setBttCadena(true);
      }
      if (value.length == 30) {
        e.preventDefault();
        setBttCadena(false);
        setEstCadena(false);
      }

      //return cadena.length === 20;
    }

    return (
      <div className="w-full flex flex-col mt-2">
        <div className="w-full flex flex-row ">
          <label>Digitar el numero predial</label>
          <input
            className="border-2 p-2 rounded-md w-full"
            maxLength={30}
            type="text"
            onInput={validarCadena}
            value={dataMatriz}
          ></input>
          <button
            className={`${
              bttCadena ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }
           p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
           `}
            onClick={dataDB}
            disabled={bttCadena}
          >
            Cargar
          </button>
        </div>
        {loading ? <Loader /> : null}
        {estCadena ? <label className="text-red-600">{msjCadena}</label> : null}
      </div>
    );
  };
  //Formularios
  // 1 Formulario  para despues de seleccionar el Tipo de Predio
  const ChangeDataForm = () => {
    //Estados
    //Estado de Columna
    const [numP, setNump] = useState(50);
    //Estado de Direccion

    //Funciones
    //Seleccion de Columna para generar el menu de ingreso de datos
    function UpdateForm(e) {
      setNump(e.target.value);
    }
    // Validad si el numero final es mayor al primero y que no sea mayor al tamaño
    //Funcion para cargar los valores de los ID

    return (
      <NumPreProvider>
        <div className="w-full flex flex-col">
          <div
            id="Columna"
            className="w-full
             border-2 text-center flex flex-col p-2"
          >
            <h2 className="uppercase text-lg font-bold border-b pb-2">
              Modificar Columna
            </h2>
            <div
              className="w-full mt-2 p-2
             flex flex-col h-full  items-center"
            >
              <select
                className="w-3/4 border-2 rounded-lg text-center p-1"
                onChange={UpdateForm}
                value={numP}
              >
                <option value="50"> </option>
                <option value="1">Numero Predial</option>
                <option value="3">Matricula Inmobiliaria</option>
                <option value="2">Direccion</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row">
            {numP == "2" || numP == "3" ? <IdForm /> : null}
            {numP == "1" ? <IdFormOne /> : null}
            {numP == "1" ? <NumPredialForm /> : null}
            {numP == "3" ? <ReplicarDataForm /> : null}
            {numP == "2" ? <DireccionForm /> : null}
          </div>
        </div>
      </NumPreProvider>
    );
  };
  // 2 Formulario de ID
  const IdForm = () => {
    const [inputId, setInputId] = useState("");
    const [tamaño, setTamaño] = useState(50);
    //Funcion para mostrar los datos
    /////////////////////////////////////////////////////////////////////
    function NumComa(e) {
      const input = e.target;
      let value = input.value;
      value = value.replace(/[^0-9,-]/g, ""); // Elimina caracteres no numéricos
      if (value.includes("-")) {
        coma = false;
        if (value.split("-").length <= 2) {
          //setTamaño(3);
          let aux = value.split("-");
          iniID = parseInt(aux[0]);
          finID = parseInt(aux[1]);
        }
      } else {
        setTamaño(50);
        let aux = "";
        if (value.length === 0) {
          aux = 0;
        } else {
          aux = value.split(",");
        }
        if (value.includes(",")) {
          coma = true;
          let numeros = aux.map((item) => {
            return parseInt(item);
          });

          validNumbers = numeros;
        } else {
          coma = "";
          let aux = parseInt(value);
          validNumbers = [aux];
        }
      }
      setInputId(input.value);
    }
    /*
    <input
            name="first"
            type="text"
            className="border-2 rounded-lg w-4/12 p-1"
            onChange={showDataId}
            onInput={soloNumeros}
            value={showid.first}
          ></input>
          <label className="w-2/12">-</label>
          <input
            name="second"
            type="text"
            className="border-2 rounded-lg w-4/12 p-1"
            onChange={showDataId}
            onInput={soloNumeros}
            value={showid.second}
          ></input>
    */
    return (
      <div
        id="SeleccionarID"
        className="w-1/5 border-2 text-center flex flex-col items-center p-2"
      >
        <h2 className="uppercase text-lg font-bold border-b pb-2">
          Seleccionar ID
        </h2>
        <input
          type="text"
          className="border-2 rounded-lg w-full p-1 mt-4"
          onChange={NumComa}
          maxLength={tamaño}
          value={inputId}
        ></input>
        <div className="flex flex-row items-center justify-center mt-2 p-2"></div>
      </div>
    );
  };
  const IdFormOne = () => {
    const { tableData } = useContext(TableContext);
    const { updateNumPredial } = useContext(NumPreContext);
    const { ArrayFinal } = useContext(ArrayFinalContext);
    const [uniqueData, setUniqueData] = useState("");

    function shownumData(e) {
      setUniqueData(e.target.value);
      numID = e.target.value;
    }
    function Load_Data() {
      let aux = tableData;
      let num = uniqueData - 1;

      Object.entries(aux).map((item, index) => {
        if (index == num) {
          updateNumPredial(item[1]);
        }
      });
    }
    return (
      <div
        id="SeleccionarID"
        className="w-2/5 border-2 text-center flex flex-col items-center p-2"
      >
        <h2 className="uppercase text-lg font-bold border-b pb-2">
          Seleccionar ID
        </h2>
        <div className="flex flex-row items-center justify-center mt-2 p-2">
          <input
            name="unique"
            type="text"
            className="border-2 rounded-lg w-2/3 p-1"
            onChange={shownumData}
            onInput={soloNumeros}
            value={uniqueData}
          ></input>
          <button
            className=" p-1 w-1/3 text-center rounded-md text-white bg-teal-500 text-lg ml-2"
            onClick={Load_Data}
          >
            Cargar
          </button>
        </div>
      </div>
    );
  };

  //1.1 Formulario para Editar Numero Predial
  const NumPredialForm = () => {
    const { numPredial } = useContext(NumPreContext);
    const { tableData } = useContext(TableContext);
    const [inputValues, setInputValues] = useState({
      Dpto: numPredial.Dpto || "",
      Mpio: numPredial.Mpio || "",
      Zona: numPredial.Zona || "",
      Sector: numPredial.Sector || "",
      Comuna: numPredial.Comuna || "",
      Barrio: numPredial.Barrio || "",
      Manzana: numPredial.Manzana || "",
      Terreno: numPredial.Terreno || "",
      Condicion: numPredial.Condicion || "",
      Edificio: numPredial.Edificio || "",
      Piso: numPredial.Piso || "",
      Unidad: numPredial.Unidad || "",
    });
    useEffect(() => {
      setInputValues({
        Dpto: numPredial.Dpto || "",
        Mpio: numPredial.Mpio || "",
        Zona: numPredial.Zona || "",
        Sector: numPredial.Sector || "",
        Comuna: numPredial.Comuna || "",
        Barrio: numPredial.Barrio || "",
        Manzana: numPredial.Manzana || "",
        Terreno: numPredial.Terreno || "",
        Condicion: numPredial.Condicion || "",
        Edificio: numPredial.Edificio || "",
        Piso: numPredial.Piso || "",
        Unidad: numPredial.Unidad || "",
      });
    }, [numPredial]);

    if (numPredial.length != 0) {
      function aux(e) {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
      const handleUpdateTable = (data) => {
        // Lógica para actualizar la tabla
        const newData = { ...data }; // You may replace this with your logic to update data
        updateTableData(newData);
      };
      function ReloadData() {
        const clonetable = tableData;
        Object.entries(clonetable).map((items, index) => {
          let item = items[1];
          if (numID - 1 == index) {
            item.Dpto = inputValues.Dpto;
            item.Mpio = inputValues.Mpio;
            item.Zona = inputValues.Zona;
            item.Sector = inputValues.Sector;
            item.Comuna = inputValues.Comuna;
            item.Barrio = inputValues.Barrio;
            item.Manzana = inputValues.Manzana;
            item.Terreno = inputValues.Terreno;
            item.Condicion = inputValues.Condicion;
            item.Edificio = inputValues.Edificio;
            item.Piso = inputValues.Piso;
            item.Unidad = inputValues.Unidad;
          }
        });
        handleUpdateTable(clonetable);
      }
      return (
        <div
          id="NumPredial"
          className="flex flex-col p-2  w-3/5 border-2 text-center"
        >
          <h2 className="uppercase text-lg font-bold border-b pb-2">
            Modificar Numero Predial
          </h2>
          <div>
            <div>
              <input
                name="Dpto"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Dpto"]}
                maxLength={2}
              ></input>
              <input
                name="Mpio"
                className="w-12 border-2 rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Mpio"]}
                maxLength={3}
              ></input>
              <input
                name="Zona"
                className="w-8 border-2 rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Zona"]}
                maxLength={2}
              ></input>
              <input
                name="Sector"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Sector"]}
                maxLength={2}
              ></input>
              <input
                name="Comuna"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Comuna"]}
                maxLength={2}
              ></input>
              <input
                name="Barrio"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Barrio"]}
                maxLength={2}
              ></input>
              <input
                name="Manzana"
                className="w-16 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Manzana"]}
                maxLength={4}
              ></input>
              <input
                name="Terreno"
                className="w-16 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Terreno"]}
                maxLength={4}
              ></input>
              <input
                name="Condicion"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Condicion"]}
                maxLength={1}
              ></input>
              <input
                name="Edificio"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Edificio"]}
                maxLength={2}
              ></input>
              <input
                name="Piso"
                className="w-8 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Piso"]}
                maxLength={2}
              ></input>
              <input
                name="Unidad"
                className="w-16 border-2  rounded-md text-center mr-2"
                type="text"
                onChange={aux}
                value={inputValues["Unidad"]}
                maxLength={4}
              ></input>
            </div>
            <button
              className="text-xl border-2 rounded-xl  w-1/5 bg-teal-500 text-white"
              onClick={ReloadData}
            >
              Guardar
            </button>
          </div>
        </div>
      );
    }
  };
  // 1.2 Formulario para Replicar los datos de direccion o Matricula Inmobiliaria
  const ReplicarDataForm = () => {
    let cloneArray = ArrayPredial;
    //Cambiar Data Table
    const { updateTableData } = useContext(TableContext);
    //7 Modificar Tabla
    const handleUpdateTable = (data) => {
      // Lógica para actualizar la tabla
      const newData = { ...data }; // You may replace this with your logic to update data
      updateTableData(newData);
    };
    //Estado Replicar Dato
    const [rdata, setRdata] = useState("");

    //funcion para cargar los valores de replicar
    function Replicate(e) {
      setRdata(e.target.value);
    }
    //Replicar datos
    function ReplicateData(e) {
      let sum = rdata;
      console.log("validad Data", validNumbers);
      console.log("Ini", iniID);
      console.log("Fin", finID);
      console.log("Coma", coma);
      cloneArray.map((item, index1) => {
        if (coma) {
          validNumbers.map((items) => {
            if (index1 === items - 1) {
              item.Matricula = sum;
              sum = parseInt(sum) + 1;
            }
          });
        } else {
          if (coma === false) {
            if (index1 >= iniID - 1 && index1 <= finID - 1) {
              item.Matricula = sum;
              sum = parseInt(sum) + 1;
            }
          } else {
            let valor = validNumbers[0] - 1;
            if (index1 == valor) {
              item.Matricula = sum;
            }
          }
        }
      });
      ArrayPredial = cloneArray;
      handleUpdateTable(ArrayPredial);
    }

    return (
      <div
        id="ReplicarDato"
        className="flex flex-col p-2  w-4/5 border-2 text-center"
      >
        <h2 className="uppercase text-lg font-bold border-b pb-2">
          Ingreso de Datos
        </h2>
        <label> Replicar Dato</label>
        <input
          type="text"
          name="3"
          className="border-2 rounded-lg text-center p-1 mt-2"
          onChange={Replicate}
          onInput={soloNumeros}
          value={rdata}
          maxLength={80}
        ></input>
        <button
          className="mt-2 p-2 text-center rounded-md  text-white bg-teal-500 text-base"
          onClick={ReplicateData}
        >
          Actualizar
        </button>
      </div>
    );
  };

  // 1.3 Formulario Direccion
  const DireccionForm = () => {
    //Form
    //Estado de Direccion Estructurada y No Estructurada
    const [dir, setDir] = useState(0);
    function Load_Direction(e) {
      let value = e.target.value;
      setDir(value);
    }
    return (
      <div className="flex flex-col p-2  w-4/5 border-2 text-center">
        <h2 className="uppercase text-lg font-bold border-b pb-2">Direccion</h2>
        <div className="w-full flex flex-row justify-center items-center m-1">
          <label className="m-1">Tipo de Direccion</label>
          <select
            name="tipo_direccion"
            className="border-2 rounded-lg text-center m-1"
            onChange={Load_Direction}
          >
            <option></option>
            <option value={218}>Estructurada</option>
            <option value={219}>No Estructurada</option>
          </select>
        </div>
        {dir == 218 ? <DirestForm /> : null}
        {dir == 219 ? <DirnoestForm /> : null}
      </div>
    );
  };
  //1.3.1 Formulario de Direccion Estructurada
  const DirestForm = () => {
    //Contexto de Tabla
    const { tableData, updateTableData } = useContext(TableContext);
    const [estbutton, setEstButton] = useState(true);
    //7 Modificar Tabla
    const handleUpdateTable = (data) => {
      // Lógica para actualizar la tabla
      const newData = { ...data }; // You may replace this with your logic to update data
      updateTableData(newData);
    };
    //Valores a Tener en cuanta en la Direccion
    const [direction, setDirection] = useState({
      t_id: 0,
      t_seq: null,
      tipo_direccion: 218,
      es_direccion_principal: false,
      codigo_postal: null,
      clase_via_principal: "",
      valor_via_principal: "",
      letra_via_principal: "",
      sector_ciudad: "",
      valor_via_generadora: "",
      letra_via_generadora: "",
      numero_predio: "",
      sector_predio: "",
      complemento: "",
      nombre_predio: "",
      extunidadedificcnfsica_ext_direccion_id: null,
      extinteresado_ext_direccion_id: null,
      lc_construccion_ext_direccion_id: null,
      lc_nu_spcjrdcrdsrvcios_ext_direccion_id: null,
      lc_n_spcjrdcndddfccion_ext_direccion_id: null,
      lc_terreno_ext_direccion_id: null,
      lc_unidadconstruccion_ext_direccion_id: null,
      lc_servidumbretransito_ext_direccion_id: null,
    });

    const [directData, setDirecdata] = useState({
      t_id: 0,
      t_seq: null,
      tipo_direccion: 218,
      es_direccion_principal: false,
      codigo_postal: null,
      clase_via_principal: "",
      valor_via_principal: "",
      letra_via_principal: "",
      sector_ciudad: "",
      valor_via_generadora: "",
      letra_via_generadora: "",
      numero_predio: "",
      sector_predio: "",
      complemento: "",
      nombre_predio: "",
      extunidadedificcnfsica_ext_direccion_id: null,
      extinteresado_ext_direccion_id: null,
      lc_construccion_ext_direccion_id: null,
      lc_nu_spcjrdcrdsrvcios_ext_direccion_id: null,
      lc_n_spcjrdcndddfccion_ext_direccion_id: null,
      lc_terreno_ext_direccion_id: null,
      lc_unidadconstruccion_ext_direccion_id: null,
      lc_servidumbretransito_ext_direccion_id: null,
    });

    //Carga los valores en los elementos de tabla
    function Load_Direction(e) {
      let name = e.target.name;
      let value = e.target.value;
      let nodename = e.target.nodeName;
      if (nodename === "SELECT") {
        let opt = e.target.options[e.target.selectedIndex];
        let optionName = opt.label;
        setDirecdata((prevEstado) => ({ ...prevEstado, [name]: optionName }));
      }
      if (nodename === "INPUT") {
        setDirecdata((prevEstado) => ({ ...prevEstado, [name]: value }));
      }
      setDirection((prevEstado) => ({ ...prevEstado, [name]: value }));
    }
    //Recarga la Tabla con los valores agregados
    ////////////////////
    function ReloadDataDirection() {
      ArrayPredial.map((items, index) => {
        if (coma) {
          validNumbers.map((item) => {
            if (index === item - 1) {
              items.Direccion = direction;
            }
          });
        } else {
          if (coma === false) {
            if (index >= iniID - 1 && index <= finID - 1) {
              items.Direccion = direction;
            }
          } else {
            let valor = validNumbers[0] - 1;
            if (index == valor) {
              items.Direccion = direction;
              console.log("valor " + valor + "Index" + index);
            }
          }
        }
      });
      handleUpdateTable(ArrayPredial);
    }
    useEffect(() => {
      if (
        directData.clase_via_principal.length != 0 &&
        directData.valor_via_generadora.length != 0 &&
        directData.valor_via_principal.length != 0 &&
        directData.numero_predio.length != 0
      ) {
        setEstButton(false);
      } else {
        setEstButton(true);
      }
    }, [directData]);
    return (
      <div>
        <div className="w-full flex flex-row justify-center items-center">
          <div name="clase" className="w-1/12 flex flex-col m-1">
            <label>Clase</label>
            <select
              name="clase_via_principal"
              className="border-2 rounded-lg text-center"
              onChange={Load_Direction}
              value={direction.clase}
            >
              <option></option>
              <option value="688">Avenida calle</option>
              <option value="689">Avenida carrera</option>
              <option value="690">Avenida</option>
              <option value="691">Autopista</option>
              <option value="692">Circunvalar</option>
              <option value="693">Calle</option>
              <option value="694">Carrera</option>
              <option value="695">Diagonal</option>
              <option value="696">Transversal</option>
              <option value="697">Circular</option>
            </select>
          </div>
          <div name="Valor" className=" w-1/12 flex flex-col m-1">
            <label>Valor</label>
            <input
              name="valor_via_principal"
              type="text"
              className="border-2 rounded-lg text-center"
              onChange={Load_Direction}
              onInput={soloNumeros}
              value={direction.valor1}
            ></input>
          </div>
          <div name="Letra" className=" w-1/12 flex flex-col m-1">
            <label>Letra</label>
            <input
              name="letra_via_principal"
              type="text"
              className="border-2 rounded-lg text-center"
              onChange={Load_Direction}
              onInput={soloLetras}
              value={direction.letra1}
            ></input>
          </div>
          <div className="w-2/12 flex flex-col m-1">
            <label>Sector</label>
            <select
              name="sector_ciudad"
              className="border-2 rounded-lg text-center"
              onChange={Load_Direction}
              value={direction.sector1}
            >
              <option></option>
              <option value="881">Norte</option>
              <option value="882">Sur</option>
              <option value="883">Este</option>
              <option value="884">Oeste</option>
            </select>
          </div>
          <div name="Valor2" className=" w-1/12 flex flex-col m-1">
            <label>Valor</label>
            <input
              name="valor_via_generadora"
              type="text"
              onChange={Load_Direction}
              value={direction.valor2}
              onInput={soloNumeros}
              className="border-2 rounded-lg text-center"
            ></input>
          </div>
          <div className=" w-1/12 flex flex-col m-1">
            <label>Letra</label>
            <input
              name="letra_via_generadora"
              type="text"
              onChange={Load_Direction}
              onInput={soloLetras}
              value={direction.letra2}
              className="border-2 rounded-lg text-center"
            ></input>
          </div>
          <div className=" w-1/12 flex flex-col m-1">
            <label>No</label>
            <input
              name="numero_predio"
              onChange={Load_Direction}
              value={direction.numero}
              onInput={soloNumeros}
              type="text"
              className="border-2 rounded-lg text-center"
            ></input>
          </div>
          <div className="w-2/12 flex flex-col m-1">
            <label>Sector</label>
            <select
              name="sector_predio"
              className="border-2 rounded-lg text-center"
              onChange={Load_Direction}
              value={direction.sector2}
            >
              <option></option>
              <option value="752">Norte</option>
              <option value="753">Sur</option>
              <option value="754">Este</option>
              <option value="755">Oeste</option>
            </select>
          </div>
          <div className=" w-2/12 flex flex-col m-1">
            <label>Complemento</label>
            <input
              name="complemento"
              type="text"
              onChange={Load_Direction}
              value={direction.complemento}
              className="border-2 rounded-lg text-center"
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div name="Preview" className="w-1/2 flex flex-col">
            <label> Vista previa</label>
            <div className="w-full flex flex-row text-center items-center justify-center">
              {Object.entries(directData).map((item, index) => {
                if (
                  item[0] == "clase_via_principal" ||
                  item[0] == "valor_via_principal" ||
                  item[0] == "letra_via_principal" ||
                  item[0] == "sector_ciudad" ||
                  item[0] == "valor_via_generadora" ||
                  item[0] == "letra_via_generadora" ||
                  item[0] == "numero_predio" ||
                  item[0] == "sector_predio" ||
                  item[0] == "complemento"
                ) {
                  return (
                    <label className="mr-2" key={index}>
                      {item[1]}{" "}
                    </label>
                  );
                }
              })}
            </div>
          </div>
          <div className="w-1/2">
            <button
              className={`${
                estbutton ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }
                 p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
                 `}
              onClick={ReloadDataDirection}
              disabled={estbutton}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    );
  };
  //1.3.2 Formulario de Direccion No Estructurada
  const DirnoestForm = () => {
    const { updateTableData } = useContext(TableContext);

    const [directData, setDirecdata] = useState({
      t_id: 0,
      t_seq: null,
      tipo_direccion: 219,
      es_direccion_principal: false,
      codigo_postal: null,
      clase_via_principal: "",
      valor_via_principal: "",
      letra_via_principal: "",
      sector_ciudad: "",
      valor_via_generadora: "",
      letra_via_generadora: "",
      numero_predio: "",
      sector_predio: "",
      complemento: "",
      nombre_predio: "",
      extunidadedificcnfsica_ext_direccion_id: null,
      extinteresado_ext_direccion_id: null,
      lc_construccion_ext_direccion_id: null,
      lc_nu_spcjrdcrdsrvcios_ext_direccion_id: null,
      lc_n_spcjrdcndddfccion_ext_direccion_id: null,
      lc_terreno_ext_direccion_id: null,
      lc_unidadconstruccion_ext_direccion_id: null,
      lc_servidumbretransito_ext_direccion_id: null,
    });
    const [datanom, setDataNom] = useState("");

    const handleUpdateTable = (data) => {
      // Lógica para actualizar la tabla
      const newData = { ...data }; // You may replace this with your logic to update data
      updateTableData(newData);
    };
    function LoadDataNom(e) {
      const { value } = e.target;
      setDataNom(value);
    }

    function LoadDirection() {
      ArrayPredial.map((items, index) => {
        if (coma) {
          validNumbers.map((item) => {
            if (index === item - 1) {
              directData.nombre_predio = datanom;
              items.Direccion = directData;
            }
          });
        } else {
          if (coma === false) {
            if (index >= iniID - 1 && index <= finID - 1) {
              directData.nombre_predio = datanom;
              items.Direccion = directData;
            }
          } else {
            let valor = validNumbers[0] - 1;
            if (index == valor) {
              directData.nombre_predio = datanom;
              items.Direccion = directData;
              console.log("valor " + valor + "Index" + index);
            }
          }
        }
      });

      handleUpdateTable(ArrayPredial);
    }

    return (
      <div className="flex flex-row items-center justify-center">
        <h2>Nombre Predio</h2>
        <input
          type="text"
          className="border-2 rounded-lg text-center p-1 ml-2"
          onChange={LoadDataNom}
          value={datanom}
        ></input>
        <button
          className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg mr-2 ml-2"
          onClick={LoadDirection}
        >
          Cargar
        </button>
      </div>
    );
  };
  // 2 Generacion de una Tabla con los datos tabledata son los datos que se van a mostrar
  const TableForm = () => {
    //Contexto de la tabla
    const { tableData } = useContext(TableContext);
    const filas = Object.entries(tableData).map((items, index) => {
      let item = items[1];
      let direccionText = "";
      let cont = 0;
      /////////////////////////////////////
      function validadData() {
        const datosArray = Object.values(tableData);
        datosArray.map((item, index) => {
          if (item.Matricula && item.Direccion.length != 0) {
            cont = 0;
          } else {
            cont++;
          }
        });

        if (cont == 0 && !bttchange) {
          setBttload(false);
        } else {
          setBttload(true);
        }
      }
      ////////////////////
      useEffect(() => {
        validadData();
      }, [tableData]);
      if (item.Direccion.length !== 0) {
        //<td className="border-2 rounded-xl p-2">{item.Direccion}</td>;
        let previa = item.Direccion;
        if (previa.tipo_direccion == 218) {
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
          direccionText =
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
        } else {
          direccionText = previa.nombre_predio;
        }
      }
      return (
        <tr key={index}>
          <td className="border-2 rounded-xl p-2">{index + 1}</td>
          <td className="border-2 rounded-xl p-2">
            {item.Dpto}-{item.Mpio}-{item.Zona}-{item.Sector}-{item.Comuna}-
            {item.Barrio}-{item.Manzana}-{item.Terreno}-{item.Condicion}-
            {item.Edificio}-{item.Piso}-{item.Unidad}
          </td>
          <td className="border-2 rounded-xl p-2">{item.Matricula}</td>
          <td className="border-2 rounded-xl p-2">{direccionText}</td>
        </tr>
      );
    });
    return (
      <div className="w-full flex flex-row mt-4 overflow-auto">
        <table className="w-full text-center">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl p-2">ID</th>
              <th className="border-2 rounded-xl p-2">Número Predial</th>
              <th className="border-2 rounded-xl p-2">
                Matricula Inmobiliaria
              </th>
              <th className="border-2 rounded-xl p-2"> Dirección</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </div>
    );
  };

  //Form Boton Inferior de Agregar y Terminar

  const ChangeForm = () => {
    const { ArrayFinal, updateArrayFinal } = useContext(ArrayFinalContext);
    const [dataRel, setDataRel] = useState({
      numeros_relacion: [],
    });
    const [estLoading, setEstLoading] = useState(false);
    const [msjLoading, setMsjLoading] = useState("");

    const [dataReturn, setDataReturn] = useState(50);
    const modalLoadRef = useRef();
    let ArrayTemp = [];
    function updateDataReturn(newData) {
      setDataReturn(newData);
    }
    const openModalLoad = () => {
      modalLoadRef.current.openModal();
    };
    const closeModalLoad = () => {
      modalLoadRef.current.closeModal();
    };
    useEffect(() => {
      if (dataReturn === 1) {
        updateArrayFinal(ArrayTemp);
        updateTableData(ArrayFinal);
        setBttChange(true);
        setBttfin(false);
        setInputValue("");
        setTpredio("A");
        setSelect(false);
      } else {
        if (dataReturn === 0) {
          setEstLoading(true);
          console.log(ArrayFinal);
          let Json = {
            numeros_prediales: [],
          };
          ArrayFinal.map((item, index) => {
            let newobj = {
              numero_predial:
                item.Dpto +
                item.Mpio +
                item.Zona +
                item.Sector +
                item.Comuna +
                item.Barrio +
                item.Manzana +
                item.Terreno +
                item.Condicion +
                item.Edificio +
                item.Piso +
                item.Unidad,
              matricula_inmobiliaria: item.Matricula,
              extdireccion: item.Direccion,
            };
            Json.numeros_prediales.push(newobj);
          });
          console.log();
          sendNumPredial(JSON.stringify(Json));
        }
      }
    }, [dataReturn]);
    async function sendNumPredial(json) {
      ///////Crear Predios
      setMsjLoading("Creando Predios");
      const response = await addPredio(json);
      console.log("Respuesta de agregar Predio", response);
      if (response.success) {
        ArrayFinal.map((item, index) => {
          item.idNumPredial = response.data[index];
        });
        console.log("Array Final", ArrayFinal);
        ///////Crear Pedir Numeros Homologados
        setMsjLoading("Cargando Datos Homologados");
        const responseHom = await addDataHomo();
        if (responseHom.success) {
          const data = responseHom.data;
          ArrayFinal.map((item, index) => {
            console.log("carga datos", item);
            item.codigo_homologado = data[index].numeros_homologados;
          });

          ///////Relacionar Predios y Numeros Homologados
          setMsjLoading(
            " Cargando -> Relacionando Numero Predial - Datos Homologados"
          );
          const responseRel = await reDataHomoPredial();
          if (responseRel.success) {
            setEstLoading(false);
            Navigate("/LoadData");
          } else {
            setMsjLoading("Error");
          }
        } else {
          setMsjLoading("Error");
        }

        updateTableData(ArrayFinal);
      } else {
        setMsjLoading("Error");
      }

      /////Redirigir Pagina
    }

    function addData() {
      openModalLoad();
      ArrayTemp = ArrayFinal;
      ArrayPredial.map((item, index) => {
        ArrayTemp.push(item);
      });
    }

    //Llenar primero Store Numero Predial
    async function addPredio(json) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = json;
      let url = import.meta.env.VITE_API_URL_FIRST + "predio/numeros-prediales";
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const result = await response.json();
          return result;
          console.log(result);
        } else {
          throw new Error("Error en la solicitud");
          return "Error en la Solicitud";
        }
      } catch (error) {
        console.log("Error:", error);
        return "Error en la Solicitud" + error;
      }
    }
    //Llamar Datos Homologados
    async function addDataHomo() {
      try {
        const url =
          import.meta.env.VITE_API_URL_FIRST +
          "predio/numeros-homologados?limit=" +
          ArrayFinal.length;
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const result = await response.json();
          return result;
        } else {
          const error = await response.json();
          console.log("Error en la solicitud:", error);
          return error;
        }
        console.log("Tamaño", url);
      } catch (error) {
        console.log("Error en la solicitud:", error);
        return error;
      }
    }

    async function reDataHomoPredial() {
      const json = {
        numeros_relacion: [],
      };
      ArrayFinal.map((item, index) => {
        let newObj = {
          numero_predial: item.idNumPredial,
          numero_homologado: parseInt(item.codigo_homologado),
        };
        json.numeros_relacion.push(newObj);
      });
      try {
        const url =
          import.meta.env.VITE_API_URL_FIRST +
          "predio/numeros-prediales/numeros-homologados";
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify(json);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const result = await response.json();
          return result;
          console.log(result);
        } else {
          const error = await response.json();
          console.log("error", error);
          return error;
        }
      } catch (error) {
        return error;
        console.log("Error en la solicitud:", error);
      }
    }
    /*      <Link to="/LoadData">
          <button
            className={`${
              bttfin ? "opacity-50 cursor-not-allowed" : "opacity-100"
            } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
            disabled={bttfin}
            onClick={addDataHomo}
          >
            Siguiente
          </button>
        </Link> 
        */
    return (
      <div className="flex flex-row justify-center mt-2 w-full p-2">
        <button
          className={`${
            bttload ? "opacity-50 cursor-not-allowed" : "opacity-100"
          } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          onClick={addData}
          disabled={bttload}
        >
          Agregar Predios
        </button>
        {estLoading ? (
          <label className="text-3xl text-indigo-600 font-bold transform inline-block animate-bounce">
            {msjLoading}
          </label>
        ) : null}
        <ModalData ref={modalLoadRef} onChange={updateDataReturn} />
      </div>
    );
  };

  //UseEffect
  //Actualizar valor tamaño si se modifica el valor del input
  useEffect(() => {
    let aux = parseInt(inputValue);
    if (tamaño != aux) {
      tamaño = 0;
    }
  }, [itemchange]);

  //Return General
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-4xl">Iniciar Desenglobe</h1>
      <DataMatrizForm />

      {!formState ? (
        <div className="w-full">
          <div className="w-full flex flex-row items-center justify-center">
            <label className="font-semibold text-2xl">Numero Manzana : </label>
            <label className="text-2xl ml-4"> {nomNumPredial}</label>
          </div>
          <div className="w-full flex flex-row">
            <div
              id="Pregunta"
              className="flex flex-row w-2/5 items-start mt-2 mb-2 p-2"
            >
              <div className="flex flex-col w-full justify-start">
                <label>Numero de predios a segregar al predio matriz</label>
                <input
                  className="border-2 p-2 rounded-md w-full"
                  type="text"
                  onChange={inputLength}
                  onInput={soloNumeros}
                  value={inputValue}
                ></input>
              </div>
            </div>
            <div
              id="Tipo_Predio"
              className="flex flex-col w-2/5 items-start mt-2 mb-2 p-2"
            >
              <label>Selecciona el tipo de predio</label>
              <select
                className="w-full p-2 border-2 rounded-md"
                onChange={ItemSelect}
                value={tpredio}
              >
                <option value="A"></option>
                <option value="0" className="text-center">
                  NPH
                </option>
                <option value="9" className="text-center">
                  PH
                </option>
                <option value="8" className="text-center">
                  Condominio
                </option>
                <option value="7" className="text-center">
                  Parques Cementerios
                </option>
                <option value="5" className="text-center">
                  Mejoras por edificaciones en terreno ajeno de propiedades no
                  reglamentadas en PH{" "}
                </option>
                <option value="4" className="text-center">
                  Vias
                </option>
                <option value="3" className="text-center">
                  Bienes de uso público diferentes a las vias
                </option>
              </select>
            </div>
            <div className="flex flex-col  w-1/5  mt-2 mb-2 p-2">
              <label className="text-white">-</label>
              <button
                className={`${
                  bttgen ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }
               p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
               `}
                onClick={ShowData}
                disabled={bttgen}
              >
                Generar No. Prediales
              </button>
            </div>
          </div>
          {select ? <ChangeDataForm /> : null}
          <TableForm />
          {table && <ChangeForm />}
        </div>
      ) : null}
    </div>
  );
};
