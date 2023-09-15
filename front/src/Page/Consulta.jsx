import Table from "./Table";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ApiTest from "./Api";
import Tabs from "./Tabs";
const Consulta = () => {
  let { data } = useParams();
  console.log(data);
  const [db, setDb] = useState();
  const [numdata, setnumData] = useState(" ");
  const handleChange = (event) => {
    event.preventDefault();
    setnumData(event.target.value);
  };

  function Load_Data(e) {
    e.preventDefault();
    let api = ApiTest();
    let url = import.meta.env.VITE_API_URL;
    api.get(url).then((response) => {
      if (!response.err) {
        setDb(response);
      } else {
        setDb(null);
      }
    });
  }
  return (
    <div
      key={data}
      className="bg-transparent p-8 h-full w-full bg-white bg-opacity-80"
    >
      <h1 className="text-3xl">Busqueda de Registros {data}</h1>
      <h2 className="text-xl">
        Por favor primero seleccione el tipo de busqueda y despues incluya la
        informacion a buscar
      </h2>
      <form
        className="z-40 flex flex-row w-full items-center p-2"
        onSubmit={Load_Data}
      >
        <div className="w-1/5">
          <h3 className="font-semibold"> Tipo de Busqueda *:</h3>
          <input
            type="text"
            className="p-1 w-3/4 text-center border-2 rounded-md "
            value={numdata}
            onChange={handleChange}
          ></input>
        </div>
        <div className="w-1/5">
          <h3 className="font-semibold"> Registro a Buscar *:</h3>
          <input
            type="text"
            className=" p-1 w-3/4 text-center border-2 rounded-md "
            value={numdata}
            onChange={handleChange}
          ></input>
        </div>
        <div className="w-1/5 h-auto flex  ">
          <button
            type="submit"
            className="p-2 w-12 text-center h-12  rounded-md   text-teal-500 text-4xl"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
      {db != undefined && <Tabla data={db} />}
    </div>
  );
};

function Tabla({ data }) {
  const keys = Object.keys(data[0]);
  const dataArray = [data[0]];
  const tabs = keys.map((item) => ({
    label: item,
    data: dataArray.map((items) => items[item]),
  }));
  return <Tabs tabs={tabs}></Tabs>;
}
export default Consulta;
