import React, { useState, useEffect, useContext } from "react";

import { variable, dataobjetoconstruccion, crearobjetos } from "./DataContext";
import { GrupoContext } from "./Context/CaracteristicaContext";
const Tabs = ({ tabs, arrayClass, updateFunction }) => {
  //Texto que van a tener las pestañas
  const inicial = Object.keys(tabs);

  let { grupocalificacion, updateGrupoCalificacion } = useContext(GrupoContext);

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

  useEffect(() => {
    dataobjetoconstruccion.tipo_construccion = tipoSel;
    dataobjetoconstruccion.puntos = djson;
  }, [djson, selectSel]);

  //Activar Pestaña
  const handleClick = (e, newActiveTab) => {
    let index = inicial.indexOf(activeTab);
    let indexArray = index - 1;
    let conservacion = 3;
    let sum = 0;

    arrayTemp.map((item) => {
      if (tabs.tipo_calificar == 718) {
        if (inicial.includes("Baño") || inicial.includes("Cocina")) {
          switch (parseInt(item.tipo_objeto_construccion)) {
            case 137:
              conservacion = 1;
              break;
            case 138:
              conservacion = 2;
              break;
            case 139:
              conservacion = 3;
              break;
            case 140:
              conservacion = 4;
              break;
            case 141:
              conservacion = 4;
              break;
            case 152:
              conservacion = 1;
              break;
            case 153:
              conservacion = 2;
              break;
            case 154:
              conservacion = 3;
              break;
            case 155:
              conservacion = 4;
              break;
            case 156:
              conservacion = 4;
              break;
          }
        }
      }
      if (item.tipo_objeto_construccion < 6) {
        conservacion = parseInt(item.tipo_objeto_construccion);
        arrayTemp.pop();
      }
      sum += item.puntos;
    });

    //////////////////Creacion de Grupo Calificacion
    let newgrupo = {
      clase_calificacion: tabs[activeTab].clase_calificacion,
      conservacion: conservacion,
      subtotal: sum,
      objetoconstruccion: arrayTemp,
    };
    let newCalificacion = [...arrayClass];
    newCalificacion[indexArray] = newgrupo;
    updateFunction(newCalificacion);
    setActiveTab(newActiveTab);
    //updateGrupoCalificacion(newgrupo);
  };

  let tamaño = 0;
  let initialValue = {
    tipo_objeto_construccion: "",
    puntos: "",
  };
  let arrayTemp = "";

  //////////////////////////Formulario de las Tabs que son Select/////////////////////////
  const Tab = ({ data, index }) => {
    let aux = data[0];
    // Contenido Menu de los item Estructura , cocina, etc.
    // Captura el valor de los select de cada pestaña

    const handleChange = (event) => {
      let { name, value } = event.target;
      let opt = event.target.options[event.target.selectedIndex];
      let toc = opt.dataset.toc;

      let newobjetoconstruccion = {
        tipo_objeto_construccion: toc,
        puntos: parseInt(value),
      };
      arrayTemp[index - 1] = newobjetoconstruccion;
    };
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <div className="flex flex-col pb-2 w-full text-center mr-4">
          <h5 className="w-full "> {data[0]}</h5>
          <select
            name={data[0]}
            value={nomb[aux]}
            onChange={handleChange}
            className="p-1 w-full text-center border-2 rounded-md overflow-auto"
          >
            <option value="No Cargo"></option>
            {Object.entries(data[1]).map((sel, index) => {
              const sele = sel[1];
              //toc=tipo objeto construccion
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
                onClick={(e) => handleClick(e, tab[0], index)}
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
              const iniciales = Object.keys(prueba);
              tamaño = iniciales.length - 1;
              arrayTemp = Array(tamaño).fill(initialValue);
              return (
                <div className="w-full flex flex-row" key={tab[0]}>
                  {Object.entries(prueba).map((item, index) => {
                    if (index != 0) {
                      return <Tab data={item} index={index} />;
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
