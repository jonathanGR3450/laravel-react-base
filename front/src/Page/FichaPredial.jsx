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
import UniconstForm from "./Uniconst";
import { CaracteristicaProvider } from "./Context/CaracteristicaContext";
const FichaPredial = () => {
  const [loading, setLoading] = useState(true);
  const [valueBtt, setValueBtt] = useState("");
  function btt(e) {
    setLoading(true);
    setValueBtt(e.target.value);
  }
  //<UniconstForm data="Convencional" />
  const Option = () => {
    return (
      <div className="w-2/4 flex flex-col p-4 bg-transparent  bg-white bg-opacity-80 items-center">
        <h1 className="text-3xl mb-4">Tipo de Construccion</h1>
        <div className="w-full flex flex-row">
          <button
            onClick={btt}
            className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
            value={66}
          >
            Convencional
          </button>
          <button
            onClick={btt}
            className="p-2 w-1/2 text-center   rounded-md  border-2  text-white bg-teal-500 "
            value={67}
          >
            No Convencional
          </button>
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
        cargarobjetos(crearobjetos());
        incrementIdenti();
      } else {
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
      <CaracteristicaProvider>
        {valueBtt == 66 ? (
          <UniconstForm data={"Convencional"} id={66} />
        ) : (
          <UniconstForm data={"No Convencional"} id={67} />
        )}
      </CaracteristicaProvider>
    </div>
  );
};

export default FichaPredial;
/*
 */
