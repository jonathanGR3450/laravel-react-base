import LogoColor from "../img/LogoColor.png";
import ApiTest from "./Api";
import { useEffect, useState } from "react";
import Table from "./Table";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "./Tabs";
import DataTable from "./DataTable";
const Tablero = () => {
  const [db, setDb] = useState();
  const [numdata, setnumData] = useState(" ");
  const navigate = useNavigate();
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
      className="flex flex-col h-he-75 w-full items-center bg-no-repeat bg-center bg-contain "
      style={{ backgroundImage: `url(${LogoColor})` }}
    >
      <form
        className="z-40 flex flex-col w-full items-center"
        onSubmit={Load_Data}
      >
        <input
          type="text"
          className=" p-1 mt-4 mb-2 w-2/5 text-center border-2"
          value={numdata}
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Buscar"
          className="p-2 w-2/5 text-center border-2 rounded-md mb-3 text-white bg-green-600"
        ></input>
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

export default Tablero;

/*
   <Tab key={item} label={item}>
            <table className="w-3/4  text-center text-base font-light  border-black border-2 border-solid ">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="whitespace-nowrap px-6 py-4">
                  {keys.map((header) => (
                    <th scope="col" className="px-6 py-4" key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const aux = Object.keys(item);
                  return (
                    <tr className="border-b dark:border-neutral-500 text-center">
                      {aux.map((header) => (
                        <td className="whitespace-nowrap px-6 py-4">
                          {item[header]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Tab>





   navigate("Data", { state: { response } });
{db != undefined && <Outlet />}


    <Navigate to="Data" state={db} />;
        <Outlet />;
  <Tab />
      <Table data={db} />
  <DataTable data={aux}></DataTable>;
  console.log(db[0])
      return <DataTable data={db[0].Datos_Adicionales_Levan_Pred}></DataTable>;


 {keys.map((item) => {
            console.log("Dash " + item);
            <DataTable data={data[item]}></DataTable>;
          })}

  useEffect(() => {
    let api = ApiTest();
    let url = import.meta.env.VITE_API_URL;
    api.get(url).then((response) => {
      if (!response.err) {
        setDb(response);
      } else {
        setDb(null);
      }
    });
  }); 
  

Todos Los Valores : 
  const Listado = () => {
    return db.map((item) => {
      return (
        <div key={item.id}>          
          {Object.keys(item).map((key) => {
            if (item.hasOwnProperty(key)) {
              return (
                <p key={key}>
                  {key + ": " + item[key]}
                </p>
              );
            }
            return null; // Opcional: para evitar renderizar claves no deseadas
          })}
           <p>--------------------------------------------------------------</p>
        </div>
      );
    });
  };
Valores Definidos




     */
