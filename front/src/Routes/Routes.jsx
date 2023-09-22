import { Routes, Route } from "react-router-dom";
import Tablero from "../Page/Dashboard";
import Menu from "../Page/Menu";
import Table from "../Page/Table";
import Consulta from "../Page/Consulta";
import FichaPredial from "../Page/FichaPredial";
import Conven from "../Page/Convencional";
import NoConven from "../Page/Noconvencional";
const Ruta = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route path="/Tablero" element={<Tablero />}></Route>
        <Route path="/Consulta/:data" element={<Consulta />} />
        <Route path="/Ficha" element={<FichaPredial />}>
          <Route path="Convencional" element={<Conven />}></Route>
          <Route path="NoConvencional" element={<NoConven />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Ruta;
//<Route path="/Dash"  Component = {LoginForm} />
