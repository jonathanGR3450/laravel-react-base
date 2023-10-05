import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faL,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import DataJson from "../Json/numeros.json";
import { TableContext, TableProvider } from "./Context/Context";
//Objetos base con los datos que se necesitan
const PredioMatriz = {
  Dpto: "25",
  Mpio: "290",
  Zona: "01",
  Sector: "00",
  Comuna: "00",
  Barrio: "00",
  Manzana: "0069",
  Terreno: "0000",
  Condicion: "0",
  Edificio: "00",
  Piso: "00",
  Unidad: "0000",
  Matricula: "",
  Direccion: "",
};
//Tamaño de predios segregados
let tamaño = 0;
//Array Final
let ArrayFinal = [];
//Array de datos Generados
let ArrayPredial = [];
//Array de los datos
let ArrayJsonBack = [];
//ID iNICIAL Y FINAL
let iniID = 0;
let finID = 0;
let numID = 500;
//Terrenos y unidades mayores en bd
let mayorTerrenobd = 0;
let mayorTerreno8bd = 0;
let mayorUnidadbd = 0;

export const NumPredialForm = () => {
  //Estados
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
  // estado Boton terminaro
  const [bttfin, setBttfin] = useState(true);
  //Estado Boton Actualizar
  //const [bact, setBact] = useState(true);
  //Contexto de la tabla
  const { tableData, numPredial, updateTableData } = useContext(TableContext);
  //Eventos o Funciones
  //GENERACION DE NUMEROS PREDIALES
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
  function ShowData() {
    setBttgen(true);
    setBttload(false);
    let aux = "";
    if (ArrayFinal.length == 0) {
      aux = DataJson.numeros_prediales;
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
        //Buscar en Terreno el ultimo valor que tenga 900
        lastTerreno(tpredio);
        break;
    }
    PredioMatriz.Condicion = tpredio;
    //Clono el arreglo modificado con los ultimos numeros
    const clonePMatriz = PredioMatriz;
    setSelect(true);
    setTable(true);
    CreateObject(clonePMatriz, tpredio);
    updateTableData(ArrayPredial);
  }
  // 4 Funcion para Crear los objetos de los numeros prediales carga  ArrayJsonBack
  function JSONtoObject(aux) {
    aux.map((item) => {
      let sum = "";
      const ObjectPredio = {
        Dpto: "00",
        Mpio: "000",
        Zona: "00",
        Sector: "00",
        Comuna: "00",
        Barrio: "00",
        Manzana: "0069",
        Terreno: "0000",
        Condicion: "0",
        Edificio: "00",
        Piso: "00",
        Unidad: "0000",
      };
      var cont = 0;
      //capturar los datos del numero predial
      for (let i = 0; i < item.length; i++) {
        //Departamento
        if (i <= 1) {
          if (cont == 1) {
            sum += item[i];
            ObjectPredio.Dpto = sum;
            if (cont == 1) {
              cont = 0;
              sum = "";
            } else {
              cont++;
            }
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
            } else {
              cont++;
            }
          }
        }
      }
      //Llena los datos en ArrayJsonBack
      ArrayJsonBack.push(ObjectPredio);
    });
  }
  // 5 Buscar Ultimo Terreno mayor y modificar la posicion de terreno y unidad segun se necesite
  function lastTerreno(aux) {
    //aux= value del select de tipo de predio
    //Llena Predio Matriz
    //Mayor Terreno
    let mayorTerreno = 0;
    //Mayor Unidad
    let mayorUnidad = 0;

    //si no se han agregado buscar en datos de bd
    if (ArrayFinal.length == 0) {
      ArrayJsonBack.map((item, index) => {
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
            PredioMatriz.Terreno = mayorUnidad.toString().padStart(4, "0");
            PredioMatriz.Unidad = "0000";
          }
        }
      });
      mayorUnidadbd = mayorUnidad;
    } else {
      setBttfin(false);
      //Sino hacerlo con el array Final para buscar el ultimo terreno
      ArrayFinal.map((items, index) => {
        console.log("tamaño", items.length);
        items.map((item, index) => {
          //Num = item de terreno
          let numTerreno = parseInt(item.Terreno);
          //Num = item de Unidad
          let numUnidad = parseInt(item.Unidad);
          //Si Tipo de Predio es 9
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
                numUnidad = mayorUnidadbd;
                mayorUnidad = mayorUnidad + parseInt(inputValue);
              }

              //mayorUnidad = mayorUnidadbd + parseInt(inputValue);
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
              PredioMatriz.Terreno = mayorUnidad.toString().padStart(4, "0");
              PredioMatriz.Unidad = "0000";
            }
          }
        });
      });
      //mayorUnidad = mayorUnidad;
    }
  }
  // 6 Funcion para Llenar el arreglo con los datos del predio Matriz
  function CreateObject(aux, valueaux) {
    let valorUnidad = parseInt(aux.Unidad);
    let valorTerreno = parseInt(aux.Terreno);
    if (ArrayPredial.length >= tamaño) {
      ArrayPredial = [];
    }
    //Carga el valor que esta en el input de pregunta la cantidad de predios
    tamaño = inputValue;
    //Crea los Numeros Prediales
    for (let i = 0; i < tamaño; i++) {
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
  //Solo Numeros
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
  }
  //Solo Letras
  function soloLetras(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
  }
  //Capturar Valores de direccion

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
          {numP == "2" || numP == "3" || numP == "1" ? (
            <IdForm data={numP} />
          ) : null}
          {numP == "1" ? <NumPredialForm /> : null}
          {numP == "3" ? <ReplicarDataForm /> : null}
          {numP == "2" ? <DireccionForm /> : null}
        </div>
      </div>
    );
  };
  // 2 Formulario de ID
  const IdForm = ({ data }) => {
    //mostrar los datos de id
    const [showid, setShowid] = useState({
      first: "",
      second: "",
      unique: "",
    });
    //Funcion para mostrar los datos
    function showDataId(e) {
      setShowid({ ...showid, [e.target.name]: e.target.value });
      if (e.target.name == "first") {
        iniID = e.target.value;
      }
      if (e.target.name == "second") {
        finID = e.target.value;
      }
    }
    function shownumData(e) {
      setShowid({ ...showid, [e.target.name]: e.target.value });
      numID = e.target.value;
      console.log(numID);
    }
    if (data != "1") {
      return (
        <div
          id="SeleccionarID"
          className="w-1/5 border-2 text-center flex flex-col items-center p-2"
        >
          <h2 className="uppercase text-lg font-bold border-b pb-2">
            Seleccionar ID
          </h2>
          <div className="flex flex-row items-center justify-center mt-2 p-2">
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
          </div>
        </div>
      );
    } else {
      const { tableData, updateNumPredial } = useContext(TableContext);
      function Load_Data() {
        let aux = tableData;
        let num = showid.unique - 1;
        aux.map((item, index) => {
          if (index == num) {
            updateNumPredial(item);
          }
        });
      }
      return (
        <div
          id="SeleccionarID"
          className="w-4/5 border-2 text-center flex flex-col items-center p-2"
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
              value={showid.unique}
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
    }
  };
  //1.1 Formulario para Editar Numero Predial
  const NumPredialForm = () => {
    const {
      Dpto,
      Mpio,
      Zona,
      Sector,
      Comuna,
      Barrio,
      Manzana,
      Terreno,
      Condicion,
      Edificio,
      Piso,
      Unidad,
    } = numPredial;
    console.log("prueba", numPredial.Dpto);
    function aux(e) {}
    return (
      <div
        id="NumPredial"
        className="flex flex-col p-2  w-2/3 border-2 text-center"
      >
        <h2 className="uppercase text-lg font-bold border-b pb-2">
          Modificar Numero Predial
        </h2>
        <div>
          {" "}
          <div>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Dpto}
              maxLength={2}
            ></input>
            <input
              className="w-12 border-2 rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Mpio}
              maxLength={3}
            ></input>
            <input
              className="w-8 border-2 rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Zona}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Sector}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Comuna}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Barrio}
              maxLength={2}
            ></input>
            <input
              className="w-16 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Manzana}
              maxLength={4}
            ></input>
            <input
              className="w-16 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Terreno}
              maxLength={4}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Condicion}
              maxLength={1}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Edificio}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Piso}
              maxLength={2}
            ></input>
            <input
              className="w-16 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={Unidad}
              maxLength={4}
            ></input>
          </div>
          <button className="text-xl border-2 rounded-xl  w-1/5 bg-teal-500 text-white">
            Guardar
          </button>
        </div>
      </div>
    );
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
      console.log("Nuevos Datos", newData);
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
      cloneArray.map((item, index) => {
        if (index >= parseInt(iniID) - 1 && index <= parseInt(finID) - 1) {
          item.Matricula = sum;
          sum = parseInt(sum) + 1;
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
          maxLength={6}
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
      let name = e.target.name;
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
    //7 Modificar Tabla
    const handleUpdateTable = (data) => {
      // Lógica para actualizar la tabla
      const newData = { ...data }; // You may replace this with your logic to update data
      console.log("Nuevos Datos", newData);
      updateTableData(newData);
    };
    //Valores a Tener en cuanta en la Direccion
    const [direction, setDirection] = useState({
      t_id: 0,
      t_seq: null,
      tipo_direccion: 0,
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
      tipo_direccion: 0,
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
    function ReloadDataDirection(e) {
      let data = "";
      console.log(iniID + " - " + finID);
      ArrayPredial.map((items, index) => {
        if (index >= parseInt(iniID) - 1 && index <= parseInt(finID) - 1) {
          Object.entries(directData).map((item, index) => {
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
              data = data + " " + item[1];
              items.Direccion = data;
              console.log("datos", data);
            }
          });
        } else {
          items.Direccion = items.Direccion;
        }
        data = "";
      });

      console.log("Datos de predial", ArrayPredial);
      handleUpdateTable(ArrayPredial);
      console.log("Datos de Tabla", tableData);
    }

    return (
      <div>
        <div className="w-full flex flex-row justify-center items-center">
          <div name="clase" className="w-2/12 flex flex-col m-1">
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
          <div className=" w-3/12 flex flex-col m-1">
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
              className="mt-1 p-2 text-center rounded-md  text-white bg-teal-500 text-base"
              onClick={ReloadDataDirection}
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
    return <div></div>;
  };
  // 2 Generacion de una Tabla con los datos tabledata son los datos que se van a mostrar
  const TableForm = () => {
    let arrayAux = tableData;
    function aux(e) {}
    const filas = Object.entries(arrayAux).map((items, index) => {
      let item = items[1];
      return (
        <tr key={index}>
          <td className="border-2 rounded-xl p-2">{index + 1}</td>
          <td className="border-2 rounded-xl p-2">
            {item.Dpto}-{item.Mpio}-{item.Zona}-{item.Sector}-{item.Comuna}-
            {item.Barrio}-{item.Manzana}-{item.Terreno}-{item.Condicion}-
            {item.Edificio}-{item.Piso}-{item.Unidad}
          </td>
          <td className="border-2 rounded-xl p-2">{item.Matricula}</td>
          <td className="border-2 rounded-xl p-2">{item.Direccion}</td>
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
    function addData() {
      let newDataTable = [];
      ArrayFinal.push(ArrayPredial);
      console.log("Arreglo Final ", ArrayFinal);
      ArrayFinal.map((item, index) => {
        item.map((items, index) => {
          newDataTable.push(items);
        });
      });
      console.log("new Data table ", newDataTable);
      updateTableData(newDataTable);
      setBttload(true);
    }
    return (
      <div className="flex flex-row-reverse mt-2 w-full p-2">
        <button
          className={`${
            bttfin ? "opacity-50 cursor-not-allowed" : "opacity-100"
          } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          disabled={bttfin}
        >
          Terminar
        </button>
        <button
          className={`${
            bttload ? "opacity-50 cursor-not-allowed" : "opacity-100"
          } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          onClick={addData}
          disabled={bttload}
        >
          Agregar
        </button>
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
      <div className="w-full flex flex-row">
        <div
          id="Pregunta"
          className="flex flex-row w-2/5 items-start mt-2 mb-2 p-2"
        >
          <div className="flex flex-col w-full justify-start">
            <label>¿En cuantos predios desea segregar al predio matriz ?</label>
            <input
              className="border-2 p-2 rounded-md w-full"
              type="text"
              onChange={inputLength}
              onInput={soloNumeros}
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
      {select && <ChangeDataForm />}
      <TableForm />
      {table && <ChangeForm />}
    </div>
  );
};
/*  
   const EditForm = ({ data, index }) => {
      let item = data;
      let i = index;
      return (
        <td className="border-2 rounded-xl p-2" id={i}>
          <div>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Dpto}
              maxLength={2}
            ></input>
            <input
              className="w-12 border-2 rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Mpio}
              maxLength={3}
            ></input>
            <input
              className="w-8 border-2 rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Zona}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Sector}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Comuna}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Barrio}
              maxLength={2}
            ></input>
            <input
              className="w-16 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Manzana}
              maxLength={4}
            ></input>
            <input
              className="w-16 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Terreno}
              maxLength={4}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Condicion}
              maxLength={1}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Edificio}
              maxLength={2}
            ></input>
            <input
              className="w-8 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Piso}
              maxLength={2}
            ></input>
            <input
              className="w-16 border-2  rounded-md text-center mr-2"
              type="text"
              onChange={aux}
              value={item.Unidad}
              maxLength={4}
            ></input>
          </div>
          <button
            className="text-xl border-2 rounded-xl  w-1/5 bg-teal-500 text-white"
            onClick={generarEdit}
          >
            Guardar
          </button>
        </td>
      );
    };
const NoEditForm = ({ data, index }) => {
      let item = data;
      let i = index;

      return (
        <td className="border-2 rounded-xl p-2 w-5/12" name={i}>
          <div className="w-full flex flex-row items-center justify-center">
            <label className="w-4/5">
              {item.Dpto}-{item.Mpio}-{item.Zona}-{item.Sector}-{item.Comuna}-
              {item.Barrio}-{item.Manzana}-{item.Terreno}-{item.Condicion}-
              {item.Edificio}-{item.Piso}-{item.Unidad}{" "}
            </label>
            <button
              className="text-xl border-2 rounded-xl  w-1/5 bg-teal-500 text-white"
              onClick={generarEdit}
              name={i}
            >
              Editar
            </button>
          </div>
        </td>
      );
    }; */
/* 

{
  "numeros_prediales": [
    "252900100000000110007000000000",
    "252900100000000110008000000000",
    "252900100000000110019000000000",
    "252900100000000110901900000020",
    "252900100000000110021000000000",
    "252900100000000110023000000000",
    "252900100000000110025000000000",
    "252900100000000110026000000000",
    "252900100000000110027000000000",
    "252900100000000110036000000000",
    "252900100000000110038000000000",
    "252900100000000110039000000000",
    "252900100000000110040000000000",
    "252900100000000110041000000000",
    "252900100000000110042000000000",
    "252900100000000110043000000000",
    "252900100000000110044000000000",
    "252900100000000110045000000000",
    "252900100000000110046000000000",
    "252900100000000110047000000000",
    "252900100000000110048000000000",
    "252900100000000110049000000000",
    "252900100000000110050000000000",
    "252900100000000110051000000000",
    "252900100000000110052000000000",
    "252900100000000110053000000000",
    "252900100000000110054000000000",
    "252900100000000110055000000000",
    "252900100000000110070000000000",
    "252900100000000110071000000000",
    "252900100000000110072000000000",
    "252900100000000110073000000000",
    "252900100000000110901900000074",
    "252900100000000110075000000000",
    "252900100000000110076000000000",
    "252900100000000110077000000000",
    "252900100000000110078000000000",
    "252900100000000110079000000000",
    "252900100000000110080000000000",
    "252900100000000110081000000000",
    "252900100000000110082000000000",
    "252900100000000110083000000000",
    "252900100000000110084000000000",
    "252900100000000110085000000000",
    "252900100000000110086000000000",
    "252900100000000110087000000000",
    "252900100000000110098000000000",
    "252900100000000110099000000000",
    "252900100000000110106000000000",
    "252900100000000110109000000000",
    "252900100000000110110000000000",
    "252900100000000110111000000000",
    "252900100000000110112000000000",
    "252900100000000110902900000113",
    "252900100000000110902900000114",
    "252900100000000110115000000000",
    "252900100000000110117000000000",
    "252900100000000110118000000000",
    "252900100000000110119000000000",
    "252900100000000110120000000000",
    "252900100000000110121000000000",
    "252900100000000110122000000000",
    "252900100000000110123000000000",
    "252900100000000110124000000000",
    "252900100000000110131000000000",
    "252900100000000110132000000000",
    "252900100000000110133000000000",
    "252900100000000110134000000000",
    "252900100000000110135000000000",
    "252900100000000110136000000000",
    "252900100000000110137000000000",
    "252900100000000110138000000000",
    "252900100000000110139000000000",
    "252900100000000110140000000000",
    "252900100000000110141000000000",
    "252900100000000110142000000000",
    "252900100000000110143000000000",
    "252900100000000110144000000000",
    "252900100000000110145000000000",
    "252900100000000110146000000000",
    "252900100000000110147000000000",
    "252900100000000110148000000000",
    "252900100000000110903900000149",
    "252900100000000110903900000150",
    "252900100000000110903900000151",
    "252900100000000110903900000152",
    "252900100000000110903900000153",
    "252900100000000110903900000154",
    "252900100000000110903900000155",
    "252900100000000110903900000156",
    "252900100000000110903900000157",
    "252900100000000110903900000158",
    "252900100000000110903900000159",
    "252900100000000110903900000160",
    "252900100000000110903900000161",
    "252900100000000110903900000162",
    "252900100000000110903900000163",
    "252900100000000110903900000164",
    "252900100000000110903900000165",
    "252900100000000110903900000166",
    "252900100000000110903900000167",
    "252900100000000110903900000168",
    "252900100000000110903900000169",
    "252900100000000110903900000170",
    "252900100000000110903900000171",
    "252900100000000110903900000172",
    "252900100000000110903900000173",
    "252900100000000110903900000174",
    "252900100000000110903900000175",
    "252900100000000110903900000176",
    "252900100000000110903900000177",
    "252900100000000110903900000178",
    "252900100000000110903900000179",
    "252900100000000110903900000180",
    "252900100000000110903900000181",
    "252900100000000110903900000182",
    "252900100000000110903900000183",
    "252900100000000110903900000184",
    "252900100000000110903900000185",
    "252900100000000110903900000186",
    "252900100000000110903900000187",
    "252900100000000110903900000188",
    "252900100000000110903900000189",
    "252900100000000110903900000190",
    "252900100000000110903900000191",
    "252900100000000110903900000192",
    "252900100000000110903900000193",
    "252900100000000110903900000194",
    "252900100000000110903900000195",
    "252900100000000110903900000196",
    "252900100000000110903900000197",
    "252900100000000110903900000198",
    "252900100000000110903900000199",
    "252900100000000110903900000200",
    "252900100000000110903900000201",
    "252900100000000110903900000202",
    "252900100000000110903900000203",
    "252900100000000110904900000204",
    "252900100000000110904900000205",
    "252900100000000110904900000206"
  ]
}

*/
