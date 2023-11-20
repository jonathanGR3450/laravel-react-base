import TablaResoluciones from "../components/TablaResoluciones";
const Resoluciones = () => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 text-left">
      Resoluciones
      <div className=" mt-8 flex justify-center">
        <TablaResoluciones />
      </div>
    </div>
  );
};

export default Resoluciones;
