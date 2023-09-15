import React, { useState, useEffect } from "react";
import { variable, newgpcal } from "./DataContext";
const Tabs = ({ tabs }) => {
  //Texto que van a tener las pestañas
  const inicial = Object.keys(tabs);
  //Asignar cual es la pestaña principal cuando cargue el componente
  const [activeTab, setActiveTab] = useState(inicial[1]);
  //tipoSel me guarda los tipos de objeto de construccion de los Select Elegidos
  const [tipoSel, setTiposel] = useState({});
  //djson me guarda los Puntajes de los Select Elegidos
  const [djson, setDjson] = useState({});
  //Puntajes de los campos seleccionados
  const [selectSel, setSelect] = useState({});
  //ID de los campos seleccionados sobre los tipos de objeto de construccion
  const [selecttipo, setSelecttipo] = useState({});

  //Evento de los Select de los objetos de construccion
  const handleChange = (event) => {
    let { name, value } = event.target;
    let opt = event.target.options[event.target.selectedIndex];
    let toc = opt.dataset.toc;
    //guarda el valor del puntaje que se elije en el select
    setDjson({ ...djson, [name]: value });
    //guarda el valor del tipo de objeto de construccion que se elije en el select
    setTiposel({ ...tipoSel, [name]: toc });
  };

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
    const ini = data[1];

    return (
      <div className="w-full flex flex-row items-center justify-center">
        {Object.entries(ini).map((item, index) => {
          if (index != 0) {
            const data = ini.clase_calificacion + item[0];

            return (
              <div className="flex flex-col  pb-2 w-full text-center mr-4">
                <h5 className="w-full"> {item[0]}</h5>
                <select
                  name={data}
                  value={djson[data]}
                  onChange={handleChange}
                  className="p-1 w-full text-center border-2 rounded-md overflow-auto"
                >
                  <option value="No Cargo"></option>
                  {Object.entries(item[1]).map((sel, index) => {
                    const sele = sel[1];
                    //toc=tipo objeto construccion
                    return (
                      <option
                        data-toc={sele.tipo_objeto_construccion}
                        value={sele.puntos}
                      >
                        {sele.Nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          } else {
            variable.caracteristicasunidadconstruccion.calificacionconvencional.grupocalificacion.clase_calificacion =
              ini.clase_calificacion;
          }
        })}
      </div>
    );
  };
  //DESTINACION
  return (
    <div className=" w-full">
      <div className="flex border-b border-gray-300">
        {Object.entries(tabs).map((tab, index) => {
          if (index != 0) {
            //Button => tab[1].clase_calificacion item de la destinacion estructura, cocina, baño, acabados y/o complementos industria
            return (
              <button
                key={tab}
                name={tab[1].clase_calificacion}
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
          } else {
            variable.caracteristicasunidadconstruccion.calificacionconvencional.tipo_calificar =
              tab[1];
          }
        })}
      </div>
      <div className=" py-2">
        {Object.entries(tabs).map((tab, index) => {
          if (index != 0) {
            if (tab[0] === activeTab) {
              //Pendiente Push antes de cargar
              return <Tab data={tab} />;
            }
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Tabs;
/* 


   let tamaño = Object.keys(djson);
      console.log("Tamaño", tamaño[0][0]);
      console.log("Puntajes", djson);
      console.log("Tipo Objeto", tipoSel);



if (newgpcal.objetoconstruccion.length != 0) {
      newgpcal.objetoconstruccion = [];
    }


       //Calcula Subtotal
    const calsubtotal = (data) => {
      let suma = 0;
      data.map((item) => {
        suma += parseInt(item.puntos);
      });
      newgpcal.subtotal = suma;
    };
*/
