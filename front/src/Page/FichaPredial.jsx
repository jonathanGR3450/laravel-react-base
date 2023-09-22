import { useEffect, useState } from "react";
import ApiTest from "./Api";
const FichaPredial = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Load_Data();
  }, []);

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

    function Optionselected(e) {
      const sv = e.target.value;
      if (e.target.selectedIndex != 0) setSopti(sv);
    }
    function Mdesti({ select, nom }) {
      return (
        <div className="flex flex-col items-start pb-2">
          <h3 className="text-3xl"> Destinacion {nom}</h3>
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
        </div>
      );
    }
    return (
      <div
        className="w-full
       p-8 overflow-auto bg-transparent h-full  bg-white bg-opacity-80"
      >
        <h1 className="text-3xl">Datos Generales</h1>
        {Object.entries(gen).map((item, value) => (
          <div className="flex flex-row items-center pb-2">
            <label className="w-1/3">{item}</label>
            <input
              type="text"
              className="p-1 w-2/3 text-center border-2 rounded-md"
            ></input>
          </div>
        ))}
        <div className="flex flex-row items-center pb-2">
          <label className="w-1/3">Destinacion</label>
          <select
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
        {sopti != undefined && <Mdesti select={desti[sopti]} nom={sopti} />}
      </div>
    );
  }

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return <CForm />;
  }
};

export default FichaPredial;
/*  {Object.entries(aux[1]).map((tipo) => {
                  console.log(tipo);
                })} */
