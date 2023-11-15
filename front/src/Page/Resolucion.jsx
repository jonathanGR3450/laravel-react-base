import FormularioResolucion from "./FormularioResolucion";
const Resolucion = () => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left">
      <h2 className="text-4xl">Generar Resolución</h2>
      <label>
        {" "}
        Diligencie los datos que se piden en el formulario para generar la
        resolucion
      </label>
      <div className=" mt-8 flex justify-center">
        <FormularioResolucion />
      </div>
    </div>
  );
};

export default Resolucion;
