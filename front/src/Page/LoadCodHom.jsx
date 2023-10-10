import Papa from "papaparse";
import { useEffect, useState } from "react";
import ApiTest from "./Api";
import axios from "axios";

export const LoadCodHom = () => {
  const [dataFile, setDataFile] = useState(null);
  const [estButton, setEstButton] = useState(true);

  const [info, setInfo] = useState({
    msj: "Cargando",
    numreg: 0,
    nom: "",
    size: "",
  });

  let api = ApiTest();
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (file) {
      setDataFile(file);
      setEstButton(false);
      Papa.parse(file, {
        complete: (result) => {
          setInfo((prevInfo) => ({
            ...prevInfo,
            numreg: result.data.length,
          }));
          //setData(result.data); // Guarda los registros en el estado
        },
      });
    }
  };
  // const [datavalue, setDataValue] = useState("entra");
  //Formulario de Elegir archivo
  const InfoFileForm = () => {
    return (
      <div className=" w-1/2 flex flex-col items-center">
        <div className="flex flex-col">
          <label className="font-semibold text-2xl">Numero de Registros</label>
          <label className="mb-1">{info.numreg}</label>
          <label className="font-semibold text-2xl">Mensaje</label>
          <label className="mb-1">{info.msj}</label>
          <label className="font-semibold text-2xl">Nombre Archivo </label>
          <label className="mb-1">{info.nom}</label>
          <label className="font-semibold text-2xl">Tamaño Archivo</label>
          <label className="mb-1">{info.size} Kb</label>
        </div>
      </div>
    );
  };

  function SendFile(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("numeros_homologados_csv", dataFile, dataFile.name);

    let url = "http://localhost/api/v1/predio/numeros-homologados";
    var options = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((result) =>
        setInfo((prevInfo) => ({
          ...prevInfo,
          msj: result.message,
        }))
      )
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    if (dataFile !== null) {
      const newinfo = {
        nom: dataFile.name,
        size: dataFile.size,
      };
      setInfo(newinfo);
    }
  }, [dataFile]);

  return (
    <div className="p-4 w-11/12 flex flex-row overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <div className="w-1/3 flex flex-col">
        <h1 className="text-4xl mt-4 mb-4">Carga de Datos Homologados</h1>
        <h2 className="text-2xl  mb-2">Selecciona el archivo .CSV</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      {!estButton ? <InfoFileForm /> : null}
      {!estButton ? (
        <div className="flex flex-col items-center justify-center w-1/3 ">
          <button
            className={`${
              estButton ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }
    p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 w-1/2 h-12
   `}
            onClick={SendFile}
            disabled={estButton}
          >
            Enviar
          </button>
        </div>
      ) : null}
    </div>
  );
};
