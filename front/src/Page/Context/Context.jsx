import React, { createContext, useState } from "react";

//Datos Tabla
export const TableContext = createContext();
export const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);

  const updateTableData = (newData) => {
    setTableData(newData);
  };

  return (
    <TableContext.Provider value={{ tableData, updateTableData }}>
      {children}
    </TableContext.Provider>
  );
};

//Datos Numero Predial
export const NumPreContext = createContext();

export const NumPreProvider = ({ children }) => {
  const [numPredial, setNumPredial] = useState([]);
  const updateNumPredial = (newData) => {
    setNumPredial(newData);
  };
  return (
    <NumPreContext.Provider value={{ numPredial, updateNumPredial }}>
      {children}
    </NumPreContext.Provider>
  );
};

//Datos Arreglo Predial
export const ArrayFinalContext = createContext();
export const ArrayFinalProvider = ({ children }) => {
  const [ArrayFinal, setArrayFinal] = useState([]);
  const updateArrayFinal = (newData) => {
    setArrayFinal(newData);
  };
  return (
    <ArrayFinalContext.Provider value={{ ArrayFinal, updateArrayFinal }}>
      {children}
    </ArrayFinalContext.Provider>
  );
};
