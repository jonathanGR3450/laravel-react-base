import { Routes, Route } from "react-router-dom";
import Tablero from "../Page/Dashboard";
import Menu from "../Page/Menu";
import Consulta from "../Page/Consulta";
import FichaPredial from "../Page/FichaPredial";
import UniconstForm from "../Page/Uniconst";
import IncrementoForm from "../Page/Incremento";
import { ResumenForm } from "../Page/Resume";
import { NumPredialForm } from "../Page/NumPredial";
import { LoadCodHom } from "../Page/LoadCodHom";
import { ArrayFinalProvider, TableProvider } from "../Page/Context/Context";
import { DataProvider } from "../Page/Context/DataContext";

import { InfoProvider } from "../Page/Context/InfoProvider";

//import FuenteAdminForm from "../Page/FuenteAdmin";
//import { AddInteresadoForm } from "../Page/AddInteresado";

//import { DerechoForm } from "../Page/Derecho";
import { LoadDataForm } from "../Page/CargaDatos";
import { LoadDataConstruccion } from "../Page/CargaConstruccion";
import AvaluoForm from "../Page/Avaluo";

import Resolucion from "../Page/Resolucion";
import Resoluciones from "../Page/Resoluciones";
import { NormalInteresadoForm } from "../Page/Interesado";
import { NormalFuenteForm } from "../Page/FuenteAdmin";
import { NormalPredioForm } from "../Page/Predio";
const Ruta = () => {
  return (
    <InfoProvider>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/Tablero" element={<Tablero />}></Route>
          <Route path="/Interesado" element={<NormalInteresadoForm />}></Route>
          <Route path="/FuenteAdmin" element={<NormalFuenteForm />}></Route>
          <Route path="/Predio" element={<NormalPredioForm />}></Route>
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
            path="/LoadData"
            element={
              <ArrayFinalProvider>
                <TableProvider>
                  <DataProvider>
                    <LoadDataForm />
                  </DataProvider>
                </TableProvider>
              </ArrayFinalProvider>
            }
          ></Route>
          <Route
            path="/LoadConstruccion"
            element={
              <ArrayFinalProvider>
                <TableProvider>
                  <DataProvider>
                    <LoadDataConstruccion />
                  </DataProvider>
                </TableProvider>
              </ArrayFinalProvider>
            }
          ></Route>
          <Route path="/DataHom" element={<LoadCodHom />}></Route>
          <Route path="/Avaluo" element={<AvaluoForm />}></Route>
          <Route path="/Incremento" element={<IncrementoForm />}></Route>

          <Route path="/Resolucion" element={<Resolucion />}></Route>
          <Route path="/Resoluciones" element={<Resoluciones />}></Route>
        </Route>
      </Routes>
    </InfoProvider>
  );
};

export default Ruta;
//<Route path="/Dash"  Component = {LoginForm} />
//<Route path="/AddPredio" element={<PredioForm />}></Route>
/* <Route
          path="/AddInteresado"
          element={
            <InteresadoProvider>
              <AddInteresadoForm />{" "}
            </InteresadoProvider>
          }
        ></Route> */
