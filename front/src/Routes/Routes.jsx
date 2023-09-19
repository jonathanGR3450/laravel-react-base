import { Routes, Route } from "react-router-dom";
import Tablero from "../Page/Dashboard";
import Menu from "../Page/Menu";
import Consulta from "../Page/Consulta";
import FichaPredial from "../Page/FichaPredial";
import UniconstForm from "../Page/Uniconst";
import { ResumenForm } from "../Page/Resume";
const Ruta = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route path="/Tablero" element={<Tablero />}></Route>
        <Route path="/Consulta/:data" element={<Consulta />} />
        <Route path="/Ficha" element={<FichaPredial />}>
          <Route path="Uniconst/:info" element={<UniconstForm />}></Route>
        </Route>
        <Route path="Resumen" element={<ResumenForm />}></Route>
      </Route>
    </Routes>
  );
};

export default Ruta;
//<Route path="/Dash"  Component = {LoginForm} />
