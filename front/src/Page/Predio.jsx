export const NewPredioForm = () => {
  const TableForm = () => {
    return (
      <div className="w-full">
        <table className="w-full text-center">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl p-2">ID</th>
              <th className="border-2 rounded-xl p-2">Número Predial</th>
              <th className="border-2 rounded-xl p-2">Clase Suelo</th>
              <th className="border-2 rounded-xl p-2">Tipo Suelo</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };
  const ChangeData = () => {
    return (
      <div>
        <h2>Datos Columna </h2>
      </div>
    );
  };

  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-2xl">Creacion de Predios</h1>
      <div className="mt-4 w-full">
        <div>
          <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
            Cargar Numeros Prediales
          </button>
        </div>
        <ChangeData />
        <TableForm />
      </div>
    </div>
  );
};
