import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [infoResolucion, setInfoResolucion] = useState([]);
  const [alerta, setAlerta] = useState([]);
  const [resultado, setResultado] = useState({});

  const navigate = useNavigate();

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
      setResultado(data);
      console.log(data);

      setAlerta({
        msg: "Resolución Creada Correctamente",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/resoluciones");
      }, 3000);
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
        resultado,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export { InfoProvider };
export default InfoContext;
