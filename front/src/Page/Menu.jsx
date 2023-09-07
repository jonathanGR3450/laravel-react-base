import Logoblanco from "../img/logo-blanco.png";
import Logogov from "../img/logo_footer.png";
import { Outlet, Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="h-screen">
      <header className="h-he-5  bg-blue-600 flex flex-row items-center ">
        <img className="h-5 ml-12" src={Logogov} />
      </header>

      <nav className="h-he-5 bg-teal-500">
        <ul className="flex flex-row h-full  items-center ">
          <li>
            <img className="h-8 ml-4 mr-4" src={Logoblanco} />
          </li>
          <li className="text-white">
            <Link to="/Tablero">Cargar Info</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer className="bg-green-600 w-full text-center flex flex-row justify-center items-center  h-he-5">
        <h6 className="text-white">@ Todos los derechos Reservados</h6>
      </footer>
    </div>
  );
};

export default Menu;
