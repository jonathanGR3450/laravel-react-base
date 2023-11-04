import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import ApiTest from "./Api";
import Tabs from "./Tabs";
import {
  FinalJson,
  cargarobjetos,
  crearobjetos,
  identi,
  incrementIdenti,
  resetJson,
} from "./DataContext";
import { Link, Outlet } from "react-router-dom";
const FichaPredial = () => {
  const [loading, setLoading] = useState(true);
  const Option = () => {
    return (
      <div className="w-2/4 flex flex-col p-4 bg-transparent  bg-white bg-opacity-80 items-center">
        <h1 className="text-3xl mb-4">Tipo de Construccion</h1>
        <div className="w-full flex flex-row">
          <Link
            to="/Ficha/Uniconst/Convencional"
            onClick={() => setLoading(true)}
            className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
          >
            Convencional
          </Link>
          <Link
            to="/Ficha/Uniconst/No Convencional"
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
  useEffect(() => {
    if (loading) {
    } else {
      if (identi.id != 0) {
        //console.log(loading, identi.id);
        cargarobjetos(crearobjetos());
        incrementIdenti();
      } else {
        //console.log("Entra", identi.id);
        incrementIdenti();
      }
    }
    //resetJson();
  }, [loading]);

  return (
    <div className="p-4 w-3/4 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center ">
      <div className="w-2/4 flex">
        <button
          onClick={LoadOptions}
          className="p-2 w-1/2 text-center  rounded-md  border-2  text-white bg-teal-500 "
        >
          <FontAwesomeIcon className="mr-4" icon={faPlus} />
          Cargar Caracteristicas
        </button>
        <Link
          to="/Resumen"
          className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
        >
          <FontAwesomeIcon icon={faEye} />
          <label className="m-4"> Ver Resumen </label>
        </Link>
      </div>
      {loading != true && <Option />}
      <Outlet />
    </div>
  );
};

export default FichaPredial;
/*
 */
