import { useState } from "react";
import LogoColor from "../img/LogoColor.png";
import { Outlet, Link } from "react-router-dom";
const Tablero = () => {
  const [bttInteresado, setInteresado] = useState();
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <div>
        <Link
          to="/Interesado"
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2"
        >
          Agregar Interesados
        </Link>
        <Link
          to="/FuenteAdmin"
          className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2"
        >
          Agregar Interesados
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default Tablero;
