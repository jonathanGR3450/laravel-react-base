import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import ApiTest from "./Api";
import Tabs from "./Tabs";
import { variable } from "./DataContext";

const Conven = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  function Load_Data() {
    let api = ApiTest();
    let url = import.meta.env.VITE_API_URL;
    api.get(url).then((response) => {
      if (!response.err) {
        setData(response);
      } else {
        setData([]);
      }
      setLoading(false);
    });
  }
  function ConveForm() {
    const dato = data.Convencional;
    const gen = dato["Datos Generales"];
    const key = Object.keys(gen);
    const desti = dato["Destinacion"];
    const [sopti, setSopti] = useState();
    const [djson, setDjson] = useState({});

    const handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      variable.caracteristicasunidadconstruccion[name] = value;
      //console.log(name, value);
      //setDjson({ ...djson, [name]: value });
    };
    function Optionselected(e) {
      const sv = e.target.value;
      if (e.target.selectedIndex != 0) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const optionName = selectedOption.getAttribute("name");
        const { name, value } = e.target;

        setSopti(sv);
        setDjson({ ...djson, [name]: value });
      }
    }
    function Mdesti({ select, nom }) {
      return (
        <div className="flex flex-col items-start w-full pb-2">
          <h3 className="text-3xl mb-4"> Destinacion {nom}</h3>
          <Tabs tabs={select} />
        </div>
      );
    }
    return (
      <div className="w-11/12 flex flex-col p-4 overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center">
        <div className="w-3/5 flex flex-col  text-center">
          <h1 className="text-3xl">Construccion Convencional</h1>
          <h1 className="text-3xl">Datos Generales</h1>
          {Object.entries(gen).map((item) => (
            <div className="flex flex-row items-center pb-2 text-left">
              <label className="w-1/3">{item[0]}</label>
              <input
                name={item[1].nom}
                value={djson.name}
                onChange={handleChange}
                type="text"
                className="p-1 w-2/3 text-center border-2 rounded-md"
              ></input>
            </div>
          ))}
          <div className="flex flex-row items-center text-left pb-2">
            <label className="w-1/3">Destinacion</label>
            <select
              name="destinacion"
              className="p-1 w-2/3 text-center border-2 rounded-md"
              id="selectdesti"
              value={sopti}
              onChange={Optionselected}
            >
              <option> - - - </option>
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
  useEffect(() => {
    Load_Data();
    //console.log(data);
  }, []);

  if (loading) {
    <h1 className="text-9xl">Cargando</h1>;
  } else {
    return (
      <div className=" w-full flex flex-col overflow-auto items-center justify-center">
        {data != undefined && <ConveForm />}
      </div>
    );
  }
};

export default Conven;
