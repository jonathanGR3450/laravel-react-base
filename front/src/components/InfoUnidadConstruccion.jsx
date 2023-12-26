import TablaUnidadConstruccion from "./TablaUnidadConstruccion";
import useInfo from "../hooks/useInfo";
import { useRef } from "react";
import { NormalUniConForm } from "../Page/Uniconstruccion";

const InfoUnidadConstruccion = () => {
  const { numPredial } = useInfo();
  const { data: info } = numPredial;
  const { Predio } = info || {};
  const { unidad_construccion } = Predio ? Predio[0] : {};
  const uniConstRef = useRef();
  const openUniCons = () => {
    uniConstRef.current.openModal();
  };
  const editToggle = (e) => {
    e.preventDefault();
    //setEstInput((prevEstInput) => !prevEstInput);
    openUniCons();
  };
  return (
    <>
      <div className="w-full">
        <TablaUnidadConstruccion data={Predio ? Predio[0] : {}} />
      </div>
      <div className="flex flex-row w-full ml-4 items-center mt-4 justify-center">
        <button
          name="fuente_administrativa"
          onClick={editToggle}
          className="p-2 text-center rounded-md text-white bg-orange-700"
        >
          Editar
        </button>
        <NormalUniConForm data={Predio ? Predio[0] : {}} ref={uniConstRef} />
      </div>
    </>
  );
};
//datosUnidadConstruccion={unidad_construccion}
export default InfoUnidadConstruccion;
