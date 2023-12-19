import { useState } from "react";
import LogoColor from "../img/LogoColor.png";
import { Outlet, Link } from "react-router-dom";
const Tablero = () => {
  const [bttInteresado, setInteresado] = useState();
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center justify-center">
      <div>
        <label className="text-4xl">Tramites</label>
      </div>
      <div className="flex flex-col mt-4">
        <Link
          to="/NumPredial"
          className="p-2 text-center rounded-md  text-white bg-teal-500 text-lg mr-2"
        >
          Desenglobe o Inscripción de Predio
        </Link>
        <Link
          to="/ConsultarPredio"
          className="p-2 text-center rounded-md mt-2 text-white bg-teal-500 text-lg mr-2"
        >
          Tramites Generales
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default Tablero;
