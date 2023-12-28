import { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";

const TablaResoluciones = () => {
  const [resoluciones, setResoluciones] = useState([]);
  const downloadFile = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };
  useEffect(() => {
    const obtenerResoluciones = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await clienteAxios(
          "/document/list/radicados?direction=DESC",
          config
        );
        const { data: info } = data;
        const { data: resol } = info;
        setResoluciones(resol);
        console.log(resol);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerResoluciones();
  }, []);

  /*  const openPdfInNewTab = (url) => {
    window.open(url, "_blank");
  }; */
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Id</th>
          <th className="py-2 px-4 border-b">Radicado</th>
          <th className="py-2 px-4 border-b">ID Asociado</th>
          <th className="py-2 px-4 border-b">Resolución</th>
          <th className="py-2 px-4 border-b">Ver Archivo</th>
        </tr>
      </thead>
      <tbody>
        {resoluciones.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{item.t_id}</td>
            <td className="py-2 px-4 border-b">{item.no_radicado}</td>
            <td className="py-2 px-4 border-b">{item.asociado_id}</td>
            <td className="py-2 px-4 border-b">{item.tramite}</td>
            <td className="py-2 px-4 border-b">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  downloadFile(item.url, "nombre_del_archivo.docx")
                }
              >
                Descargar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaResoluciones;
