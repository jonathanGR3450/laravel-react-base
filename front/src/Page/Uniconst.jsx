//Seccion Unidad Construccion Convencional y no Convencional
import React, { useEffect, useState, useContext } from "react";
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
const UniconstForm = (dataForm) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [tipo_const, setTipo_Const] = useState("");

  const [estMsjError, setEstMsjError] = useState({
    anio_construccion: false,
  });
  //datos del Arreglo
  const [newObjGen, setnewObjGen] = useState({
    tipo_construccion: "",
    total_plantas: "",
    total_habitaciones: "",
    total_banios: "",
    total_locales: "",
    anio_construccion: "",
    observaciones: "",
  });
  console.log("Actualiza");
  //Cargar el json Structure
  function Load_Data() {
    //let url = import.meta.env.VITE_API_URL;
    setData(Estructura.general);
    setLoading(false);
  } /*
  useEffect(() => {
    
  }, [msjError]);*/
  function DataGeneral(e) {
    let { name, value } = e.target;
    if (name === "anio_construccion") {
      let num = parseInt(value);
      let est = false;
      if (num <= 1600) {
        console.log("nu", num);
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
  useEffect(() => {
    Load_Data();
  }, []);
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }
  function CentralForm({ tipo_unidad }) {
    ////////////////////////////////////////////////////Contexto ///////////////////////////
    const { dataCaracteristica, updateCaracteristicaData } = useContext(
      CaracteristicaContext
    );
    //Captura de datos segun si es Convencional o no Convencional
    let dato = "";
    if (tipo_unidad === "Convencional") {
      dato = data.Convencional;
    } else {
      dato = data.No_Convencional;
    }

    //variable.caracteristicasunidadconstruccion.tipo_construccion =      dato.tipo_construccion;

    const tplanta = data["Tipo Planta"];
    const desti = dato["Destinacion"];
    const [uso, setUso] = useState();
    const [sopti, setSopti] = useState();
    const [djson, setDjson] = useState({});

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
        setDjson({ ...djson, [name]: value });
        destino.id = optionName;
        //Guardar Datos al contexto
        updateCaracteristicaData((prevData) => {
          return {
            ...prevData,
            tipo_planta: newDataCentral.tipo_planta,
            tipo_unidad_construccion: newDataCentral.tipo_unidad_construccion,
            uso: newDataCentral.uso,
            tipo_construccion: newObjGen.tipo_construccion,
            total_plantas: newObjGen.total_plantas,
            total_habitaciones: newObjGen.total_habitaciones,
            total_banios: newObjGen.total_banios,
            total_locales: newObjGen.total_locales,
            anio_construccion: newObjGen.anio_construccion,
            observaciones: newObjGen.observaciones,
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
    function Mdesti({ select, nom }) {
      //Variables
      const { dataCaracteristica } = useContext(CaracteristicaContext);
      const [tipoanexo, setTipoAnexo] = useState("");
      const inicial = Object.keys(select);
      ////////////////////////////////Arreglo de Calificaciones////////////////////////////
      let tamaño_Grupo = inicial.length - 1;
      let values_Grupo = {
        clase_calificacion: "",
        conservacion: "",
        subtotal: "",
        objetoconstruccion: [],
      };
      const [arrayClass, setArrayClass] = useState(
        Array(tamaño_Grupo).fill(values_Grupo)
      );
      const UpdateArrayClass = (nuevoArray) => {
        //console.log("nuevos Datos", nuevoArray);
        setArrayClass(nuevoArray);
      };
      ///////////////////////////////////////////////
      async function createJsonConve() {
        let sum = 0;
        arrayClass.map((item, index) => {
          sum += item.subtotal;
        });
        console.log("Sumatoria", sum);
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
        console.log("url", url);
        console.log("dadadad", raw);
        try {
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response}`);
          }
          const result = await response.text();
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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
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
        console.log("Json No Conve", raw);
        try {
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response}`);
          }
          const result = await response.text();
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

      /////////////////////////////////////////////Formularios segun la destinacion
      if (tipo_unidad === "Convencional") {
        ////////Forumlario Convencional
        return (
          <div className="flex flex-col items-start w-full pb-2">
            <div className="flex flex-col items-start w-full pb-2">
              <h3 className="text-3xl mb-4"> Destinacion {nom}</h3>
              <Tabs
                tabs={select}
                arrayClass={arrayClass}
                updateFunction={UpdateArrayClass}
              />
            </div>
            <div className="flex flex-row w-full items-center justify-center pb-2 text-left ">
              <button
                onClick={createJsonConve}
                className=" p-1 w-1/3 text-center rounded-md text-white bg-teal-500 text-lg ml-2"
              >
                Guardar
              </button>
            </div>
          </div>
        );
      } else {
        ////////Forumlario No Convencional
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
                {Object.entries(select).map((tipo) => {
                  return (
                    <option
                      value={tipo[1].tipo_anexo}
                      key={tipo[1].tipo_anexo}
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
    function UsoForm({ data }) {
      return (
        <div className="flex flex-row items-center text-left pb-2">
          <label className="w-1/3">Uso</label>
          <select
            name="uso"
            className="p-1 w-2/3 text-center border-2 rounded-md"
            onChange={handleChange}
            value={newDataCentral.uso}
          >
            <option></option>
            {Object.entries(data[uso].Uso).map((item) => {
              return (
                <option key={item[1].t_id} value={item[1].t_id}>
                  {item[1].dispname}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
    //Formulario Completo
    return (
      <div className="w-1/2 flex flex-col  bg-transparent h-full bg-white bg-opacity-80 items-center">
        <div className="w-full flex flex-col  text-center">
          <div className="flex flex-row items-center text-left pb-2">
            <label className="w-1/3">Tipo Planta</label>
            <select
              name="tipo_planta"
              className="p-1 w-2/3 text-center border-2 rounded-md"
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
          <div className="flex flex-row items-center text-left pb-2">
            <label className="w-1/3">Tipo Unidad Construccion</label>
            <select
              name="tipo_unidad_construccion"
              className="p-1 w-2/3 text-center border-2 rounded-md"
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
          {newDataCentral.tipo_unidad_construccion.length != 0 && (
            <UsoForm data={dato["Tipo Unidad Construccion"]} />
          )}
          <div className="flex flex-row items-center text-left pb-2">
            <label className="w-1/3">Destinacion</label>
            <select
              name="destinacion"
              className="p-1 w-2/3 text-center border-2 rounded-md"
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
        {sopti != undefined && <Mdesti select={desti[sopti]} nom={sopti} />}
      </div>
    );
  }
  if (loading) {
    <h1 className="text-9xl">Cargando</h1>;
  } else {
    console.log("dato est", estMsjError);
    return (
      <div className=" w-full flex flex-col  items-center justify-center bg-transparent h-full bg-white bg-opacity-80">
        <h1 className="text-3xl">Construccion {dataForm.data}</h1>
        <h1 className="text-3xl">Datos Generales</h1>
        <div className="flex flex-row items-center w-1/2 pb-2 text-left ">
          <label className="w-1/3"> Numero Pisos</label>
          <input
            name="total_plantas"
            type="number"
            onChange={DataGeneral}
            className="p-1 w-2/3 text-center border-2 rounded-md"
            value={newObjGen.total_plantas}
          ></input>
        </div>
        <div className="flex flex-row items-center w-1/2 pb-2 text-left">
          <label className="w-1/3"> Numero Habitaciones</label>
          <input
            name="total_habitaciones"
            type="number"
            onChange={DataGeneral}
            className="p-1 w-2/3 text-center border-2 rounded-md"
            value={newObjGen.total_habitaciones}
          ></input>
        </div>
        <div className="flex flex-row items-center w-1/2 pb-2 text-left">
          <label className="w-1/3"> Numero Baños</label>
          <input
            name="total_banios"
            type="number"
            onChange={DataGeneral}
            className="p-1 w-2/3 text-center border-2 rounded-md"
            value={newObjGen.total_banios}
          ></input>
        </div>
        <div className="flex flex-row items-center w-1/2 pb-2 text-left">
          <label className="w-1/3"> Numero Locales</label>
          <input
            name="total_locales"
            type="number"
            onInput={soloNumeros}
            onChange={DataGeneral}
            className="p-1 w-2/3 text-center border-2 rounded-md"
            value={newObjGen.total_locales}
          ></input>
        </div>
        <div className="flex flex-col items-center w-1/2 pb-2 text-left">
          <div className="w-full flex flex-row">
            <label className="w-1/3"> Año Construccion</label>
            <input
              name="anio_construccion"
              type="number"
              onChange={DataGeneral}
              value={newObjGen.anio_construccion}
              className="p-1 w-2/3 text-center border-2 rounded-md"
            ></input>
          </div>
          {estMsjError.anio_construccion ? (
            <div className="w-full flex flex-row items-center justify-center text-center">
              <label className="text-red-600">
                {" "}
                "Año debe ser mayor a 1600"
              </label>
            </div>
          ) : null}
        </div>
        <div className="flex flex-row items-center w-1/2 pb-2 text-left">
          <label className="w-1/3"> Observaciones</label>
          <input
            name="observaciones"
            type="text"
            onChange={DataGeneral}
            className="p-1 w-2/3 text-center border-2 rounded-md"
            value={newObjGen.observaciones}
          ></input>
        </div>
        <GrupoProvider>
          {data != undefined && <CentralForm tipo_unidad={dataForm.data} />}
        </GrupoProvider>
      </div>
    );
  }
};

export default UniconstForm;
