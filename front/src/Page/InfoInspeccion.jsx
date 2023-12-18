import FormInfoInspeccion from "../components/FormInfoInspeccion";
const InfoInspeccion = () => {
  return (
    <>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left">
        <h2 className="text-4xl mb-8" >Ingreso de Información de Inspección</h2>
        <FormInfoInspeccion />
      </div>
    </>
  );
};

export default InfoInspeccion;
