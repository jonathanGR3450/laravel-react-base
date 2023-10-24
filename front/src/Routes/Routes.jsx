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
import { FuenteAdminForm } from "../Page/FuenteAdmin";
import { AddInteresadoForm } from "../Page/AddInteresado";
import { InteresadoProvider } from "../Page/Context/InteresadoContext";
import { DerechoForm } from "../Page/Derecho";
import { NewPredioForm } from "../Page/Predio";
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
        <Route
          path="/Predio"
          element={
            <ArrayFinalProvider>
              <TableProvider>
                <NewPredioForm />
              </TableProvider>
            </ArrayFinalProvider>
          }
        ></Route>
        <Route path="/DataHom" element={<LoadCodHom />}></Route>
        <Route path="/FuenteAdmin" element={<FuenteAdminForm />}></Route>

        <Route
          path="/AddInteresado"
          element={
            <InteresadoProvider>
              <AddInteresadoForm />{" "}
            </InteresadoProvider>
          }
        ></Route>
        <Route path="/AddDerecho" element={<DerechoForm />}></Route>
      </Route>
    </Routes>
  );
};

export default Ruta;
//<Route path="/Dash"  Component = {LoginForm} />
//<Route path="/AddPredio" element={<PredioForm />}></Route>
