import { Modal } from "./Modal";
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { DataContext } from "./Context/DataContext";
import { TableContext } from "./Context/Context";
import Loader from "./Loader";
const DerechoForm = (props, ref) => {
  console.log(props);
  let tableData = [];
  let updateTableData = () => {};
  let contextTableData, contextUpdateTableData;
  let auxDataForm = {};
  if (props.contexto) {
    auxDataForm = {
      t_id: "",
      tipo_derecho: "",
      tipo_restriccion: "",
      inicio_tenencia: "",
      fraccion_derecho: "",
      descripcion: "",
    };
    ({ tableData: contextTableData, updateTableData: contextUpdateTableData } =
      useContext(TableContext));
  } else {
    let dataDerecho = props.data ? props.data[0] : "";
    console.log("Info Derecho", dataDerecho);
    auxDataForm = {
      t_id: dataDerecho.derechos[0].t_id,
      tipo_derecho: dataDerecho.derechos[0].tipo.t_id,
      tipo_restriccion: 0,
      agrupacion:
        dataDerecho.derechos[0].interesado_lc_agrupacioninteresados.t_id,
      interesado: dataDerecho.derechos[0].interesado_lc_interesado.t_id,
      inicio_tenencia: dataDerecho.derechos[0].fecha_inicio_tenencia,
      fraccion_derecho: dataDerecho.derechos[0].fraccion_derecho,
      descripcion: dataDerecho.derechos[0].descripcion,
    };
    console.log(auxDataForm);
  }

  const [objDerecho, setobjDerecho] = useState(auxDataForm);
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("");
  const [estBtt, setEstBtt] = useState(true);

  function Load_Data(e) {
    const { name, value } = e.target;
    setobjDerecho((prevValues) => ({ ...prevValues, [name]: value }));
  }

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (props.contexto) {
      tableData = contextTableData;
      let dataId = props.dataid;
      updateTableData = contextUpdateTableData;
      for (const [index, item] of tableData.entries()) {
        console.log("item", item);
        console.log("item", item.interesados.length);
        console.log("props", props);
        for (let i = 0; i < dataId.length; i++) {
          if (dataId[i] - 1 === index) {
            let dataInte = 0;
            let dataAgru = 0;
            let inteCons = "";
            console.log("Data de Interesados", item.interesados);
            if (item.interesados.length >= 2) {
              dataAgru = item.interesados.lc_agrupacion;
              dataInte = null;
            } else {
              if (item.interesados[0].isTemporal) {
                dataInte = item.interesados[0].t_id;
                inteCons = null;
              } else {
                inteCons = item.interesados[0].t_id;
                dataInte = null;
              }
              dataAgru = null;
            }
            let json = {
              tipo: objDerecho.tipo_derecho,
              fraccion_derecho: objDerecho.fraccion_derecho,
              fecha_inicio_tenencia: objDerecho.inicio_tenencia,
              descripcion: objDerecho.descripcion,
              interesado_lc_interesado: dataInte,
              interesado_lc_agrupacioninteresados: dataAgru,
              interesado_lc_interesado_conservacion: inteCons,
              unidad: item.predio.t_id,
              comienzo_vida_util_version: null,
              fin_vida_util_version: null,
              espacio_de_nombres: "Fusagasuga",
              local_id: item.codigo_homologado,
            };
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const url = import.meta.env.VITE_API_URL_FIRST + "derecho/local";
            let raw = JSON.stringify(json);
            console.log(raw);
            let requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };
            try {
              const response = await fetch(url, requestOptions);
              if (response.ok) {
                const result = await response.json();
                console.log("Resultado", result.data);
                ///Retornar Id y guardarlo
                objDerecho.t_id = result.data.t_id;
                props.msj("Datos Derecho Guardado Correctamente");
              } else {
                props.msj("Error Datos Derecho ");
                const error = await response.json();
                console.log("Error en la solicitud:", error);
              }
            } catch (error) {
              console.log("Error", error);
            }
            console.log("Json", json);
            tableData[index].derecho = objDerecho;
            console.log(tableData[index]);
          }
        }
      }

      updateTableData(tableData);
      props.onClose();
    } else {
      let json = {
        tipo: objDerecho.tipo_derecho,
        fraccion_derecho: objDerecho.fraccion_derecho,
        fecha_inicio_tenencia: objDerecho.inicio_tenencia,
        descripcion: objDerecho.descripcion,
        interesado_lc_interesado_conservacion: objDerecho.interesado,
        interesado_lc_agrupacioninteresados: objDerecho.agrupacion,
        unidad: props.data ? props.data[0].t_id : "",
        comienzo_vida_util_version: null,
        fin_vida_util_version: null,
        espacio_de_nombres: "Fusagasuga",
        local_id: props.data ? props.data[0].Codigo_Homologado : "",
      };
      console.log("Json no contexto", json);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const url = import.meta.env.VITE_API_URL_FIRST + "derecho/local";
      let raw = JSON.stringify(json);
      console.log(raw);
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const result = await response.json();
          console.log("Resultado", result.data);
          ///Retornar Id y guardarlo
          objDerecho.t_id = result.data.t_id;
          setLoading(false);
          props.update(json);
          props.onClose();
        } else {
          const error = await response.json();
          console.log("Error en la solicitud:", error);
        }
      } catch (error) {
        console.log("Error", error);
      }
      props.onClose();
    }
  };

  function validarData() {
    console.log("obj", objDerecho.tipo_derecho.length);
    if (
      objDerecho.tipo_derecho.length == 0 ||
      objDerecho.fraccion_derecho.length == 0
    ) {
      console.log("esta vacio");
      setEstBtt(true);
    } else {
      setEstBtt(false);
      console.log("No esta vacio");
    }
  }

  useEffect(() => {
    validarData();
  }, [objDerecho]);

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="font-semibold text-3xl">Caracteristicas del Derecho</h1>
      <p>A Continuación se muestran las caracteristicas del Derecho:</p>
      <div className="flex flex-col w-full">
        <h2 className="font-semibold text-2xl">Datos Generales del Derecho</h2>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3">
            <label className="font-semibold">Tipo Derecho*:</label>
            <select
              name="tipo_derecho"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.tipo_derecho}
            >
              <option></option>
              <option value={47}>Dominio</option>
              <option value={48}>Ocupacion</option>
              <option value={49}>Posesion</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Fecha Inicio de Tenencia:</label>
            <input
              name="inicio_tenencia"
              type="date"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.inicio_tenencia}
            ></input>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Fraccion Derecho *:</label>
            <input
              name="fraccion_derecho"
              type="text"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.fraccion_derecho}
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full ml-4"></div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-full ">
            <label className="font-semibold">Descripcion:</label>
            <input
              name="descripcion"
              type="text"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.descripcion}
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full mt-2 items-center justify-center">
          <button
            onClick={sendData}
            disabled={estBtt}
            className={`${
              estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mt-4`}
          >
            Guardar
          </button>
          {loading ? <Loader /> : null}
        </div>
      </div>
    </div>
  );
};

