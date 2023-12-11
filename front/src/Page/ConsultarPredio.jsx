import useInfo from "../hooks/useInfo"; 
import FormConsultaPredio from "../components/FormConsultaPredio";

const ConsultarPredio = () => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left">
      <h2 className="text-4xl">Consultar Predio</h2>
      <h3>Consulta de Información</h3>
      <div className=" mt-8 flex flex-col items-center">
        <FormConsultaPredio/>
      </div>
    </div>
  );
};

export default ConsultarPredio;
