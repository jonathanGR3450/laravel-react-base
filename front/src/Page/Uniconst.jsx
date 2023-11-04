//Seccion Unidad Construccion Convencional y no Convencional
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import ApiTest from "./Api";
import Tabs from "./Tabs";
import { variable, destino, dataobjetoconstruccion } from "./DataContext";
import { useParams } from "react-router-dom";
import Estructura from "../Json/estructure.json";
const UniconstForm = () => {
  let { info } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  //Cargar el json Structure
  function Load_Data() {
    //let url = import.meta.env.VITE_API_URL;
    setData(Estructura.general);
    setLoading(false);
  }

  useEffect(() => {
    Load_Data();
  }, []);

  function CentralForm({ tipo_unidad }) {
    console.log("tipo unidad", tipo_unidad);
    let dato = "";
    if (tipo_unidad === "Convencional") {
      dato = data.Convencional;
      console.log("Data Convencional", dato);
    } else {
      dato = data.No_Convencional;
      console.log("Data No Convencional", dato);
    }
    variable.caracteristicasunidadconstruccion.tipo_construccion =
      dato.tipo_construccion;

    const gen = data["Datos Generales"];
    console.log("Variable", gen);
    const tplanta = data["Tipo Planta"];
    const desti = dato["Destinacion"];
    const [uso, setUso] = useState();
    const [seleuso, setSeleuso] = useState();
    const [sopti, setSopti] = useState();
    const [djson, setDjson] = useState({});

    //Subir Variable Global
    const handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      //LLenar los campos de datos generales
      variable.caracteristicasunidadconstruccion[name] = value;

      setSeleuso(value);
      //console.log(name, value);
      //setDjson({ ...djson, [name]: value });
    };
    //Manejo Select de destinacion
    function Optionselected(e) {
      const sv = e.target.value;
      console.log("Dato Destinacion", sv);
      if (e.target.selectedIndex != 0) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const optionName = selectedOption.getAttribute("name");
        const { name, value } = e.target;
        setSopti(sv);
        setDjson({ ...djson, [name]: value });
        destino.id = optionName;
      }
    }
    //Select Manejar el select para generar la pestaña uso
    function ChangeUse(e) {
      let name = e.target.name;
      let value = e.target.value;
      let sele = e.target.options[e.target.selectedIndex];
      let nomsele = sele.getAttribute("name");
      //LLenar los campos de datos generales
      variable.caracteristicasunidadconstruccion[name] = value;
      setUso(nomsele);
    }
    //Metodo para el Manejo de Tipo del menu No Convencional
    function Tipo(e) {
      let opt = e.target.options[e.target.selectedIndex];
      let nomsele = opt.getAttribute("name");
      destino.tipo_anexo = nomsele;
      console.log("Destino", destino);
    }
    //Componente para los datos de destinacion
    function Mdesti({ select, nom }) {
      console.log("Select", select);
      console.log("nom", nom);
      if (tipo_unidad === "Convencional") {
        return (
          <div className="flex flex-col items-start w-full pb-2">
            <div className="flex flex-col items-start w-full pb-2">
              <h3 className="text-3xl mb-4"> Destinacion {nom}</h3>
              <Tabs tabs={select} />
            </div>
          </div>
        );
      } else {
        console.log("123", select);
        return (
          <div className="flex flex-col items-center text-center w-full pb-2">
            <h3 className="text-3xl mb-4"> {nom}</h3>
            <div className="flex flex-row w-full">
              <h1 className="text-3xl w-1/2">Tipo</h1>
              <select
                className="p-1 w-1/3 text-center border-2 rounded-md"
                onChange={Tipo}
              >
                <option></option>
                {Object.entries(select).map((tipo) => {
                  return (
                    <option
                      value={tipo[1].Tipo}
                      key={tipo[1].tipo_anexo}
                      name={tipo[1].tipo_anexo}
                    >
                      {tipo[1].Tipo}
                    </option>
                  );
                })}
              </select>
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
            value={seleuso}
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
      <div className="w-11/12 flex flex-col p-4 overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center">
        <div className="w-3/5 flex flex-col  text-center">
          <h1 className="text-3xl">Construccion {info}</h1>
          <h1 className="text-3xl">Datos Generales</h1>
          {Object.entries(gen).map((item) => (
            <div className="flex flex-row items-center pb-2 text-left">
              <label className="w-1/3">{item[0]}</label>
              <input
                key={item[1].nom}
                name={item[1].nom}
                value={djson.name}
                onChange={handleChange}
                type="text"
                className="p-1 w-2/3 text-center border-2 rounded-md"
              ></input>
            </div>
          ))}
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
          {uso != undefined && (
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
    return (
      <div className=" w-full flex flex-col overflow-auto items-center justify-center">
        {data != undefined && <CentralForm tipo_unidad={info} />}
      </div>
    );
  }
};

export default UniconstForm;
/*  {Object.entries(tplanta).map((item) => (
            <div className="flex flex-row items-center text-left pb-2">
              <label className="w-1/3">{item[0]}</label>
            </div>
          ))}
          
          
          
            function ConveForm() {
    const dato = data.Convencional;
    variable.caracteristicasunidadconstruccion.tipo_construccion =
      dato.tipo_construccion;
    const gen = data["Datos Generales"];
    const tplanta = data["Tipo Planta"];
    const key = Object.keys(gen);
    const desti = dato["Destinacion"];
    const [uso, setUso] = useState();
    const [seleuso, setSeleuso] = useState();
    const [sopti, setSopti] = useState();
    const [djson, setDjson] = useState({});

    //Subir Variable Global
    const handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      //LLenar los campos de datos generales
      variable.caracteristicasunidadconstruccion[name] = value;

      setSeleuso(value);
      //console.log(name, value);
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
      }
    }
    //Select Manejar el select para generar la pestaña uso
    function ChangeUse(e) {
      let name = e.target.name;
      let value = e.target.value;
      let sele = e.target.options[e.target.selectedIndex];
      let nomsele = sele.getAttribute("name");
      //LLenar los campos de datos generales
      variable.caracteristicasunidadconstruccion[name] = value;
      setUso(nomsele);
    }
    //Componente para los datos de destinacion
    function Mdesti({ select, nom }) {
      return (
        <div className="flex flex-col items-start w-full pb-2">
          <div className="flex flex-col items-start w-full pb-2">
            <h3 className="text-3xl mb-4"> Destinacion {nom}</h3>
            <Tabs tabs={select} />
          </div>
        </div>
      );
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
            value={seleuso}
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

    //Formulario
    return (
      <div className="w-11/12 flex flex-col p-4 overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center">
        <div className="w-3/5 flex flex-col  text-center">
          <h1 className="text-3xl">Construccion Convencional</h1>
          <h1 className="text-3xl">Datos Generales</h1>
          {Object.entries(gen).map((item) => (
            <div className="flex flex-row items-center pb-2 text-left">
              <label className="w-1/3">{item[0]}</label>
              <input
                key={item[1].nom}
                name={item[1].nom}
                value={djson.name}
                onChange={handleChange}
                type="text"
                className="p-1 w-2/3 text-center border-2 rounded-md"
              ></input>
            </div>
          ))}
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
          {uso != undefined && (
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
              {Object.entries(desti).map((item) => {
                return (
                  <option
                    value={item[0]}
                    name={item[1].tipo_calificar}
                    key={item[1].tipo_calificar}
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
          */
