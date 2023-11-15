import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useContext, useEffect } from "react";
import { TableContext } from "./Context/Context";
import { DataContext } from "./Context/DataContext";
import { LoadDataForm } from "./CargaDatos";
import UniConstruccionForm from "./Uniconstruccion";
import TerrenoForm from "./Terreno";
import ConstruccionForm from "./Construccion";
import {
  TerrenoResumeForm,
  UnidadConstruccionResumeForm,
  ConstruccionResumeForm,
} from "./ResumeData";
export const LoadDataConstruccion = () => {
  const uniConstruccionRef = useRef();
  const terrenoRef = useRef();
  const construccionRef = useRef();

  const { tableData } = useContext(TableContext);
  const [dataSelect, setDataSelect] = useState(0);

  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }

  const TableForm = () => {
    const terrenoResumeForm = useRef();
    const unidadConstruccionResumeForm = useRef();
    const construccionResumeForm = useRef();
    //Aperturas
    const openterrenoResumeForm = () => {
      terrenoResumeForm.current.openModal();
    };
    const openunidadconstruccionResumeForm = () => {
      unidadConstruccionResumeForm.current.openModal();
    };
    const openconstruccionResumeForm = () => {
      construccionResumeForm.current.openModal();
    };

    const filas = Object.entries(tableData).map((items, index) => {
      let item = items[1];
      console.log("itemss", item);
      // console.log("Prueba", item);
      // onClick={openpredioResumeForm}  <PredioResumeForm ref={predioResumeForm} datos={item} />
      return (
        <tr key={index}>
          <td className="border-2 rounded-xl p-2">{index + 1}</td>
          <td className="border-2 rounded-xl p-2">
            {item.Dpto}-{item.Mpio}-{item.Zona}-{item.Sector}-{item.Comuna}-
            {item.Barrio}-{item.Manzana}-{item.Terreno}-{item.Condicion}-
            {item.Edificio}-{item.Piso}-{item.Unidad}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("terreno") ? (
              <div>
                <button onClick={openterrenoResumeForm}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <TerrenoResumeForm ref={terrenoResumeForm} datos={item} />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("construccion") ? (
              <div>
                <button onClick={openconstruccionResumeForm}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <ConstruccionResumeForm
                  ref={construccionResumeForm}
                  datos={item}
                />
              </div>
            ) : null}
          </td>
          <td className="border-2 rounded-xl p-2">
            {item.hasOwnProperty("unidad_construccion") ? (
              <div>
                <button onClick={openunidadconstruccionResumeForm}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <UnidadConstruccionResumeForm
                  ref={unidadConstruccionResumeForm}
                  datos={item}
                />
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
              <th className="border-2 rounded-xl p-2">Terreno</th>
              <th className="border-2 rounded-xl p-2">Construccion</th>
              <th className="border-2 rounded-xl p-2">Unidad Construccion</th>
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
    const [inputId, setInputId] = useState("");
    const [estBtt, setEstBtt] = useState(true);
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

    const openUniConstruccionForm = () => {
      uniConstruccionRef.current.openModal(dataId);
    };
    const openTerrenoForm = () => {
      terrenoRef.current.openModal(dataId);
    };
    const openConstruccionForm = () => {
      construccionRef.current.openModal(dataId);
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
              <option value={1}>Terreno</option>
              <option value={2}>Construccion</option>
              <option value={3}>Unidad de Construccion</option>
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
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openTerrenoForm}
              >
                Carga
              </button>{" "}
              <TerrenoForm ref={terrenoRef} />
            </div>
          ) : null}
          {dataSelect == 2 ? (
            <div className="w-full flex flex-col items-center">
              <button
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openConstruccionForm}
              >
                Carga
              </button>{" "}
              <ConstruccionForm ref={construccionRef} />
            </div>
          ) : null}
          {dataSelect == 3 ? (
            <div className="w-full flex flex-col items-center">
              <button
                className={`${
                  estBtt ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }  w-full p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2`}
                onClick={openUniConstruccionForm}
              >
                Carga
              </button>
              <UniConstruccionForm ref={uniConstruccionRef} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl">Creacion de Predios</h1>
      <div className="mt-4 w-full">
        <ChangeData />
        <TableForm />
      </div>
    </div>
  );
};
