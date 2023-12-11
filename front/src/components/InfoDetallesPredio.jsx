import { useState } from "react";
import useInfo from "../hooks/useInfo";
import InfoPredio from "./InfoPredio"; // Importa el componente InfoPredio
import InfoDireccion from './InfoDireccion'; // Importa el componente InfoDireccion
import InfoJuridica from "./InfoJuridica";
import InfoInteresados from "./InfoInteresados";
import InfoConstrucciones from "./InfoConstrucciones";
import InfoUnidadConstruccion from "./InfoUnidadConstruccion";
import InfoTerreno from "./InfoTerreno";

const InfoDetallesPredio = () => {
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  const handleToggleAcordeon = (index) => {
    setAcordeonAbierto((prevIndex) => (prevIndex === index ? null : index));
  };

  const secciones = [
    { componente: <InfoPredio />, alias: "Información del Predio" },
    { componente: <InfoDireccion />, alias: "Direccion" },
    { componente: <InfoJuridica />, alias: "Información del Juridica" },
    { componente: <InfoInteresados/>, alias: "Información de Interesados" },
    { componente: <InfoConstrucciones/>, alias: "Información de Construcciones" },
    { componente: <InfoUnidadConstruccion/>, alias: "Información de Unidades de Construccion" },
    { componente: <InfoTerreno/>, alias: "Información de Terreno" },
    // Agrega más secciones según sea necesario
  ];

  return (
    <div className=" flex flex-col w-full p-4 font-bold uppercase cursor-pointer ">
      {secciones.map((seccion, index) => (
        <div key={index} className="acordeon-seccion mb-1 bg-slate-100  bg-opacity-70 p-5 border hover:bg-slate-200 transition-colors">
          <div
            className={`acordeon-titulo ${
              index === acordeonAbierto ? "abierto" : ""
            }`}
            onClick={() => handleToggleAcordeon(index)}
          >
            {/* Puedes ajustar cómo mostrar el título según las necesidades del componente */}
            {seccion.alias} {/* Esto obtiene el nombre del componente */}
          </div>
          {index === acordeonAbierto && (
            <div className="acordeon-contenido m-5 border p-5 bg-white bg-opacity-80 ">
              {seccion.componente}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoDetallesPredio;
