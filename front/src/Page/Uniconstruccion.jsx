import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
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
import Loader from "./Loader";
import useInfo from "../hooks/useInfo";
export const CaraContext = createContext();

const UniConstruccionForm = (props, ref) => {
  console.log("Data de Unidad de Construccion", props);
  let tableData = [];
  let updateTableData = () => {};
  let contextTableData, contextUpdateTableData;
  let auxDataForm = {};
  let [loading, setLoading] = useState(false);
  if (props.contexto) {
    ({ tableData: contextTableData, updateTableData: contextUpdateTableData } =
      useContext(TableContext));
  }
  //Cuantas Unidades Se Crean
  const [numUnidad, setNumUnidad] = useState();
  //Componentes Unidad
  const [unidad, setUnidad] = useState([]);
  //Datos de Unidades
  const [unidadData, setUnidadData] = useState([]);

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
        <CreateUnidad
          key={i}
          index={i}
          est={true}
          contexto={props.contexto}
          onDataChange={actualizarDatosUnidad}
          data={unidadData}
          construccion={props.construccion}
        />
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

  const sendData = async () => {
    setLoading(true);
    if (props.contexto) {
      console.log("UNidad adata", unidadData);
      let dataId = props.dataId;
      console.log("UNidad adata", dataId);
      tableData = contextTableData;
      updateTableData = contextUpdateTableData;
      const entries = Object.entries(tableData);
      const entriesUnidad = Object.entries(unidadData);
      console.log("Enties Unidad", entriesUnidad);
      for (const [index, [key, item]] of entries.entries()) {
        for (const items of dataId) {
          if (items - 1 == index) {
            for (const [index, [key, item1]] of entriesUnidad.entries()) {
              item1.lc_caracteristicasunidadconstruccion =
                item1.caracteristicas.lc_caracteristicasunidadconstruccion;
              console.log("Data Interna", item1);
              let json = {
                planta_ubicacion: item1.planta_ubicacion,
                area_construida: item1.area_construida,
                altura: item1.altura,
                lc_caracteristicasunidadconstruccion:
                  item1.caracteristicas.lc_caracteristicasunidadconstruccion
                    .t_id,
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
                console.log("Data Unidad", result);
                item1.t_id = result.data.t_id;
              } catch (error) {
                console.log("error", error);
              }
            }

            item.unidad_construccion = unidadData;
          }
        }
      }
      props.msj("Datos Unidad de Construccion Guardados Correctamente");
      console.log("datos de tabla", tableData);
      updateTableData(tableData);
      props.onClose();
    }
    setLoading(false);
  };
  function validarData() {
    unidadData.map((item, index) => {
      console.log(item);
    });
  }
  useEffect(() => {
    validarData();
  }, [unidadData]);
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
      <div className="w-full flex flex-col mt-4">
        <button
          onClick={sendData}
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg"
        >
          Guardar Todo
        </button>
        {loading ? <Loader /> : null}
      </div>
    </div>
  );
};

function soloNumeros(event) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9.]/g, "");
}

export const CreateUnidad = (props) => {
  console.log("create props1 ", props);
  const { updateNumPredial } = useInfo();
  let [estMsj, setEstMsj] = useState();
  let aux = "";
  let cod_homo = "";
  let dataNoNull = [];
  if (props.est) {
    aux = {
      identificador: String.fromCharCode(65 + props.index),
      planta_ubicacion: "",
      altura: "",
      area_construida: "",
      etiqueta: "",
      construccion: "",
      caracteristicas: "",
      lc_caracteristicasunidadconstruccion: "",
    };
  } else {
    props.data.unidad_construccion.map((item, index) => {
      if (item.t_id != null) {
        dataNoNull.push(item);
      }
    });
    let data = dataNoNull[props.id];
    console.log("datos no null unidad", data);
    aux = {
      t_id: data.t_id,
      identificador: data.lc_caracteristicasunidadconstruccion.identificador,
      planta_ubicacion: "",
      altura: "",
      area_construida: data.area_construida,
      etiqueta: "",
      construccion: data.lc_construccion.t_id,
      caracteristicas: "",
      lc_caracteristicasunidadconstruccion:
        data.lc_caracteristicasunidadconstruccion.t_id,
    };
    console.log("aux ", aux);
  }

  const [dataUnidad, setDataUnidad] = useState(aux);
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
    if (props.est) {
      props.onDataChange(props.index, dataUnidad);
    }
  }, [dataUnidad]);
  console.log("123", props.construccion);
  return (
    <CaraContext.Provider value={{ updateCaracteristicas }}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
        <h1 className="text-3xl">
          Caracteristicas de Unidad de Construccion{" "}
          {props.est ? "#" + (props.index + 1) : null}
        </h1>
        <h2 className="text-2xl">Identificador: {dataUnidad.identificador}</h2>
        <div className="w-full flex flex-row mt-2 items-center justify-center">
          <div className="w-1/3 flex flex-col">
            <label>Relacion Construccion*</label>
            <select
              name="construccion"
              onChange={Load_Data}
              value={dataUnidad.construccion}
              className="border-2 p-1 rounded-md w-full"
            >
              <option></option>
              {props.contexto
                ? props.construccion.map((item, index) => {
                    console.log("CARGA CONSTRUCCION");
                    return (
                      <option key={index} value={item.t_id}>
                        Construccion {index + 1}{" "}
                      </option>
                    );
                  })
                : console.log("no carga")}
            </select>
          </div>
          <div className="w-2/3 ml-4 flex flex-row ">
            <button
              onClick={openCreateCaracRef}
              className="p-2 w-full text-center rounded-md text-white bg-teal-500 text-lg"
            >
              Crear Caracteristica
            </button>
            <CreateCaracteristicasForm
              ref={CreateCaracRef}
              dataIden={dataUnidad.identificador}
            />
          </div>
          {dataUnidad.caracteristicas == "" ? (
            <FontAwesomeIcon
              className="text-3xl text-red-600 ml-4"
              icon={faCircleXmark}
            />
          ) : (
            <FontAwesomeIcon
              className="text-3xl text-green-600 ml-4"
              icon={faCircleCheck}
            />
          )}
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/4 flex flex-col">
            <label>Planta Ubicacion*</label>
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
            <label>Area Construida*</label>
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
    console.log("1234", newobj);
    construcciones = newobj;
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
        onClose={closeModal}
        msj={props.msj}
      />
    </Modal>
  );
});
export const NormalUniConForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (aux) => {
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
      <UniConstruccionForm contexto={false} />
    </Modal>
  );
});
/*<div className="w-1/3 ml-4 flex flex-col">
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
</div>; */
