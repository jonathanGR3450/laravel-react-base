import React, { useState, useEffect } from "react";

import { variable, dataobjetoconstruccion, crearobjetos } from "./DataContext";

const Tabs = ({ tabs }) => {
  //Texto que van a tener las pestañas
  const inicial = Object.keys(tabs);

  //Asignar cual es la pestaña principal cuando cargue el componente
  const [activeTab, setActiveTab] = useState(inicial[1]);

  //tipoSel me guarda los tipos de objeto de construccion de los Select Elegidos
  const [tipoSel, setTiposel] = useState({});

  //djson me guarda los Puntajes de los Select Elegidos
  const [djson, setDjson] = useState({});

  //djson me guarda los Puntajes de los Select Elegidos
  const [nomb, setNom] = useState({});

  //Puntajes de los campos seleccionados
  const [selectSel, setSelect] = useState({});

  //ID de los campos seleccionados sobre los tipos de objeto de construccion
  const [selecttipo, setSelecttipo] = useState({});

  //Evento de los Select de los objetos de construccion
  const handleChange = (event) => {
    let { name, value } = event.target;
    let opt = event.target.options[event.target.selectedIndex];
    let nom = opt.dataset.nom;
    let toc = opt.dataset.toc;
    //guarda el valor del puntaje que se elije en el select
    setDjson({ ...djson, [name]: value });
    //guarda el valor del tipo de objeto de construccion que se elije en el select
    setTiposel({ ...tipoSel, [name]: toc });
    setNom({ ...nomb, [name]: nom });
  };
  useEffect(() => {
    dataobjetoconstruccion.tipo_construccion = tipoSel;
    dataobjetoconstruccion.puntos = djson;
  }, [djson, selectSel]);

  //Activar Pestaña
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    //Guardar los puntajes de los campos seleccionados
    setSelect({ ...selectSel, [activeTab]: djson });
    //Guardar los tipos de objeto de los campos seleccionados
    setSelecttipo({ ...selecttipo, [activeTab]: tipoSel });
    //Cambia la pestaña
    setActiveTab(newActiveTab);
  };

  const Tab = ({ data }) => {
    //Contenido Menu de los item Estructura , cocina etc
    console.log("COnsole", data[0]);
    console.log(djson);
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <div className="flex flex-col pb-2 w-full text-center mr-4">
          <h5 className="w-full "> {data[0]}</h5>
          <select
            name={data[0]}
            value={nomb[data]}
            onChange={handleChange}
            className="p-1 w-full text-center border-2 rounded-md overflow-auto"
          >
            <option value="No Cargo"></option>
            {Object.entries(data[1]).map((sel, index) => {
              const sele = sel[1];
              //toc=tipo objeto construccion
              //console.log("Datos", sele);
              return (
                <option
                  data-nom={sele.Nombre}
                  data-toc={sele.tipo_objeto_construccion}
                  value={sele.puntos}
                >
                  {sele.Nombre}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };
  //DESTINACION
  return (
    <div className=" w-full">
      <div className="flex border-b border-gray-300">
        {Object.entries(tabs).map((tab, index) => {
          if (index != 0) {
            return (
              <button
                key={tab[0]}
                value={tab[0]}
                className={`${
                  activeTab === tab[0]
                    ? " text-black border-teal-800 border-2"
                    : ""
                } flex-1   bg-teal-500 text-white  font-medium py-2`}
                onClick={(e) => handleClick(e, tab[0])}
              >
                {tab[0]}
              </button>
            );
          }
        })}
      </div>
      <div className=" py-4">
        {Object.entries(tabs).map((tab, index) => {
          if (index != 0) {
            if (tab[0] === activeTab) {
              const prueba = tab[1];

              return (
                <div className="w-full flex flex-row" key={tab[0]}>
                  {Object.entries(prueba).map((item, index) => {
                    if (index != 0) {
                      return <Tab data={item} />;
                    }
                  })}
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};
export default Tabs;
