import { Modal } from "./Modal";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
  useRef,
  createContext,
} from "react";
import {
  LoadCaracteristicasForm,
  CreateCaracteristicasForm,
} from "./Caracteristicas";
import { TableContext } from "./Context/Context";

export const CaraContext = createContext();

const UniConstruccionForm = (props, ref) => {
  console.log(props);
  let tableData = [];
  let updateTableData = () => {};
  const {
    tableData: contextTableData,
    updateTableData: contextUpdateTableData,
  } = useContext(TableContext);

  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.]/g, "");
  }
  //Cuantas Unidades Se Crean
  const [numUnidad, setNumUnidad] = useState();
  //Componentes Unidad
  const [unidad, setUnidad] = useState([]);
  //Datos de Unidades
  const [unidadData, setUnidadData] = useState();

  //cargo el numero de unidades y los Arreglos
  const Load_Num = (e) => {
    const newValue = parseInt(e.target.value);
    setNumUnidad(newValue);
    const newUnidadData = Array.from({ length: newValue }, () => ({
      planta_ubicacion: "",
      altura: "",
      area_construida: "",
    }));
    setUnidadData(newUnidadData);
  };
  const agregarUnidad = () => {
    const nuevaUnidad = [];
    for (let i = 0; i < numUnidad; i++) {
      nuevaUnidad.push(
        <CreateUnidad key={i} index={i} onDataChange={actualizarDatosUnidad} />
      );
    }
    setUnidad(nuevaUnidad);
  };
  const actualizarDatosUnidad = (index, newData) => {
    // Aquí puedes manejar los datos del Interesado individualmente
    console.log("Nuevos Datos" + index, newData);
    setUnidadData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };
  const CreateUnidad = (index) => {
    const [dataUnidad, setDataUnidad] = useState({
      planta_ubicacion: "",
      altura: "",
      area_construida: "",
      etiqueta: "",
      construccion: "",
      caracteristicas: "",
      lc_caracteristicasunidadconstruccion: "",
    });
    const Load_Data = (e) => {
      const { name, value } = e.target;
      console.log("Valores ", name + " - " + value);
      setDataUnidad((prevValues) => ({ ...prevValues, [name]: value }));
    };
    //Modal de Crear y Cargar Caracteristicas
    const LoadCaracRef = useRef();
    const CreateCaracRef = useRef();

    const updateCaracteristicas = (newData) => {
      console.log("nuevos Dats", newData);
      let carac = "";
      if (!newData.construcciones) {
        let newobj = convertirFormato(newData);
        carac = newobj.construcciones[0].caracteristicasunidadconstruccion;
      } else {
        console.log("Creo CONstruccion");
        carac = {
          caracteristicas:
            newData.construcciones[0].caracteristicasunidadconstruccion,
          lc_caracteristicasunidadconstruccion: newData.t_id,
        };
      }
      console.log("Caracteristicas", carac);

      setDataUnidad({ ...dataUnidad, caracteristicas: carac });
      closeCreateCaaracRef();
    };

    function convertirFormato(jsonOriginal) {
      console.log("Json Original", jsonOriginal);
      const {
        t_id,
        identificador,
        tipo_construccion,
        tipo_dominio,
        tipo_unidad_construccion,
        tipo_planta,
        total_plantas,
        total_habitaciones,
        total_banios,
        total_locales,
        anio_construccion,
        uso,
        avaluo_unidad_construccion,
        area_construida,
        area_privada_construida,
        comienzo_vida_util_version,
        fin_vida_util_version,
        espacio_de_nombres,
        local_id,
        observaciones,
        sync,
        calificacionconvencional,
      } = jsonOriginal;

      const construcciones = [
        {
          caracteristicasunidadconstruccion: {
            identificador,
            tipo_construccion: tipo_construccion.t_id,
            tipo_dominio: tipo_dominio.t_id,
            tipo_unidad_construccion: tipo_unidad_construccion.t_id,
            tipo_planta: tipo_planta.t_id,
            total_plantas,
            total_habitaciones,
            total_banios,
            total_locales,
            anio_construccion,
            uso: uso.t_id,
            avaluo_unidad_construccion: avaluo_unidad_construccion || "",
            area_construida: parseFloat(area_construida.replace(",", ".")),
            area_privada_construida: parseFloat(area_privada_construida),
            fin_vida_util_version: fin_vida_util_version || "",
            espacio_de_nombres,
            local_id,
            observaciones: observaciones || "",
            calificacionconvencional: calificacionconvencional.map((cc) => {
              return {
                tipo_calificar: cc.tipo_calificar.t_id,
                total_calificacion: cc.total_calificacion,
                grupocalificacion: cc.grupocalificacion.map((gc) => {
                  return {
                    clase_calificacion: gc.clase_calificacion.t_id,
                    conservacion: gc.conservacion.t_id,
                    subtotal: gc.subtotal,
                    objetoconstruccion: gc.objetoconstruccion.map((oc) => {
                      return {
                        tipo_objeto_construccion:
                          oc.tipo_objeto_construccion.t_id,
                        puntos: oc.puntos,
                      };
                    }),
                  };
                }),
              };
            }),
          },
        },
      ];

      return {
        construcciones,
      };
    }
    //Abrir Modal de cargar
    const openLoadCaractForm = () => {
      LoadCaracRef.current.openModal();
    };
    //Abrir Modal Crear
    const openCreateCaracRef = () => {
      CreateCaracRef.current.openModal();
    };
    const closeCreateCaaracRef = () => {
      CreateCaracRef.current.closeModal();
    };
    useEffect(() => {
      index.onDataChange(index.index, dataUnidad);
    }, [dataUnidad]);
    return (
      <CaraContext.Provider value={{ updateCaracteristicas }}>
        <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
          <h1 className="text-3xl">
            Caracteristicas de Unidad de Construccion #{index.index + 1}
          </h1>
          <div className="w-full flex flex-row mt-4">
            <div className="w-1/3 flex flex-col">
              <label>Relacion Construccion</label>
              <select
                name="construccion"
                onChange={Load_Data}
                value={dataUnidad.construccion}
                className="border-2 p-1 rounded-md w-full"
              >
                <option></option>
                {Object.entries(props.construccion).map((item, index) => {
                  return (
                    <option value={props.construccion[index].t_id}>
                      Construccion {index + 1}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 ml-4 flex flex-col">
              <button
                onClick={openLoadCaractForm}
                className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
              >
                Carga Caracteristicas
              </button>
              <LoadCaracteristicasForm
                ref={LoadCaracRef}
                onchangeData={updateCaracteristicas}
              />
            </div>
            <div className="w-1/3 ml-4 flex flex-col">
              <button
                onClick={openCreateCaracRef}
                className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
              >
                Crear Caracteristica
              </button>
              <CreateCaracteristicasForm ref={CreateCaracRef} />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <div className="w-1/4 flex flex-col">
              <label>Planta Ubicacion</label>
              <input
                name="planta_ubicacion"
                type="number"
                className="border-2 p-1 rounded-md w-full"
                value={dataUnidad.planta_ubicacion}
                onChange={Load_Data}
              ></input>
            </div>
            <div className="w-1/4 flex flex-col ml-4">
              <label>Altura</label>
              <input
                name="altura"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                value={dataUnidad.altura}
                onChange={Load_Data}
                onInput={soloNumeros}
              ></input>
            </div>
            <div className="w-1/4 ml-4 flex flex-col">
              <label>Area Construida</label>
              <input
                name="area_construida"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                value={dataUnidad.area_construida}
                onChange={Load_Data}
                onInput={soloNumeros}
              ></input>
            </div>
            <div className="w-1/4 ml-4 flex flex-col">
              <label>Etiqueta</label>
              <input
                name="etiqueta"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                value={dataUnidad.etiqueta}
                onChange={Load_Data}
              ></input>
            </div>
          </div>
        </div>
      </CaraContext.Provider>
    );
  };

  const sendData = async () => {
    if (props.contexto) {
      console.log("UNidad adata", unidadData);
      let dataId = props.dataId;
      console.log("UNidad adata", dataId);
      tableData = contextTableData;
      updateTableData = contextUpdateTableData;
      const entries = Object.entries(tableData);
      const entriesUnidad = Object.entries(unidadData);
      for (const [index, [key, item]] of entries.entries()) {
        for (const items of dataId) {
          if (items - 1 == index) {
            for (const [index, [key, item1]] of entriesUnidad.entries()) {
              item1.lc_caracteristicasunidadconstruccion =
                item1.caracteristicas.lc_caracteristicasunidadconstruccion;
              console.log(
                "Data Interna",
                item1.caracteristicas.lc_caracteristicasunidadconstruccion
              );
              let json = {
                planta_ubicacion: item1.planta_ubicacion,
                area_construida: item1.area_construida,
                altura: item1.altura,
                lc_caracteristicasunidadconstruccion:
                  item1.lc_caracteristicasunidadconstruccion,
                lc_construccion: item1.construccion,
                dimension: null,
                etiqueta: item1.etiqueta,
                relacion_superficie: null,
                nivel: null,
                comienzo_vida_util_version: null,
                fin_vida_util_version: null,
                espacio_de_nombres: "Fusagasuga",
                local_id: item.codigo_homologado,
              };
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              let raw = JSON.stringify(json);
              let url =
                import.meta.env.VITE_API_URL_FIRST +
                "unidad/construccion/local";
              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };
              try {
                const response = await fetch(url, requestOptions);
                const result = await response.json();
                console.log(result);
              } catch (error) {
                console.log("error", error);
              }
            }

            item.unidad_construccion = unidadData;
          }
        }
      }

      console.log("datos de tabla", tableData);
      updateTableData(tableData);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Datos Generales de Unidad de Construccion</h1>
      <div className="w-full pt-4 flex flex-row text-left">
        <input
          type="number"
          placeholder="Número de Unidades de Construccion"
          className="border-2 p-1 rounded-md w-full"
          value={numUnidad}
          onChange={Load_Num}
        />
        <button
          className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
          onClick={agregarUnidad}
        >
          Crear Unidades
        </button>
      </div>
      <div className="w-full">{unidad}</div>
      <div className="w-full mt-4">
        <button
          onClick={sendData}
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
        >
          Guardar Todo
        </button>
      </div>
    </div>
  );
};

export const ModalUniConForm = React.forwardRef((props, ref) => {
  let [construcciones, setConstrucciones] = useState();
  const { tableData, updateTableData } = useContext(TableContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [dataId, setDataId] = useState();

  const openModal = (aux) => {
    let newobj = [];
    Object.entries(tableData).map((itemd, index) => {
      let item = itemd[1];
      aux.map((items) => {
        if (items - 1 == index) {
          if (item.construccion) {
            newobj = item.construccion;
          }
        }
      });
    });
    setConstrucciones(newobj);
    setDataId(aux);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <UniConstruccionForm
        contexto={true}
        dataId={dataId}
        construccion={construcciones}
      />
    </Modal>
  );
});
export const NormalUniConForm = React.forwardRef((props, ref) => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <UniConstruccionForm contexto={false} />
    </div>
  );
});
