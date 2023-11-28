import React, { useState, useEffect, useContext } from "react";

import { variable, dataobjetoconstruccion, crearobjetos } from "./DataContext";
import { GrupoContext } from "./Context/CaracteristicaContext";
const Tabs = ({ tabs, arrayClass, updateFunction }) => {
  //Texto que van a tener las pestañas
  const inicial = Object.keys(tabs);
  //console.log("Data Entrando", tabs);
  //Asignar cual es la pestaña principal cuando cargue el componente
  const [activeTab, setActiveTab] = useState(inicial[1]);
  //Estado Boton Confirmar
  const [estCon, setEstCon] = useState(true);

  let tamaño = Object.keys(tabs[activeTab]).length - 1;

  useEffect(() => {
    // Actualizar el estado del arreglo cuando tamaño cambia
    setArrayTemp(
      Array(tamaño).fill({
        tipo_objeto_construccion: "",
        puntos: "",
      })
    );
  }, [tamaño]);

  const [arrayTemp, setArrayTemp] = useState(
    Array.from({ length: tamaño }, () => ({
      tipo_objeto_construccion: "",
      puntos: "",
    }))
  );
  function validar() {
    const tieneVacios = arrayTemp.some((objeto) =>
      Object.values(objeto).some((valor) => valor === "")
    );
    if (tieneVacios) {
      setEstCon(true);
    } else {
      setEstCon(false);
    }
  }
  useEffect(() => {
    validar();
  }, [arrayTemp]);

  //Activar Pestaña
  const handleClick = (e, newActiveTab) => {
    //////////////////Creacion de Grupo Calificacion
    /*
    updateFunction(newCalificacion);*/
    setActiveTab(newActiveTab);
  };

  //////////////////////////Formulario de las Tab que son Select/////////////////////////
  const Tab = ({ data, index }) => {
    // Contenido Menu de los item Estructura , cocina, etc.
    // Captura el valor de los select de cada pestaña

    const handleChange = (event) => {
      let { value } = event.target;
      let opt = event.target.options[event.target.selectedIndex];
      let toc = opt.dataset.toc;
      let newobjetoconstruccion = {
        tipo_objeto_construccion: value,
        puntos: parseInt(toc),
      };
      setArrayTemp((prevArray) => {
        const newArray = [...prevArray];
        newArray[index - 1] = newobjetoconstruccion;
        return newArray;
      });
    };
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <div className="flex flex-col pb-2 w-full text-center mr-4">
          <h5 className="w-full "> {data[0]}</h5>
          <select
            key={data[0]}
            name={data[0]}
            value={
              arrayTemp[index - 1].tipo_objeto_construccion !== undefined
                ? arrayTemp[index - 1].tipo_objeto_construccion
                : 0
            }
            onChange={handleChange}
            className="p-1 w-full text-center border-2 rounded-md overflow-auto"
          >
            <option value="No Cargo"></option>
            {Object.entries(data[1]).map((sel, index) => {
              const sele = sel[1];
              //toc=tipo objeto construccion
              return (
                <option
                  key={index}
                  name={index}
                  data-nom={sele.Nombre}
                  data-toc={sele.puntos}
                  value={sele.tipo_objeto_construccion}
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

  //Pasar de Pagina y Guardar datos
  function confirmarData() {
    let index = inicial.indexOf(activeTab);
    console.log("data index", index);
    console.log("data inciial", inicial.length);
    let newActiveTab = 0;
    if (index + 1 <= inicial.length) {
      if (index + 1 !== inicial.length) {
        console.log("Cambia cuando no sea el ultimo");
        newActiveTab = inicial[index + 1];

        setActiveTab(newActiveTab);
      } else {
        console.log("Cambia  sea el ultimo");
      }
      let indexArray = index - 1;
      let conservacion = 3;
      let sum = 0;
      arrayTemp.map((item) => {
        if (tabs.tipo_calificar == 718) {
          if (inicial.includes("Baño") || inicial.includes("Cocina")) {
            switch (parseInt(item.tipo_objeto_construccion)) {
              case 137:
                conservacion = 0;
                break;
              case 138:
                conservacion = 2;
                break;
              case 139:
                conservacion = 4;
                break;
              case 140:
                conservacion = 5;
                break;
              case 141:
                conservacion = 5;
                break;
              case 152:
                conservacion = 0;
                break;
              case 153:
                conservacion = 2;
                break;
              case 154:
                conservacion = 4;
                break;
              case 155:
                conservacion = 5;
                break;
              case 156:
                conservacion = 5;
                break;
            }
          }
        }
        if (item.tipo_objeto_construccion < 6) {
          console.log("item propio", item);
          conservacion = parseInt(item.puntos);
          arrayTemp.pop();
        }
        sum += item.puntos;
      });
      setArrayTemp(
        Array(tamaño)
          .fill()
          .map(() => ({ tipo_objeto_construccion: "", puntos: "" }))
      );
      let newgrupo = {
        clase_calificacion: tabs[activeTab].clase_calificacion,
        conservacion: conservacion,
        subtotal: sum,
        objetoconstruccion: arrayTemp,
      };

      let newCalificacion = [...arrayClass];
      newCalificacion[indexArray] = newgrupo;
      updateFunction(newCalificacion);
    } else {
      console.log("Activar Boton Guardar");
    }
  }
  ////////////////////////////////Return de Tabs/////////////////////////////////////
  return (
    <div className=" w-full">
      <div className="flex rounded-lg bg-teal-500  border-gray-300">
        {Object.entries(tabs).map((tab, index1) => {
          if (index1 != 0) {
            return (
              <button
                key={tab[0]}
                value={tab[0]}
                className={`${
                  activeTab === tab[0]
                    ? "  bg-teal-600 rounded-lg border-teal-500 border-4 "
                    : " bg-teal-500"
                } flex-1 m-1 text-white font-medium py-2`}
                onClick={(e) => handleClick(e, tab[0], index1)}
              >
                {tab[0]}
              </button>
            );
          }
        })}
      </div>
      <div className=" py-4">
        {Object.entries(tabs).map((tab, index1) => {
          if (index1 != 0) {
            if (tab[0] === activeTab) {
              const prueba = tab[1];

              return (
                <div className="w-full flex flex-row" key={tab[0]}>
                  {Object.entries(prueba).map((item, index) => {
                    if (index != 0) {
                      return <Tab key={index} data={item} index={index} />;
                    }
                  })}
                </div>
              );
            }
          }
        })}
      </div>
      <div className="w-full flex flex-row justify-center">
        <button
          onClick={confirmarData}
          className={`${
            estCon ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }  w-1/5 p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          disabled={estCon}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};
export default Tabs;
