import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataAll, setDataAll] = useState({
    numero_predial: {},
    derecho: {},
    fuente_administrativa: {},
    interesado: {},
    predio: {},
  });
  const [idArray, setIdArray] = useState({
    first: "",
    second: "",
  });

  const updateIdArray = (newData) => {
    console.log("datos ID entrantes", idArray);
    setIdArray(newData);
  };
  const updateDataAll = (newData) => {
    setDataAll(newData);
  };
  return (
    <DataContext.Provider
      value={{ dataAll, idArray, updateDataAll, updateIdArray }}
    >
      {children}
    </DataContext.Provider>
  );
};