export const ModalDerechoForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [dataId, setDataId] = useState();
  const openModal = (aux) => {
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
      <DerechoForm
        contexto={true}
        dataid={dataId}
        onClose={closeModal}
        msj={props.msj}
      />
    </Modal>
  );
});
export const NormalDerechoForm = React.forwardRef((props, ref) => {
  console.log("Props de Normal Derecho", props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
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
      <DerechoForm
        contexto={false}
        data={props.data}
        onClose={closeModal}
        update={props.update}
      />
    </Modal>
  );
});
/*    <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Tipo Restriccion:</label>
            <select
              name="tipo_restriccion"
              className="border-2 p-2 rounded-md w-full"
              onChange={Load_Data}
              value={objDerecho.tipo_restriccion}
            >
              <option></option>
              <option value="799">(Servidumbre) Tránsito</option>
              <option value="800">(Servidumbre) Aguas negras</option>
              <option value="801">(Servidumbre) Aire</option>
              <option value="802">(Servidumbre) Energía eléctrica</option>
              <option value="803">(Servidumbre) Gasoducto</option>
              <option value="804">(Servidumbre) Luz</option>
              <option value="805">(Servidumbre) Oleoducto</option>
              <option value="806">(Servidumbre) Agua</option>
              <option value="807">(Servidumbre) Minera</option>
              <option value="808">(Servidumbre) Legal de hidrocarburos</option>
              <option value="809">(Servidumbre) Medianería</option>
              <option value="810">(Servidumbre) Alcantarillado</option>
              <option value="811">(Servidumbre) Acueducto</option>
            </select>
          </div> */
