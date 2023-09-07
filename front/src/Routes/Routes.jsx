import { Routes, Route } from "react-router-dom";
import Tablero from "../Page/Dashboard";
import Menu from "../Page/Menu";
import Table from "../Page/Table";

const Ruta = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route path="/Tablero" element={<Tablero />}>
          <Route path="Data/" element={<Table />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Ruta;
//<Route path="/Dash"  Component = {LoginForm} />
