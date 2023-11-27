//Seccion Unidad Construccion Convencional y no Convencional
import React, { useEffect, useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Tabs from "./Tabs";
import { variable, destino, dataobjetoconstruccion } from "./DataContext";
import Estructura from "../Json/estructure.json";
import {
  CaracteristicaContext,
  GrupoProvider,
} from "./Context/CaracteristicaContext";
import { PuntajeResumeForm } from "./ResumeData";

import { CaraContext } from "./Uniconstruccion";
const UniconstForm = (dataForm) => {
  const [loading, setLoading] = useState(false);
  const [tipo_const, setTipo_Const] = useState("");
  const [estForm, setEstForm] = useState(false);
  const [estMsjError, setEstMsjError] = useState({
    anio_construccion: false,
  });
  //datos del Arreglo
  const [newObjGen, setnewObjGen] = useState({
    tipo_construccion: "",
    tipo_dominio: "",
    total_plantas: "",
    total_habitaciones: "",
    total_banios: "",
    total_locales: "",
    anio_construccion: "",
    observaciones: "",
    area_construida: "",
  });

  function DataGeneral(e) {
    let { name, value } = e.target;
    if (name === "anio_construccion") {
      let num = parseInt(value);
      let est = false;
      if (num <= 1600) {
        est = true;
        setEstMsjError({ ...estMsjError, anio_construccion: est });
      } else {
        est = false;
        setEstMsjError({ ...estMsjError, anio_construccion: est });
      }
    }
    setTipo_Const(dataForm.id);
    setnewObjGen((prevObj) => ({
      ...prevObj,
      [name]: value,
      tipo_construccion: tipo_const,
    }));
  }

  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }

  const [data, setData] = useState();
  useEffect(() => {
    Load_Data();
    setEstForm(true);
  }, []);
  function Load_Data() {
    //let url = import.meta.env.VITE_API_URL;
    setData(Estructura.general);
    setLoading(false);
  }

  function CentralForm(tipo_unidad) {
    //Cargar el json Structure

    ////////////////////////////////////////////////////Contexto ///////////////////////////
    const { dataCaracteristica, updateCaracteristicaData } = useContext(
      CaracteristicaContext
    );

    //Captura de datos segun si es Convencional o no Convencional
    let dato = "";
    if (tipo_unidad.tipo_unidad == "Convencional") {
      dato = data.Convencional;
    } else {
      dato = data.No_Convencional;
    }
    //variable.caracteristicasunidadconstruccion.tipo_construccion =      dato.tipo_construccion;

    const tplanta = data["Tipo Planta"];
    const desti = dato["Destinacion"];
    let tipo_uniconst = dato["Tipo Unidad Construccion"];
    const [uso, setUso] = useState();
    const [sopti, setSopti] = useState();
    const contextoCaracteristicas = useContext(CaraContext);
    function iscontext(context) {
      if (!context) {
        return false;
      } else {
        return true;
      }
    }

    const [newDataCentral, setNewDataCentral] = useState({
      tipo_planta: "",
      tipo_unidad_construccion: "",
      uso: "",
    });
    //Subir Variable Global
    const handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      //LLenar los campos de datos generales
      setNewDataCentral((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      //variable.caracteristicasunidadconstruccion[name] = value;

      //setDjson({ ...djson, [name]: value });
    };
    //Manejo Select de destinacion
    function Optionselected(e) {
      const sv = e.target.value;
      if (e.target.selectedIndex != 0) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const optionName = selectedOption.getAttribute("name");
        const { name, value } = e.target;
        setSopti(sv);
        //Guardar Datos al contexto
        updateCaracteristicaData((prevData) => {
          return {
            ...prevData,
            tipo_planta: newDataCentral.tipo_planta,
            tipo_unidad_construccion: newDataCentral.tipo_unidad_construccion,
            uso: newDataCentral.uso,
            tipo_dominio: newObjGen.tipo_dominio,
            tipo_construccion: newObjGen.tipo_construccion,
            total_plantas: newObjGen.total_plantas,
            total_habitaciones: newObjGen.total_habitaciones,
            total_banios: newObjGen.total_banios,
            total_locales: newObjGen.total_locales,
            anio_construccion: newObjGen.anio_construccion,
            observaciones: newObjGen.observaciones,
            area_construida: newObjGen.area_construida,
          };
        });
      }
    }
    //Select Manejar el select para generar la pestaña uso
    function ChangeUse(e) {
      let name = e.target.name;
      let value = e.target.value;
      let sele = e.target.options[e.target.selectedIndex];
      let nomsele = sele.getAttribute("name");
      //LLenar los campos de datos generales
      //variable.caracteristicasunidadconstruccion[name] = value;
      setUso(nomsele);
      setNewDataCentral((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    //Metodo para el Manejo de Tipo del menu No Convencional

    /////////////////////////////////////Componente para los datos de destinacion

    function Mdesti({ select, nom, tipo }) {
      //Variables
      console.log("tipo ", tipo);
      const { dataCaracteristica } = useContext(CaracteristicaContext);
      const [tipoanexo, setTipoAnexo] = useState("");
      const [estButton, setEstButton] = useState(false);
      const inicial = Object.keys(select);
      console.log("select ", select);
      let tamaño_Grupo = 0;
      ////////////////////////////////Arreglo de Calificaciones////////////////////////////
      let values_Grupo = [];
      if (tipo === "No Convencional") {
      } else {
        if (tipo === "Convencional") {
          values_Grupo = {
            clase_calificacion: "",
            conservacion: "",
            subtotal: "",
            objetoconstruccion: [],
          };
          tamaño_Grupo = inicial.length - 1;
        }
      }

      const [arrayClass, setArrayClass] = useState(
        Array(tamaño_Grupo).fill(values_Grupo)
      );

      const puntajeResumeForm = useRef();
      const openPuntajeResumeForm = () => {
        puntajeResumeForm.current.openModal();
      };
      function validar() {
        // Verificar si hay algún valor "" en arrayClass
        const hayCamposVacios = arrayClass.some((objeto) =>
          Object.values(objeto).some((valor) => valor === "")
        );

        if (hayCamposVacios) {
          console.log('Hay al menos un campo con valor "" en arrayClass');
          setEstButton(false);
        } else {
          console.log('No hay campos con valor "" en arrayClass');
          setEstButton(true);
        }
      }
      useEffect(() => {
        console.log("Data Caracteristica", arrayClass);
        validar();
      }, [arrayClass]);
      const UpdateArrayClass = (nuevoArray) => {
        setArrayClass(nuevoArray);
      };
      ///////////////////////////////////////////////
      async function createJsonConve() {
        let sum = 0;
        arrayClass.map((item, index) => {
          sum += item.subtotal;
        });
        let objCalificacion = {
          tipo_calificar: select.tipo_calificar,
          total_calificacion: sum,
          grupocalificacion: arrayClass,
        };

        let Json = {
          construcciones: [
            {
              caracteristicasunidadconstruccion: {
                identificador: dataCaracteristica.identificador,
                tipo_construccion: dataCaracteristica.tipo_construccion,
                tipo_dominio: dataCaracteristica.tipo_dominio,
                tipo_unidad_construccion:
                  dataCaracteristica.tipo_unidad_construccion,
                tipo_planta: dataCaracteristica.tipo_planta,
                total_plantas: dataCaracteristica.total_plantas,
                total_habitaciones: dataCaracteristica.total_habitaciones,
                total_banios: dataCaracteristica.total_banios,
                total_locales: dataCaracteristica.total_locales,
                anio_construccion: dataCaracteristica.anio_construccion,
                uso: dataCaracteristica.uso,
                avaluo_unidad_construccion:
                  dataCaracteristica.avaluo_unidad_construccion,
                area_construida: dataCaracteristica.area_construida,
                area_privada_construida:
                  dataCaracteristica.area_privada_construida,
                fin_vida_util_version: dataCaracteristica.fin_vida_util_version,
                espacio_de_nombres: "Fusagasuga",
                local_id: dataCaracteristica.local_id,
                observaciones: dataCaracteristica.observaciones,
                calificacionconvencional: [objCalificacion],
              },
            },
          ],
        };
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (iscontext(contextoCaracteristicas)) {
          const { updateCaracteristicas } = contextoCaracteristicas;
          updateCaracteristicas(Json);
        }

        var raw = JSON.stringify(Json);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        let url =
          import.meta.env.VITE_API_URL_FIRST +
          "caracteristicasunidadconstruccion/convencional";
        try {
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response}`);
          }
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error("Error:", error);
        }
      }
      ////////////////////////////////////
      async function createJsonNoConve() {
        let newObj = {
          tipo_anexo: tipoanexo,
        };
        let Json = {
          construcciones: [
            {
              caracteristicasunidadconstruccion: {
                identificador: dataCaracteristica.identificador,
                tipo_construccion: dataCaracteristica.tipo_construccion,
                tipo_dominio: dataCaracteristica.tipo_dominio,
                tipo_unidad_construccion:
                  dataCaracteristica.tipo_unidad_construccion,
                tipo_planta: dataCaracteristica.tipo_planta,
                total_plantas: dataCaracteristica.total_plantas,
                total_habitaciones: dataCaracteristica.total_habitaciones,
                total_banios: dataCaracteristica.total_banios,
                total_locales: dataCaracteristica.total_locales,
                anio_construccion: dataCaracteristica.anio_construccion,
                uso: dataCaracteristica.uso,
                avaluo_unidad_construccion:
                  dataCaracteristica.avaluo_unidad_construccion,
                area_construida: dataCaracteristica.area_construida,
                area_privada_construida:
                  dataCaracteristica.area_privada_construida,
                fin_vida_util_version: dataCaracteristica.fin_vida_util_version,
                espacio_de_nombres: "Fusagasuga",
                local_id: dataCaracteristica.local_id,
                observaciones: dataCaracteristica.observaciones,
                calificacionnoconvencional: [newObj],
              },
            },
          ],
        };
        //http://localhost/api/v1/avaluo-catastral/tipo/tab-anexos?puntos=60&vigencia=2023&tipo=RURAL&destino=2
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (iscontext(contextoCaracteristicas)) {
          const { updateCaracteristicas } = contextoCaracteristicas;
          updateCaracteristicas(Json);
        }

        var raw = JSON.stringify(Json);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        let url =
          import.meta.env.VITE_API_URL_FIRST +
          "caracteristicasunidadconstruccion/no-convencional";
        try {
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response}`);
          }
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error("Error:", error);
        }
      }

      //////////////////////////Funcion para No Convencionaly capturar el select
      function Tipo(e) {
        let { name, value } = e.target;
        setTipoAnexo(parseInt(value));
      }
      console.log("estado boton ", estButton);
      /////////////////////////////////////////////Formularios segun la destinacion
      if (tipo_unidad.tipo_unidad === "Convencional") {
        ////////Forumlario Convencional
        return (
          <div className="flex flex-col items-start w-full pb-2">
            <div className="flex flex-col  w-full pb-2 text-center">
              <h3 className="text-3xl mb-4"> Tipo Calificación {nom}</h3>
              <Tabs
                tabs={select}
                arrayClass={arrayClass}
                updateFunction={UpdateArrayClass}
              />
            </div>
            {estButton ? (
              <div className="flex flex-row w-full items-center justify-center pb-2 text-left ">
                <button
                  onClick={createJsonConve}
                  className="w-1/5 p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={openPuntajeResumeForm}
                  className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
                >
                  <FontAwesomeIcon className="mr-4" icon={faEye} />
                  Ver Resumen
                </button>
                <PuntajeResumeForm ref={puntajeResumeForm} datos={arrayClass} />
              </div>
            ) : null}
          </div>
        );
      } else {
        ////////Forumlario No Convencional
        console.log("No Convencional");
        return (
          <div className="flex flex-col items-center text-center w-full pb-2">
            <h3 className="text-3xl mb-4"> {nom}</h3>
            <div className="flex flex-row w-full">
              <h1 className="text-3xl w-1/2">Tipo</h1>
              <select
                name="tipo_anexo"
                className="p-1 w-1/3 text-center border-2 rounded-md"
                onChange={Tipo}
                value={tipoanexo}
              >
                <option></option>
                {Object.entries(select).map((tipo, index) => {
                  return (
                    <option
                      value={tipo[1].tipo_anexo}
                      key={index}
                      name={tipo[1].tipo_anexo}
                    >
                      {tipo[1].Tipo}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-row w-full items-center justify-center mt-4 pb-2 text-left ">
              <button
                onClick={createJsonNoConve}
                className=" p-1 w-1/3 text-center rounded-md text-white bg-teal-500 text-lg ml-2"
              >
                Guardar
              </button>
            </div>
          </div>
        );
      }
    }
    //Componente del formulario de Uso
    //Formulario Completo
    return (
      <div className="flex flex-col w-10/12">
        <div className="flex flex-row  w-full pb-2 text-center">
          <div className="flex flex-col w-1/4 items-center  pb-2">
            <label className="w-full">Tipo Planta</label>
            <select
              name="tipo_planta"
              className="p-1 w-full text-center border-2 rounded-md"
              onChange={handleChange}
            >
              <option></option>
              {Object.entries(tplanta).map((item) => {
                return (
                  <option key={item[1].dispname} value={item[1].t_id}>
                    {item[1].dispname}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2 ml-4">
            <label className="w-full">Tipo Unidad Construccion</label>
            <select
              name="tipo_unidad_construccion"
              className="p-1 w-full text-center border-2 rounded-md"
              onChange={ChangeUse}
            >
              <option></option>
              {Object.entries(dato["Tipo Unidad Construccion"]).map((item) => {
                return (
                  <option key={item[1].id} name={item[0]} value={item[1].id}>
                    {item[0]}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col w-1/4 items-center  pb-2 ml-4">
            <label className="w-full">Uso</label>
            <select
              name="uso"
              className="p-1 w-full text-center border-2 rounded-md"
              onChange={handleChange}
              value={newDataCentral.uso}
            >
              <option></option>
              {newDataCentral.tipo_unidad_construccion.length != 0
                ? Object.entries(tipo_uniconst[uso].Uso).map((item) => {
                    return (
                      <option key={item[1].t_id} value={item[1].t_id}>
                        {item[1].dispname}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="flex flex-col items-center w-1/4  pb-2 ml-4">
            <label className="w-full">Tipo Calificacion</label>
            <select
              name="destinacion"
              className="p-1 w-full text-center border-2 rounded-md"
              id="selectdesti"
              value={sopti}
              onChange={Optionselected}
            >
              <option></option>
              {Object.entries(desti).map((item, index) => {
                return (
                  <option
                    value={item[0]}
                    name={item[1].tipo_anexo}
                    key={item[1].tipo_anexo}
                  >
                    {item[0]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {sopti != undefined && (
          <Mdesti
            select={desti[sopti]}
            nom={sopti}
            tipo={tipo_unidad.tipo_unidad}
          />
        )}
      </div>
    );
  }
  if (loading) {
    <h1 className="text-9xl">Cargando</h1>;
  } else {
    return (
      <div className=" w-full flex flex-col  items-center bg-transparent h-full bg-white bg-opacity-80">
        <h1 className="text-3xl">Construccion {dataForm.data}</h1>
        <h1 className="text-3xl">Datos Generales</h1>
        <div className="flex flex-row items-center w-10/12 pb-2 text-center ">
          <div className="flex flex-col items-center w-1/4 pb-2  ">
            <label className="w-full"> Tipo Dominio</label>
            <select
              name="tipo_dominio"
              type="number"
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.tipo_dominio}
            >
              <option></option>
              <option value={322}>Común</option>
              <option value={323}>Privado</option>
            </select>
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2 ml-4 ">
            <label className="w-full"> Numero Pisos</label>
            <input
              name="total_plantas"
              type="number"
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.total_plantas}
            ></input>
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2 ml-4 ">
            <label className="w-full"> Numero Habitaciones</label>
            <input
              name="total_habitaciones"
              type="number"
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.total_habitaciones}
            ></input>
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2 ml-4 ">
            <label className="w-full"> Numero Baños</label>
            <input
              name="total_banios"
              type="number"
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.total_banios}
            ></input>
          </div>
        </div>
        <div className="flex flex-row items-center w-10/12 pb-2 text-center ">
          <div className="flex flex-col items-center w-1/4 pb-2  ">
            <label className="w-full"> Numero Locales</label>
            <input
              name="total_locales"
              type="number"
              onInput={soloNumeros}
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.total_locales}
            ></input>
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2 ml-4 ">
            <div className="w-full flex flex-col">
              <label className="w-full"> Año Construccion</label>
              <input
                name="anio_construccion"
                type="number"
                onChange={DataGeneral}
                value={newObjGen.anio_construccion}
                className="p-1 w-full text-center border-2 rounded-md"
              ></input>
            </div>
            {estMsjError.anio_construccion ? (
              <label className="text-red-600 w-full">
                "Año debe ser mayor a 1600"
              </label>
            ) : null}
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2  ml-4">
            <label className="w-full"> Area Construida</label>
            <input
              name="area_construida"
              type="number"
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.area_construida}
            ></input>
          </div>
          <div className="flex flex-col items-center w-1/4 pb-2 ml-4">
            <label className="w-1/3"> Observaciones</label>
            <input
              name="observaciones"
              type="text"
              onChange={DataGeneral}
              className="p-1 w-full text-center border-2 rounded-md"
              value={newObjGen.observaciones}
            ></input>
          </div>
        </div>
        <GrupoProvider>
          {estForm ? <CentralForm tipo_unidad={dataForm.data} /> : null}
        </GrupoProvider>
      </div>
    );
  }
};

export default UniconstForm;
