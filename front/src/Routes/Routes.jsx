import { Routes, Route } from "react-router-dom";
import Tablero from "../Page/Dashboard";
import Menu from "../Page/Menu";
import Consulta from "../Page/Consulta";
import FichaPredial from "../Page/FichaPredial";
import UniconstForm from "../Page/Uniconst";
import { ResumenForm } from "../Page/Resume";
import { NumPredialForm } from "../Page/NumPredial";
import { LoadCodHom } from "../Page/LoadCodHom";
import { ArrayFinalProvider, TableProvider } from "../Page/Context/Context";
const Ruta = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route path="/Tablero" element={<Tablero />}></Route>
        <Route path="/Consulta/:data" element={<Consulta />} />
        <Route path="/Ficha" element={<FichaPredial />}>
          <Route path="Uniconst/:info" element={<UniconstForm />}></Route>
        </Route>
        <Route path="/Resumen" element={<ResumenForm />}></Route>
        <Route
          path="/NumPredial"
          element={
            <ArrayFinalProvider>
              <TableProvider>
                <NumPredialForm />{" "}
              </TableProvider>
            </ArrayFinalProvider>
          }
        ></Route>
        <Route path="/DataHom" element={<LoadCodHom />}></Route>
      </Route>
    </Routes>
  );
};

export default Ruta;
//<Route path="/Dash"  Component = {LoginForm} />
