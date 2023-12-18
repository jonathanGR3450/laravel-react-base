const TablaConstrucciones = (props) => {
  console.log("props tabla Construcciones", props);

  let construccion = props.data;
  return (
    <div>
      <table className="min-w-full font-normal bg-white border border-gray-300 mt-4 text-center">
        {" "}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Identificador</th>
            <th className="py-2 px-4 border-b">Tipo Construccion</th>
            <th className="py-2 px-4 border-b">Avaluo</th>
            <th className="py-2 px-4 border-b">Area</th>
            <th className="py-2 px-4 border-b">Acción</th>
          </tr>
        </thead>
        <tbody>
          {construccion == undefined ? (
            <tr>
              <td colSpan={3}>No hay Datos</td>
            </tr>
          ) : (
            construccion.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.identificador}</td>
                  <td>{item.tipo_construccion.dispname}</td>
                  <td>{item.avaluo_construccion}</td>
                  <td>{item.area_construccion}</td>
                  <td>"Modal"</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TablaConstrucciones;
