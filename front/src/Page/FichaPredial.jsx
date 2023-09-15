import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ApiTest from "./Api";
import Tabs from "./Tabs";
import DataContext from "./DataContext";
const FichaPredial = () => {
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

  function CForm() {
    const gen = data["Datos Generales"];
    const key = Object.keys(gen);
    const desti = data["Destinacion"];
    const [sopti, setSopti] = useState();
    const [djson, setDjson] = useState({});
    <DataContext value={djson} />;
    console.log(useContext(DataContext));
    const handleChange = (event) => {
      const { name, value } = event.target;

      setDjson({ ...djson, [name]: value });
    };
    function Optionselected(e) {
      const sv = e.target.value;
      if (e.target.selectedIndex != 0) {
        const { name, value } = e.target;

        setSopti(sv);
        setDjson({ ...djson, [name]: value });
      }
    }
    function Mdesti({ select, nom }) {
      return (
        <div className="flex flex-col items-start w-full pb-2">
          <h3 className="text-3xl mb-4"> Destinacion {nom}</h3>
          <Tabs tabs={select} est={djson} />
        </div>
      );
    }
    return (
      <div className="w-11/12 flex flex-col p-4 overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center">
        <div className="w-2/5 flex flex-col  ">
          <h1 className="text-3xl">Datos Generales</h1>
          {Object.entries(gen).map((item) => (
            <div className="flex flex-row items-center pb-2">
              <label className="w-1/3">{item}</label>
              <input
                name={item}
                value={djson.name}
                onChange={handleChange}
                type="text"
                className="p-1 w-2/3 text-center border-2 rounded-md"
              ></input>
            </div>
          ))}
          <div className="flex flex-row items-center pb-2">
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
                return <option value={item[0]}>{item[0]}</option>;
              })}
            </select>
          </div>
        </div>

        {sopti != undefined && <Mdesti select={desti[sopti]} nom={sopti} />}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 w-full flex flex-col overflow-auto items-center justify-center">
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
      <div className="p-4 w-full flex flex-col overflow-auto items-center justify-center">
        <button className="p-2 w-1/6 text-center h-12  rounded-md  border-2  text-white bg-teal-500 ">
          <FontAwesomeIcon icon={faPlus} />
          <label className="m-4"> Agregar Unidad </label>
        </button>
        <CForm />
      </div>
    );
  }
};

export default FichaPredial;

/* 

   {Object.entries(select).map((item, value) => {
            return (
              <div className="flex flex-col  pb-2 w-full">
                <h4 className="text-2xl w-1/3">{item[0]}</h4>
                {Object.entries(item[1]).map((tipo) => {
                  return (
                    <div className="flex flex-row  pb-2 w-full">
                      <h5 className="w-1/3"> {tipo[0]}</h5>

                      <select className="p-1 w-2/3 text-center border-2 rounded-md">
                        <option></option>
                        {Object.entries(tipo[1]).map((sel) => {
                          const sele = sel[1];
                          return (
                            <option value={sele.Puntaje}>{sele.Nombre}</option>
                          );
                        })}
                      </select>
                    </div>
                  );
                })}
              </div>
            );
          })}

















{Object.entries(aux[1]).map((tipo) => {
                  console.log(tipo);
                })}
                
                
                
                  useEffect(() => {
    Load_Data();
  }, []);
  
  
  return (
      <div className="p-4 w-full">
        <button
          className="p-2 w-1/4 text-center h-12  rounded-md  border-2  text-white bg-teal-500 "
          onClick={Load_Data}
        >
          <FontAwesomeIcon icon={faPlus} />
          <label className="m-4"> Cargar Unidad</label>
        </button>
      </div>
    );
  


  */
