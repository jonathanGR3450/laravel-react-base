const TablaUnidadConstruccion = ({ datosUnidadConstruccion }) => {
  return (
    <div>
      <h2>Detalles de la Unidad de Construcción</h2>
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Identificador</th>
            {/* <th>Tipo Construcción</th> */}
            <th className="py-2 px-4 border-b">Área Construida</th>
            <th className="py-2 px-4 border-b">Tipo Construcción Específico</th>
            <th className="py-2 px-4 border-b">Tipo Unidad</th>
            <th className="py-2 px-4 border-b">Uso</th>
            <th className="py-2 px-4 border-b">Puntaje</th>
            {/* Agrega más encabezados según tus necesidades */}
          </tr>
        </thead>
        <tbody>
          {datosUnidadConstruccion?.map((unidad, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{unidad.identificador}</td>

              <td className="py-2 px-4 border-b">{unidad.area_construida}</td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion.tipo_construccion.dispname
                }
              </td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion.tipo_unidad_construccion.dispname
                }
              </td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion.uso.dispname
                }
              </td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion.calificacionconvencional.total_calificacion
                }
              </td>
              {/* Agrega más celdas según tus necesidades */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUnidadConstruccion;
