import { Link } from "react-router-dom";
import InfoDetallesPredio from "../components/InfoDetallesPredio";
const DetallesPredio = () => {
  return (
    <>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left border mt-5 shadow">
        <h2 className="text-4xl mb-5 uppercase font-bold">Información Relacionada con el Predio</h2>
        <InfoDetallesPredio />
      </div>
      <Link to="/ConsultarPredio">
        <button className="bg-teal-500 text-white px-3 py-1 rounded m-5">
          Volver
        </button>
      </Link>
    </>
  );
};

export default DetallesPredio;
