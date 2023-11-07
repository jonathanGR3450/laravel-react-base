import React, { createContext, useState } from "react";

export const CaracteristicaContext = createContext();
export const CaracteristicaProvider = ({ children }) => {
  const [dataCaracteristica, setDataCaracteristica] = useState({
    identificador: "A",
    tipo_construccion: "",
    tipo_dominio: "",
    tipo_unidad_construccion: "",
    tipo_planta: "",
    total_plantas: "",
    total_habitaciones: "",
    total_banios: "",
    total_locales: "",
    anio_construccion: "",
    uso: "",
    avaluo_unidad_construccion: "",
    area_construida: 0,
    area_privada_construida: 0,
    fin_vida_util_version: "",
    espacio_de_nombres: "Fusagasuga",
    local_id: "ABC",
    observaciones: "",
  });
  const [calificacionconvencional, setCalificacionConvencional] = useState({
    tipo_calificar: "",
    total_calificacion: "",
    grupocalificacion: [],
  });

  const [calificacionnoconvencional, setCalificacionNoConvencional] = useState({
    tipo_anexo: "",
  });
  const updateCaracteristicaData = (newData) => {
    setDataCaracteristica(newData);
  };
  const updateCalificacionConvencional = (newData) => {
    setCalificacionConvencional(newData);
  };

  const updateCalificacionNoConvencional = (newData) => {
    setCalificacionNoConvencional(newData);
  };

  return (
    <CaracteristicaContext.Provider
      value={{
        dataCaracteristica,
        calificacionconvencional,
        calificacionnoconvencional,
        updateCaracteristicaData,
        updateCalificacionConvencional,
        updateCalificacionNoConvencional,
      }}
    >
      {children}
    </CaracteristicaContext.Provider>
  );
};
export const GrupoContext = createContext();
export const GrupoProvider = ({ children }) => {
  const [grupocalificacion, setGrupoCalificacion] = useState({
    clase_calificacion: "",
    conservacion: "",
    subtotal: "",
    objetoconstruccion: [],
  });
  const updateGrupoCalificacion = (newData) => {
    setGrupoCalificacion(newData);
  };
  return (
    <GrupoContext.Provider
      value={{ grupocalificacion, updateGrupoCalificacion }}
    >
      {children}
    </GrupoContext.Provider>
  );
};
