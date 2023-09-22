import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import ApiTest from "./Api";
import Tabs from "./Tabs";
import { variable } from "./DataContext";
import { Link, Outlet } from "react-router-dom";
const FichaPredial = () => {
  const [loading, setLoading] = useState(true);

  const Option = () => {
    return (
      <div className="w-2/4 flex flex-col p-4 bg-transparent  bg-white bg-opacity-80 items-center">
        <h1 className="text-3xl mb-4">Tipo de Construccion</h1>
        <div className="w-full flex flex-row">
          <Link
            to="/Ficha/Convencional"
            onClick={() => setLoading(true)}
            className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
          >
            Convencional
          </Link>
          <Link
            to="/Ficha/NoConvencional"
            onClick={() => setLoading(true)}
            className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
          >
            No Convencional
          </Link>
        </div>
      </div>
    );
  };
  function LoadOptions() {
    setLoading(false);
  }
  return (
    <div className="p-4 w-3/4 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center ">
      <div className="w-2/4">
        <button
          onClick={LoadOptions}
          className="p-2 w-1/2 text-center  rounded-md  border-2  text-white bg-teal-500 "
        >
          <FontAwesomeIcon className="mr-4" icon={faPlus} />
          Cargar Unidad
        </button>
        <button className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 ">
          <FontAwesomeIcon icon={faEye} />
          <label className="m-4"> Ver Resumen </label>
        </button>
      </div>
      {loading != true && <Option />}
      <Outlet />
    </div>
  );
};

export default FichaPredial;
/*


const [data, setData] = useState([]);
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

if (loading) {
  return (
    <div className="p-4 w-full flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center ">
      <button
        className="p-2 w-1/4 text-center h-12  rounded-md  border-2  text-white bg-teal-500 "
        onClick={Load_Data}
      >
        <FontAwesomeIcon className="mr-4" icon={faPlus} />
        Cargar Unidad
      </button>
    </div>
  );
} else {
  return (
    <div className="w-11/12 flex flex-col p-4 overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center">
      <h1 className="text-3xl mb-4">Tipo de Construccion</h1>
      <div className="w-full flex flex-row">
        <Link
          to="/Ficha/Convencional"
          className="p-2 w-1/2 text-center h-12  rounded-md  border-2  text-white bg-teal-500 "
        >
          Convencional
        </Link>
        <Link
          to="/Ficha/NoConvencional"
          className="p-2 w-1/2 text-center h-12  rounded-md  border-2  text-white bg-teal-500 "
        >
          No Convencional
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
*/
