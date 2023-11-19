import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [infoResolucion, setInfoResolucion] = useState([]);
  const [alerta, setAlerta] = useState([]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };
  const submitInfoResolucion = async (infoResolucion) => {
    console.log(infoResolucion);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await clienteAxios.post(
        "document/generate",
        infoResolucion,
        config
      );
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <InfoContext.Provider
      value={{
        infoResolucion,
        mostrarAlerta,
        alerta,
        submitInfoResolucion,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export { InfoProvider };
export default InfoContext;
