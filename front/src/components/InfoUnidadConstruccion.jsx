import TablaUnidadConstruccion from "./TablaUnidadConstruccion";
import useInfo from "../hooks/useInfo";

const InfoUnidadConstruccion = () => {
  const { numPredial } = useInfo();
  const { data: info } = numPredial;
  const { Predio } = info || {};
  const { unidad_construccion } = Predio ? Predio[0] : {};

  console.log(numPredial);
  console.log(info);
  console.log(unidad_construccion);
  return (
    <>
      <TablaUnidadConstruccion datosUnidadConstruccion={unidad_construccion} />
    </>
  );
};

export default InfoUnidadConstruccion;
