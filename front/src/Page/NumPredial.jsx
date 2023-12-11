import React, { useContext, useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Modal_Load } from "./Modal_Load";
import {
  ArrayFinalContext,
  NumPreContext,
  NumPreProvider,
  TableContext,
} from "./Context/Context";
import { ModalData } from "./ModalData";
//import Terreno from "./Terreno";
//Objetos base con los datos que se necesitan

//Tamaño de predios segregados
let tamaño = 0;
//Array Final
//252900400000000030000000000000
//Array de datos Generados
//Array de los datos
let ArrayJsonBack = [];
//ID iNICIAL Y FINAL

let numID = 500;

export const NumPredialForm = (props) => {
  //Estados
  //const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(true);
  const navigate = useNavigate();
  //Captura de datos para generar numeros prediales
  // 1 Estado para Cargar el valor de Tamaño0
  const [inputValue, setInputValue] = useState("");
  // 2 Estado cambio de Valor de Tipo de predio
  const [itemchange, setItemChange] = useState(0);
  // 3 Estado del valor que se guarda al seleccionar el tipo de predio
  const [tpredio, setTpredio] = useState("50");

  //Response Array
  const [responseBack, setResponseBack] = useState();
  //Valores Numeros Prediales
  const [predioMatriz, setPredioMatriz] = useState();
  //Array de Datos Generados
  const [arrayPredial, setarrayPredial] = useState([]);
  //Activar y desactivar componentes BOOLEAN
  //4 Estado del Select de tipo de predio
  const [select, setSelect] = useState(false);
  // 5 Estado para Mostar la Tabla
  const [table, setTable] = useState(false);
  //Estado para activar y desactivar el boton de generar
  const [bttgen, setBttgen] = useState(true);
  //Estado para activar y desactivar el boton de cargar
  const [bttload, setBttload] = useState(true);
  //Estado Actualizacion Filas
  const [estFilas, setEstFilas] = useState();
  //Estado despues de agregar
  const [bttchange, setBttChange] = useState();
  // estado Boton terminaro
  const [bttfin, setBttfin] = useState(true);
  //const [bact, setBact] = useState(true);
  const { tableData, updateTableData } = useContext(TableContext);
  //
  const { ArrayFinal, updateArrayFinal } = useContext(ArrayFinalContext);
  const [allData, setAllData] = useState([]);
  //Eventos o Funciones
  /////CONSULTA DE DATOS
  //Consulta de datos en bd
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("");
  const [msjCadena, setMsjCadena] = useState("");
  const [estCadena, setEstCadena] = useState(false);
  //0 CAPTURA DE DATA MATRIZ
  const [dataMatriz, setDataMatriz] = useState("");
  const [bttCadena, setBttCadena] = useState(true);

  ///Evento del Boton Cargar para Consultar
  const dataDB = async () => {
    setFormState(true);
    updateTableData([]);
    setAllData("");
    setMsjLoading("Consultando Datos");
    /*setAllData("");
  setNumPredial("");*/
    setLoading(true);
    try {
      await datos();
    } catch (error) {
      console.error("Error en dataDB:", error);
    }
  };
  //Consulta de todos los Datos
  const datos = async () => {
    let dataLength = "";
    let tempData = [];
    setMsjLoading("Consultando Base de Datos");
    console.log("Pregunta Conservacion");
    let urlConservacion =
      import.meta.env.VITE_API_URL_FIRST +
      `predio/list/numeros-prediales/${dataMatriz}?&limit=2000`;
    const data = await fetchData(urlConservacion);
    dataLength = data.last_page;

    for (let currentPage = 1; currentPage <= dataLength; currentPage++) {
      const currentPageData = await fetchData(urlConservacion, currentPage);
      currentPageData.data.map((item, index) => {
        tempData.push(item.numero_predial);
      });
    }
    console.log("Pregunta Local");
    setMsjLoading("Consultando Base de Datos Local");
    let urlLocal =
      import.meta.env.VITE_API_URL_FIRST +
      `predio/list/local/numeros-prediales/${dataMatriz}?&limit=2000`;
    const datalocal = await fetchData(urlLocal);
    dataLength = datalocal.last_page;

    for (let currentPage = 1; currentPage <= dataLength; currentPage++) {
      const currentPageData = await fetchData(urlLocal, currentPage);
      currentPageData.data.map((item, index) => {
        tempData.push(item.numero_predial);
      });
    } ///////////////////////////////////////////Poner la Consulta de Local y agregar Tempdata
    setLoading(false);
    setFormState(false);
    setAllData(tempData);
  };
  //Consulta de Paginas de la consulta
  const fetchData = async (url, currentPage) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
      });
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
  //Validacion de que se pueda el numero Predial
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
  //GENERACION DE NUMEROS PREDIALES

  //0.1 CARGAR VALOR de input
  // 1 Funcion para cargar el input del tamaño
  function inputLength(e) {
    setInputValue(e.target.value);
  }
  // 2 Funcion para la seleccion del tipo de predio
  function ItemSelect(e) {
    //setItemChange(Math.random());
    let value = e.target.value;
    if (value != "A" && inputValue.length != 0) {
      setBttgen(false);
    }
    setTpredio(value);
  }
  // 3 Funcion para generar los datos y mostrar la tabla button Generar No Prediales
  async function ShowData() {
    validarData();
    setBttgen(true);
    setBttChange(false);
    //Aux = Arreglo Actual o Data de DataBase
    let array = "";
    console.log("Array Final", ArrayFinal.length);
    if (ArrayFinal.length == 0) {
      //DataJson.numeros_prediales Valor del Envio de Datos
      array = allData;
      JSONtoObject(array);
    } else {
      console.log("Entra al Seguir");
      //let newArray = [...tableData];
      let newArray = [...responseBack];
      console.log("datos de array Final", ArrayFinal);
      console.log("datos de reswponseback antes", newArray.length);
      ArrayFinal.map((item, index) => {
        newArray.push(item);
      });

      console.log("datos de reswponsebackdespues", newArray.length);
      setResponseBack(newArray);
      //lastTerreno(aux);
    }
    switch (tpredio) {
      case "A":
        setSelect(false);
        setTable(false);
        break;
    }

    setSelect(true);
    setTable(true);
    //Creo los Objetos con los valores del ultimo valor de terreno y unidad
  }
  // 4 Funcion para Crear los objetos de los numeros prediales carga  ArrayJsonBack
  function JSONtoObject(aux) {
    console.log("Crea Objetos del Json", aux);
    let newData = [];
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
      newData.push(ObjectPredio);
      ArrayJsonBack.push(ObjectPredio);
    });
    setResponseBack(newData);
  }
  // 5 Buscar Ultimo Terreno mayor y modificar la posicion de terreno y unidad segun se necesite
  //Llena PredioMatriz
  function lastTerreno(aux) {
    //aux= value del select de tipo de predio
    //Llena Predio Matriz
    console.log("Tipo de Predio", aux);
    //Mayor Terreno
    let mayorTerreno9 = 0;
    let mayorTerreno8 = 0;
    let mayor = 0;
    let PredioMatriz = {
      Dpto: "",
      Mpio: "",
      Zona: "",
      Sector: "",
      Comuna: "",
      Barrio: "",
      Manzana: "",
      Terreno: "",
      Condicion: aux,
      Edificio: "",
      Piso: "",
      Unidad: "",
      Matricula: "",
      Direccion: [],
      codigo_homologado: "",
    };
    //si no se han agregado buscar en datos de bd
    responseBack.map((item) => {
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
      let numCondicion = parseInt(item.Condicion);

      if (numCondicion != 9 && numCondicion != 8) {
        if (numTerreno > mayor) {
          mayor = numTerreno;
        }
      } else {
        if (numUnidad > mayor) {
          mayor = numUnidad;
        }
        switch (numCondicion) {
          case 8:
            if (
              numTerreno >= 800 &&
              numTerreno > mayorTerreno8 &&
              numTerreno < 900
            ) {
              mayorTerreno8 = numTerreno;
            }
            break;
          case 9:
            if (numTerreno >= 900 && numTerreno > mayorTerreno9) {
              mayorTerreno9 = numTerreno;
            }
            break;
        }
      }
    });

    console.log("mayor", mayor);
    console.log("mayor 8", mayorTerreno8);
    console.log("mayor 9", mayorTerreno9);
    let tip_predio = parseInt(aux);
    let dataterreno = 0;
    let dataunidad = 0;
    switch (tip_predio) {
      case 8:
        dataterreno = mayorTerreno8 + 1;
        dataunidad = mayor;

        break;
      case 9:
        dataterreno = mayorTerreno9 + 1;
        dataunidad = mayor;
        break;
      default:
        dataterreno = mayor;
        dataunidad = 0;
        break;
    }
    PredioMatriz.Terreno = dataterreno.toString().padStart(4, "0");
    PredioMatriz.Unidad = dataunidad.toString().padStart(4, "0");
    console.log(" mayor Valores de Predio Matriz", PredioMatriz);
    setPredioMatriz(PredioMatriz);
  }
  // 6 Funcion para Llenar el arreglo con los datos del predio Matriz
  //Llena ArregloPredial Arreglo de los numeros generados
  function CreateObject(aux, valueaux) {
    //Aux= PredioMatriz
    //valueaux=Tipo de Predio elegido
    let valorUnidad = parseInt(aux.Unidad);
    let valorTerreno = parseInt(aux.Terreno);
    tamaño = parseInt(inputValue);
    let newData = [];
    //Reset Array Predial
    console.log("Array Predial", arrayPredial);
    if (arrayPredial.length >= tamaño) {
      newData = [];
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
      newData.push(nuevoaux);
    }
    setarrayPredial(newData);
  }
  ///Cuando Actualiza la Respuesta de la consulta de numeros Prediales
  useEffect(() => {
    console.log("Actualiza data respuesta", responseBack);
    if (responseBack != undefined) {
      lastTerreno(tpredio);
    }
  }, [responseBack]);
  ///Cuando Actualiza los datos de la ultima Unidad del Predio Matriz
  useEffect(() => {
    console.log("Actualiza data predio matriz");
    if (responseBack != undefined) {
      CreateObject(predioMatriz, tpredio);
      //Actualizo loa valores que se van a mostrar en la tabla
    }
  }, [predioMatriz]);
  ///Cuando Actualiza el arreglo que se genera
  useEffect(() => {
    console.log("Actualiza Arreglo Generado");
    if (responseBack != undefined) {
      //Actualizo loa valores que se van a mostrar en la tabla
      updateTableData(arrayPredial);
      setEstFilas("123");
    }
  }, [arrayPredial]);

  //FORMATEO DE DATOS
  //Se Aceptan solo  Numeros
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
  }
  //Se Aceptan solo Letras
  function soloLetras(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
    input.value = input.value.toUpperCase();
  }

  /////////////////////////////Formularios/////////////////////////////
  function validarData() {
    console.log("Cambio Tabla");
    let cont = 0;
    const datosArray = Object.values(tableData);
    console.log("123 data array", datosArray);
    datosArray.map((item, index) => {
      //console.log("123 Cambio Tabla", item);
      console.log("123 matricula", item.Matricula.length);
      console.log("123 direccion", Object.keys(item.Direccion).length);
      if (
        item.Matricula.length !== 0 &&
        Object.keys(item.Direccion).length !== 0
      ) {
        cont = 0;
        setBttChange(true);
      } else {
        cont++;
        setBttChange(false);
      }
    });
    console.log("123 Contador=", cont);
    console.log("123 data array", datosArray.length);
    console.log("123 btt", !bttchange);
    //validarData();
    if (cont == 0 && !bttchange && datosArray.length != 0) {
      setBttload(false);
    } else {
      setBttload(true);
    }
    setEstFilas(Math.random());
  }

  //Formularios
  // 1 Formulario  para el cambio de datos de Tabla
  const ChangeDataForm = () => {
    //Estados
    //Contexto
    const { tableData, updateTableData } = useContext(TableContext);
    //Estado de Columna
    const [numP, setNump] = useState(50);
    const [tamaño, setTamaño] = useState(50);

    //Estado de Valores Id
    //Valores para Input
    const [inputId, setInputId] = useState("");
    const [estInputId, setEstInputId] = useState(false);
    //Data Id
    const [dataId, setDataId] = useState([]);
    useEffect(() => {
      if (inputId.length === 0) {
        setEstInputId(false);
      } else {
        setEstInputId(true);
      }
    }, [inputId]);
    //Capturar Tipo de Direccion

    const [dir, setDir] = useState(0);

    function Load_Direction(e) {
      let value = e.target.value;
      setDirection({
        t_id: 0,
        t_seq: null,
        tipo_direccion: value,
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
      setDir(value);
    }
    //Datos Propios deDireccion
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
    const [nomDir, setNomDir] = useState({
      clase_via_principal: "",
      sector_ciudad: "",
      sector_predio: "",
    });
    //VALIDACION DE ESTADOS
    useEffect(() => {
      if (
        direction.clase_via_principal.length != 0 &&
        direction.valor_via_generadora.length != 0 &&
        direction.valor_via_principal.length != 0 &&
        direction.numero_predio.length != 0
      ) {
        setBttDir(false);
      } else {
        setBttDir(true);
      }
    }, [direction]);
    //Estado Btt de Direccion
    const [estBttDir, setBttDir] = useState(true);
    //Carga Datos Propios Direccion
    function Load_DataDirection(e) {
      let name = e.target.name;
      let value = e.target.value;
      let nodename = e.target.nodeName;
      if (nodename === "SELECT") {
        let opt = e.target.options[e.target.selectedIndex];
        let auxvalue = opt.label;
        setNomDir((prevEstado) => ({ ...prevEstado, [name]: auxvalue }));
      }

      setDirection((prevEstado) => ({ ...prevEstado, [name]: value }));
    }
    //Enviar Data a Tabla
    function ReloadDataDirection() {
      direction.tipo_direccion = dir;
      tableData.map((items, index) => {
        dataId.map((item) => {
          if (index == item - 1) {
            items.Direccion = direction;
          }
        });
      });
      handleUpdateTable(tableData);
    }
    //Datos de Matricula Inmobiliaria
    const [rdata, setRdata] = useState("");
    const [estBttRdata, setEstBttRdata] = useState(true);
    useEffect(() => {
      if (rdata.length == 0) {
        setEstBttRdata(true);
      } else {
        setEstBttRdata(false);
      }
    }, [rdata]);
    //funcion para cargar los valores de replicar Matricula Inmobiliaria
    function Replicate(e) {
      setRdata(e.target.value);
    }
    //Replicar datos de matricula Inmobiliaria
    function ReplicateData(e) {
      let sum = rdata;
      tableData.map((items, index) => {
        dataId.map((item) => {
          if (index == item - 1) {
            items.Matricula = sum;
            sum = parseInt(sum) + 1;
          }
        });
      });
      handleUpdateTable(tableData);
    }

    ////Validar si esta Lleno

    useEffect(() => {
      //validarData();
    }, [tableData]);
    ///Actualizar Context Tabla General
    const handleUpdateTable = async (data) => {
      // Lógica para actualizar la tabla
      // You may replace this with your logic to update data
      await updateTableData(data);
      validarData();
    };
    //Funciones
    //Seleccion de Columna para generar el menu de ingreso de datos
    function UpdateForm(e) {
      setNump(e.target.value);
    }
    function NumComa(e) {
      const input = e.target;
      let value = input.value;
      let num = [];
      value = value.replace(/[^0-9,-]/g, ""); // Elimina caracteres no numéricos
      if (value.includes("-")) {
        if (value.split("-").length <= 2) {
          //setTamaño(3);
          let aux = value.split("-");

          for (let i = parseInt(aux[0]); i <= parseInt(aux[1]); i++) {
            num.push(i);
          }
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
          let numeros = aux.map((item) => {
            return parseInt(item);
          });
          num = numeros;
        } else {
          let aux = parseInt(value);
          num = [aux];
        }
      }
      setDataId(num);
      setInputId(input.value);
    }

    // Validad si el numero final es mayor al primero y que no sea mayor al tamaño
    //Funcion para cargar los valores de los ID

    ////////////
    ///////////////

    ///////////////////////////Procesode numero Predial
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
          <h2 className=" text-lg font-bold border-b pb-2">Seleccionar ID</h2>
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
            className="flex flex-col p-2  w-full border-2 text-center"
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
    return (
      <NumPreProvider>
        <div className="w-full flex flex-col">
          <div id="Columna" className="w-full text-center flex flex-col ">
            <h2 className=" p-2 text-lg font-bold rounded-t-lg  pb-2 w-full text-white bg-teal-500">
              Agregar o Modificar Valores
            </h2>
            <div className="w-full  flex flex-row h-full ">
              <div className="w-2/5  text-center  border-2 flex flex-col ">
                <div className="w-full text-white p-2 bg-teal-500 text-center">
                  <label className=" font-medium text-xl">Columna </label>
                </div>
                <div className="w-full p-1">
                  <select
                    className=" border-2 rounded-lg text-center p-1"
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
              <div
                id="SeleccionarID"
                className="w-1/5  text-center  border-2 flex flex-col"
              >
                <div className="w-full text-white p-2 bg-teal-500 ">
                  <label className=" text-lg  font-bold  p-2 ">
                    Seleccionar ID
                  </label>
                </div>
                <div className="w-full flex flex-col items-center justify-center p-2">
                  <input
                    type="text"
                    className="border-2 rounded-lg w-full "
                    onChange={NumComa}
                    maxLength={tamaño}
                    value={inputId}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row w-2/5">
                {numP == "1" && estInputId ? <NumPredialForm /> : null}
                {numP == "2" && estInputId ? (
                  <div className="flex flex-col  w-full border-2 text-center">
                    <div className="w-full">
                      <h2 className=" text-lg font-bold border-b p-2 text-white bg-teal-500">
                        Informacion Dirección
                      </h2>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center m-1">
                      <label className="m-1 ">Tipo de Direccion</label>
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
                  </div>
                ) : null}
                {numP == "3" && estInputId ? (
                  <div
                    id="ReplicarDato"
                    className="flex flex-col   w-full border-2 text-center"
                  >
                    <div>
                      <h2 className="text-lg font-bold border-b p-2 text-white bg-teal-500">
                        Numero Matricula Inmobiliaria
                      </h2>
                    </div>
                    <div className="w-full flex flex-row p-2 items-center justify-center">
                      <input
                        type="text"
                        name="3"
                        className="border-2 rounded-lg text-center p-1"
                        onChange={Replicate}
                        onInput={soloNumeros}
                        value={rdata}
                        maxLength={80}
                      ></input>
                      <button
                        disabled={estBttRdata}
                        className={`${
                          estBttRdata
                            ? "opacity-50 cursor-not-allowed"
                            : "opacity-100"
                        }
                     p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-2
                     `}
                        onClick={ReplicateData}
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {(dir == 218 || dir == 219) && numP == 2 && estInputId ? (
              <div className="w-full flex-col border-2 ">
                <div className="w-full p2">
                  <h2 className=" text-lg font-bold border-b p-2 text-white bg-teal-500">
                    {dir == 218
                      ? "Direccion Estructurada"
                      : "Direccion No Estructurada"}
                  </h2>
                </div>
                {dir == 218 ? (
                  <div className=" p-2">
                    <div className="w-full flex flex-row justify-center items-center">
                      <div name="clase" className="w-1/12 flex flex-col m-1">
                        <label>Clase</label>
                        <select
                          name="clase_via_principal"
                          className="border-2 rounded-lg text-center"
                          onChange={Load_DataDirection}
                          value={nomDir.clase_via_principal}
                        >
                          <option value=" "></option>
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
                          onChange={Load_DataDirection}
                          onInput={soloNumeros}
                          value={direction.valor_via_principal}
                        ></input>
                      </div>
                      <div name="Letra" className=" w-1/12 flex flex-col m-1">
                        <label>Letra</label>
                        <input
                          name="letra_via_principal"
                          type="text"
                          className="border-2 rounded-lg text-center"
                          onChange={Load_DataDirection}
                          onInput={soloLetras}
                          value={direction.letra_via_principal}
                        ></input>
                      </div>
                      <div className="w-2/12 flex flex-col m-1">
                        <label>Sector</label>
                        <select
                          name="sector_ciudad"
                          className="border-2 rounded-lg text-center"
                          onChange={Load_DataDirection}
                          value={nomDir.sector_ciudad}
                        >
                          <option value=" "></option>
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
                          onChange={Load_DataDirection}
                          value={direction.valor_via_generadora}
                          onInput={soloNumeros}
                          className="border-2 rounded-lg text-center"
                        ></input>
                      </div>
                      <div className=" w-1/12 flex flex-col m-1">
                        <label>Letra</label>
                        <input
                          name="letra_via_generadora"
                          type="text"
                          onChange={Load_DataDirection}
                          onInput={soloLetras}
                          value={direction.letra_via_generadora}
                          className="border-2 rounded-lg text-center"
                        ></input>
                      </div>
                      <div className=" w-1/12 flex flex-col m-1">
                        <label>Numero</label>
                        <input
                          name="numero_predio"
                          onChange={Load_DataDirection}
                          value={direction.numero_predio}
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
                          onChange={Load_DataDirection}
                          value={nomDir.sector_predio}
                        >
                          <option value=" "></option>
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
                          onChange={Load_DataDirection}
                          value={direction.complemento}
                          className="border-2 rounded-lg text-center"
                        ></input>
                      </div>
                    </div>
                    <div className="w-full flex flex-row">
                      <div name="Preview" className="w-1/2 flex flex-col">
                        <label> Vista previa</label>
                        <div className="w-full flex flex-row text-center items-center justify-center">
                          <label>{nomDir.clase_via_principal} </label>
                          <label className="pl-1">
                            {direction.valor_via_principal}{" "}
                          </label>
                          <label className="pl-1">
                            {direction.letra_via_principal}{" "}
                          </label>
                          <label className="pl-1">
                            {nomDir.sector_ciudad}{" "}
                          </label>
                          <label className="pl-1">
                            # {direction.valor_via_generadora}{" "}
                          </label>
                          <label className="pl-1">
                            {direction.letra_via_generadora}{" "}
                          </label>
                          <label className="pl-1">
                            - {direction.numero_predio}{" "}
                          </label>
                          <label className="pl-1">
                            {nomDir.sector_predio}{" "}
                          </label>
                          <label className="pl-1">
                            {direction.complemento}
                          </label>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <button
                          className={`${
                            estBttDir
                              ? "opacity-50 cursor-not-allowed"
                              : "opacity-100"
                          }
               p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
               `}
                          onClick={ReloadDataDirection}
                          disabled={estBttDir}
                        >
                          Actualizar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {dir == 219 ? (
                  <div className="flex flex-row items-center justify-center my-4">
                    <label className="font-semibold">Nombre Predio</label>
                    <input
                      name="nombre_predio"
                      type="text"
                      className="border-2 rounded-lg text-center p-1 ml-2"
                      onChange={Load_DataDirection}
                      value={direction.nombre_predio}
                    ></input>
                    <button
                      className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg mr-2 ml-2"
                      onClick={ReloadDataDirection}
                    >
                      Cargar
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div></div>
        </div>
      </NumPreProvider>
    );
  };

  // 2 Generacion de una Tabla con los datos tabledata son los datos que se van a mostrar
  const TableForm = () => {
    //Contexto de la tabla
    const { tableData } = useContext(TableContext);
    const [filas, setFilas] = useState([]);

    useEffect(() => {
      updateFilas();
    }, [estFilas]);

    function updateFilas() {
      const newFilas = tableData.map((item, index) => {
        let direccionText = "";
        let cont = 0;
        ////////////////////////////////////
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
              " # " +
              previa.valor_via_generadora +
              " " +
              previa.letra_via_generadora +
              " - " +
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
      setFilas(newFilas);
    }

    return (
      <div className="w-full flex flex-row mt-4 overflow-auto">
        <table className="w-full text-center">
          <thead className="uppercase bg-teal-500 text-base text-white">
            <tr>
              <th className=" rounded-l-lg p-2">ID</th>
              <th className="border-x-2 p-2">Número Predial</th>
              <th className="border-x-2  p-2">Matricula Inmobiliaria</th>
              <th className=" rounded-r-lg p-2"> Dirección</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </div>
    );
  };

  //Form Boton Inferior de Agregar y Terminar
  const ChangeForm = () => {
    const { tableData, updateTableData } = useContext(TableContext);
    const { ArrayFinal, updateArrayFinal } = useContext(ArrayFinalContext);
    const [dataRel, setDataRel] = useState({
      numeros_relacion: [],
    });
    const [estLoading, setEstLoading] = useState(false);
    const [msjLoading, setMsjLoading] = useState("");

    const [dataReturn, setDataReturn] = useState("");
    const modalLoadRef = useRef();
    let ArrayTemp = [];

    function updateDataReturn(newData) {
      console.log("valor del modal", newData);
      let auxArray = "";
      if (newData == 1) {
        console.log("tabla", tableData);
        console.log("Tabla Array1 " + ArrayFinal.length);
        if (ArrayFinal.length == 0) {
          console.log(" tabla Entra Vacio");
          auxArray = tableData;
        } else {
          auxArray = [...ArrayFinal];
          tableData.map((item, index) => {
            auxArray.push(item);
          });
          console.log("tabla Temporal", auxArray);
        }
        updateArrayFinal(auxArray);
        updateTableData(auxArray);
        setBttChange(true);
        setBttfin(false);
        setInputValue("");
        setTpredio("A");
        setSelect(false);
      } else {
        if (newData == 0) {
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
              matricula_inmobiliaria: parseInt(item.Matricula),
              extdireccion: item.Direccion,
            };
            Json.numeros_prediales.push(newobj);
          });
          console.log();
          sendNumPredial(JSON.stringify(Json));
          updateTableData(ArrayFinal);
        }
      }
      setDataReturn(newData);
    }
    const openModalLoad = () => {
      modalLoadRef.current.openModal();
    };
    const closeModalLoad = () => {
      modalLoadRef.current.closeModal();
    };
    useEffect(() => {}, [dataReturn]);

    async function sendNumPredial(json) {
      ///////Crear Predios

      setMsjLoading("Creando Predios");
      const response = await addPredio(json);
      console.log("Respuesta de agregar Predio ", response);
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
            item.id_codigo_homologado = data[index].t_id;
          });

          ///////Relacionar Predios y Numeros Homologados
          setMsjLoading("Relacionando Numero Predial - Datos Homologados");
          const responseRel = await reDataHomoPredial();
          if (responseRel.success) {
            setEstLoading(false);
            navigate("/LoadData");
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
      /*   ArrayTemp = ArrayFinal;
      console.log("Array Final", ArrayFinal);
      arrayPredial.map((item, index) => {
        ArrayTemp.push(item);
      });*/
    }

    //Llenar primero Store Numero Predial
    async function addPredio(json) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = json;
      console.log("Predio Agregar", json);
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
          console.log("Resultado Predio", result);
          return result;
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
          numero_homologado: parseInt(item.id_codigo_homologado),
        };
        json.numeros_relacion.push(newObj);
      });
      console.log("Json de Relacion", json);
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
    <div className="p-4 w-11/12 flex flex-col overflow-auto  bg-transparent h-full bg-white bg-opacity-80 items-start">
      <div className="flex flex-row items-center justify-center w-full mb-4">
        <h1 className="text-4xl ">Iniciar Desenglobe</h1>
      </div>
      <div className="w-full flex flex-col mt-2">
        <div className="w-full flex flex-col ">
          <label className="text-2xl mb-2">Digitar el Numero Predial</label>
          <div className="flex flex-row">
            <input
              className="border-2 p-2 rounded-lg w-4/5"
              maxLength={30}
              type="text"
              onInput={validarCadena}
              value={dataMatriz}
            ></input>
            <button
              className={`${
                bttCadena ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }
           p-2 text-center rounded-lg text-white bg-teal-500 text-lg ml-4            w-1/5
           `}
              onClick={dataDB}
              disabled={bttCadena}
            >
              Cargar
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <Loader />
            <label className="ml-4 text-xl">{msjLoading}</label>
          </div>
        ) : null}
        {estCadena ? <label className="text-red-600">{msjCadena}</label> : null}
      </div>
      {!formState ? (
        <div className="w-full">
          <div className="w-full flex flex-row  py-4">
            <label className="font-semibold text-2xl">Numero Manzana : </label>
            <label className="text-2xl ml-4">
              {String(dataMatriz).slice(0, 17)}
            </label>
          </div>
          <div className="w-full flex flex-col items-center">
            <label className=" p-1 text-2xl font-semibold w-full bg-teal-500 rounded-lg  text-center text-white">
              Predios a Segregar
            </label>
            <div className="w-full flex flex-row justify-center items-center py-4 px-2 border-2">
              <div id="Pregunta" className="flex flex-col w-2/5 items-start ">
                <div className="flex flex-col w-full justify-start">
                  <label className="font-medium">Cantidad de predio(s)</label>
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
                className="flex flex-col w-2/5 items-start ml-4 font-medium"
              >
                <label>Tipo de predio</label>
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
              <div className="flex flex-col  w-1/5 ml-4">
                <button
                  className={`${
                    bttgen ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }
               p-1 text-center rounded-md text-white bg-teal-500 text-lg mr-2
               `}
                  onClick={ShowData}
                  disabled={bttgen}
                >
                  Generar NP
                </button>
              </div>
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
