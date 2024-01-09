import React, { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";

const TablaResoluciones = () => {
  const [resoluciones, setResoluciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const downloadFile = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };
  console.log("resolucion ", resoluciones);
  useEffect(() => {
    const obtenerResoluciones = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await clienteAxios(
          "/document/list/radicados?limit=2000&direction=DESC",
          config
        );
        const { data: info } = data;
        const { data: resol } = info;
        setResoluciones(resol);
      } catch (error) {
        console.error("Error al obtener resoluciones:", error);
        // Puedes mostrar un mensaje de error al usuario aquí si es necesario
      } finally {
        setIsLoading(false);
      }
    };

    obtenerResoluciones();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Cargando resoluciones...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Radicado</th>
              <th className="py-2 px-4 border-b">ID Asociado</th>
              <th className="py-2 px-4 border-b">Tipo Resolución</th>
              <th className="py-2 px-4 border-b text-center">
                Descargar Archivo
              </th>
            </tr>
          </thead>
          <tbody>
            {resoluciones.length === 0 ? (
              <tr>
                <td colSpan="5">No hay resoluciones disponibles</td>
              </tr>
            ) : (
              resoluciones.map((item) => (
                <tr key={item.t_id}>
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
                      Descargar Resolucion
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablaResoluciones;
