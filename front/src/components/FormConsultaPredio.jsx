import { useState } from "react";
import { Link } from "react-router-dom";
import useInfo from "../hooks/useInfo";
import Alerta from "./Alerta";

const FormConsultaPredio = () => {
  const [numeroPredial, setNumeroPredial] = useState("");
  const { mostrarAlerta, alerta, submitInfoNumPredial, numPredial } = useInfo();
  console.log(numPredial);
  const { data: info } = numPredial;

  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  const { Predio } = info || {};
  console.log(Predio ? Predio[0] : null);
  const {
    Codigo_Homologado,
    Numero_Predial,
    Numero_Predial_Anterior,
    Matricula_Inmobiliaria,
  } = Predio ? Predio[0] : {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([numeroPredial].includes("")) {
      mostrarAlerta({
        msg: "Debes proporcionar un numero predial",
        error: true,
      });
      return;
    }
    if ([numeroPredial].some((item) => item.trim().length !== 30)) {
      mostrarAlerta({
        msg: "Cada número predial debe tener exactamente 30 dígitos",
        error: true,
      });
      return;
    }
    await submitInfoNumPredial(numeroPredial);
    setNumeroPredial("");
  };

  const { msg } = alerta;

  return (
    <>
      <form
        action=""
        className="flex flex-col  py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="  mb-3">
          <label className="font-semibold m-2" htmlFor="numeroPredial">
            Numero Predial
          </label>
          <input
            type="text"
            id="numeroPredial"
            className="w-full border-2 rounded-lg text-center "
            placeholder="252900001000000010065000000000"
            value={numeroPredial}
            onChange={(e) => setNumeroPredial(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Buscar"
          className="
      p-2 text-center rounded text-white bg-teal-500 text-lg mr-2 cursor-pointer
      hover:bg-teal-700 transition-colors uppercase "
        />
      </form>

      {Predio ? (
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Codigo Homologado</th>
              <th className="py-2 px-4 border-b">Número Predial</th>
              <th className="py-2 px-4 border-b">Número Predial Anterior</th>
              <th className="py-2 px-4 border-b">Matricula Inmobiliaria</th>
              <th className="py-2 px-4 border-b">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">{Codigo_Homologado}</td>
              <td className="py-2 px-4 border-b">{Numero_Predial}</td>
              <td className="py-2 px-4 border-b">{Numero_Predial_Anterior}</td>
              <td className="py-2 px-4 border-b">{Matricula_Inmobiliaria}</td>
              <td className="py-2 px-4 border-b flex justify-start ">
                <Link to="/DetallesPredio">
                  <button className="bg-teal-500 text-white px-3 py-1 rounded mr-2 cursor-pointer
                                hover:bg-teal-700 transition-colors">
                    Detalles
                  </button>
                </Link>
                <Link to="/EditarDetallesPredio">
                  <button
                    className=" bg-cyan-500 text-white px-3 py-1 rounded cursor-pointer
                                hover:bg-cyan-700 transition-colors"
                  >
                    Editar
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default FormConsultaPredio;
