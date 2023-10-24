export const DerechoForm = () => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="font-semibold text-3xl">Caracteristicas del predio</h1>
      <p>A Continuación se muestran las caracteristicas del predio:</p>
      <div className="flex flex-col w-full">
        <h2 className="font-semibold text-2xl">Datos Generales del Predio</h2>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3">
            <label className="font-semibold">Tipo Derecho*:</label>
            <select className="border-2 p-2 rounded-md w-full">
              <option></option>
              <option value={47}>Dominio</option>
              <option value={48}>Ocupacion</option>
              <option value={49}>Posesion</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Id Interesado*:</label>
            <input className="border-2 p-2 rounded-md w-full"></input>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Id Predio *:</label>
            <input className="border-2 p-2 rounded-md w-full"></input>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3">
            <label className="font-semibold">Tipo Restriccion*:</label>
            <select className="border-2 p-2 rounded-md w-full">
              <option></option>
              <option value="799">(Servidumbre) Tránsito</option>
              <option value="800">(Servidumbre) Aguas negras</option>
              <option value="801">(Servidumbre) Aire</option>
              <option value="802">(Servidumbre) Energía eléctrica</option>
              <option value="803">(Servidumbre) Gasoducto</option>
              <option value="804">(Servidumbre) Luz</option>
              <option value="805">(Servidumbre) Oleoducto</option>
              <option value="806">(Servidumbre) Agua</option>
              <option value="807">(Servidumbre) Minera</option>
              <option value="808">(Servidumbre) Legal de hidrocarburos</option>
              <option value="809">(Servidumbre) Medianería</option>
              <option value="810">(Servidumbre) Alcantarillado</option>
              <option value="811">(Servidumbre) Acueducto</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Fecha Inicio de Tenencia *:</label>
            <input
              type="date"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Id Interesado*:</label>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3">
            <label className="font-semibold">Fraccion Derecho *:</label>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">Descripcion*:</label>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <label className="font-semibold">
              Interesado lc Agrupaciones*:
            </label>
            <input
              type="text"
              className="border-2 p-2 rounded-md w-full"
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full mt-2">
          <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
