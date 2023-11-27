import { useRef, useState, useContext, useEffect } from "react";
import FuenteAdminForm from "./FuenteAdmin";
import PredioForm from "./Predio";
import DerechoForm from "./Derecho";
import InteresadoForm from "./Interesado";
import { InteresadoProvider } from "../Page/Context/InteresadoContext";
import { TableContext } from "./Context/Context";
import { DataContext } from "./Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  FuenteResumeForm,
  DerechoResumeForm,
  PredioResumeForm,
} from "./ResumeData";

export const LoadDataForm = () => {
  const fuenteFormRef = useRef();
  const predioFormRef = useRef();
  const interesadoFormRef = useRef();
  const derechoFormRef = useRef();

  //const { ArrayFinal, updateArrayFinal } = useContext(ArrayFinalContext);
  const { dataAll, updateDataAll } = useContext(DataContext);
  const { tableData } = useContext(TableContext);

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
    const filas = Object.entries(tableData).map((items, index) => {
      let item = items[1];
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
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <PredioResumeForm ref={predioResumeForm} datos={item} />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("interesado") ? (
              <button>
                {" "}
                <FontAwesomeIcon icon={faSearch} />
              </button>
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
              <th className="border-2 rounded-xl p-2">Fuente Administrativa</th>
              <th className="border-2 rounded-xl p-2">Derecho</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </div>
    );
  };

  const ChangeData = () => {
    let validNumbers = [];
    const { updateIdArray } = useContext(DataContext);
    const [dataId, setDataId] = useState("");
    const [dataSelect, setDataSelect] = useState(0);
    const [inputId, setInputId] = useState("");
    const [estBtt, setEstBtt] = useState(true);
    //SI el ID tiene  1= guion, 2=Coma o 3= esta solo
    let [coma, setComa] = useState("");
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
      value = value.replace(/[^0-9,-]/g, "");
      // Elimina caracteres no numéricos
      if (value.includes("-")) {
        setComa(1);
        if (value.split("-").length <= 2) {
          //setTamaño(3);
          let aux = value.split("-");
          let numeros = aux.map((item) => {
            return parseInt(item);
          });
          validNumbers = numeros;
          console.log(validNumbers);
          setDataId(validNumbers);
        }
      } else {
        let aux = "";
        if (value.length === 0) {
          aux = 0;
        } else {
          aux = value.split(",");
        }
        if (value.includes(",")) {
          setComa(2);
          let numeros = aux.map((item) => {
            return parseInt(item);
          });

          validNumbers = numeros;
          setDataId(validNumbers);
        } else {
          setComa(3);
          validNumbers = [parseInt(value)];
          setDataId(validNumbers);
        }
      }
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
              <PredioForm ref={predioFormRef} />
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
              <InteresadoForm ref={interesadoFormRef} />
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
              <DerechoForm ref={derechoFormRef} />
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
              <FuenteAdminForm ref={fuenteFormRef} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <InteresadoProvider>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
        <h1 className="text-2xl">Creacion de Predios</h1>
        <div className="mt-4 w-full">
          <ChangeData />
          <TableForm />
        </div>
      </div>
    </InteresadoProvider>
  );
};
/*    <div>
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
              Cargar Numeros Prediales
            </button>
          </div>
          
          
          
          
          
          
              updateDataAll((prevValues) => ({
      ...prevValues,
      numero_predial: tableData,
    }));
          
          
          */
