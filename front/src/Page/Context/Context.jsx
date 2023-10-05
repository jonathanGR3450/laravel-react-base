import React, { createContext, useState } from "react";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [numPredial, setNumPredial] = useState([]);

  const updateTableData = (newData) => {
    setTableData(newData);
  };
  const updateNumPredial = (newData) => {
    console.log("datos nuevos", newData);
    setNumPredial(newData);
  };

  return (
    <TableContext.Provider
      value={{ tableData, updateTableData, numPredial, updateNumPredial }}
    >
      {children}
    </TableContext.Provider>
  );
};
