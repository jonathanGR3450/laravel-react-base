import { useRef, useState, useContext, useEffect } from "react";
import { ModalFuenteForm } from "./FuenteAdmin";
import { ModalPredioForm } from "./Predio";
import { ModalDerechoForm } from "./Derecho";
import { ModalInteresadoForm } from "./Interesado";
import { InteresadoProvider } from "../Page/Context/InteresadoContext";
import { TableContext } from "./Context/Context";
import { DataContext } from "./Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  FuenteResumeForm,
  DerechoResumeForm,
  PredioResumeForm,
  InteresadoResumeForm,
} from "./ResumeData";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
export const LoadDataForm = () => {
  const fuenteFormRef = useRef();
  const predioFormRef = useRef();
  const interesadoFormRef = useRef();
  const derechoFormRef = useRef();
  const navigate = useNavigate();
  //const { ArrayFinal, updateArrayFinal } = useContext(ArrayFinalContext);
  const { dataAll, updateDataAll } = useContext(DataContext);
  const { tableData } = useContext(TableContext);
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState(true);
  useEffect(() => {
    updateDataAll((prevValues) => ({
      ...prevValues,
      numero_predial: tableData,
    }));
  }, []);
  //Se Aceptan solo  Numeros
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.]/g, "");
  }
  const TableForm = () => {
    //ResumeForm
    const fuenteResumeForm = useRef();
    const derechoResumeForm = useRef();
    const predioResumeForm = useRef();
    const interesadosResumeForm = useRef();
    //Resume
    const openfuenteResumeForm = () => {
      fuenteResumeForm.current.openModal();
    };
    const openderechoResumeForm = () => {
      derechoResumeForm.current.openModal();
    };
    const openpredioResumeForm = () => {
      predioResumeForm.current.openModal();
    };
    const openinteresadosResumeForm = () => {
      interesadosResumeForm.current.openModal();
    };
    const filas = Object.entries(tableData).map((items, index) => {
      let item = items[1];
      console.log("existe predio", item.hasOwnProperty("interesados"));
      return (
        <tr key={index}>
          <td className="border-2 rounded-xl p-2">{index + 1}</td>
          <td className="border-2 rounded-xl p-2">
            {item.Dpto}-{item.Mpio}-{item.Zona}-{item.Sector}-{item.Comuna}-
            {item.Barrio}-{item.Manzana}-{item.Terreno}-{item.Condicion}-
            {item.Edificio}-{item.Piso}-{item.Unidad}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("predio") ? (
              <div>
                <button onClick={openpredioResumeForm}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <PredioResumeForm ref={predioResumeForm} datos={item} />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("interesados") ? (
              <div>
                <button onClick={openinteresadosResumeForm}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <InteresadoResumeForm
                  ref={interesadosResumeForm}
                  datos={item}
                  id={index}
                />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("derecho") ? (
              <div>
                <button onClick={openderechoResumeForm}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <DerechoResumeForm ref={derechoResumeForm} datos={item} />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("fuente_administrativa") ? (
              <div>
                <button onClick={openfuenteResumeForm}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <FuenteResumeForm ref={fuenteResumeForm} datos={item} />
              </div>
            ) : null}
          </td>
        </tr>
      );
    });
    return (
      <div className="w-full">
        <table className="w-full text-center">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl p-2">ID</th>
              <th className="border-2 rounded-xl p-2">Número Predial</th>
              <th className="border-2 rounded-xl p-2">Predio</th>
              <th className="border-2 rounded-xl p-2">Interesado</th>
              <th className="border-2 rounded-xl p-2">Derecho</th>
              <th className="border-2 rounded-xl p-2">Fuente Administrativa</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </div>
    );
  };

  const ChangeData = () => {
    const [dataId, setDataId] = useState("");
    const [dataSelect, setDataSelect] = useState(0);
    const [inputId, setInputId] = useState("");
    const [estBtt, setEstBtt] = useState(true);
    function validarid() {
      if (isNaN(dataId[0])) {
        setEstBtt(true);
      } else {
        setEstBtt(false);
      }
    }
    useEffect(() => {
      validarid();
    }, [dataId]);

    function NumComa(e) {
      let { value } = e.target;
      let num = [];
      value = value.replace(/[^0-9,-]/g, "");
      // Elimina caracteres no numéricos
      if (value.includes("-")) {
        if (value.split("-").length <= 2) {
          //setTamaño(3);
          let aux = value.split("-");
          for (let i = parseInt(aux[0]); i <= parseInt(aux[1]); i++) {
            num.push(i);
          }
        }
      } else {
        let aux = "";
        if (value.length === 0) {
          aux = 0;
        } else {
          aux = value.split(",");
        }
        if (value.includes(",")) {
          let numeros = aux.map((item) => {
            return parseInt(item);
          });

          num = numeros;
        } else {
          let aux = [parseInt(value)];
          num = [aux];
        }
      }
      setDataId(num);
      setInputId(value);
    }

    function Selectdata(e) {
      setDataSelect(e.target.value);
    }
    //
    const openFuenteAdminForm = () => {
      fuenteFormRef.current.openModal(dataId);
    };
    const openPredioForm = () => {
      predioFormRef.current.openModal(dataId);
    };
    const openDerechoForm = () => {
      derechoFormRef.current.openModal(dataId);
    };
    const openInteresadoForm = () => {
      interesadoFormRef.current.openModal(dataId);
    };

    return (
      <div className="w-full flex flex-row border-2 p-2 mt-4 mb-4 rounded-xl">
        <div className="w-1/3 flex flex-col text-center ">
          <div className="w-full">
            <label className="font-semibold">Datos para Agregar</label>
          </div>
          <div className="w-full flex flex-col ">
            <select
              className="border-2 rounded-lg text-center m-1"
              onChange={Selectdata}
              value={dataSelect}
            >
              <option value={0}></option>
              <option value={1}>Predio</option>
              <option value={2}>Interesado</option>
              <option value={3}>Derecho</option>
              <option value={4}>Fuente Administrativa</option>
            </select>
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <label className="font-semibold">SELECCIONAR ID</label>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              className="border-2 rounded-lg w-full p-1"
              onChange={NumComa}
              value={inputId}
            ></input>
          </div>
        </div>
        <div className="w-1/3 flex flex-col text-center">
          <label className="font-semibold">CARGA FORMULARIO</label>
          {dataSelect == 1 ? (
            <div className="w-full flex flex-col items-center">
              <button
                disabled={estBtt}
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openPredioForm}
              >
                Carga
              </button>{" "}
              <ModalPredioForm ref={predioFormRef} msj={setMsjLoading} />
            </div>
          ) : null}
          {dataSelect == 2 ? (
            <div className="w-full flex flex-col items-center">
              <button
                disabled={estBtt}
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openInteresadoForm}
              >
                Carga
              </button>{" "}
              <ModalInteresadoForm
                ref={interesadoFormRef}
                msj={setMsjLoading}
              />
            </div>
          ) : null}
          {dataSelect == 3 ? (
            <div className="w-full flex flex-col items-center">
              <button
                disabled={estBtt}
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openDerechoForm}
              >
                Carga
              </button>{" "}
              <ModalDerechoForm ref={derechoFormRef} msj={setMsjLoading} />
            </div>
          ) : null}
          {dataSelect == 4 ? (
            <div className="w-full flex flex-col items-center">
              <button
                disabled={estBtt}
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                } p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openFuenteAdminForm}
              >
                Carga
              </button>{" "}
              <ModalFuenteForm ref={fuenteFormRef} msj={setMsjLoading} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  const sendData = async () => {
    setLoading(true);
    const entries = Object.entries(tableData);
    for (const [index, [key, item]] of entries.entries()) {
      console.log(item);
      let rr = await relRRRFuente(item);
      if (rr) {
        let uniFuente = await relUnidadFuente(item);
        if (uniFuente) {
          setLoading(false);
          navigate("/LoadConstruccion");
        } else {
          setLoading(false);
          console.log("Error  ");
        }
      } else {
        setLoading(false);
        console.log("Error  ");
      }
    }
  };
  async function relRRRFuente(item) {
    console.log("Item RRRfuente", item);
    let jsonRR = {
      numeros_relacion: [
        {
          fuente_administrativa: item.fuente_administrativa.t_id,
          rrr_lc_derecho: item.derecho.t_id,
        },
      ],
    };
    let raw = JSON.stringify(jsonRR);
    console.log(raw);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url =
      import.meta.env.VITE_API_URL_FIRST +
      "rrrfuente/fuente-administrativa/derecho";
    console.log("Url RRRfUENTE", url);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log("Resultado Relacion RRRFuente", result);

    if (result.success) {
      //si sale bien
      return true;
    } else {
      //Si no Sale bien
      return false;
    }
  }
  async function relUnidadFuente(item) {
    console.log("Item Unidad Fuente", item);
    let jsonUnidadFuente = {
      fuente_administrativa: item.fuente_administrativa.t_id,
      unidad: item.predio.t_id,
    };
    let raw = JSON.stringify(jsonUnidadFuente);
    console.log(raw);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = import.meta.env.VITE_API_URL_FIRST + "predio/unidadfuente";
    console.log("Url Unidad Fuente", url);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log("Resultado Relacion Unidad Funete", result);
    if (result.success) {
      //si sale mal
      return true;
    } else {
      //Si no Sale bien
      return false;
    }
  }
  return (
    <InteresadoProvider>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
        <h1 className="text-2xl">Datos Iniciales</h1>
        <div className="mt-4 w-full">
          <ChangeData />
          <TableForm />
        </div>
        <div className="mt-4 w-full flex flex-col justify-center items-center">
          <button
            onClick={sendData}
            className={` w-1/5 p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
          >
            Siguiente
          </button>
          {loading ? <Loader /> : null}
        </div>
      </div>
    </InteresadoProvider>
  );
};
/*
 onClick={sendData}
            disabled={estBtt}
<div>

            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
              Cargar Numeros Prediales
            </button>
          </div>
          
          
          
          
          
          
              updateDataAll((prevValues) => ({
      ...prevValues,
      numero_predial: tableData,
    }));
          
          
          */
