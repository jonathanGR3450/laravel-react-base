import Papa from "papaparse";
import { useEffect, useState } from "react";

export const LoadCodHom = () => {
  let [dataFile, setDataFile] = useState(null);
  const [estButton, setEstButton] = useState(true);
  const [info, setInfo] = useState({
    msj: "Cargando",
    nom: "",
    size: "",
  });
  // const [datavalue, setDataValue] = useState("entra");
  //Formulario de Elegir archivo
  const FileChooser = () => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setDataFile(file);
        setEstButton(false);
      }
    };

    return (
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
    );
  };
  const InfoFileForm = () => {
    function SendFile() {
      console.log(dataFile);
    }
    return (
      <div className="flex flex-col">
        <label className="font-semibold text-2xl">Mensaje </label>
        <label>{info.msj}</label>
        <label className="font-semibold text-2xl">Nombre </label>
        <label>{info.nom}</label>
        <label className="font-semibold text-2xl">Tamaño </label>
        <label>{info.size} Kb</label>
        <button
          className={`${
            estButton ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }
           p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
           `}
          onClick={SendFile}
          disabled={estButton}
        >
          Enviar
        </button>
      </div>
    );
  };
  useEffect(() => {
    if (dataFile !== null) {
      const newinfo = {
        msj: "Enviando",
        nom: dataFile.name,
        size: dataFile.size,
      };
      setInfo(newinfo);
    }
  }, [dataFile]);

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl">Carga de Datos Homologados</h1>
      <FileChooser />
      {!estButton ? <InfoFileForm /> : null}
    </div>
  );
};
