import React, { createContext, useState } from "react";

export const InteresadoContext = createContext();

export const InteresadoProvider = ({ children }) => {
  const [interesadoData, setInteresadoData] = useState({
    interesado_lc_interesado: {},
    interesado_lc_agrupacioninteresados: {},
    participacion: 0,
  });
  const [dataFinal, setDataFinal] = useState([]);

  const updateDataFinal = () => {
    dataFinal.push(interesadoData);
    console.log("Array FInal", dataFinal);
  };
  const updateInteresadoData = (newData, aux) => {
    console.log(aux);
    setInteresadoData(newData);
  };
  console.log("Nuevos Datos", interesadoData);
  return (
    <InteresadoContext.Provider
      value={{ interesadoData, updateInteresadoData, updateDataFinal }}
    >
      {children}
    </InteresadoContext.Provider>
  );
};
